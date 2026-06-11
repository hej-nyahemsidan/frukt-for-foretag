
-- 1. Harden has_role: return false for NULL user_id (prevents anonymous bypass)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF _user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

-- 2. Restrict user_roles write policies to authenticated only
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Persistent rate-limit table shared across edge function isolates
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key text NOT NULL,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (key)
);

GRANT ALL ON public.rate_limits TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages rate limits" ON public.rate_limits
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Atomic increment function — returns the new count for the active window
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  _key text,
  _window_seconds integer DEFAULT 3600
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _now timestamptz := now();
  _new_count integer;
BEGIN
  INSERT INTO public.rate_limits AS r (key, window_start, count)
  VALUES (_key, _now, 1)
  ON CONFLICT (key) DO UPDATE
    SET count = CASE
        WHEN r.window_start < _now - make_interval(secs => _window_seconds) THEN 1
        ELSE r.count + 1
      END,
      window_start = CASE
        WHEN r.window_start < _now - make_interval(secs => _window_seconds) THEN _now
        ELSE r.window_start
      END
  RETURNING count INTO _new_count;
  RETURN _new_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.increment_rate_limit(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_rate_limit(text, integer) TO service_role;
