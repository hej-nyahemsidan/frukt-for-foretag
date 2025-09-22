-- Insert test customer directly (will be linked to a user we create via Supabase Auth UI)
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
);

-- Insert sample orders for the test customer
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
    (SELECT id FROM public.customers WHERE email = 'test@fruktexperten.se'),
    'weekly',
    ARRAY['måndag', 'onsdag'],
    '{"frukter": ["äpplen", "bananer", "apelsiner"], "antal": 25}',
    'active',
    450.00,
    '2024-01-15'
),
(
    (SELECT id FROM public.customers WHERE email = 'test@fruktexperten.se'),
    'monthly', 
    ARRAY['tisdag'],
    '{"frukter": ["kiwi", "druvor", "päron"], "antal": 50}',
    'paused',
    890.00,
    '2024-02-01'
),
(
    (SELECT id FROM public.customers WHERE email = 'test@fruktexperten.se'),
    'yearly',
    ARRAY['fredag'],
    '{"frukter": ["mango", "ananas", "kokosnöt"], "antal": 15}',
    'cancelled',
    2500.00,
    null
);