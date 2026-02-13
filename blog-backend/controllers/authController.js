const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------------------- Auth Controllers ----------------------

// @desc    Register user
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

    const subject = 'Your OTP for Verification';
    const text = `Hello ${username},\n\nYour OTP code is: ${otp}\n\nIt will expire in 10 minutes.`;

    await sendEmail(email, subject, text);

    const user = new User({ username, email, password, role, otp, otpExpiry, verified: false });
    await user.save();

    res.status(200).json({ msg: 'OTP sent to email', email });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

// @desc    Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    if (user.verified) return res.status(400).json({ msg: 'User already verified' });
    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ msg: 'Server error verifying OTP' });
  }
};

// @desc    Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

// @desc    Google Login
exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        password: 'google_login', // dummy password
        verified: true,
        role: 'reader'
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ msg: 'Google login failed' });
  }
};

// ---------------------- User Profile Helpers ----------------------

// @desc    Get user's post/like/comment stats
exports.getUserStats = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });

    const totalPosts = posts.length;
    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    res.json({
      posts: totalPosts,
      likes: totalLikes,
      comments: totalComments
    });
  } catch (err) {
    console.error('Stats fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// @desc    Change password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) return res.status(400).json({ msg: 'Incorrect current password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Server error changing password' });
  }
};

// @desc    Upload profile picture
exports.uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profilePic = req.file.filename;
    await user.save();
    res.json({ msg: 'Profile picture updated', user });
  } catch (err) {
    console.error('Upload profile pic error:', err);
    res.status(500).json({ error: 'Error uploading profile picture' });
  }
};

// @desc    Get current user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

// @desc    Update profile (username/email)
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
