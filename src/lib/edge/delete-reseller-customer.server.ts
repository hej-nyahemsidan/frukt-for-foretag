// Deletes a reseller customer (and its auth user) after verifying the caller
// is a reseller user for the same reseller. Mirrors the auth pattern in
// create-reseller-customer.server.ts.
import { createClient } from "./supabase.server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

export const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      process.env['SUPABASE_URL']!,
      process.env['SUPABASE_SERVICE_ROLE_KEY']!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Verify caller
    const token = authHeader.replace('Bearer ', '');
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !caller) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify caller is a reseller user
    const { data: resellerUser, error: ruError } = await supabaseAdmin
      .from('reseller_users')
      .select('reseller_id')
      .eq('user_id', caller.id)
      .maybeSingle();

    if (ruError || !resellerUser) {
      return new Response(JSON.stringify({ error: 'Forbidden: Not a reseller' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { customerId } = await req.json();
    if (!customerId) {
      return new Response(JSON.stringify({ error: 'customerId is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify the customer belongs to the caller's reseller
    const { data: customer, error: customerError } = await supabaseAdmin
      .from('reseller_customers')
      .select('id, user_id, reseller_id')
      .eq('id', customerId)
      .maybeSingle();

    if (customerError || !customer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (customer.reseller_id !== resellerUser.reseller_id) {
      return new Response(JSON.stringify({ error: 'Forbidden: Reseller mismatch' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Remove customer-specific prices first
    await supabaseAdmin
      .from('reseller_customer_prices')
      .delete()
      .eq('reseller_customer_id', customerId);

    // Delete the customer record (fails with FK error if orders exist)
    const { error: deleteError } = await supabaseAdmin
      .from('reseller_customers')
      .delete()
      .eq('id', customerId);

    if (deleteError) {
      console.error('Delete customer error:', deleteError);
      const hasOrders = deleteError.code === '23503';
      return new Response(JSON.stringify({
        error: hasOrders
          ? 'Kunden har beställningar och kan inte tas bort. Inaktivera kunden istället.'
          : 'Kunde inte ta bort kunden.',
      }), {
        status: hasOrders ? 409 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Delete the auth user so the login stops working
    if (customer.user_id) {
      await supabaseAdmin.from('user_roles').delete().eq('user_id', customer.user_id);
      const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(customer.user_id);
      if (deleteUserError) {
        console.error('Delete auth user error:', deleteUserError);
      }
    }

    console.log('Reseller customer deleted:', customerId, 'by reseller:', resellerUser.reseller_id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};
