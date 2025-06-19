import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    };

    fetchUserPosts();
  }, [user, token, navigate]);

  const handleDelete = async (postId) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Your Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">You haven’t created any posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow rounded-xl overflow-hidden">
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600">
                  📅 {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-indigo-600">📚 {post.category}</p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/post/${post._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${post._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
