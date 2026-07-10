const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('./services/emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// In-memory storage (use Redis/DB in production)
const otpStore = new Map();
const userStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ============= AUTH ENDPOINTS =============

// 1. Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email, name, isSignUp } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // For forgot password, check if user exists
    if (!isSignUp) {
      const userExists = Array.from(userStore.values()).some(u => u.email === email);
      if (!userExists) {
        return res.status(404).json({ error: 'No account found with this email address' });
      }
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP
    otpStore.set(email, { otp, expiryTime });

    // Send email
    await sendOTPEmail(email, otp, name || 'User');

    res.json({ 
      success: true, 
      message: 'OTP sent to your email',
      otp: otp // Remove in production, only for testing
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP' });
  }
});

// 2. Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const stored = otpStore.get(email);
    if (!stored) {
      return res.status(404).json({ error: 'No OTP request found for this email' });
    }

    if (Date.now() > stored.expiryTime) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }

    // OTP verified - clean up
    otpStore.delete(email);

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// 3. Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, dob, country, city, address, gender, password } = req.body;

    // Check if user already exists
    if (userStore.get(email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      dob,
      country,
      city,
      address,
      gender,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    userStore.set(email, user);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// 4. Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = userStore.get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// 5. Reset password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = userStore.get(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    userStore.set(email, user);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// ============= START SERVER =============
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER || 'Not configured'}`);
});
