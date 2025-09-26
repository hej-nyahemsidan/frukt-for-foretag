-- Insert products for fruktpasar category
INSERT INTO public.products (name, category, image_url, prices) VALUES
('Fruktpåse Extra', 'fruktpasar', '/src/assets/fruktpase-new.jpg', '{"default": 59}'),
('Bananpåse Extra', 'fruktpasar', '/src/assets/fruktpase-new.jpg', '{"default": 49}');

-- Insert products for mejeri category  
INSERT INTO public.products (name, category, image_url, prices) VALUES
('Mellanmjölk Eko Laktosfri 1,5%', 'mejeri', '/src/assets/mellanmjolk-eko-laktosfri.png', '{"default": 22}'),
('Latte Art Mjölk Eko 2,6%', 'mejeri', '/src/assets/latte-art-mjolk-eko.png', '{"default": 32}'),
('Mellanmjölk Laktosfri 1,5%', 'mejeri', '/src/assets/mellanmjolk-laktosfri.png', '{"default": 22}'),
('Mellanmjölk Port 1,5%', 'mejeri', '/src/assets/mellanmjolk-port.png', '{"default": 18}'),
('Kaffemjölk Laktosfri 1,5%', 'mejeri', '/src/assets/kaffemjolk-laktosfri.png', '{"default": 28}');

-- Insert products for lask category
INSERT INTO public.products (name, category, image_url, prices) VALUES
('Coca Cola Original', 'lask', '/src/assets/coca-cola-original.png', '{"default": 25}'),
('Coca Cola Zero Sugar', 'lask', '/src/assets/coca-cola-zero-new.png', '{"default": 25}'),
('Pril Lemon-Lime', 'lask', '/src/assets/pril-lemon-lime.png', '{"default": 25}'),
('Pril Zero Sugar', 'lask', '/src/assets/pril-zero-sugar.png', '{"default": 25}'),
('Fanta Orange', 'lask', '/src/assets/fanta-orange-new.png', '{"default": 25}'),
('Fanta Exotic', 'lask', '/src/assets/fanta-exotic.png', '{"default": 25}'),
('Bonaqua Citron/Lime', 'lask', '/src/assets/bonaqua-citron-new.png', '{"default": 20}'),
('Bonaqua Hallon/Lime', 'lask', '/src/assets/bonaqua-hallon-new.png', '{"default": 20}'),
('MER Päron', 'lask', '/src/assets/mer-paron-new.png', '{"default": 22}');

-- Insert products for kaffe category (matching the frontend kaffe-te but using kaffe in db)
INSERT INTO public.products (name, category, image_url, prices) VALUES
('Gevalia Mellanrost', 'kaffe', '/src/assets/gevalia-mellanrost-new.png', '{"default": 45}'),
('Arvid Nordquist Mellan', 'kaffe', '/src/assets/arvid-nordquist-mellanrost-new.png', '{"default": 42}'),
('Nescafe Lyx', 'kaffe', '/src/assets/nescafe-lyx-new.png', '{"default": 38}');