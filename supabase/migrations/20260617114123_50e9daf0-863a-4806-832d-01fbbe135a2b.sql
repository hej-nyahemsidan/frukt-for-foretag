CREATE POLICY "Reseller users can create orders for own customers"
ON public.reseller_orders
FOR INSERT
TO authenticated
WITH CHECK (
  reseller_id IN (
    SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
  )
  AND reseller_customer_id IN (
    SELECT rc.id FROM public.reseller_customers rc
    JOIN public.reseller_users ru ON ru.reseller_id = rc.reseller_id
    WHERE ru.user_id = auth.uid()
  )
);