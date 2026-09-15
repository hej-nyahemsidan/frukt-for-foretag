CREATE OR REPLACE FUNCTION public.forward_order_to_webshop()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  PERFORM net.http_post(
    url := 'https://ydvnkqqtyvalvxcjhvbs.supabase.co/functions/v1/forward-order-to-webshop',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkdm5rcXF0eXZhbHZ4Y2podmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MzY1OTEsImV4cCI6MjA3NDExMjU5MX0.sNtXvbEVyI9LPGlPYuZ1AzKx5pPCihYosxpxzSeRUqs'
    ),
    body := jsonb_build_object('order_reference', NEW.id::text)
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'forward_order_to_webshop failed for % %: %', TG_TABLE_NAME, NEW.id, SQLERRM;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_forward_reseller_order_to_webshop ON public.reseller_orders;
CREATE TRIGGER trg_forward_reseller_order_to_webshop
AFTER INSERT ON public.reseller_orders
FOR EACH ROW
EXECUTE FUNCTION public.forward_order_to_webshop();