import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://blog-application-vh8n.onrender.com/api";

const ProgressStats = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchStats();
  }, [user.id, token]);

  const getMax = (key) => {
    const values = posts.map((post) => post[key]?.length || 0);
    return Math.max(...values, 1); // avoid 0 division
  };

  const maxLikes = getMax("likes");
  const maxComments = getMax("comments");

  return (
    <div className="my-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 Engagement Insights</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet to show progress.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => {
            const likeCount = post.likes.length;
            const commentCount = post.comments.length;

            const likePercent = Math.round((likeCount / maxLikes) * 100);
            const commentPercent = Math.round((commentCount / maxComments) * 100);

            return (
              <div
                key={post._id}
                className="p-5 rounded-lg shadow-md bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 truncate">📝 {post.title}</h3>

                {/* Likes Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>❤️ Likes</span>
                    <span>{likeCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${likePercent}%` }}
                    />
                  </div>
                </div>

                {/* Comments Progress */}
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>💬 Comments</span>
                    <span>{commentCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                      style={{ width: `${commentPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProgressStats;
