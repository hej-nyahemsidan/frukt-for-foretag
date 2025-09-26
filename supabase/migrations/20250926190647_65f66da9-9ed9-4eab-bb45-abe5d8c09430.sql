-- Create products table
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'fruktkorgar',
  image_url text NOT NULL,
  prices jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view products (public access)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Only admins can insert, update and delete products
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial product data
INSERT INTO public.products (name, category, image_url, prices) VALUES
('Fruktkorg Premium', 'fruktkorgar', '/src/assets/fruktkorg-premium-new.jpg', '{"4kg": 263, "6kg": 395, "9kg": 592, "11kg": 724}'),
('Fruktkorg Supreme', 'fruktkorgar', '/src/assets/fruktkorg-standard-new.jpg', '{"4kg": 230, "6kg": 345, "9kg": 518, "11kg": 633}'),
('Fruktkorg Original', 'fruktkorgar', '/src/assets/fruktkorg-eko-new.jpg', '{"4kg": 289, "6kg": 434, "9kg": 651, "11kg": 796}'),
('Fruktkorg Banan Plus', 'fruktkorgar', '/src/assets/fruktkorg-banan-new.jpg', '{"4kg": 249, "6kg": 374, "9kg": 560, "11kg": 686}'),
('Fruktkorg Bas', 'fruktkorgar', '/src/assets/fruktlada-new.jpg', '{"4kg": 199, "6kg": 299, "9kg": 449, "11kg": 549}');