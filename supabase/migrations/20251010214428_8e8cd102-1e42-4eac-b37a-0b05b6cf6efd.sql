-- Security fix: Make RLS policies explicitly require authentication
-- This prevents any ambiguity about anonymous access to sensitive user data

-- ============================================
-- FIX 1: profiles table - explicit authentication required
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Recreate with explicit TO authenticated
CREATE POLICY "Admins can view all profiles" 
ON public.profiles
FOR SELECT 
TO authenticated
USING (is_admin_user());

CREATE POLICY "Admins can update all profiles" 
ON public.profiles
FOR UPDATE 
TO authenticated
USING (is_admin_user());

CREATE POLICY "Admins can insert profiles" 
ON public.profiles
FOR INSERT 
TO authenticated
WITH CHECK (is_admin_user());

CREATE POLICY "Admins can delete profiles" 
ON public.profiles
FOR DELETE 
TO authenticated
USING (is_admin_user());

CREATE POLICY "Users can view own profile" 
ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- ============================================
-- FIX 2: addition_requests table - explicit authentication required
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Customers can view their own requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Customers can insert their own requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Admins can manage all addition requests" ON public.addition_requests;

-- Recreate with explicit TO authenticated
CREATE POLICY "Customers can view their own requests" 
ON public.addition_requests
FOR SELECT 
TO authenticated
USING (auth.email() = customer_email);

CREATE POLICY "Customers can insert their own requests" 
ON public.addition_requests
FOR INSERT 
TO authenticated
WITH CHECK (auth.email() = customer_email);

CREATE POLICY "Admins can manage all addition requests" 
ON public.addition_requests
FOR ALL
TO authenticated
USING (auth.email() = 'admin@vitaminkorgen.se'::text);