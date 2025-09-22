import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create the test user
    const { data: authUser, error: authError } = await supabaseClient.auth.admin.createUser({
      email: 'test@fruktexperten.se',
      password: 'TestKund123!',
      email_confirm: true,
      user_metadata: {
        company_name: 'Test Företag AB',
        contact_person: 'Anna Andersson',
        phone: '08-123 456 78',
        address: 'Testgatan 123, 111 11 Stockholm'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: authError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!authUser.user) {
      return new Response(
        JSON.stringify({ error: 'Failed to create user' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create customer profile
    const { data: customer, error: customerError } = await supabaseClient
      .from('customers')
      .insert({
        user_id: authUser.user.id,
        company_name: 'Test Företag AB',
        contact_person: 'Anna Andersson',
        email: 'test@fruktexperten.se',
        phone: '08-123 456 78',
        address: 'Testgatan 123, 111 11 Stockholm'
      })
      .select()
      .single()

    if (customerError) {
      console.error('Customer error:', customerError)
      return new Response(
        JSON.stringify({ error: customerError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create sample orders for the test customer
    const { error: ordersError } = await supabaseClient
      .from('orders')
      .insert([
        {
          customer_id: customer.id,
          package_plan: 'weekly',
          selected_days: ['måndag', 'onsdag'],
          items: { frukter: ['äpplen', 'bananer', 'apelsiner'], antal: 25 },
          status: 'active',
          total_price: 450.00,
          next_delivery_date: '2024-01-15'
        },
        {
          customer_id: customer.id,
          package_plan: 'monthly',
          selected_days: ['tisdag'],
          items: { frukter: ['kiwi', 'druvor', 'päron'], antal: 50 },
          status: 'paused',
          total_price: 890.00,
          next_delivery_date: '2024-02-01'
        },
        {
          customer_id: customer.id,
          package_plan: 'yearly',
          selected_days: ['fredag'],
          items: { frukter: ['mango', 'ananas', 'kokosnöt'], antal: 15 },
          status: 'cancelled',
          total_price: 2500.00,
          next_delivery_date: null
        }
      ])

    if (ordersError) {
      console.error('Orders error:', ordersError)
      return new Response(
        JSON.stringify({ error: ordersError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        message: 'Test user created successfully',
        user_id: authUser.user.id,
        customer_id: customer.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})