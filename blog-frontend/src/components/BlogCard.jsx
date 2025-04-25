import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import '../styles/BlogCard.css';

const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(user && post.likes.includes(user.id));

  const handleReadMore = () => {
    navigate(`/post/${post._id}`);
  };

  const handleLike = async () => {
    if (!user) {
      alert('You must be logged in to like posts!');
      return;
    }

    try {
      const res = await axios.put(`/posts/${post._id}/like`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setLiked(!liked);
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleComment = () => {
    navigate(`/post/${post._id}#comments`);
  };

  return (
    <div className="blog-grid">
      <div className='blog-card'>
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="blog-card-image"
        />
      )}
      <div className="blog-card-content">
        <h2>{post.title}</h2>
        <p>{post.content.slice(0, 150)}...</p>
        <p className="blog-card-category">Category: {post.category}</p>

        <div className="blog-card-buttons">
          <button onClick={handleLike}>
            {liked ? '❤️ Liked' : '🤍 Like'} ({likes})
          </button>
          <button onClick={handleComment}>
            💬 Comment
          </button>
          <button onClick={handleReadMore}>
            📖 Read More
          </button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default BlogCard;
