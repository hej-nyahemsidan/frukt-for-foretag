-- Update all RLS policies to use new admin email

-- Drop existing admin policies and recreate with new email
DROP POLICY IF EXISTS "Admins can manage all addition requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Admin users can insert admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;

-- Recreate policies with new admin email
CREATE POLICY "Admins can manage all addition requests" ON public.addition_requests
  FOR ALL USING (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admin users can insert admin accounts" ON public.admin_users
  FOR INSERT WITH CHECK (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admin users can view all admin accounts" ON public.admin_users
  FOR SELECT USING (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admins can delete all customers" ON public.customers
  FOR DELETE USING (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admins can insert customers" ON public.customers
  FOR INSERT WITH CHECK (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admins can update all customers" ON public.customers
  FOR UPDATE USING (auth.email() = 'admin@fruktportalen.se');

CREATE POLICY "Admins can view all customers" ON public.customers
  FOR SELECT USING (auth.email() = 'admin@fruktportalen.se');