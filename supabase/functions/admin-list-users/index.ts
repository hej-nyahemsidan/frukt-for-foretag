import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data: roleData } = await supabaseAdmin
      .from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').single();
    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Paginate through all auth users
    const allUsers: any[] = [];
    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      allUsers.push(...data.users);
      if (data.users.length < perPage) break;
      page++;
    }

    // Fetch order counts per user
    const { data: ordersData } = await supabaseAdmin
      .from('orders').select('user_id');
    const orderCounts = new Map<string, number>();
    (ordersData || []).forEach((o: any) => {
      if (o.user_id) orderCounts.set(o.user_id, (orderCounts.get(o.user_id) || 0) + 1);
    });

    // Fetch latest invite token per email (7-day activation links)
    const { data: tokenRows } = await supabaseAdmin
      .from('customer_invite_tokens')
      .select('email, expires_at, used_at, created_at')
      .order('created_at', { ascending: false });
    const tokenMap = new Map<string, any>();
    (tokenRows || []).forEach((t: any) => {
      const key = (t.email || '').toLowerCase();
      if (!tokenMap.has(key)) tokenMap.set(key, t);
    });

    // Company names
    const { data: customerRows } = await supabaseAdmin
      .from('customers')
      .select('user_id, company_name');
    const companyMap = new Map<string, string>();
    (customerRows || []).forEach((c: any) => companyMap.set(c.user_id, c.company_name));

    const users = allUsers.map(u => {
      const t = tokenMap.get((u.email || '').toLowerCase());
      return {
        id: u.id,
        email: u.email,
        company_name: companyMap.get(u.id) || null,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        email_confirmed_at: u.email_confirmed_at,
        order_count: orderCounts.get(u.id) || 0,
        invite_created_at: t?.created_at ?? null,
        invite_expires_at: t?.expires_at ?? null,
        invite_used_at: t?.used_at ?? null,
      };
    });

    return new Response(JSON.stringify({ users }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});