import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  type: "welcome" | "quiz_complete" | "certificate";
  email: string;
  data: {
    name?: string;
    quizTitle?: string;
    score?: number;
    totalQuestions?: number;
    percentage?: number;
    certificateUrl?: string;
  };
}

const getEmailContent = (type: string, data: EmailRequest["data"]) => {
  switch (type) {
    case "welcome":
      return {
        subject: "Welcome to Sirat Al-Mustaqim Academy! 🌙",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Welcome to Sirat Al-Mustaqim Academy</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #334155;">Assalamu Alaikum ${data.name || "dear student"},</p>
              <p style="font-size: 16px; color: #334155;">
                Welcome to Sirat Al-Mustaqim Academy! We are honored to have you join our learning community.
              </p>
              <p style="font-size: 16px; color: #334155;">
                Here's what you can do now:
              </p>
              <ul style="font-size: 16px; color: #334155;">
                <li>Take interactive Islamic knowledge quizzes</li>
                <li>Track your learning progress</li>
                <li>Earn certificates for your achievements</li>
                <li>Compete on the global leaderboard</li>
              </ul>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://quranic-learning-hub-connect.lovable.app/quiz" 
                   style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Start Learning Now
                </a>
              </div>
              <p style="font-size: 14px; color: #64748b; text-align: center;">
                May Allah bless your learning journey. 🤲
              </p>
            </div>
          </div>
        `,
      };

    case "quiz_complete":
      const emoji = (data.percentage || 0) >= 80 ? "🎉" : (data.percentage || 0) >= 60 ? "👍" : "📚";
      return {
        subject: `Quiz Completed: ${data.quizTitle} ${emoji}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Quiz Completed! ${emoji}</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #334155;">Assalamu Alaikum ${data.name || ""},</p>
              <p style="font-size: 16px; color: #334155;">
                Congratulations on completing the <strong>${data.quizTitle}</strong> quiz!
              </p>
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="font-size: 14px; color: #64748b; margin: 0;">Your Score</p>
                <p style="font-size: 48px; font-weight: bold; color: #3b82f6; margin: 10px 0;">${data.score}/${data.totalQuestions}</p>
                <p style="font-size: 24px; color: ${(data.percentage || 0) >= 80 ? '#059669' : (data.percentage || 0) >= 60 ? '#d97706' : '#dc2626'};">
                  ${data.percentage}%
                </p>
              </div>
              <p style="font-size: 16px; color: #334155; text-align: center;">
                ${(data.percentage || 0) >= 80 
                  ? "MashaAllah! Excellent performance!" 
                  : (data.percentage || 0) >= 60 
                    ? "Good job! Keep practicing to improve." 
                    : "Keep learning and try again!"}
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://quranic-learning-hub-connect.lovable.app/dashboard" 
                   style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  View Your Dashboard
                </a>
              </div>
            </div>
          </div>
        `,
      };

    case "certificate":
      return {
        subject: `Your Certificate is Ready! 🎓`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Certificate Earned! 🎓</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #334155;">Assalamu Alaikum ${data.name || ""},</p>
              <p style="font-size: 16px; color: #334155;">
                Congratulations! You have earned a certificate for completing the <strong>${data.quizTitle}</strong> quiz.
              </p>
              <p style="font-size: 16px; color: #334155;">
                You can download your certificate from your student dashboard.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://quranic-learning-hub-connect.lovable.app/dashboard" 
                   style="background: #7c3aed; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Download Certificate
                </a>
              </div>
              <p style="font-size: 14px; color: #64748b; text-align: center;">
                Share your achievement with friends and family! 🌟
              </p>
            </div>
          </div>
        `,
      };

    default:
      return {
        subject: "Notification from Sirat Al-Mustaqim Academy",
        html: "<p>Thank you for being part of our learning community.</p>",
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, data }: EmailRequest = await req.json();

    // Validate required fields
    if (!type || !email) {
      throw new Error("Missing required fields: type and email");
    }

    const { subject, html } = getEmailContent(type, data);

    const emailResponse = await resend.emails.send({
      from: "Sirat Al-Mustaqim Academy <noreply@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
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
