CREATE POLICY "Reseller users can update own orders"
ON public.reseller_orders
FOR UPDATE
TO authenticated
USING (reseller_id IN (SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()))
WITH CHECK (reseller_id IN (SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()));