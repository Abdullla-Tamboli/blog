import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css'; // ✅ Don't forget to create this

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      login(res.data.user);
      navigate('/');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-left">
        <img src="blog.jpg" alt="Phone preview" className="blog-image" />
        <h1> <i className="fas fa-share"></i> Share what you're into with the <span>people who get you.</span></h1>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Log in</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email ✉️"  onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password 🔒" onChange={handleChange} required />
            <button type="submit">Log In</button>
          </form>
          
        </div>
        <div className="signup-box">
          <p>Don't have an account? <a href="/signup">Create new account</a></p>
        </div>
        <footer>
          <p>© 2025 DomainDrive</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
