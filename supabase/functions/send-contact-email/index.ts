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
  totalPrice?: number;
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
    let emailContent = `<h2>${data.formType}</h2>`;
    let emailSubject = "Hemsida Formulär";
    
    if (data.formType === "Orderbekräftelse") {
      emailSubject = "Ny Orderbekräftelse";
      emailContent += `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Kundinformation</h3>
          <p><strong>Företag:</strong> ${data.customerInfo?.company || 'Ej angivet'}</p>
          <p><strong>Kontaktperson:</strong> ${data.customerInfo?.contact || 'Ej angivet'}</p>
          <p><strong>E-post:</strong> ${data.customerInfo?.email || 'Ej angivet'}</p>
          <p><strong>Telefon:</strong> ${data.customerInfo?.phone || 'Ej angivet'}</p>
          <p><strong>Adress:</strong> ${data.customerInfo?.address || 'Ej angivet'}</p>
          
          <h3 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 20px;">Beställningsdetaljer</h3>
          <p><strong>Typ:</strong> ${data.orderType || 'Ej angivet'}</p>
          <p><strong>Leveransdagar:</strong> ${data.selectedDays?.join(', ') || 'Inga dagar valda'}</p>
          
          <h3 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 20px;">Produkter</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Produkt</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Antal</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Pris/st</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Totalt</th>
              </tr>
            </thead>
            <tbody>
              ${data.items?.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.name}${item.assignedDay ? ` (${item.assignedDay})` : ''}</td>
                  <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.price} kr</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.price * item.quantity} kr</td>
                </tr>
              `).join('') || '<tr><td colspan="4" style="padding: 10px; text-align: center;">Inga produkter</td></tr>'}
            </tbody>
            <tfoot>
              <tr style="background-color: #4CAF50; color: white; font-weight: bold;">
                <td colspan="3" style="padding: 15px; text-align: right; border: 1px solid #4CAF50;">TOTALPRIS:</td>
                <td style="padding: 15px; text-align: right; border: 1px solid #4CAF50; font-size: 18px;">${data.totalPrice || 0} kr</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;
    } else if (data.formType === "Offertförfrågan") {
      emailContent += `
        <p><strong>Företag:</strong> ${data.companyName || data.company || 'Ej angivet'}</p>
        <p><strong>Kontaktperson:</strong> ${data.contactPerson || data.name}</p>
        <p><strong>E-post:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone || 'Ej angivet'}</p>
        <p><strong>Plats/Stad:</strong> ${data.location || 'Ej angivet'}</p>
        ${data.message ? `<p><strong>Meddelande:</strong></p><p>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      `;
    } else {
      emailContent += `
        <p><strong>Namn:</strong> ${data.name}</p>
        <p><strong>E-post:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Företag:</strong> ${data.company}</p>` : ''}
        ${data.message ? `<p><strong>Meddelande:</strong></p><p>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      `;
    }

    emailContent += `
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">Skickat från vitaminkorgen.se kontaktformulär</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
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
