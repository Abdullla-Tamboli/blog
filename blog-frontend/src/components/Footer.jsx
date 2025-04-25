import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-logo">📝 DomainDrive</h2>
        <p>Where your words matter. Share ideas, tell stories, and connect with curious minds worldwide.</p>
      </div>

      <div className="footer-center">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/create">Create Post</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>

      <div className="footer-right">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
        </div>
      </div>
      
    </footer>
   
  );
};

export default Footer;
