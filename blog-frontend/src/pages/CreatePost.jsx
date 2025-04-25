import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/CreatePost.css';


const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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
      const response = await axios.post('http://localhost:5000/api/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Post created:', response.data);
      alert('Post created successfully!'); // Display a pop-up
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Create post error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your content..."
          value={formData.content}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Data Science">Data Science</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;