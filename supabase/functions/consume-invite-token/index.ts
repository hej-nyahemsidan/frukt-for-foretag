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
    const body = await req.json().catch(() => ({}));
    const inviteToken = (body.invite_token || '').trim();

    if (!inviteToken) {
      return new Response(JSON.stringify({ error: 'invite_token saknas' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Brute-force protection: max 20 attempts per IP per hour.
    const clientIp = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    try {
      const { data: attempts } = await supabaseAdmin.rpc('increment_rate_limit', {
        _key: `invite-token:${clientIp}`,
        _window_seconds: 3600,
      });
      if (typeof attempts === 'number' && attempts > 20) {
        return new Response(JSON.stringify({ error: 'För många försök. Försök igen senare.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    } catch (_) { /* rate limiting unavailable — continue */ }

    const { data: tokenRow, error: findError } = await supabaseAdmin
      .from('customer_invite_tokens')
      .select('id, email, used_at, expires_at')
      .eq('token', inviteToken)
      .maybeSingle();

    if (findError || !tokenRow) {
      return new Response(JSON.stringify({ error: 'Ogiltig inbjudningskod' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (new Date(tokenRow.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'Inbjudningskoden har gått ut' }), {
        status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Ensure auth user exists, then generate a fresh recovery link
    let { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: tokenRow.email,
    });

    if (linkError || !linkData?.properties?.hashed_token) {
      const { error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: tokenRow.email,
        email_confirm: true,
        password: crypto.randomUUID(),
      });
      if (!createError) {
        ({ data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: tokenRow.email,
        }));
      }
    }

    if (linkError || !linkData?.properties?.hashed_token) {
      return new Response(JSON.stringify({ error: linkError?.message || 'Kunde inte skapa återställningslänk' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Audit usage without blocking reuse within the 7-day window
    await supabaseAdmin
      .from('customer_invite_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', tokenRow.id);

    return new Response(JSON.stringify({
      success: true,
      token_hash: linkData.properties.hashed_token,
      type: 'recovery',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
