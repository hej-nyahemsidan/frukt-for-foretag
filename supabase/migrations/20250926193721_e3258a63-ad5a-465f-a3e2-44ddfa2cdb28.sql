-- Remove duplicate products that were created during the second migration run
-- Keep only the products created at 2025-09-26 19:24:08 (first migration)
-- Delete products created at 2025-09-26 19:25:41 (duplicate migration)

DELETE FROM products 
WHERE created_at = '2025-09-26 19:25:41.885303+00';