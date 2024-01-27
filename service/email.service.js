const nodemailer = require("nodemailer");

const SMTP_PORT = 587;
const HOST_SERVICE = "smtp-relay.brevo.com";
const USER_EMAIL = "id.suitsandshirts@gmail.com"; // Your SMTP user email
const USER_PASSWORD = "r0zTtCbjXkVWvL5w"; // Your SMTP user password

const SENDERS_EMAIL = "id.suitsandshirts@gmail.com"; // Sender's email





const transporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

// Function to send the scheduled email
const sendScheduledEmail = (payload) => {
    const emailOptions = {
        from: SENDERS_EMAIL,
        to: payload.RECEIVERS_EMAIL,
        cc: payload.CC,
        bcc: payload.BCC,
        subject: payload.EMAIL_SUBJECT,
        text: payload.EMAIL_BODY_TEXT,
      };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log({ success: false, message: "Email could not be sent" });
      
    } else {
      console.log("Email sent: " + info.response + { success: true, message: "Email sent successfully" });
     
    }
  });
};

module.exports = {
  sendScheduledEmail,
};
