// components/ShareModal.jsx
import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedin, FaWhatsapp, FaCopy, FaTimes } from "react-icons/fa";

const ShareModal = ({ post, onClose }) => {
  const postUrl = `https://yourdomain.com/post/${post._id}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const title = encodeURIComponent(post.title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${title} - ${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${title}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-red-500">
          <FaTimes size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Share</h2>

        <div className="flex items-center border rounded px-3 py-2 mb-4">
          <input
            type="text"
            value={`Check out this blog: ${postUrl}`}
            readOnly
            className="flex-1 outline-none"
          />
          <button onClick={copyToClipboard} className="ml-2 text-gray-500 hover:text-black">
            <FaCopy />
          </button>
        </div>

        <div className="flex gap-4 justify-center text-xl">
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400"><FaTwitter /></a>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600"><FaFacebookF /></a>
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700"><FaLinkedin /></a>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500"><FaWhatsapp /></a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
