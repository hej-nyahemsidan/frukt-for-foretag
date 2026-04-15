CREATE TABLE public.pricelist_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pricelist_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pricelist leads"
  ON public.pricelist_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view pricelist leads"
  ON public.pricelist_leads
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can delete pricelist leads"
  ON public.pricelist_leads
  FOR DELETE
  TO authenticated
  USING (is_admin_user());