-- Add RLS policy to allow admin to insert customers
CREATE POLICY "Admins can insert customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (auth.email() = 'admin@fruktexperten.se'::text);