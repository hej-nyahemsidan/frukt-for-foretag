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
  const cat = String(item.category ?? 'annat').toLowerCase();
  const prefix = CATEGORY_PREFIX[cat] ?? 'AN';
  const id = String(item.product_id ?? item.id ?? '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase();
  const size = item.size ? `-${String(item.size).replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}` : '';
  return `${prefix}-${id}${size}`;
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
    const items = Array.isArray(body.items) ? body.items : [];

    const payload = {
      source: body.source ?? 'vitaminkorgen',
      order_reference: body.order_reference ?? crypto.randomUUID(),
      order_type: body.order_type ?? 'onetime',
      customer: body.customer ?? {},
      delivery: {
        days: body.selected_days ?? [],
        date: body.delivery_date ?? null,
        address: body.customer?.address ?? null,
      },
      items: items.map((i: any) => ({
        artikelnr: makeArtikelnr(i),
        name: i.name ?? i.product_name,
        size: i.size ?? null,
        quantity: Number(i.quantity) || 1,
        unit_price: Number(i.unit_price ?? i.price ?? 0),
        total: Number(i.total ?? (Number(i.unit_price ?? i.price ?? 0) * (Number(i.quantity) || 1))),
      })),
      subtotal: body.subtotal ?? null,
      delivery_fee: body.delivery_fee ?? 0,
      total_price: body.total_price ?? null,
      notes: body.notes ?? null,
      created_at: new Date().toISOString(),
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