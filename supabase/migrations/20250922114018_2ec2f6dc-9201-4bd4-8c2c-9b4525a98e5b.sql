-- Create test customer data directly
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  '00000000-0000-0000-0000-000000000000',
  'test@fruktexperten.se',
  crypt('TestKund123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"company_name": "Test Företag AB", "contact_person": "Anna Andersson", "phone": "08-123 456 78", "address": "Testgatan 123, 111 11 Stockholm"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Insert customer profile (will be created automatically by trigger, but let's ensure it exists)
INSERT INTO public.customers (
  user_id,
  company_name,
  contact_person,
  email,
  phone,
  address
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Test Företag AB',
  'Anna Andersson',
  'test@fruktexperten.se',
  '08-123 456 78',
  'Testgatan 123, 111 11 Stockholm'
) ON CONFLICT (user_id) DO NOTHING;

-- Get the customer ID for the sample orders
DO $$
DECLARE
    customer_uuid uuid;
BEGIN
    SELECT id INTO customer_uuid FROM public.customers WHERE user_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    
    -- Insert sample orders
    INSERT INTO public.orders (
        customer_id,
        package_plan,
        selected_days,
        items,
        status,
        total_price,
        next_delivery_date
    ) VALUES 
    (
        customer_uuid,
        'weekly',
        ARRAY['måndag', 'onsdag'],
        '{"frukter": ["äpplen", "bananer", "apelsiner"], "antal": 25}',
        'active',
        450.00,
        '2024-01-15'
    ),
    (
        customer_uuid,
        'monthly', 
        ARRAY['tisdag'],
        '{"frukter": ["kiwi", "druvor", "päron"], "antal": 50}',
        'paused',
        890.00,
        '2024-02-01'
    ),
    (
        customer_uuid,
        'yearly',
        ARRAY['fredag'],
        '{"frukter": ["mango", "ananas", "kokosnöt"], "antal": 15}',
        'cancelled',
        2500.00,
        null
    ) ON CONFLICT DO NOTHING;
END $$;