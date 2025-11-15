-- Update Fruktkorg Original to Fruktkorg Standard
UPDATE products 
SET name = 'Fruktkorg Standard',
    updated_at = now()
WHERE name = 'Fruktkorg Original';