-- Remove the foreign key constraint from customers to profiles
-- This constraint causes issues during user creation when triggers fire
ALTER TABLE public.customers 
DROP CONSTRAINT IF EXISTS customers_user_id_profiles_fkey;

-- Add a comment explaining why we don't have this FK
COMMENT ON COLUMN public.customers.user_id IS 'References auth.users(id) via triggers. No FK to profiles to avoid circular dependency during user creation.';