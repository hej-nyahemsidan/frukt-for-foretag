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
  name: string;
  email: string;
  message?: string;
  company?: string;
  phone?: string;
  location?: string;
  companyName?: string;
  contactPerson?: string;
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
    
    if (data.formType === "Offertförfrågan") {
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
      subject: "Hemsida Formulär",
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
