const express = require('express');
const {
  register,
  login,
  verifyOtp,
  googleLogin
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);        // ✅ CORRECT
router.post('/login', login);              // ✅ CORRECT
router.post('/verify-otp', verifyOtp);     // ✅ CORRECT
router.post('/google-login', googleLogin); // ✅ CORRECT

module.exports = router;
