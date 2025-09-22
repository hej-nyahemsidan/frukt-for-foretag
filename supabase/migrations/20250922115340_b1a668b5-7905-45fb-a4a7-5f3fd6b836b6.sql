-- Create customer record for the existing logged-in user
INSERT INTO public.customers (
  user_id,
  company_name,
  contact_person,
  email,
  phone,
  address
) VALUES (
  '39b900fe-7d2d-433a-8e5f-fc292a0448be',
  'Test Företag AB',
  'Anna Andersson',
  'anna@gmail.com',
  '08-123 456 78',
  'Testgatan 123, 111 11 Stockholm'
);

-- Insert sample orders for the customer
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
    (SELECT id FROM public.customers WHERE user_id = '39b900fe-7d2d-433a-8e5f-fc292a0448be'),
    'weekly',
    ARRAY['måndag', 'onsdag'],
    '{"frukter": ["äpplen", "bananer", "apelsiner"], "antal": 25}',
    'active',
    450.00,
    '2024-01-15'
),
(
    (SELECT id FROM public.customers WHERE user_id = '39b900fe-7d2d-433a-8e5f-fc292a0448be'),
    'monthly', 
    ARRAY['tisdag'],
    '{"frukter": ["kiwi", "druvor", "päron"], "antal": 50}',
    'paused',
    890.00,
    '2024-02-01'
);