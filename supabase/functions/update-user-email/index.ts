import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Create a Supabase client with the auth token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get the user from the auth token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Check if user is admin
    if (user.email !== 'admin@vitaminkorgen.se') {
      throw new Error('Unauthorized: Admin access required');
    }

    // Parse request body
    const { userId, newEmail } = await req.json();

    if (!userId || !newEmail) {
      throw new Error('userId and newEmail are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      throw new Error('Invalid email format');
    }

    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if email already exists in profiles
    const { data: existingProfile, error: checkError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', newEmail)
      .neq('id', userId)
      .single();

    if (existingProfile) {
      throw new Error('Email already exists');
    }

    // Update email in auth.users
    const { data: updatedUser, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { email: newEmail }
    );

    if (authError) {
      console.error('Auth update error:', authError);
      throw new Error(`Failed to update auth email: ${authError.message}`);
    }

    // Update email in profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ email: newEmail })
      .eq('id', userId);

    if (profileError) {
      console.error('Profile update error:', profileError);
      throw new Error(`Failed to update profile email: ${profileError.message}`);
    }

    // Update email in customers table
    const { error: customerError } = await supabaseAdmin
      .from('customers')
      .update({ email: newEmail })
      .eq('user_id', userId);

    if (customerError) {
      console.error('Customer update error:', customerError);
      // Don't fail if customer update fails, as not all users have customer records
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email updated successfully across all tables',
        user: updatedUser.user,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in update-user-email function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
