-- Remove the insecure customer_accounts table with plaintext passwords
-- Authentication should go through Supabase Auth, not this legacy table

DROP TABLE IF EXISTS public.customer_accounts;