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
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create admin client for verification
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

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify admin status
    if (user.email !== 'admin@vitaminkorgen.se') {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

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

    // Admin client already created during auth verification

    console.log('Creating user with email:', email);

    // First check if user already exists in profiles table
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .single();

    if (existingProfile) {
      console.log('User already exists in profiles:', existingProfile.email);
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
      
      // Handle auth errors - check if it's a duplicate issue
      if (authError.message?.includes('already been registered') || authError.status === 500) {
        // Double-check if user exists in profiles
        const { data: doubleCheckProfile } = await supabaseAdmin
          .from('profiles')
          .select('id, email')
          .eq('email', email)
          .single();
          
        if (doubleCheckProfile) {
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
      }
      
      throw authError;
    }

    console.log('User created successfully:', authData.user?.id);

    // Defensively ensure both customers and profiles rows exist using upserts
    const userId = authData.user?.id;
    if (userId) {
      // Upsert profiles row for admin dashboard
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          email: authData.user?.email || '',
          full_name: fullName || null
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (profileError) {
        console.error('Error upserting profile row:', profileError);
      } else {
        console.log('Profile row upserted successfully');
      }

      // Upsert customers row for business logic
      const { error: customerError } = await supabaseAdmin
        .from('customers')
        .upsert({
          user_id: userId,
          email: authData.user?.email || '',
          contact_person: fullName || 'Ny användare',
          company_name: companyName || 'Företag AB',
          phone: '',
          address: ''
        }, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (customerError) {
        console.error('Error upserting customer row:', customerError);
        // Don't fail the whole operation for customer creation issues
      } else {
        console.log('Customer row upserted successfully');
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