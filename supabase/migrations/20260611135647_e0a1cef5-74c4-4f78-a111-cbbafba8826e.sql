
-- 1) Move purchase_prices to a separate admin-only table
CREATE TABLE IF NOT EXISTS public.product_purchase_prices (
  product_id uuid PRIMARY KEY REFERENCES public.products(id) ON DELETE CASCADE,
  prices jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_purchase_prices TO authenticated;
GRANT ALL ON public.product_purchase_prices TO service_role;

ALTER TABLE public.product_purchase_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view purchase prices"
  ON public.product_purchase_prices FOR SELECT
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert purchase prices"
  ON public.product_purchase_prices FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update purchase prices"
  ON public.product_purchase_prices FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete purchase prices"
  ON public.product_purchase_prices FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Migrate existing data
INSERT INTO public.product_purchase_prices (product_id, prices)
SELECT id, COALESCE(purchase_prices, '{}'::jsonb)
FROM public.products
WHERE purchase_prices IS NOT NULL AND purchase_prices::text <> '{}'
ON CONFLICT (product_id) DO NOTHING;

-- Remove the column from the public-readable table
ALTER TABLE public.products DROP COLUMN IF EXISTS purchase_prices;

-- 2) Revoke EXECUTE on internal trigger functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile() FROM anon, authenticated, public;

-- 3) Role-check functions: only signed-in users need them (used inside RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_admin_user() FROM anon, public;
