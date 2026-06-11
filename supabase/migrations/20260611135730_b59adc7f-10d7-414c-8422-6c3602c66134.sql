
-- Tighten INSERT policies on public lead/unsubscribe tables (replace true with basic email validation)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.price_guide_leads;
CREATE POLICY "Anyone can insert leads"
  ON public.price_guide_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 255);

DROP POLICY IF EXISTS "Anyone can insert pricelist leads" ON public.pricelist_leads;
CREATE POLICY "Anyone can insert pricelist leads"
  ON public.pricelist_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 255);

DROP POLICY IF EXISTS "Anyone can unsubscribe" ON public.email_unsubscribes;
CREATE POLICY "Anyone can unsubscribe"
  ON public.email_unsubscribes FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 255);

-- Replace broad public storage SELECT on product-images bucket
-- (prevents anonymous listing of all files; objects are still accessible by URL via the public bucket)
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
