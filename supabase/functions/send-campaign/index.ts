import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const SITE_URL = "https://vitaminkorgen.se";
const FROM = "Vitaminkorgen <info@vitaminkorgen.se>";

function buildHtml(subject: string, message: string, unsubscribeUrl: string) {
  const paragraphs = message.split(/\n{2,}/).map(p =>
    `<p style="margin:0 0 16px;color:#334155;line-height:1.6;font-size:15px;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`
  ).join("");
  return `<!doctype html>
<html><head><meta charset="utf-8"/><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="background:#0c4a6e;padding:24px 32px;color:#fde68a;font-size:22px;font-weight:700;">Vitaminkorgen</td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 20px;color:#0f172a;font-size:22px;">${escapeHtml(subject)}</h1>
          ${paragraphs}
        </td></tr>
        <tr><td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
          Vitaminkorgen &middot; 010-183 98 36 &middot; <a href="${SITE_URL}" style="color:#0c4a6e;">vitaminkorgen.se</a><br/>
          <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;">Avregistrera dig fr&aring;n utskick</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authErr } = await admin.auth.getUser(token);
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: roleRow } = await admin
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").single();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { subject, message, segment = "all" } = await req.json();
    if (!subject || !message || typeof subject !== "string" || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "subject and message required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (subject.length > 200 || message.length > 10000) {
      return new Response(JSON.stringify({ error: "Too long" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Build recipient list from customers
    let query = admin.from("customers").select("email, contact_person");
    const { data: customers, error: custErr } = await query;
    if (custErr) throw custErr;

    // Fetch unsubscribed emails
    const { data: unsubs } = await admin.from("email_unsubscribes").select("email");
    const blocked = new Set((unsubs || []).map((u: any) => (u.email || "").toLowerCase()));

    let recipients = (customers || [])
      .map((c: any) => ({ email: (c.email || "").toLowerCase().trim(), name: c.contact_person || "" }))
      .filter((r: any) => r.email && /.+@.+\..+/.test(r.email) && !blocked.has(r.email));

    // Optional segment: only with orders
    if (segment === "with_orders") {
      const { data: orderRows } = await admin.from("orders").select("user_id");
      const userIds = new Set((orderRows || []).map((o: any) => o.user_id).filter(Boolean));
      const { data: custUsers } = await admin.from("customers").select("email, user_id");
      const okEmails = new Set((custUsers || []).filter((c: any) => userIds.has(c.user_id)).map((c: any) => (c.email || "").toLowerCase()));
      recipients = recipients.filter(r => okEmails.has(r.email));
    } else if (segment === "no_orders") {
      const { data: orderRows } = await admin.from("orders").select("user_id");
      const userIds = new Set((orderRows || []).map((o: any) => o.user_id).filter(Boolean));
      const { data: custUsers } = await admin.from("customers").select("email, user_id");
      const noEmails = new Set((custUsers || []).filter((c: any) => !userIds.has(c.user_id)).map((c: any) => (c.email || "").toLowerCase()));
      recipients = recipients.filter(r => noEmails.has(r.email));
    }

    // Dedupe
    const seen = new Set<string>();
    recipients = recipients.filter(r => { if (seen.has(r.email)) return false; seen.add(r.email); return true; });

    // Create campaign row
    const { data: campaign, error: campErr } = await admin.from("email_campaigns").insert({
      subject, message, segment, total_recipients: recipients.length,
      sent_by: user.id, status: "sending"
    }).select().single();
    if (campErr) throw campErr;

    let sent = 0, failed = 0;
    const BATCH = 10;
    for (let i = 0; i < recipients.length; i += BATCH) {
      const batch = recipients.slice(i, i + BATCH);
      await Promise.all(batch.map(async (r) => {
        try {
          const unsubscribeUrl = `${SITE_URL}/avregistrera?email=${encodeURIComponent(r.email)}`;
          const html = buildHtml(subject, message, unsubscribeUrl);
          const res = await resend.emails.send({
            from: FROM,
            to: [r.email],
            subject,
            html,
            headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
          });
          if ((res as any).error) { failed++; console.error("Send error", r.email, (res as any).error); }
          else sent++;
        } catch (e) {
          failed++; console.error("Exception sending to", r.email, e);
        }
      }));
      // tiny delay to be gentle on Resend
      await new Promise(res => setTimeout(res, 200));
    }

    await admin.from("email_campaigns").update({
      sent_count: sent, failed_count: failed,
      status: "completed", completed_at: new Date().toISOString()
    }).eq("id", campaign.id);

    return new Response(JSON.stringify({ success: true, sent, failed, total: recipients.length, campaignId: campaign.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("send-campaign error", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});