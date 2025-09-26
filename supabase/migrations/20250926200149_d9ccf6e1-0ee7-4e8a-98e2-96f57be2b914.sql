-- Backfill profiles from auth.users
INSERT INTO public.profiles (id, email, full_name)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'contact_person', 'User') as full_name
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);

-- Backfill customers where missing, ensuring all auth.users have customer records
INSERT INTO public.customers (user_id, email, contact_person, company_name, phone, address)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'contact_person', u.raw_user_meta_data->>'full_name', 'Kontaktperson') as contact_person,
  COALESCE(u.raw_user_meta_data->>'company_name', 'Företag AB') as company_name,
  COALESCE(u.raw_user_meta_data->>'phone', '') as phone,
  COALESCE(u.raw_user_meta_data->>'address', '') as address
FROM auth.users u
LEFT JOIN public.customers c ON c.user_id = u.id
WHERE c.user_id IS NULL;

-- Add unique constraint on customers.user_id to prevent duplicates
ALTER TABLE public.customers 
ADD CONSTRAINT unique_customers_user_id UNIQUE (user_id);