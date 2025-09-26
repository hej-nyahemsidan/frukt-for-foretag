-- Remove problematic FK that blocks auth user creation due to trigger order
ALTER TABLE public.customers DROP CONSTRAINT IF EXISTS fk_customers_user_id;