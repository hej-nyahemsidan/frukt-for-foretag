-- Update fruit basket prices
UPDATE products 
SET prices = '{"4kg": 220, "6kg": 270, "9kg": 370, "11kg": 430}'::jsonb,
    updated_at = now()
WHERE name = 'Fruktkorg Standard';

UPDATE products 
SET prices = '{"4kg": 250, "6kg": 352, "9kg": 500, "11kg": 600}'::jsonb,
    updated_at = now()
WHERE name = 'Fruktkorg Premium';

UPDATE products 
SET prices = '{"4kg": 230, "6kg": 275, "9kg": 390, "11kg": 455}'::jsonb,
    updated_at = now()
WHERE name = 'Fruktkorg Banan Plus';

UPDATE products 
SET prices = '{"4kg": 230, "6kg": 299, "9kg": 430, "11kg": 514}'::jsonb,
    updated_at = now()
WHERE name = 'Fruktkorg Supreme';

UPDATE products 
SET prices = '{"4kg": 180, "6kg": 225, "9kg": 299, "11kg": 320}'::jsonb,
    updated_at = now()
WHERE name = 'Fruktkorg Bas';