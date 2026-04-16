
-- Fix orders: restrict INSERT/UPDATE to authenticated only, add admin full access
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete all orders" ON public.orders
  FOR DELETE TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Admins can insert orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_user());

-- Fix reseller_orders: add admin UPDATE/DELETE
CREATE POLICY "Admins can update all reseller orders" ON public.reseller_orders
  FOR UPDATE TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete all reseller orders" ON public.reseller_orders
  FOR DELETE TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Admins can insert reseller orders" ON public.reseller_orders
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_user());

-- Fix reseller_customers: add admin UPDATE/DELETE
CREATE POLICY "Admins can update reseller customers" ON public.reseller_customers
  FOR UPDATE TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete reseller customers" ON public.reseller_customers
  FOR DELETE TO authenticated
  USING (public.is_admin_user());
