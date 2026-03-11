-- Allow reseller customers to view their reseller's info (for branding)
CREATE POLICY "Reseller customers can view own reseller"
ON public.resellers
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT reseller_id FROM reseller_customers WHERE user_id = auth.uid()
  )
);

-- Allow reseller customers to view their reseller's standard product prices
CREATE POLICY "Reseller customers can view reseller product prices"
ON public.reseller_product_prices
FOR SELECT
TO authenticated
USING (
  reseller_id IN (
    SELECT reseller_id FROM reseller_customers WHERE user_id = auth.uid()
  )
);