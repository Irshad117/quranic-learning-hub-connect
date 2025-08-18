import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PackageInquiryRequest {
  name: string;
  email: string;
  phone?: string;
  region: string;
  duration: number;
  classesPerWeek: number;
  price: number;
  currency: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const {
      name,
      email,
      phone,
      region,
      duration,
      classesPerWeek,
      price,
      currency,
      message,
    }: PackageInquiryRequest = await req.json();

    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let userId = null;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData } = await supabase.auth.getUser(token);
      userId = userData.user?.id;
    }

    // Store in database
    const { error: dbError } = await supabase.from("package_inquiries").insert({
      user_id: userId,
      name,
      email,
      phone,
      region,
      duration,
      classes_per_week: classesPerWeek,
      price,
      currency,
      message,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store inquiry");
    }

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Quran Learning Hub <noreply@yoursite.com>",
      to: ["alsiratalmustaqim0@gmail.com"],
      subject: "New Package Inquiry",
      html: `
        <h2>New Package Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>
        <p><strong>Classes per week:</strong> ${classesPerWeek}</p>
        <p><strong>Price:</strong> ${currency}${price}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Quran Learning Hub <noreply@yoursite.com>",
      to: [email],
      subject: "Package Inquiry Received - Quran Learning Hub",
      html: `
        <h2>Thank you for your interest!</h2>
        <p>Dear ${name},</p>
        <p>We have received your package inquiry for our Quran learning program.</p>
        
        <h3>Your Selected Package:</h3>
        <ul>
          <li><strong>Region:</strong> ${region}</li>
          <li><strong>Session Duration:</strong> ${duration} minutes</li>
          <li><strong>Classes per week:</strong> ${classesPerWeek}</li>
          <li><strong>Monthly Price:</strong> ${currency}${price}</li>
        </ul>
        
        <p>Our team will contact you within 24 hours to discuss your learning goals and schedule your free trial class.</p>
        
        <p>Best regards,<br>The Quran Learning Hub Team</p>
      `,
    });

    console.log("Emails sent:", { adminEmailResponse, userEmailResponse });

    return new Response(
      JSON.stringify({ success: true, message: "Inquiry submitted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-package-inquiry function:", error);
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