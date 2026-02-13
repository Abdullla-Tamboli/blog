import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-600">Blog Verse</h2>
          <p className="text-gray-600 mt-2 text-sm">
            A platform where knowledge meets creativity. Start learning and sharing your tech thoughts!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link></li>
            <li><Link to="/create-post" className="text-gray-600 hover:text-indigo-600">Write a Post</Link></li>
            <li><Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link></li>
            <li><Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="text-gray-600 hover:text-black text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-blue-500 hover:text-blue-700 text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-blue-700 hover:text-blue-900 text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Blogger. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
