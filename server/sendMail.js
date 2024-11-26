const nodemailer = require('nodemailer');
require('dotenv').config();

// using gmail service ----------------------------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // 'true' fo port 465, 'false' for all other ports
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// fnuction to give respective EmailTmplate ----------------------
const getEmailTemplate = (email, otp) => {
  return {
    from: ``,
    to: email,
    subject: `Email Activation - From InternA`,
    text: "Account Activation Link",
    html: `

    <div
    style="padding: 10px padding-bottom: 20px; text-align: start">
    <h2>To Activate your Mail</h2>
    <br>
    <h4 style="text-align: start; width: 100%;">
        Here is the OTP:
    </h4>
    <h2>${otp}</h2>
    <hr />
    <p style="text-align: start;">
        <div>This email contains sensitive data.</div>
        <div>Please Handle with care &</div>
        <div>-------- Have a good Day ;) --------</div>
    </p>
    <div>InternA</div>
    </div>`,
  }
}

// Sending mail utility function ------------------------------s
const sendMail = async ({ email, otp }) => {
  try {
    await transporter.sendMail(getEmailTemplate(email, otp))
  } catch (error) {
    console.error("Error while Sending Mail:", error);
  }
}

module.exports = sendMail;