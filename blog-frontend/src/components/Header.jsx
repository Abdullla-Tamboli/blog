import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import '../styles/header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">DomainDrive</Link>
      </div>

      <div className="header-right">
        {/* Show Home only if not on the homepage */}
        {!isHomePage && (
          <Link to="/" className="home"><i className="fas fa-home"></i> Home</Link>
          
        )}
        {isHomePage && (
          <a href="#blogs" className="nav-link">📚 Blogs</a>
        )}

        {user ? (
          <>
            <span className="welcome-msg">🎉 Welcome, {user.username}!</span>
            {user.role === 'author' && (
              <Link to="/create" className="nav-link">📝 Create</Link>
            )}
            <button onClick={logout} className="nav-btn">Logout &nbsp; <i className="fas fa-sign-out-alt"></i>
            </button>
          </>
        ) : (
          // Show login/signup only if not on login or signup page
          !isLoginPage && !isSignupPage && (
            <>
              <Link to="/login" className="nav-link"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
