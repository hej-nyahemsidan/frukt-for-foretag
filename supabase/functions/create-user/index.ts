import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, fullName, companyName } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('Creating user with email:', email);

    // Create the auth user using admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Skip email confirmation for admin-created users
      user_metadata: {
        contact_person: fullName || 'Ny användare',
        company_name: companyName || 'Företag AB'
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      
      // Handle duplicate user error with helpful message
      if (authError.message?.includes('already been registered')) {
        return new Response(
          JSON.stringify({ 
            error: 'En användare med denna e-postadress finns redan. Använd redigeringsfunktionen istället.',
            code: 'user_exists'
          }),
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw authError;
    }

    console.log('User created successfully:', authData.user?.id);

    // Defensively ensure both customers and profiles rows exist (bypasses RLS with service role)
    const userId = authData.user?.id;
    if (userId) {
      // Create profiles row for admin dashboard
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userId,
          email: authData.user?.email || '',
          full_name: fullName || null
        });

      if (profileError && !profileError.message?.includes('duplicate')) {
        console.error('Error creating profile row:', profileError);
      } else {
        console.log('Profile row created successfully');
      }

      // Create customers row for business logic
      const { data: existingCustomer } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!existingCustomer) {
        console.log('Creating customers row for user:', userId);
        const { error: customerError } = await supabaseAdmin
          .from('customers')
          .insert({
            user_id: userId,
            email: authData.user?.email || '',
            contact_person: fullName || 'Ny användare',
            company_name: companyName || 'Företag AB',
            phone: '',
            address: ''
          });

        if (customerError) {
          console.error('Error creating customer row:', customerError);
          // Don't fail the whole operation, trigger will handle it
        } else {
          console.log('Customer row created successfully');
        }
      } else {
        console.log('Customer row already exists');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: { 
          id: authData.user?.id, 
          email: authData.user?.email 
        } 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in create-user function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});