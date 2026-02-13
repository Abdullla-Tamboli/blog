// src/pages/PostEdit.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const categories = [
    '🌿 Nature',
    '💻 Technology',
    '🤖 AI',
    'Data Science',
    'Web Development',
    'Cybersecurity',
    'Cloud Computing',
    '📱 Mobile',
    '✍️ Personal Blogs',
    '🔬 Science',
    '🎨 Design',
    '📚 Education',
  ];
  // 🔍 Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data;
        setPost(p);
        setTitle(p.title);
        setContent(p.content);
        setCategory(p.category);
        setPreview(`${API_URL.replace("/api", "")}/uploads/${p.image}`);
      } catch (err) {
        console.error("Fetch post error:", err);
      }
    };
    fetchPost();
  }, [id, token]);

  // 📤 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${API_URL}/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border px-4 py-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Post content"
          className="w-full border px-4 py-2 rounded"
          required
        ></textarea>

        {/* 📸 Image Preview & Upload */}
        {preview && (
          <div className="mb-2">
            <p className="text-sm text-gray-500">Current Image:</p>
            <img src={preview} alt="Post" className="h-40 rounded shadow" />
          </div>
        )}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default PostEdit;
