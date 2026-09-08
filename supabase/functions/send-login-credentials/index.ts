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

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

function buildEmail(email: string, password: string, loginUrl: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#4CAF50,#66BB6A);padding:30px 20px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">🍎 Ditt inlogg till webshopen</h1>
    </div>
    <div style="padding:30px 25px;color:#333;">
      <p style="font-size:15px;line-height:1.6;">Hej! Här är dina inloggningsuppgifter till Vitaminkorgens webshop.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;">
        <tr><td style="padding:10px;background:#f5f5f5;border-radius:4px 0 0 4px;"><strong>Användarnamn</strong></td>
            <td style="padding:10px;background:#f5f5f5;">${escapeHtml(email)}</td></tr>
        <tr><td style="height:8px;"></td><td></td></tr>
        <tr><td style="padding:10px;background:#f5f5f5;"><strong>Lösenord</strong></td>
            <td style="padding:10px;background:#f5f5f5;font-family:monospace;font-size:16px;">${escapeHtml(password)}</td></tr>
      </table>
      <div style="text-align:center;margin:30px 0;">
        <a href="${loginUrl}" style="background:#4CAF50;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">Logga in nu</a>
      </div>
      <p style="font-size:13px;color:#777;line-height:1.5;">Av säkerhetsskäl: byt lösenord efter första inloggningen.</p>
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
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    if (token !== serviceKey) {
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
    }

    const body = await req.json().catch(() => ({}));
    const email: string = (body.email ?? '').toString().trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Giltig e-postadress krävs' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const loginUrl = (body.loginUrl ?? 'https://vitaminkorgen.se/kundportal').toString();
    const password: string = (body.password ?? generatePassword()).toString();

    // Find existing auth user by email
    let userId: string | null = null;
    for (let page = 1; page <= 20 && !userId; page++) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      const found = data.users.find((u) => (u.email ?? '').toLowerCase() === email);
      if (found) userId = found.id;
      if (data.users.length < 200) break;
    }

    if (userId) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password });
      if (error) throw error;
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email, password, email_confirm: true,
      });
      if (error) throw error;
      userId = data.user?.id ?? null;
    }

    const { error: sendError } = await resend.emails.send({
      from: 'Vitaminkorgen <kontakt@vitaminkorgen.se>',
      to: [email],
      subject: 'Ditt inlogg till Vitaminkorgens webshop',
      html: buildEmail(email, password, loginUrl),
    });
    if (sendError) throw new Error(sendError.message);

    return new Response(JSON.stringify({ success: true, email, created: !body.password }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Okänt fel';
    console.error('send-login-credentials error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
