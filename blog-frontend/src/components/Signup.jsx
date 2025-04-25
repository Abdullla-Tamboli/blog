import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'reader' // default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} value={formData.role}>
        <option value="reader">Reader</option>
        <option value="author">Author</option>
      </select>

        <button type="submit">Sign Up</button>
        <div className="signup-box">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </form>

    </div>
  );
};

export default Signup;