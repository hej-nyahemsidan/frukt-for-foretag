INSERT INTO public.reseller_users (user_id, reseller_id, role)
VALUES ('911d4e2e-ab60-43a2-8b91-d22ed86c66a3', '71abdefc-9c69-47ee-aab0-f9c6ab0cd6f8', 'admin')
ON CONFLICT DO NOTHING;