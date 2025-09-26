-- Add foreign key relationship between customers.user_id and profiles.id
-- First, ensure all existing customers have valid user_id references
UPDATE public.customers 
SET user_id = p.id 
FROM public.profiles p 
WHERE customers.email = p.email 
AND customers.user_id IS NULL;

-- Add the foreign key constraint
ALTER TABLE public.customers 
ADD CONSTRAINT fk_customers_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;