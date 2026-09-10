CREATE TABLE public.conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  event_name text NOT NULL,
  basket_type text,
  employee_count integer,
  price numeric,
  page_path text NOT NULL DEFAULT '/',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.conversion_events TO anon, authenticated;
GRANT SELECT ON public.conversion_events TO authenticated;
GRANT ALL ON public.conversion_events TO service_role;

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can record anonymous conversion events"
ON public.conversion_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event_name = ANY (ARRAY[
    'basket_selector_viewed',
    'basket_selected',
    'employee_count_selected',
    'price_viewed',
    'quote_started',
    'quote_submitted'
  ])
  AND basket_type IS NULL OR basket_type = ANY (ARRAY['Original', 'Banan', 'Premium'])
);

CREATE POLICY "Admins can view conversion events"
ON public.conversion_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX conversion_events_created_at_idx ON public.conversion_events (created_at DESC);
CREATE INDEX conversion_events_event_name_idx ON public.conversion_events (event_name, created_at DESC);
CREATE INDEX conversion_events_session_idx ON public.conversion_events (session_id, created_at);