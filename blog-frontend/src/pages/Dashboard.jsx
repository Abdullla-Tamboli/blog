// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GraphStats from "../components/GraphStats";
import ProgressStats from "../components/ProgressStats";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ posts: 0, likes: 0, comments: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data || !token) navigate("/login");
    else setUser(data);
  }, [navigate, token]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myPosts = res.data;
        setPosts(myPosts);

        const totalLikes = myPosts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
        const totalComments = myPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
        setStats({ posts: myPosts.length, likes: totalLikes, comments: totalComments });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [user, token]);

  const handleDeletePost = async (id) => {
    const confirm = window.confirm("🗑️ Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));

      // Update Stats
      const postToDelete = posts.find((p) => p._id === id);
      const likesLoss = postToDelete?.likes?.length || 0;
      const commentsLoss = postToDelete?.comments?.length || 0;

      setStats((prev) => ({
        ...prev,
        posts: prev.posts - 1,
        likes: prev.likes - likesLoss,
        comments: prev.comments - commentsLoss,
      }));
    } catch (err) {
      console.error("Delete post error:", err);
    }
  };


  const handleDeleteComment = async (postId, commId) => {
    const confirm = window.confirm("❗Delete this comment?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/posts/${postId}/comment/${commId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id === postId) {
            const newComments = p.comments.filter((c) => c._id !== commId);
            return { ...p, comments: newComments };
          }
          return p;
        })
      );
      setStats((prev) => ({ ...prev, comments: prev.comments - 1 }));
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 🔹 Header */}
      <div className="bg-indigo-100 p-6 rounded-lg mb-6 flex justify-between items-center flex-wrap">
        <div>
          <h2 className="text-3xl font-bold">👋 Welcome, {user?.username}</h2>
          <p className="text-gray-600">📧 {user?.email}</p>
        </div>
        {/* <div className="flex gap-2 mt-4 sm:mt-0">
          <Link to="/edit-profile" className="bg-indigo-500 text-white px-4 py-2 rounded">Edit Info</Link>
          <Link to="/change-password" className="bg-red-500 text-white px-4 py-2 rounded">Change Password</Link>
        </div> */}
      </div>

      {/* 🔸 Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-200 p-4 rounded text-center shadow">
          <p className="text-xl font-semibold">{stats.posts}</p>
          <p>📝 Total Posts</p>
        </div>
        <div className="bg-pink-200 p-4 rounded text-center shadow">
          <p className="text-xl font-semibold">{stats.likes}</p>
          <p>❤️ Total Likes</p>
        </div>
        <div className="bg-green-200 p-4 rounded text-center shadow">
          <p className="text-xl font-semibold">{stats.comments}</p>
          <p>💬 Total Comments</p>
        </div>
      </div>

      {/* 🔹 Add Post Button */}
      <div className="mb-6">
        <Link to="/create-post" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition">+ Create New Post</Link>
      </div>

      {/* 🔸 My Posts Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {posts.map(post => (
          <div key={post._id} className="border rounded shadow p-4 bg-white">
            <h3 className="font-bold text-lg mb-1 truncate">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">📚 {post.category}</p>
            {post.image && (
              <img
                src={`${API_URL.replace("/api", "")}/uploads/${post.image}`}
                alt=""
                className="mb-2 w-full h-40 object-cover rounded"
              />
            )}
            <div className="flex gap-2 mb-2">
              <Link to={`/edit/${post._id}`} className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</Link>
              <button onClick={() => handleDeletePost(post._id)} className="bg-red-500 px-3 py-1 rounded text-sm text-white">Delete</button>
            </div>

            {/* 🧾 Comments */}
            <div>
              {post.comments?.length > 0 && <p className="mb-1 font-medium">💬 Comments:</p>}
              {post.comments?.map(c => (
                <div key={c._id} className="flex justify-between items-center bg-gray-100 p-1 rounded mb-1">
                  <span className="text-sm">{c.text}</span>
                  <button onClick={() => handleDeleteComment(post._id, c._id)} className="text-red-600 text-xs">✖</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 📊 Graphs */}
      <GraphStats />
      <ProgressStats />
    </div>
  );
};

export default Dashboard;
