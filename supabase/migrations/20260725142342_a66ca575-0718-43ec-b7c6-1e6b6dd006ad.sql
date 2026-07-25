ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check CHECK (status IN ('pending', 'active', 'paused', 'cancelled', 'confirmed', 'delivered'));

ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';