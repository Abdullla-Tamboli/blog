import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      console.log("Fetched post:", res.data);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to comment');

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText('');
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login required to like');

        setIsLiking(true);
        try {
          const res = await axios.put(
      `http://localhost:5000/api/posts/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
      setLikeCount(res.data.likes);
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setIsLiking(false);
    }
  };

  if (!post) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={`http://localhost:5000/uploads/${post.image}`}
        alt={post.title}
        className="w-full h-80 object-cover rounded shadow mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 text-sm">
      Author: 
      <span className="font-semibold text-blue-600 ml-2">
        {post.author?.username || "Unknown Author"}
    </span>
    <br />
 on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          ❤️ Like ({likeCount})
        </button>
      </div>

      {/* Render content with code blocks */}
      {post.content.split(/```/g).map((block, index) =>
        index % 2 === 1 ? (
          <pre
            key={index}
            className="bg-gray-900 text-white font-mono p-4 rounded my-4 overflow-x-auto"
          >
            <code>{block}</code>
          </pre>
        ) : (
          <p key={index} className="text-gray-800 mb-4 text-lg leading-relaxed">
            {block}
          </p>
        )
      )}

      <hr className="my-6 border-gray-300" />

      {/* Comments */}
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div key={index} className="mb-3 p-3 bg-gray-100 rounded shadow-sm">
            <p className="text-gray-800">{comment.text}</p>
            <p className="text-sm text-gray-500 mt-1">
            — {comment.user?.username || "Anonymous"}
</p>

          </div>
        ))
      ) : (
        <p className="text-gray-600 mb-4">No comments yet. Be the first!</p>
      )}

      {/* Comment Form */}
      {userLoggedIn && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border border-gray-300 rounded p-3 mb-2"
            rows="3"
            placeholder="Write a comment..."
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default PostView;
