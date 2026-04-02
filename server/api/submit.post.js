import nodemailer from "nodemailer";
import { createClient } from '@supabase/supabase-js';
import {
  getContactEmailTemplate,
  getAutoReplyTemplate,
} from "../utils/emailTemplates";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function verifyRecaptcha(token, secretKey) {
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "reCAPTCHA token is required",
    });
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    if (!response.ok) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to verify reCAPTCHA with Google",
      });
    }

    const data = await response.json();

    if (!data.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "reCAPTCHA verification failed",
        data: {
          errors: data["error-codes"] || ["unknown error"],
        },
      });
    }

    // Check the score for v3
    if (typeof data.score === "number" && data.score < 0.5) {
      throw createError({
        statusCode: 400,
        statusMessage: "reCAPTCHA score too low",
        data: {
          score: data.score,
        },
      });
    }

    return true;
  } catch (error) {
    if (error.statusCode) {
      throw error; // Re-throw our custom errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: "reCAPTCHA verification failed",
      data: error,
    });
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Verify reCAPTCHA first
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "reCAPTCHA secret key not configured",
    });
  }

  await verifyRecaptcha(body.recaptchaToken, recaptchaSecretKey);

  // Validate required fields
  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  try {
    // Prepare submission data
    const submissionData = {
      name: body.name || "",
      email: body.email || "",
      message: body.message || "",
      pageUri: body.pageUri || "",
    };

    // Save to Supabase
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    const { error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        name: submissionData.name,
        email: submissionData.email,
        message: submissionData.message,
        page_uri: submissionData.pageUri,
        ip_address: event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress,
      });

    if (dbError) {
      console.error('Error saving to database:', dbError);
    }

    // Send email notifications
    try {
      // Email to admin - IMPORTANT: Use the same authenticated email address for "from" field
      const adminMailOptions = {
        from: `"EcoOptimizer Contact Form" <${process.env.SMTP_USER}>`, // More descriptive sender name
        to: process.env.TO_EMAIL,
        subject: `New Contact Form Submission from ${
          submissionData.name || submissionData.email
        }`,
        html: getContactEmailTemplate(submissionData),
        // Add reply-to header so replies go to the actual submitter
        replyTo: submissionData.email,
      };

      // Auto-reply to submitter - Use the same authenticated email but with a "no-reply" display name
      const autoReplyOptions = {
        from: `"EcoOptimizer No-Reply" <${process.env.SMTP_USER}>`, // This shows as "EcoOptimizer No-Reply" to the recipient
        to: submissionData.email,
        subject: "Dank u voor uw contact met Ecooptimizer.",
        html: getAutoReplyTemplate(submissionData),
      };

      // Send both emails in parallel
      const [adminEmailInfo, autoReplyInfo] = await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(autoReplyOptions),
      ]);

      console.log("Admin email sent successfully:", adminEmailInfo.messageId);
      console.log("Auto-reply sent successfully:", autoReplyInfo.messageId);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw createError({
        statusCode: 500,
        statusMessage: "Error sending emails",
        data: emailError,
      });
    }

    return {
      success: true,
      message: "Submission successful",
    };
  } catch (error) {
    console.error("Error in form submission:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error submitting form",
      data: error,
    });
  }
});
