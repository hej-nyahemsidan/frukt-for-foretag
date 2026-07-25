
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.forward_order_to_webshop()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  cust RECORD;
  payload jsonb;
BEGIN
  SELECT company_name, contact_person, email, phone, address
    INTO cust
  FROM public.customers
  WHERE id = NEW.customer_id;

  payload := jsonb_build_object(
    'source', 'vitaminkorgen',
    'order_reference', NEW.id::text,
    'order_type', NEW.package_plan,
    'customer', jsonb_build_object(
      'company_name', cust.company_name,
      'contact_person', cust.contact_person,
      'email', cust.email,
      'phone', cust.phone,
      'address', cust.address
    ),
    'selected_days', to_jsonb(NEW.selected_days),
    'delivery_date', NEW.next_delivery_date,
    'items', COALESCE(NEW.items, '[]'::jsonb),
    'total_price', NEW.total_price,
    'notes', NULL,
    'created_at', NEW.created_at
  );

  PERFORM net.http_post(
    url := 'https://ydvnkqqtyvalvxcjhvbs.supabase.co/functions/v1/forward-order-to-webshop',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkdm5rcXF0eXZhbHZ4Y2podmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MzY1OTEsImV4cCI6MjA3NDExMjU5MX0.sNtXvbEVyI9LPGlPYuZ1AzKx5pPCihYosxpxzSeRUqs'
    ),
    body := payload
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'forward_order_to_webshop failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_forward_order_to_webshop ON public.orders;
CREATE TRIGGER trg_forward_order_to_webshop
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.forward_order_to_webshop();
