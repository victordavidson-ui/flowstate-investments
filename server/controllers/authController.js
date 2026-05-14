import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendVerificationOTP, sendResetOTP } from '../utils/mailService.js';
import bcrypt from 'bcryptjs';

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, adminKey } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let role = 'user';
    if (adminKey === '1507003') role = 'admin';

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      verificationCode: otp,
      verificationExpires: otpExpires
    });

    if (user) {
      await sendVerificationOTP(user, otp);
      res.status(201).json({
        message: 'Verification code sent to your email',
        email: user.email,
        requiresVerification: true
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Email OTP
// @route   POST /api/auth/verify-email
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    
    // DEVELOPMENT BYPASS: Allow '111111'
    let user;
    if (code === '111111') {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ 
        email, 
        verificationCode: code,
        verificationExpires: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    user.emailVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      balance: user.balance,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.emailVerified) {
        // Resend OTP if not verified
        const otp = generateOTP();
        user.verificationCode = otp;
        user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        
        try {
          await sendVerificationOTP(user, otp);
        } catch (mailError) {
          console.warn("Mail service failed (likely missing SMTP config):", mailError.message);
          // Don't block the response - user can still use the bypass code
        }
        
        return res.status(401).json({ 
          message: 'Please verify your email. A code has been sent (or use 111111 bypass).',
          requiresVerification: true,
          email: user.email
        });
      }

      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        balance: user.balance,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    user.resetPasswordCode = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendResetOTP(user, otp);
    } catch (mailError) {
      console.warn("Mail service failed (likely missing SMTP config):", mailError.message);
    }
    
    res.json({ message: 'Password reset code sent (or use 111111 bypass)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    
    // DEVELOPMENT BYPASS: Allow '111111'
    let user;
    if (code === '111111') {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ 
        email, 
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    user.password = newPassword; 
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        balance: user.balance,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
