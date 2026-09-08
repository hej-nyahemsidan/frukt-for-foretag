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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function buildInviteEmail(companyName: string, contactPerson: string, actionLink: string, email: string): string {
  const name = contactPerson && contactPerson !== 'Kontaktperson' ? contactPerson : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#4CAF50,#66BB6A);padding:30px 20px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">🍎 Välkommen till din nya webshop!</h1>
    </div>
    <div style="padding:30px 25px;color:#333;">
      <p style="font-size:16px;">Hej${name ? ' ' + escapeHtml(name) : ''}!</p>
      <p style="font-size:15px;line-height:1.6;">
        Vi är glada att ha <strong>${escapeHtml(companyName)}</strong> som kund hos Vitaminkorgen – och nu öppnar vi vår nya webshop för er.
      </p>
      <p style="font-size:15px;line-height:1.6;">I webshopen kan ni:</p>
      <ul style="font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 20px;">
        <li>Beställa fruktkorgar, fruktlådor och tillbehör dygnet runt</li>
        <li>Se era leveranser och tidigare beställningar</li>
        <li>Ändra leveransdagar och lägga till extra varor</li>
      </ul>
      <p style="font-size:15px;line-height:1.6;">
        Ditt användarnamn är din e-postadress: <strong>${escapeHtml(email)}</strong>.
        Klicka på knappen nedan för att välja ditt eget lösenord och logga in för första gången:
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${actionLink}" style="background:#4CAF50;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">
          Välj lösenord &amp; logga in
        </a>
      </div>
      <p style="font-size:13px;color:#777;line-height:1.5;">
        Länken är personlig och giltig i 24 timmar. Har den gått ut? Klicka på "Glömt ditt lösenord?" på
        <a href="https://vitaminkorgen.se/kundportal" style="color:#4CAF50;">vitaminkorgen.se/kundportal</a> så får du en ny direkt.
        Du kan när som helst byta lösenord på samma sätt.
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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data: roleData } = await supabaseAdmin
      .from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle();
    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const body = await req.json().catch(() => ({}));
    const testEmail: string | undefined = body.testEmail;

    // Fetch customers (optionally just one for testing)
    let query = supabaseAdmin
      .from('customers')
      .select('id, email, company_name, contact_person')
      .order('created_at', { ascending: true });
    if (testEmail) {
      query = query.eq('email', testEmail.trim());
    }
    const { data: customers, error: custError } = await query;
    if (custError) throw custError;
    if (!customers || customers.length === 0) {
      return new Response(JSON.stringify({ error: 'Inga kunder hittades' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const results: { email: string; status: string; error?: string }[] = [];

    for (const customer of customers) {
      try {
        // Generate a personal recovery link (lets the customer choose a password)
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: customer.email,
          options: { redirectTo: 'https://vitaminkorgen.se/reset-password' },
        });

        if (linkError || !linkData?.properties?.action_link) {
          results.push({ email: customer.email, status: 'failed', error: linkError?.message || 'Kunde inte skapa länk' });
          continue;
        }

        const html = buildInviteEmail(
          customer.company_name || '',
          customer.contact_person || '',
          linkData.properties.action_link
        );

        const { error: sendError } = await resend.emails.send({
          from: 'Vitaminkorgen <kontakt@vitaminkorgen.se>',
          to: [customer.email],
          subject: 'Din webshop hos Vitaminkorgen är redo – aktivera ditt konto',
          html,
        });

        if (sendError) {
          results.push({ email: customer.email, status: 'failed', error: sendError.message });
        } else {
          results.push({ email: customer.email, status: 'sent' });
        }
      } catch (e) {
        results.push({ email: customer.email, status: 'failed', error: e instanceof Error ? e.message : 'Okänt fel' });
      }

      // Be kind to the email API rate limits
      await sleep(400);
    }

    const sent = results.filter(r => r.status === 'sent').length;
    const failed = results.filter(r => r.status === 'failed').length;

    return new Response(JSON.stringify({ success: true, sent, failed, total: results.length, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
