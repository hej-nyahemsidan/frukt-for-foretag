import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// --- Security helpers ---

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitize = (val: unknown, maxLen = 500): string => {
  if (val === null || val === undefined) return "";
  const str = String(val).slice(0, maxLen);
  return escapeHtml(str);
};

const safeNumber = (val: unknown): number => {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
};

// Simple in-memory rate limiter (per isolate — light protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// --- Types ---

interface ContactEmailRequest {
  formType: string;
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  location?: string;
  companyName?: string;
  contactPerson?: string;
  customerInfo?: {
    company?: string;
    contact?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  orderType?: string;
  selectedDays?: string[];
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    assignedDay?: string;
  }>;
  cartItems?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    image?: string;
    day?: string;
  }>;
  totalPrice?: number;
}

// --- Email styles ---

const emailStyles = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #4CAF50, #66BB6A); padding: 30px 20px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .section { margin-bottom: 25px; }
    .section-title { color: #4CAF50; font-size: 18px; font-weight: bold; border-bottom: 2px solid #4CAF50; padding-bottom: 8px; margin-bottom: 15px; }
    .info-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-weight: bold; color: #333; display: inline-block; min-width: 140px; }
    .info-value { color: #666; }
    .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 15px 0; white-space: pre-wrap; color: #555; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { background-color: #4CAF50; color: white; padding: 12px; text-align: left; font-weight: bold; }
    td { padding: 10px; border: 1px solid #ddd; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .total-row { background-color: #4CAF50 !important; color: white; font-weight: bold; font-size: 16px; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px; }
  </style>
`;

// --- Template builders ---

function buildOrderEmail(data: ContactEmailRequest): { subject: string; html: string } {
  const itemsHtml = data.items?.map(item => `
    <tr>
      <td>${sanitize(item.name)}${item.assignedDay ? ` <span style="color: #4CAF50;">(${sanitize(item.assignedDay)})</span>` : ''}</td>
      <td style="text-align: center;">${safeNumber(item.quantity)}</td>
      <td style="text-align: right;">${safeNumber(item.price)} kr</td>
      <td style="text-align: right;"><strong>${(safeNumber(item.price) * safeNumber(item.quantity)).toFixed(2)} kr</strong></td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align: center; color: #999;">Inga produkter</td></tr>';

  return {
    subject: "Ny Orderbekräftelse - Vitaminkorgen",
    html: `<!DOCTYPE html><html><head>${emailStyles}</head><body>
      <div class="container">
        <div class="header"><h1>🛒 Ny Orderbekräftelse</h1></div>
        <div class="content">
          <div class="section">
            <div class="section-title">👤 Kundinformation</div>
            <div class="info-row"><span class="info-label">Företag:</span><span class="info-value">${sanitize(data.customerInfo?.company, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Kontaktperson:</span><span class="info-value">${sanitize(data.customerInfo?.contact, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">E-post:</span><span class="info-value">${sanitize(data.customerInfo?.email, 200) || 'Ej angivet'}</span></div>
          </div>
          <div class="section">
            <div class="section-title">📦 Beställningsdetaljer</div>
            <div class="info-row"><span class="info-label">Leveranstyp:</span><span class="info-value">${sanitize(data.orderType, 100) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Leveransdagar:</span><span class="info-value">${data.selectedDays?.map(d => sanitize(d, 20)).join(', ') || 'Inga dagar valda'}</span></div>
          </div>
          ${data.message ? `<div class="section"><div class="section-title">💬 Meddelande från kund</div><div class="message-box">${sanitize(data.message, 2000).replace(/\n/g, '<br>')}</div></div>` : ''}
          <div class="section">
            <div class="section-title">🛍️ Beställda Produkter</div>
            <table><thead><tr><th>Produkt</th><th style="text-align: center;">Antal</th><th style="text-align: right;">Pris/st</th><th style="text-align: right;">Totalt</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr class="total-row"><td colspan="3" style="text-align: right; padding: 15px;">TOTALPRIS:</td><td style="text-align: right; padding: 15px; font-size: 18px;">${safeNumber(data.totalPrice)} kr</td></tr></tfoot></table>
          </div>
        </div>
        <div class="footer">Skickat från vitaminkorgen.se<br>© ${new Date().getFullYear()} Vitaminkorgen</div>
      </div></body></html>`
  };
}

function buildQuoteEmail(data: ContactEmailRequest): { subject: string; html: string } {
  let cartHtml = '';
  if (data.cartItems && data.cartItems.length > 0) {
    const itemsByDay: Record<string, typeof data.cartItems> = {};
    for (const item of data.cartItems) {
      const day = item.day || 'Ingen dag';
      if (!itemsByDay[day]) itemsByDay[day] = [];
      itemsByDay[day].push(item);
    }
    cartHtml = `<div class="section"><div class="section-title">🛒 Valda Produkter</div>` +
      Object.entries(itemsByDay).map(([day, dayItems]) => `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #4CAF50; font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #4CAF50; padding-bottom: 5px;">📅 ${sanitize(day, 20)}</h3>
          <table><thead><tr><th>Produkt</th><th style="text-align: center;">Antal</th><th style="text-align: right;">Pris</th><th style="text-align: right;">Totalt</th></tr></thead>
          <tbody>${dayItems.map(item => `<tr><td>${sanitize(item.name)}</td><td style="text-align: center;">${safeNumber(item.quantity)} st</td><td style="text-align: right;">${safeNumber(item.price)} kr</td><td style="text-align: right;"><strong>${safeNumber(item.price) * safeNumber(item.quantity)} kr</strong></td></tr>`).join('')}</tbody></table>
        </div>
      `).join('') +
      `<table style="margin-top: 20px;"><tfoot><tr class="total-row"><td colspan="3" style="text-align: right;">Totalt:</td><td style="text-align: right;"><strong>${safeNumber(data.totalPrice)} kr</strong></td></tr></tfoot></table></div>`;
  }

  return {
    subject: "Ny Offertförfrågan - Vitaminkorgen",
    html: `<!DOCTYPE html><html><head>${emailStyles}</head><body>
      <div class="container">
        <div class="header"><h1>📋 Ny Offertförfrågan</h1></div>
        <div class="content">
          <div class="section">
            <div class="section-title">🏢 Företagsinformation</div>
            <div class="info-row"><span class="info-label">Företag:</span><span class="info-value">${sanitize(data.companyName || data.company, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Kontaktperson:</span><span class="info-value">${sanitize(data.contactPerson || data.name, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">E-post:</span><span class="info-value">${sanitize(data.email, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Telefon:</span><span class="info-value">${sanitize(data.phone, 30) || 'Ej angivet'}</span></div>
          </div>
          <div class="section">
            <div class="section-title">📍 Leveransadress</div>
            <div class="info-row"><span class="info-label">Adress:</span><span class="info-value">${sanitize(data.address, 300) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Postnummer:</span><span class="info-value">${sanitize(data.postalCode, 10) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">Ort:</span><span class="info-value">${sanitize(data.location, 100) || 'Ej angivet'}</span></div>
          </div>
          ${cartHtml}
          ${data.message ? `<div class="section"><div class="section-title">💬 Meddelande</div><div class="message-box">${sanitize(data.message, 2000).replace(/\n/g, '<br>')}</div></div>` : ''}
        </div>
        <div class="footer">Skickat från vitaminkorgen.se<br>© ${new Date().getFullYear()} Vitaminkorgen</div>
      </div></body></html>`
  };
}

function buildContactEmail(data: ContactEmailRequest): { subject: string; html: string } {
  return {
    subject: "Nytt Kontaktformulär - Vitaminkorgen",
    html: `<!DOCTYPE html><html><head>${emailStyles}</head><body>
      <div class="container">
        <div class="header"><h1>✉️ Nytt Kontaktformulär</h1></div>
        <div class="content">
          <div class="section">
            <div class="section-title">👤 Kontaktinformation</div>
            <div class="info-row"><span class="info-label">Namn:</span><span class="info-value">${sanitize(data.name, 200) || 'Ej angivet'}</span></div>
            <div class="info-row"><span class="info-label">E-post:</span><span class="info-value">${sanitize(data.email, 200) || 'Ej angivet'}</span></div>
            ${data.company ? `<div class="info-row"><span class="info-label">Företag:</span><span class="info-value">${sanitize(data.company, 200)}</span></div>` : ''}
          </div>
          ${data.message ? `<div class="section"><div class="section-title">💬 Meddelande</div><div class="message-box">${sanitize(data.message, 2000).replace(/\n/g, '<br>')}</div></div>` : ''}
        </div>
        <div class="footer">Skickat från vitaminkorgen.se<br>© ${new Date().getFullYear()} Vitaminkorgen</div>
      </div></body></html>`
  };
}

// --- Handler ---

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting by IP
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "För många förfrågningar. Försök igen senare." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received form submission:", data.formType);

    // Validate formType
    const allowedTypes = ["Orderbekräftelse", "Offertförfrågan", "Kontaktformulär"];
    const formType = allowedTypes.includes(data.formType) ? data.formType : "Kontaktformulär";

    let emailResult: { subject: string; html: string };

    if (formType === "Orderbekräftelse") {
      emailResult = buildOrderEmail(data);
    } else if (formType === "Offertförfrågan") {
      emailResult = buildQuoteEmail(data);
    } else {
      emailResult = buildContactEmail(data);
    }

    const emailResponse = await resend.emails.send({
      from: "kontakt@vitaminkorgen.se",
      to: ["info@vitaminkorgen.se"],
      subject: emailResult.subject,
      html: emailResult.html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
