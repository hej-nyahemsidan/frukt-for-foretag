-- Make customer creation trigger idempotent to avoid duplicate key errors
-- This prevents "duplicate key value violates unique constraint customers_user_id_key"
-- from aborting the transaction during auth.admin.createUser

-- Update handle_new_user to use UPSERT semantics
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.customers (user_id, company_name, contact_person, email, phone, address)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'company_name', 'Företag AB'),
    COALESCE(NEW.raw_user_meta_data ->> 'contact_person', 'Kontaktperson'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'address', '')
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    company_name = COALESCE(EXCLUDED.company_name, public.customers.company_name),
    contact_person = COALESCE(EXCLUDED.contact_person, public.customers.contact_person),
    updated_at = now();

  RETURN NEW;
END;
$$;

-- Note: We DO NOT touch triggers or auth schema here. Existing triggers will pick up this change automatically.
