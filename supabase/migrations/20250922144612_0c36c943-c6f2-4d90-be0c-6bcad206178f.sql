-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users (only admins can access admin data)
CREATE POLICY "Admin users can view all admin accounts" 
ON public.admin_users 
FOR SELECT 
USING (auth.email() = 'admin@fruktexperten.se');

CREATE POLICY "Admin users can insert admin accounts" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.email() = 'admin@fruktexperten.se');

-- Create customer accounts table
CREATE TABLE public.customer_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  current_plan TEXT NOT NULL CHECK (current_plan IN ('weekly', 'monthly', 'yearly')),
  delivery_days TEXT[] NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on customer_accounts
ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;

-- Create policies for customer accounts (admins can manage all, customers can view their own)
CREATE POLICY "Admins can manage all customer accounts" 
ON public.customer_accounts 
FOR ALL 
USING (auth.email() = 'admin@fruktexperten.se');

CREATE POLICY "Customers can view their own account" 
ON public.customer_accounts 
FOR SELECT 
USING (auth.email() = email);

-- Create addition requests table
CREATE TABLE public.addition_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customer_accounts(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total_monthly_cost DECIMAL(10,2) DEFAULT 0,
  total_onetime_cost DECIMAL(10,2) DEFAULT 0,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on addition_requests
ALTER TABLE public.addition_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for addition requests
CREATE POLICY "Admins can manage all addition requests" 
ON public.addition_requests 
FOR ALL 
USING (auth.email() = 'admin@fruktexperten.se');

CREATE POLICY "Customers can view their own requests" 
ON public.addition_requests 
FOR SELECT 
USING (auth.email() = customer_email);

CREATE POLICY "Customers can insert their own requests" 
ON public.addition_requests 
FOR INSERT 
WITH CHECK (auth.email() = customer_email);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_accounts_updated_at
  BEFORE UPDATE ON public.customer_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_addition_requests_updated_at
  BEFORE UPDATE ON public.addition_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the admin user
INSERT INTO public.admin_users (email) VALUES ('admin@fruktexperten.se');