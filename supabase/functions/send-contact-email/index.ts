import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  formType: string;
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  phone?: string;
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
  }>;
  totalPrice?: number;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received form submission:", data.formType);

    // Build email content based on form type
    let emailSubject = "Hemsida Formulär";
    let emailContent = "";
    
    // Common email styles
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
    
    if (data.formType === "Orderbekräftelse") {
      emailSubject = "Ny Orderbekräftelse - Vitaminkorgen";
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>${emailStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛒 Ny Orderbekräftelse</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">👤 Kundinformation</div>
                <div class="info-row">
                  <span class="info-label">Företag:</span>
                  <span class="info-value">${data.customerInfo?.company || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Kontaktperson:</span>
                  <span class="info-value">${data.customerInfo?.contact || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">E-post:</span>
                  <span class="info-value">${data.customerInfo?.email || 'Ej angivet'}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">📦 Beställningsdetaljer</div>
                <div class="info-row">
                  <span class="info-label">Leveranstyp:</span>
                  <span class="info-value">${data.orderType || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Leveransdagar:</span>
                  <span class="info-value">${data.selectedDays?.join(', ') || 'Inga dagar valda'}</span>
                </div>
              </div>
              
              ${data.message ? `
              <div class="section">
                <div class="section-title">💬 Meddelande från kund</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              <div class="section">
                <div class="section-title">🛍️ Beställda Produkter</div>
                <table>
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th style="text-align: center;">Antal</th>
                      <th style="text-align: right;">Pris/st</th>
                      <th style="text-align: right;">Totalt</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.items?.map(item => `
                      <tr>
                        <td>${item.name}${item.assignedDay ? ` <span style="color: #4CAF50;">(${item.assignedDay})</span>` : ''}</td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">${item.price} kr</td>
                        <td style="text-align: right;"><strong>${(item.price * item.quantity).toFixed(2)} kr</strong></td>
                      </tr>
                    `).join('') || '<tr><td colspan="4" style="text-align: center; color: #999;">Inga produkter</td></tr>'}
                  </tbody>
                  <tfoot>
                    <tr class="total-row">
                      <td colspan="3" style="text-align: right; padding: 15px;">TOTALPRIS:</td>
                      <td style="text-align: right; padding: 15px; font-size: 18px;">${data.totalPrice || 0} kr</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="footer">
              Skickat från vitaminkorgen.se<br>
              © ${new Date().getFullYear()} Vitaminkorgen
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (data.formType === "Offertförfrågan") {
      emailSubject = "Ny Offertförfrågan - Vitaminkorgen";
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>${emailStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Ny Offertförfrågan</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">🏢 Företagsinformation</div>
                <div class="info-row">
                  <span class="info-label">Företag:</span>
                  <span class="info-value">${data.companyName || data.company || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Kontaktperson:</span>
                  <span class="info-value">${data.contactPerson || data.name || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">E-post:</span>
                  <span class="info-value">${data.email || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Telefon:</span>
                  <span class="info-value">${data.phone || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Plats/Stad:</span>
                  <span class="info-value">${data.location || 'Ej angivet'}</span>
                </div>
              </div>
              
              ${data.cartItems && data.cartItems.length > 0 ? `
              <div class="section">
                <div class="section-title">🛒 Valda Produkter</div>
                <table>
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th style="text-align: center;">Antal</th>
                      <th style="text-align: right;">Pris</th>
                      <th style="text-align: right;">Totalt</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.cartItems.map(item => `
                      <tr>
                        <td>${item.name}</td>
                        <td style="text-align: center;">${item.quantity} st</td>
                        <td style="text-align: right;">${item.price} kr</td>
                        <td style="text-align: right;"><strong>${item.price * item.quantity} kr</strong></td>
                      </tr>
                    `).join('')}
                  </tbody>
                  <tfoot>
                    <tr class="total-row">
                      <td colspan="3" style="text-align: right;">Totalt:</td>
                      <td style="text-align: right;"><strong>${data.totalPrice || 0} kr</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              ` : ''}
              
              ${data.message ? `
              <div class="section">
                <div class="section-title">💬 Meddelande</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              Skickat från vitaminkorgen.se<br>
              © ${new Date().getFullYear()} Vitaminkorgen
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      emailSubject = "Nytt Kontaktformulär - Vitaminkorgen";
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>${emailStyles}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Nytt Kontaktformulär</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">👤 Kontaktinformation</div>
                <div class="info-row">
                  <span class="info-label">Namn:</span>
                  <span class="info-value">${data.name || 'Ej angivet'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">E-post:</span>
                  <span class="info-value">${data.email || 'Ej angivet'}</span>
                </div>
                ${data.company ? `
                <div class="info-row">
                  <span class="info-label">Företag:</span>
                  <span class="info-value">${data.company}</span>
                </div>
                ` : ''}
              </div>
              
              ${data.message ? `
              <div class="section">
                <div class="section-title">💬 Meddelande</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              Skickat från vitaminkorgen.se<br>
              © ${new Date().getFullYear()} Vitaminkorgen
            </div>
          </div>
        </body>
        </html>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "kontakt@vitaminkorgen.se",
      to: ["info@vitaminkorgen.se"],
      subject: emailSubject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
