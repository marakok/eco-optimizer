import nodemailer from "nodemailer";
import {
  getContactEmailTemplate,
  getAutoReplyTemplate,
} from "../utils/emailTemplates";

const environment = process.env.ENV;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Handle development environment
  if (environment === "development") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "LOCAL DEVELOPMENT: Form submitted successfully",
        data: {},
      }),
    };
  }

  // Verify reCAPTCHA
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (body.recaptchaToken) {
    try {
      const googleResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${body.recaptchaToken}`,
        {
          method: "POST",
        }
      );

      const reCaptchaVerificationResponse = await googleResponse.json();

      if (reCaptchaVerificationResponse.score < 0.5) {
        throw createError({
          statusCode: 400,
          statusMessage: "reCaptcha verification failed",
          data: {
            error: "reCaptcha verification failed",
          },
        });
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "reCaptcha verification not provided",
      });
    }
  }

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
      email: body.email,
      message: body.message || "",
      pageUri: body.pageUri || "",
    };

    // Send email notifications
    try {
      // Email to admin
      const adminMailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.TO_EMAIL,
        subject: `New Contact Form Submission from ${
          submissionData.name || submissionData.email
        }`,
        html: getContactEmailTemplate(submissionData),
      };

      // Auto-reply to submitter
      const autoReplyOptions = {
        from: process.env.SMTP_USER,
        to: submissionData.email,
        subject: "Thank You for Contacting Strengths Consultancy",
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
