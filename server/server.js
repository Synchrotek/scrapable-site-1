const express = require('express');
const cors = require('cors');
const svgCaptcha = require('svg-captcha');
const sendMail = require('./sendMail');
require('dotenv').config();

const emailOtpMap = {};

async function generateOtpSendMail(email) {
  const otp = Math.floor(1000 + Math.random() * 9000);
  await sendMail({ email, otp });
  return otp;
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.get('/', (req, res) => {
  res.json({
    status: 1,
    hello: "world"
  });
});

app.get('/api/captcha', (req, res) => {
  const captcha = svgCaptcha.create();
  return res.json({
    status: 0,
    data: captcha
  });
});

app.post('/api/generate_otp', async (req, res) => {
  console.log("========== generate otp");
  const { email } = req.body;
  let emailExists = false;
  emailOtpMap[email] ? emailExists = true : emailOtpMap[email] = {};
  if (emailOtpMap[email] && emailOtpMap[email].isVerified) {
    return res.status(400).json({
      status: 0,
      message: 'This email is already verified'
    });
  }
  const otp = await generateOtpSendMail(email);
  emailOtpMap[email].otp = otp;
  return res.json({
    status: 1,
    message: emailExists ?
      'This email already exists but not verified. Sending a new OTP now...' :
      'Activation OTP sent to you Mail'
  });

});

app.post('/api/check_otp', (req, res) => {
  const { email, otp } = req.body;
  if (emailOtpMap[email]) {
    if (emailOtpMap[email].isVerified) {
      return res.status(400).json({
        status: 0,
        message: 'This email is already verified'
      });
    }
    if (otp !== emailOtpMap[email].otp.toString()) {
      return res.status(400).json({
        status: 0,
        message: 'Invalid OTP'
      });
    }
    emailOtpMap[email].isVerified = true;
    res.json({
      status: 1,
      message: 'Validation success'
    });
  } else {
    res.status(404).json({
      status: 0,
      message: 'This email Id is not registered yet.'
    });
  }
});

const PORT = 4500;
app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});