import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HomeSubmissionRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  form_type: string;
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

    const { name, email, phone, subject, message, form_type }: HomeSubmissionRequest = await req.json();

    // Store in database
    const { error: dbError } = await supabase.from("home_submissions").insert({
      name,
      email,
      phone,
      subject,
      message,
      form_type,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store home submission");
    }

    // Create notification for admin
    const { error: notificationError } = await supabase.from("notifications").insert({
      type: "home_submission",
      title: "New Home Page Submission",
      message: `${name} submitted a ${form_type} form: ${subject}`,
      data: {
        name,
        email,
        form_type,
        subject
      }
    });

    if (notificationError) {
      console.error("Notification error:", notificationError);
    }

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Quran Learning Hub <noreply@yoursite.com>",
      to: ["alsiratalmustaqim0@gmail.com"],
      subject: `New ${form_type} Submission: ${subject}`,
      html: `
        <h2>New Home Page Submission</h2>
        <p><strong>Form Type:</strong> ${form_type}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Quran Learning Hub <noreply@yoursite.com>",
      to: [email],
      subject: "Thank you for your interest - Quran Learning Hub",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your ${form_type} submission and will get back to you within 24 hours.</p>
        
        <p><strong>Your submission:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><em>"${message}"</em></p>
        
        <p>Our team is excited to help you begin your Quran learning journey!</p>
        
        <p>Best regards,<br>The Quran Learning Hub Team</p>
      `,
    });

    console.log("Emails sent:", { adminEmailResponse, userEmailResponse });

    return new Response(
      JSON.stringify({ success: true, message: "Submission sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-home-submission function:", error);
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