// Ported from supabase/functions/create-reseller-user/index.ts (Deno edge function).
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Env is read per call (Workers inject env per request).
const getResend = () => new Resend(process.env["RESEND_API_KEY"]);

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function buildInviteEmail(companyName: string, contactPerson: string, actionLink: string, email: string): string {
  const name = contactPerson && contactPerson !== 'Kontaktperson' ? contactPerson : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#4CAF50,#66BB6A);padding:30px 20px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">🍎 Din inloggning till återförsäljarportalen</h1>
    </div>
    <div style="padding:30px 25px;color:#333;">
      <p style="font-size:16px;">Hej${name ? ' ' + escapeHtml(name) : ''}!</p>
      <p style="font-size:15px;line-height:1.6;">
        Här kommer inloggningen till din återförsäljarportal för <strong>${escapeHtml(companyName)}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.6;">I portalen kan du:</p>
      <ul style="font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 20px;">
        <li>Lägga beställningar åt dina slutkunder till dina egna priser</li>
        <li>Skapa och administrera dina kunders inloggningar</li>
        <li>Följa era beställningar och leveranser</li>
      </ul>
      <p style="font-size:15px;line-height:1.6;">
        Ditt användarnamn är din e-postadress: <strong>${escapeHtml(email)}</strong>.
        Klicka på knappen nedan för att aktivera ditt konto och välja lösenord:
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${actionLink}" style="background:#4CAF50;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">
          Aktivera ditt konto
        </a>
      </div>
      <p style="font-size:13px;color:#777;line-height:1.5;">
        Inbjudan är personlig och giltig i 7 dagar. Har den gått ut? Klicka på "Glömt ditt lösenord?" på
        <a href="https://vitaminkorgen.se/af/login" style="color:#4CAF50;">vitaminkorgen.se/af/login</a> så får du en ny direkt.
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

export const handler = async (req: Request): Promise<Response> => {
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
      process.env['SUPABASE_URL'] ?? '',
      process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '',
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

    const { email, resellerId, contactName, sendEmail } = await req.json().catch(() => ({}));
    const shouldSendEmail = sendEmail !== false;
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!cleanEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
      return new Response(JSON.stringify({ error: 'Giltig e-post krävs' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    if (!resellerId) {
      return new Response(JSON.stringify({ error: 'resellerId krävs' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify the reseller exists
    const { data: reseller, error: resellerError } = await supabaseAdmin
      .from('resellers')
      .select('id, name')
      .eq('id', resellerId)
      .maybeSingle();
    if (resellerError || !reseller) {
      return new Response(JSON.stringify({ error: 'Återförsäljaren hittades inte' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get or create the auth user
    let userId: string | undefined;
    let newlyCreated = false;

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: cleanEmail,
    });
    if (!linkError && linkData?.user?.id) {
      userId = linkData.user.id;
    } else {
      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        email_confirm: true,
        password: crypto.randomUUID(),
        user_metadata: {
          full_name: contactName || '',
          company_name: reseller.name,
        },
      });
      if (createError || !created?.user?.id) {
        return new Response(JSON.stringify({ error: createError?.message || 'Kunde inte skapa kontot' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      userId = created.user.id;
      newlyCreated = true;
    }

    // Link the user to the reseller (idempotent)
    const { error: linkUserError } = await supabaseAdmin
      .from('reseller_users')
      .upsert(
        { reseller_id: resellerId, user_id: userId, role: 'admin' },
        { onConflict: 'reseller_id,user_id' }
      );
    if (linkUserError) {
      return new Response(JSON.stringify({ error: 'Kunde inte koppla kontot till återförsäljaren: ' + linkUserError.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 7-day activation token, exchanged for a fresh recovery link on click
    const inviteToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const { error: tokenError } = await supabaseAdmin
      .from('customer_invite_tokens')
      .insert({ email: cleanEmail, token: inviteToken, expires_at: expiresAt });
    if (tokenError) {
      return new Response(JSON.stringify({ error: 'Kunde inte skapa aktiveringslänk: ' + tokenError.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const activationUrl = `https://vitaminkorgen.se/reset-password?invite_token=${encodeURIComponent(inviteToken)}`;

    if (!shouldSendEmail) {
      return new Response(JSON.stringify({
        success: true,
        email: cleanEmail,
        user_id: userId,
        account_created: newlyCreated,
        email_sent: false,
        activation_url: activationUrl,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { error: sendError } = await getResend().emails.send({
      from: 'Vitaminkorgen <kontakt@vitaminkorgen.se>',
      to: [cleanEmail],
      subject: 'Din inloggning till återförsäljarportalen',
      html: buildInviteEmail(reseller.name, contactName || '', activationUrl, cleanEmail),
    });

    if (sendError) {
      return new Response(JSON.stringify({ success: false, error: 'Kontot skapades men mejlet kunde inte skickas: ' + sendError.message }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      email: cleanEmail,
      user_id: userId,
      account_created: newlyCreated,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
