-- Add display_order column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Set display order for fruit baskets
UPDATE products SET display_order = 1 WHERE name = 'Fruktkorg Standard';
UPDATE products SET display_order = 2 WHERE name = 'Fruktkorg Premium';
UPDATE products SET display_order = 3 WHERE name = 'Fruktkorg Banan Plus';
UPDATE products SET display_order = 4 WHERE name = 'Fruktkorg Supreme';
UPDATE products SET display_order = 5 WHERE name = 'Fruktkorg Bas';