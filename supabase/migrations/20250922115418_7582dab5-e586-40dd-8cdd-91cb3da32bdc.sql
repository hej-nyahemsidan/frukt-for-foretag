-- Insert sample orders for the existing customer
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
) ON CONFLICT DO NOTHING;