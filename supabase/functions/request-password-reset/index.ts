import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function buildResetEmail(actionLink: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#4CAF50,#66BB6A);padding:30px 20px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">🍎 Välj nytt lösenord</h1>
    </div>
    <div style="padding:30px 25px;color:#333;">
      <p style="font-size:16px;">Hej!</p>
      <p style="font-size:15px;line-height:1.6;">
        Vi har fått en förfrågan om att återställa lösenordet till din webshop hos Vitaminkorgen.
        Klicka på knappen nedan för att välja ett nytt lösenord:
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${actionLink}" style="background:#4CAF50;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">
          Välj nytt lösenord
        </a>
      </div>
      <p style="font-size:13px;color:#777;line-height:1.5;">
        Länken är personlig och giltig i 24 timmar. Om du inte har bett om den här återställningen
        kan du ignorera mejlet – ditt nuvarande lösenord fungerar fortfarande.
      </p>
      <p style="font-size:15px;margin-top:25px;">
        Har du frågor? Svara på detta mejl eller ring oss på
        <a href="tel:+46101839836" style="color:#4CAF50;">010-183 98 36</a>.
      </p>
      <p style="font-size:15px;">Vänliga hälsningar,<br><strong>Vitaminkorgen</strong></p>
    </div>
    <div style="background:#f5f5f5;padding:15px;text-align:center;color:#999;font-size:12px;">
      Vitaminkorgen · Frukt till företag i Stockholm · vitaminkorgen.se
    </div>
  </div>
</body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Always return the same response so nobody can probe which emails are registered.
  const okResponse = () => new Response(
    JSON.stringify({ success: true, message: 'Om e-postadressen är registrerad har vi skickat en återställningslänk.' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
  );

  try {
    const { email: rawEmail } = await req.json();
    const email = (rawEmail ?? '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return okResponse();
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Rate limit: max 5 reset emails per address per hour
    try {
      const { data: count } = await supabaseAdmin.rpc('increment_rate_limit', {
        _key: `pwd-reset:${email}`,
        _window_seconds: 3600,
      });
      if (typeof count === 'number' && count > 5) {
        return okResponse();
      }
    } catch (_) { /* rate limiting unavailable — continue */ }

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
    });

    if (linkError || !linkData?.properties?.hashed_token) {
      // No such user etc. — respond identically
      return okResponse();
    }

    const resetUrl = `https://vitaminkorgen.se/reset-password?token_hash=${encodeURIComponent(linkData.properties.hashed_token)}&type=recovery`;

    const { error: emailError } = await resend.emails.send({
      from: 'Vitaminkorgen <kontakt@vitaminkorgen.se>',
      to: [email],
      subject: 'Välj nytt lösenord till din webshop',
      html: buildResetEmail(resetUrl),
    });

    if (emailError) {
      console.error('Resend error:', emailError);
    }

    return okResponse();
  } catch (error) {
    console.error('request-password-reset error:', error);
    return okResponse();
  }
});
