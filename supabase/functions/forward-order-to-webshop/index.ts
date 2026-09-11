import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// Forwards a completed order to the external admin/webshop system.
// Uses WEBSHOP_ORDER_URL + WEBSHOP_ORDER_SECRET (x-webhook-secret header).

const CATEGORY_PREFIX: Record<string, string> = {
  fruktkorg: 'FK',
  frukt: 'FK',
  blommor: 'BL',
  blomma: 'BL',
  kaffe: 'KA',
  fika: 'FI',
  annat: 'AN',
  skafferi: 'AN',
};

function makeArtikelnr(item: any): string {
  if (item.artikelnr) return String(item.artikelnr);
  if (item.article_number) return String(item.article_number);
  const cat = String(item.category ?? 'annat').toLowerCase();
  const prefix = CATEGORY_PREFIX[cat] ?? 'AN';
  const id = String(item.product_id ?? item.id ?? '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
  const size = item.size ? `-${String(item.size).replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}` : '';
  return `${prefix}-${id}${size}`;
}

function normalizeCustomer(customer: any) {
  const companyName = customer?.company_name ?? customer?.company ?? null;
  const contactName = customer?.contact_person ?? customer?.contact ?? null;

  return {
    namn: companyName ?? contactName,
    foretag: companyName,
    kontaktperson: contactName,
    epost: customer?.email ?? null,
    telefon: customer?.phone ?? null,
    adress: customer?.address ?? null,
  };
}

function normalizeRows(items: any[]) {
  return items.map((item: any) => {
    const quantity = Number(item.quantity) || 1;
    const unitPrice = Number(item.unit_price ?? item.price ?? 0);

    return {
      artikelnr: makeArtikelnr(item),
      namn: item.name ?? item.product_name ?? null,
      storlek: item.size ?? null,
      antal: quantity,
      pris: unitPrice,
      radtotal: Number(item.total ?? unitPrice * quantity),
    };
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = Deno.env.get('WEBSHOP_ORDER_URL');
  const secret = Deno.env.get('WEBSHOP_ORDER_SECRET');
  if (!url || !secret) {
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();

    // Security: never trust the request body. The order must exist in the
    // database, and every forwarded value is read from the database row.
    const orderId = String(body.order_id ?? body.order_reference ?? '').trim();
    if (!/^[0-9a-fA-F-]{36}$/.test(orderId)) {
      return new Response(JSON.stringify({ error: 'Invalid order reference' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('id, created_at, items, selected_days, next_delivery_date, package_plan, total_price, customer_id')
      .eq('id', orderId)
      .maybeSingle();

    if (!order) {
      return new Response(JSON.stringify({ error: 'Unknown order' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('company_name, contact_person, email, phone, address')
      .eq('id', order.customer_id)
      .maybeSingle();

    const items = Array.isArray(order.items) ? order.items : [];
    const orderDate = new Date(order.created_at ?? Date.now()).toISOString().slice(0, 10);
    const payload = {
      order_id: order.id,
      order_datum: orderDate,
      kund: normalizeCustomer(customer),
      rader: normalizeRows(items),
      leveransdagar: order.selected_days ?? [],
      leveransdatum: order.next_delivery_date ?? null,
      ordertyp: order.package_plan ?? 'onetime',
      delsumma: order.total_price ?? null,
      leveransavgift: 0,
      totalpris: order.total_price ?? null,
      kommentar: null,
      kalla: 'vitaminkorgen',
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('Webshop forward failed', res.status, text);
      return new Response(JSON.stringify({ error: 'Forward failed', status: res.status, body: text }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, upstream: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('forward-order-to-webshop error', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});