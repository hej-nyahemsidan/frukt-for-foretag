CREATE TABLE public.price_guide_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  employee_count text NOT NULL,
  delivery_frequency text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.price_guide_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.price_guide_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON public.price_guide_leads
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can update leads"
  ON public.price_guide_leads
  FOR UPDATE
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can delete leads"
  ON public.price_guide_leads
  FOR DELETE
  TO authenticated
  USING (is_admin_user());