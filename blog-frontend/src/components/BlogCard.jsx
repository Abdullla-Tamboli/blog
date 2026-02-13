import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const {
    _id,
    title,
    content,
    image,
    author,
    createdAt,
    category,
    likes,
    comments,
  } = post;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105">
      {/* Post Image */}
      {image && (
        <img
          src={`http://localhost:5000/uploads/${image}`}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => (e.target.src = "/default-post.jpg")}
        />
      )}

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {content.length > 120 ? content.slice(0, 120) + '...' : content}
        </p>

        {/* Meta Info */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <span>👤 {author?.username || "Anonymous"}</span>
          <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between mt-1 text-sm">
          <span className="text-indigo-600 font-medium capitalize">
            📚 {category}
          </span>
          <div className="flex gap-3 text-pink-600 font-medium">
            <span>❤️ {likes?.length || 0}</span>
            <span>💬 {comments?.length || 0}</span>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-4 text-right">
          <Link
            to={`/post/${_id}`}
            className="text-white bg-indigo-600 px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
