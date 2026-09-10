DROP POLICY "Visitors can record anonymous conversion events" ON public.conversion_events;

ALTER TABLE public.conversion_events
  ADD CONSTRAINT conversion_events_event_name_check CHECK (
    event_name = ANY (ARRAY[
      'basket_selector_viewed',
      'basket_selected',
      'employee_count_selected',
      'price_viewed',
      'quote_started',
      'quote_submitted'
    ])
  ),
  ADD CONSTRAINT conversion_events_basket_type_check CHECK (
    basket_type IS NULL OR basket_type = ANY (ARRAY['Original', 'Banan', 'Premium'])
  ),
  ADD CONSTRAINT conversion_events_employee_count_check CHECK (
    employee_count IS NULL OR employee_count BETWEEN 1 AND 10000
  ),
  ADD CONSTRAINT conversion_events_price_check CHECK (
    price IS NULL OR price BETWEEN 0 AND 10000000
  ),
  ADD CONSTRAINT conversion_events_page_path_check CHECK (
    char_length(page_path) BETWEEN 1 AND 500
  ),
  ADD CONSTRAINT conversion_events_metadata_size_check CHECK (
    octet_length(metadata::text) <= 4096
  );

CREATE POLICY "Visitors can record anonymous conversion events"
ON public.conversion_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event_name = ANY (ARRAY[
    'basket_selector_viewed',
    'basket_selected',
    'employee_count_selected',
    'price_viewed',
    'quote_started',
    'quote_submitted'
  ])
  AND (basket_type IS NULL OR basket_type = ANY (ARRAY['Original', 'Banan', 'Premium']))
);