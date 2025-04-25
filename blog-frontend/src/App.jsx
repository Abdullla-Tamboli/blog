import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import EditPost from './pages/EditPost'; // ✅ Add this
import Footer from './components/Footer';
import VerifyOtp from './components/VerifyOtp'; // Import the VerifyOtp component
import './styles/main.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<EditPost />} /> {/* ✅ Add this */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} /> {/* Add this */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
