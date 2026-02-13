import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: categories[0], // default category
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You're not logged in. Please log in to create a post.");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    if (image) data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Post created successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || '❌ Failed to create post');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">📝 Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="content"
          placeholder="Write your content... (use ``` for code blocks)"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded py-2 px-3"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium"
        >
          🚀 Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
