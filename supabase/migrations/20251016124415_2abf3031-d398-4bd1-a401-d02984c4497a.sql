-- Update product name from Fruktkorg Standard to Fruktkorg Original
UPDATE public.products 
SET name = 'Fruktkorg Original'
WHERE name = 'Fruktkorg Standard' AND category = 'fruktkorgar';