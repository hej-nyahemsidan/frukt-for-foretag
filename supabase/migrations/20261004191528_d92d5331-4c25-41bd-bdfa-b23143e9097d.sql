UPDATE public.products
SET prices = jsonb_build_object('default', 450),
    updated_at = now()
WHERE name ILIKE '%nocco%';