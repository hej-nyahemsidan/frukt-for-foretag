-- Create profiles table with proper structure
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Safe function to check admin status (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN auth.email() = 'admin@fruktexperten.se';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Admin policies using the safe function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin_user());

CREATE POLICY "Admins can update all profiles" ON public.profiles  
  FOR UPDATE USING (public.is_admin_user());

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (public.is_admin_user());

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Create trigger function for profiles (separate from customers)
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'contact_person', 'Ny användare')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profiles (separate from customers trigger)
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

-- Add updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Backfill existing users, excluding admin
INSERT INTO public.profiles (id, email, full_name)
SELECT 
  id, 
  email,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'contact_person', 'Befintlig användare')
FROM auth.users
WHERE email != 'admin@fruktexperten.se'
ON CONFLICT (id) DO NOTHING;