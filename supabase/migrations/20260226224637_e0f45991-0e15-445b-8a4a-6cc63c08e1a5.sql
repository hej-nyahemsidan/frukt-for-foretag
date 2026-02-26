
-- =============================================
-- RESELLER SYSTEM - New tables only
-- Does NOT modify any existing tables
-- =============================================

-- 1. Resellers (ÅF)
CREATE TABLE public.resellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  domain text UNIQUE,
  contact_email text,
  contact_phone text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.resellers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage resellers"
  ON public.resellers FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- 2. Reseller users (ÅF staff linked to auth users)
CREATE TABLE public.reseller_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reseller_id, user_id)
);

ALTER TABLE public.reseller_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage reseller users"
  ON public.reseller_users FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Reseller users can view own"
  ON public.reseller_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Now add the reseller self-view policy (reseller_users exists now)
CREATE POLICY "Reseller users can view own reseller"
  ON public.resellers FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  );

-- 3. Reseller prices (inköpspris - what ÅF pays you)
CREATE TABLE public.reseller_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  price numeric NOT NULL,
  size text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reseller_id, product_id, size)
);

ALTER TABLE public.reseller_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage reseller prices"
  ON public.reseller_prices FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Reseller users can view own prices"
  ON public.reseller_prices FOR SELECT
  TO authenticated
  USING (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  );

-- 4. Reseller product prices (ÅF's standard prices to their customers)
CREATE TABLE public.reseller_product_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  price numeric NOT NULL,
  size text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reseller_id, product_id, size)
);

ALTER TABLE public.reseller_product_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view reseller product prices"
  ON public.reseller_product_prices FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Reseller users can manage own product prices"
  ON public.reseller_product_prices FOR ALL
  TO authenticated
  USING (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  );

-- 5. Reseller customers (end customers created by ÅF)
CREATE TABLE public.reseller_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  company_name text NOT NULL,
  contact_person text,
  email text NOT NULL,
  phone text,
  address text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reseller_id, user_id)
);

ALTER TABLE public.reseller_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view reseller customers"
  ON public.reseller_customers FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Reseller users can manage own customers"
  ON public.reseller_customers FOR ALL
  TO authenticated
  USING (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can view own profile"
  ON public.reseller_customers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 6. Reseller customer prices (custom prices per customer)
CREATE TABLE public.reseller_customer_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_customer_id uuid NOT NULL REFERENCES public.reseller_customers(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  price numeric NOT NULL,
  size text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(reseller_customer_id, product_id, size)
);

ALTER TABLE public.reseller_customer_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reseller users can manage customer prices"
  ON public.reseller_customer_prices FOR ALL
  TO authenticated
  USING (
    reseller_customer_id IN (
      SELECT rc.id FROM public.reseller_customers rc
      JOIN public.reseller_users ru ON ru.reseller_id = rc.reseller_id
      WHERE ru.user_id = auth.uid()
    )
  )
  WITH CHECK (
    reseller_customer_id IN (
      SELECT rc.id FROM public.reseller_customers rc
      JOIN public.reseller_users ru ON ru.reseller_id = rc.reseller_id
      WHERE ru.user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can view own prices"
  ON public.reseller_customer_prices FOR SELECT
  TO authenticated
  USING (
    reseller_customer_id IN (
      SELECT id FROM public.reseller_customers WHERE user_id = auth.uid()
    )
  );

-- 7. Reseller orders
CREATE TABLE public.reseller_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
  reseller_customer_id uuid NOT NULL REFERENCES public.reseller_customers(id) ON DELETE CASCADE,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_price numeric DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  selected_days text[] DEFAULT '{}'::text[],
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reseller_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all reseller orders"
  ON public.reseller_orders FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Reseller users can view own orders"
  ON public.reseller_orders FOR SELECT
  TO authenticated
  USING (
    reseller_id IN (
      SELECT reseller_id FROM public.reseller_users WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can manage own orders"
  ON public.reseller_orders FOR ALL
  TO authenticated
  USING (
    reseller_customer_id IN (
      SELECT id FROM public.reseller_customers WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    reseller_customer_id IN (
      SELECT id FROM public.reseller_customers WHERE user_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_resellers_updated_at
  BEFORE UPDATE ON public.resellers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reseller_prices_updated_at
  BEFORE UPDATE ON public.reseller_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reseller_product_prices_updated_at
  BEFORE UPDATE ON public.reseller_product_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reseller_customers_updated_at
  BEFORE UPDATE ON public.reseller_customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reseller_customer_prices_updated_at
  BEFORE UPDATE ON public.reseller_customer_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reseller_orders_updated_at
  BEFORE UPDATE ON public.reseller_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
