-- Update all product image URLs from /src/assets/ to /assets/
UPDATE products 
SET image_url = REPLACE(image_url, '/src/assets/', '/assets/')
WHERE image_url LIKE '/src/assets/%';