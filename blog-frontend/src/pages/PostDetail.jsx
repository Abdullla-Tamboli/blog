import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // added navigate
import axios from '../api/axios';
import '../styles/PostDetail.css';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate(); // init navigate

  const [post, setPost] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `/posts/${id}/comment`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data.comment],
      }));
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Post deleted!');
      navigate('/');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete post.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      {post.image && (
        <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
      )}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Author:</strong> {post.author.username}
      </p>

      {/* ❤️ Likes Count */}
      <p>
        <strong>❤️</strong> {post.likes.length}
      </p>

      {/* 💬 Show/Hide Comment Box */}
      <button onClick={() => setShowCommentBox(!showCommentBox)}>
        {showCommentBox ? 'Hide Comments' : '💬 Comment'}
      </button>

      {showCommentBox && (
  user ? (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <textarea
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="3"
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  ) : (
    <p className="login-reminder">Please <a href="/login">log in</a> to comment.</p>
  )
)}


      {/* 🗨️ Display Comments */}
      {post.comments.length > 0 && (
        <div className="comment-list">
          <h3>Comments</h3>
          <hr />
          {post.comments.map((c, index) => (
  <div key={index} className="comment">
    <strong>{c.user?.username || 'Unknown'}</strong>: {c.text}
  </div>
))}

        </div>
      )}

      {/* ✏️ 🗑️ Author Actions */}
      {user && user.id === post.author._id && (
        <div className="author-actions">
          <button onClick={() => navigate(`/edit/${post._id}`)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
