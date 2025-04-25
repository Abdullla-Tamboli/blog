import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';

const VerifyOtp = () => {
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve the email passed from the signup page
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/auth/verify-otp', { otp, email });
    if (res.data.success) {
      setMessage('OTP verified successfully!');
    } else {
      setMessage('Invalid OTP');
    }
  } catch (err) {
    setMessage('Error verifying OTP');
    console.error(err);
  }
};


  return (
    <div className="otp-verification">
      <h2>Verify OTP for {email}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default VerifyOtp;
