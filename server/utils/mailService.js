import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('!!! EMAIL NOT SENT: SMTP credentials missing in .env !!!');
      console.log('------------------------------------------');
      console.log(`TO: ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`OTP CODE: ${text.match(/\d{6}/)?.[0] || 'N/A'}`);
      console.log('------------------------------------------');
      return true;
    }

    const info = await transporter.sendMail({
      from: `"Netflow Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};

export const sendVerificationOTP = async (user, code) => {
  return sendEmail({
    to: user.email,
    subject: 'Your Netflow Verification Code',
    text: `Your verification code is: ${code}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Verify your account</h2>
        <p>Hello ${user.firstName},</p>
        <p>Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #8B5CF6; margin: 20px 0;">${code}</div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  });
};

export const sendResetOTP = async (user, code) => {
  return sendEmail({
    to: user.email,
    subject: 'Netflow Password Reset Code',
    text: `Your password reset code is: ${code}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Reset your password</h2>
        <p>Hello ${user.firstName},</p>
        <p>We received a request to reset your password. Use the code below to proceed:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #F43F5E; margin: 20px 0;">${code}</div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `
  });
};
