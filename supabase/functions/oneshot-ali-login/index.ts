import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const TARGET = "ali@vitaminkorgen.se";

serve(async () => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    const password = Array.from(bytes, (b) => chars[b % chars.length]).join("");

    let userId: string | null = null;
    for (let page = 1; page <= 20 && !userId; page++) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      const found = data.users.find((u) => (u.email ?? '').toLowerCase() === TARGET);
      if (found) userId = found.id;
      if (data.users.length < 200) break;
    }

    if (userId) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password });
      if (error) throw error;
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: TARGET, password, email_confirm: true,
      });
      if (error) throw error;
      userId = data.user?.id ?? null;
    }

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Tahoma,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#4CAF50,#66BB6A);padding:30px 20px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;">🍎 Ditt inlogg till webshopen</h1>
    </div>
    <div style="padding:30px 25px;color:#333;">
      <p style="font-size:15px;line-height:1.6;">Hej! Här är dina inloggningsuppgifter till Vitaminkorgens webshop.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;">
        <tr><td style="padding:10px;background:#f5f5f5;"><strong>Användarnamn</strong></td><td style="padding:10px;background:#f5f5f5;">${TARGET}</td></tr>
        <tr><td style="height:8px;"></td><td></td></tr>
        <tr><td style="padding:10px;background:#f5f5f5;"><strong>Lösenord</strong></td><td style="padding:10px;background:#f5f5f5;font-family:monospace;font-size:16px;">${password}</td></tr>
      </table>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://vitaminkorgen.se/kundportal" style="background:#4CAF50;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">Logga in nu</a>
      </div>
      <p style="font-size:13px;color:#777;">Byt gärna lösenord efter första inloggningen.</p>
      <p style="font-size:15px;">Vänliga hälsningar,<br><strong>Vitaminkorgen</strong></p>
    </div>
  </div>
</body></html>`;

    const { error: sendError } = await resend.emails.send({
      from: 'Vitaminkorgen <kontakt@vitaminkorgen.se>',
      to: [TARGET],
      subject: 'Ditt inlogg till Vitaminkorgens webshop',
      html,
    });
    if (sendError) throw new Error(sendError.message);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Okänt fel';
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
});
