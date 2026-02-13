import './index.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import PostView from './pages/PostView';
import PostEdit from './pages/PostEdit';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
