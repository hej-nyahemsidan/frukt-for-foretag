-- Add RLS policy to allow admin to view and manage all customers
CREATE POLICY "Admins can view all customers" 
ON public.customers 
FOR SELECT 
USING (auth.email() = 'admin@fruktexperten.se'::text);

CREATE POLICY "Admins can update all customers" 
ON public.customers 
FOR UPDATE 
USING (auth.email() = 'admin@fruktexperten.se'::text);

CREATE POLICY "Admins can delete all customers" 
ON public.customers 
FOR DELETE 
USING (auth.email() = 'admin@fruktexperten.se'::text);