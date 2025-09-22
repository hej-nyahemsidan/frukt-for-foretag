-- Fix critical security vulnerability: Remove plaintext password storage
-- Step 1: Remove the foreign key constraint that prevents dropping customer_accounts
ALTER TABLE public.addition_requests 
DROP CONSTRAINT IF EXISTS addition_requests_customer_id_fkey;

-- Step 2: Update addition_requests to not depend on customer_accounts
-- The table already has customer_name and customer_email, so customer_id foreign key is redundant
ALTER TABLE public.addition_requests 
DROP COLUMN IF EXISTS customer_id;

-- Step 3: Now safely drop the insecure customer_accounts table with plaintext passwords
DROP TABLE IF EXISTS public.customer_accounts;