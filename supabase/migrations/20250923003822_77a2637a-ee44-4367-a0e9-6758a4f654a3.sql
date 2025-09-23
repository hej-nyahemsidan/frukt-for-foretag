-- Update admin email from fruktexperten to fruktportalen
UPDATE auth.users 
SET email = 'admin@fruktportalen.se' 
WHERE email = 'admin@fruktexperten.se';

-- Update the admin check function to use new email
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN auth.email() = 'admin@fruktportalen.se';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;