-- Fix security warnings by converting RESTRICTIVE policies to PERMISSIVE policies
-- This ensures proper RLS enforcement and prevents potential data exposure

-- ====================================
-- FIX 1: CUSTOMERS TABLE
-- ====================================

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Admins can delete all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Users can insert their own customer profile" ON public.customers;
DROP POLICY IF EXISTS "Users can update their own customer profile" ON public.customers;
DROP POLICY IF EXISTS "Users can view their own customer profile" ON public.customers;

-- Create PERMISSIVE policies (default type, more secure)
CREATE POLICY "Admins can view all customers"
  ON public.customers
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can insert customers"
  ON public.customers
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can update all customers"
  ON public.customers
  FOR UPDATE
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can delete all customers"
  ON public.customers
  FOR DELETE
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Users can view own customer profile"
  ON public.customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customer profile"
  ON public.customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customer profile"
  ON public.customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ====================================
-- FIX 2: ADDITION_REQUESTS TABLE
-- ====================================

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Admins can manage all addition requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Customers can insert their own requests" ON public.addition_requests;
DROP POLICY IF EXISTS "Customers can view their own requests" ON public.addition_requests;

-- Create PERMISSIVE policies
CREATE POLICY "Admins can view all addition requests"
  ON public.addition_requests
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can update all addition requests"
  ON public.addition_requests
  FOR UPDATE
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Admins can delete all addition requests"
  ON public.addition_requests
  FOR DELETE
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admins can insert addition requests"
  ON public.addition_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_user());

CREATE POLICY "Customers can insert own requests"
  ON public.addition_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = customer_email);

CREATE POLICY "Customers can view own requests"
  ON public.addition_requests
  FOR SELECT
  TO authenticated
  USING (auth.email() = customer_email);

-- ====================================
-- FIX 3: ADMIN_USERS TABLE
-- ====================================

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Admin users can insert admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON public.admin_users;

-- Create PERMISSIVE policies with stricter access control
CREATE POLICY "Only admins can view admin accounts"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Only admins can insert admin accounts"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_user());

CREATE POLICY "Only admins can update admin accounts"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

CREATE POLICY "Only admins can delete admin accounts"
  ON public.admin_users
  FOR DELETE
  TO authenticated
  USING (is_admin_user());