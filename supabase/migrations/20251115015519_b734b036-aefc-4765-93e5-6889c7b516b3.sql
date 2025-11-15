-- Remove the policy that allows customers to view their own requests
-- This prevents exposure of customer contact information and pricing strategies
DROP POLICY IF EXISTS "Customers can view own requests" ON public.addition_requests;

-- The remaining policies ensure:
-- 1. Admins can view, update, delete, and insert all addition requests
-- 2. Customers can only insert their own requests (but cannot view them afterwards)
-- 3. Customer contact information and pricing details remain private