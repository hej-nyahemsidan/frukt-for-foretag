REVOKE ALL ON FUNCTION public.forward_order_to_webshop() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.forward_order_to_webshop() FROM anon;
REVOKE ALL ON FUNCTION public.forward_order_to_webshop() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.forward_order_to_webshop() TO service_role;