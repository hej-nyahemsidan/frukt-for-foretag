import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Keep-alive function triggered`);

    // Query the products table to keep the database active
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      console.error(`[${timestamp}] Error querying database:`, error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          timestamp,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${timestamp}] Database query successful. Keep-alive ping completed.`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database keep-alive ping successful',
        timestamp,
        recordsFound: data?.length || 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Unexpected error in keep-alive function:`, error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

