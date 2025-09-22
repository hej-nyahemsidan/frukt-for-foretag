-- Insert the admin user in auth.users (this needs to be done manually in Supabase dashboard)
-- Admin credentials: admin@fruktexperten.se / AdminFrukt2024!

-- Create some sample customer accounts for testing
INSERT INTO public.customer_accounts (name, company, email, password, current_plan, delivery_days, status) VALUES
('Anna Andersson', 'Andersson AB', 'anna@andersson.se', 'kund123', 'weekly', ARRAY['Måndag', 'Onsdag', 'Fredag'], 'active'),
('Erik Eriksson', 'Eriksson & Co', 'erik@eriksson.se', 'pass456', 'monthly', ARRAY['Tisdag', 'Torsdag'], 'active'),
('Maria Persson', 'Persson Group', 'maria@persson.se', 'lösen789', 'weekly', ARRAY['Måndag', 'Fredag'], 'inactive');