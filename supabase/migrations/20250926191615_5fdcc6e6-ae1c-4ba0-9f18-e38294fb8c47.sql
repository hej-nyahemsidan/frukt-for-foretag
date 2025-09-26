-- Update admin user email in auth.users table
UPDATE auth.users 
SET email = 'admin@vitaminkorgen.se', 
    raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"email": "admin@vitaminkorgen.se"}'::jsonb
WHERE email = 'admin@fruktportalen.se';

-- Update the is_admin_user function to check for the new admin email
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN auth.email() = 'admin@vitaminkorgen.se';
END;
$function$;

-- Update RLS policies that reference the old admin email

-- Drop existing policies that reference the old email
DROP POLICY IF EXISTS "Admins can manage all addition requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Admin users can insert admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;

-- Recreate policies with the new admin email
CREATE POLICY "Admins can manage all addition requests" 
ON public.addition_requests 
FOR ALL 
USING (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admin users can insert admin accounts" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admin users can view all admin accounts" 
ON public.admin_users 
FOR SELECT 
USING (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admins can delete all customers" 
ON public.customers 
FOR DELETE 
USING (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admins can insert customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admins can update all customers" 
ON public.customers 
FOR UPDATE 
USING (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Admins can view all customers" 
ON public.customers 
FOR SELECT 
USING (auth.email() = 'admin@vitaminkorgen.se');