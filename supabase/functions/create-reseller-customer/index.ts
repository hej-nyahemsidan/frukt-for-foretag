import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
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
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
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

    const { email, password, companyName, contactPerson, phone, address, resellerId } = await req.json();

    // Verify the resellerId matches caller's reseller
    if (resellerId !== resellerUser.reseller_id) {
      return new Response(JSON.stringify({ error: 'Forbidden: Reseller mismatch' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!email || !password || !companyName) {
      return new Response(JSON.stringify({ error: 'Email, password and company name are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create auth user
    const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        contact_person: contactPerson || '',
        company_name: companyName,
      },
    });

    if (createError) {
      console.error('Create user error:', createError);
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Failed to create user' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create reseller_customer record
    const { error: customerError } = await supabaseAdmin
      .from('reseller_customers')
      .insert({
        reseller_id: resellerId,
        user_id: userId,
        company_name: companyName,
        contact_person: contactPerson || null,
        email,
        phone: phone || null,
        address: address || null,
      });

    if (customerError) {
      console.error('Create customer error:', customerError);
      // Clean up: delete the auth user
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return new Response(JSON.stringify({ error: 'Failed to create customer record' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Assign 'user' role
    await supabaseAdmin.from('user_roles').insert({ user_id: userId, role: 'user' });

    console.log('Reseller customer created:', email, 'for reseller:', resellerId);

    return new Response(JSON.stringify({ success: true, user: { id: userId, email } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
