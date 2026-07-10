const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service not configured:', error);
  } else {
    console.log('✅ Email service ready to send emails');
  }
});

const sendOTPEmail = async (toEmail, otp, name = 'User') => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f7fc; margin: 0; padding: 0; }
        .container { max-width: 500px; margin: 20px auto; padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .header { text-align: center; margin-bottom: 24px; }
        .logo { font-size: 28px; font-weight: 800; color: #059669; }
        .heart { color: #059669; }
        .otp-box { background: #ecfdf5; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; border: 2px dashed #059669; }
        .otp-code { font-size: 36px; font-weight: 800; color: #059669; letter-spacing: 8px; }
        .expiry { font-size: 14px; color: #6b7280; text-align: center; }
        .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="logo"><span class="heart">❤️</span> WellNest</span>
          <h2 style="color: #1f2937; margin-top: 8px;">Your OTP Code</h2>
        </div>
        <p style="color: #374151; font-size: 16px;">Hello <strong>${name}</strong>,</p>
        <p style="color: #6b7280;">Use the following OTP code to complete your verification:</p>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <p class="expiry">⏱️ This code will expire in <strong>5 minutes</strong></p>
        <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        <div class="footer">© 2026 WellnessOS – Empowering your health journey</div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"WellNest" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔐 Your WellnessOS OTP Code',
    html: htmlContent,
    text: `Hello ${name},\n\nYour OTP code is: ${otp}\n\nThis code will expire in 5 minutes.\n\n- WellnessOS Team`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`�� OTP sent to ${toEmail}: ${otp}`);
    return { success: true, message: 'OTP sent successfully', messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send OTP email. Please try again.');
  }
};

module.exports = { sendOTPEmail };
