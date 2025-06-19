import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  console.log("Post ID for read more:", post._id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      {/* Post Image */}
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Post Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
          {post.title}
        </h2>

        {/* Short Content Preview */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {post.content.length > 120
            ? post.content.slice(0, 120) + '...'
            : post.content}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 mt-2">
          <span>👤 {post.author?.username || 'Anonymous'}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between items-center mt-1 text-sm">
          <span className="text-indigo-600 font-medium capitalize">
            📚 {post.category}
          </span>
          <span className="text-pink-600">❤️ {post.likes?.length || 0}</span>
        </div>

        {/* Read More Button */}
        <div className="text-right mt-2">
          <Link to={`/post/${post._id}`}>Read More</Link>

        </div>
      </div>
    </div>
  );
};

export default BlogCard;
