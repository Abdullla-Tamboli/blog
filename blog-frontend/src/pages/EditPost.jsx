import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
        setPreviewUrl(`/uploads/${res.data.image}`);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);
  
    try {
      const res = await axios.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Post updated successfully!');
      setTimeout(() => navigate(`/post/${id}`), 1500); // Navigate after success
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.response?.data?.msg || 'Failed to update post');
    }
  };
  
  return (
    <div>
      <h2>Edit Post</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleUpdate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Data Science">Data Science</option>
        </select>

        {/* Image Preview & Upload */}
        {previewUrl && (
          <div>
            <p>Current Image Preview:</p>
            <img src={previewUrl} alt="Preview" style={{ width: '200px', marginBottom: '10px' }} />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
