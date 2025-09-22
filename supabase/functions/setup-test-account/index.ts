import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Creating test account...');

    // Create the test user with email/password
    const { data: authUser, error: signUpError } = await supabase.auth.admin.createUser({
      email: 'test@fruktexperten.se',
      password: 'TestKund123!',
      email_confirm: true,
      user_metadata: {
        company_name: 'Test Företag AB',
        contact_person: 'Anna Andersson',
        phone: '08-123 456 78',
        address: 'Testgatan 123, 111 11 Stockholm'
      }
    });

    if (signUpError) {
      console.error('Error creating user:', signUpError);
      return new Response(
        JSON.stringify({ error: `Failed to create user: ${signUpError.message}` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('User created:', authUser.user?.id);

    // Wait a moment for the trigger to create the customer profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the customer record that should have been created by the trigger
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', authUser.user!.id)
      .single();

    if (customerError || !customer) {
      console.error('Customer profile not found, creating manually...');
      // Create customer profile manually if trigger didn't work
      const { data: newCustomer, error: insertError } = await supabase
        .from('customers')
        .insert({
          user_id: authUser.user!.id,
          company_name: 'Test Företag AB',
          contact_person: 'Anna Andersson',
          email: 'test@fruktexperten.se',
          phone: '08-123 456 78',
          address: 'Testgatan 123, 111 11 Stockholm'
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating customer profile:', insertError);
        return new Response(
          JSON.stringify({ error: `Failed to create customer profile: ${insertError.message}` }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      console.log('Customer profile created manually:', newCustomer.id);
    }

    // Get the final customer ID
    const finalCustomer = customer || await supabase
      .from('customers')
      .select('id')
      .eq('user_id', authUser.user!.id)
      .single()
      .then(r => r.data);

    if (!finalCustomer) {
      throw new Error('Could not retrieve customer ID');
    }

    // Create sample orders for the test account
    const sampleOrders = [
      {
        customer_id: finalCustomer.id,
        package_plan: 'weekly',
        selected_days: ['måndag', 'onsdag'],
        items: { frukter: ['äpplen', 'bananer', 'apelsiner'], antal: 25 },
        status: 'active',
        total_price: 450.00,
        next_delivery_date: '2024-01-29'
      },
      {
        customer_id: finalCustomer.id,
        package_plan: 'monthly',
        selected_days: ['tisdag'],
        items: { frukter: ['kiwi', 'druvor', 'päron'], antal: 50 },
        status: 'paused',
        total_price: 890.00,
        next_delivery_date: '2024-02-15'
      },
      {
        customer_id: finalCustomer.id,
        package_plan: 'yearly',
        selected_days: ['fredag'],
        items: { frukter: ['mango', 'ananas', 'kokosnöt'], antal: 15 },
        status: 'cancelled',
        total_price: 2500.00,
        next_delivery_date: null
      }
    ];

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .insert(sampleOrders)
      .select();

    if (ordersError) {
      console.error('Error creating sample orders:', ordersError);
      return new Response(
        JSON.stringify({ 
          warning: `User created successfully but failed to create sample orders: ${ordersError.message}`,
          user: authUser.user
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Sample orders created:', orders?.length);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Test account created successfully with sample data',
        user: {
          id: authUser.user!.id,
          email: authUser.user!.email,
          customer_id: finalCustomer.id
        },
        orders: orders?.length || 0
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});