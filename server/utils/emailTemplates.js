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
            background: #4fc900;
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
          <h1 style="margin: 0;">Nieuw contactformulier ingediend</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${submission.name || "Niet opgegeven"}</div>
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
          <p>This is an automated message from Ecooptimizer contact form</p>
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
        <title>Dank u voor uw contact met Ecooptimizer.</title>
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
            background: #4fc900;
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
          <h1 style="margin: 0;">Dank u voor uw contact met ons</h1>
        </div>
        <div class="content">
          <p>Dear ${submission.name || "Gewaardeerde klant"},</p>
          
          <p>Dank u voor uw bericht aan Ecooptimizer. We hebben uw bericht ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>
          <p>We reageren doorgaans binnen 1-2 werkdagen.</p>
          
          <p>Met vriendelijke groet,<br>Ecooptimizer</p>
        </div>
      </body>
    </html>
  `;
};
