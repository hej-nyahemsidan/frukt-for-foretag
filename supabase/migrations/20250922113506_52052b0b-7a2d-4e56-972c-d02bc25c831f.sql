-- Create trigger to automatically create customer profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert test user data into customers table manually
-- Note: The auth.users data will be created when the user signs up
-- This is just to prepare the customer profile structure

-- Create some sample orders for the test account (we'll associate them after user creation)
INSERT INTO public.orders (id, customer_id, package_plan, selected_days, items, status, total_price, next_delivery_date)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'weekly', ARRAY['måndag', 'onsdag'], '{"frukter": ["äpplen", "bananer", "apelsiner"], "antal": 25}', 'active', 450.00, '2024-01-15'),
  ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'monthly', ARRAY['tisdag'], '{"frukter": ["kiwi", "druvor", "päron"], "antal": 50}', 'paused', 890.00, '2024-02-01'),
  ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'yearly', ARRAY['fredag'], '{"frukter": ["mango", "ananas", "kokosnöt"], "antal": 15}', 'cancelled', 2500.00, NULL)
ON CONFLICT (id) DO NOTHING;