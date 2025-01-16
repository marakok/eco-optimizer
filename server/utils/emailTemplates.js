export const getContactEmailTemplate = (submission) => {
  const formattedDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #fff15a;
            color: #404040;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            margin-top: 5px;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
            text-align: center;
          }
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            .header, .content {
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${submission.name || "Not provided"}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">
              <a href="mailto:${submission.email}">${submission.email}</a>
            </div>
          </div>
          
          ${
            submission.message
              ? `
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${submission.message}</div>
            </div>
          `
              : ""
          }
          
          ${
            submission.pageUri
              ? `
            <div class="field">
              <div class="label">Submitted from:</div>
              <div class="value"><a href="${submission.pageUri}">${submission.pageUri}</a></div>
            </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="label">Submission Time:</div>
            <div class="value">${formattedDate}</div>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated message from Strengths Consultancy Contact Form</p>
        </div>
      </body>
    </html>
  `;
};

export const getAutoReplyTemplate = (submission) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Strengths Consultancy</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #fff15a;
            color: #404040;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
          }
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            .header, .content {
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">Thank You for Contacting Us</h1>
        </div>
        <div class="content">
          <p>Dear ${submission.name || "Valued Client"},</p>
          
          <p>Thank you for reaching out to Strengths Consultancy. We have received your message and will get back to you shortly.</p>
          
          <p>Our team typically responds within 1-2 business days.</p>
          
          <p>Best regards,<br>The Strengths Consultancy Team</p>
        </div>
      </body>
    </html>
  `;
};
