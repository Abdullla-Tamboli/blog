import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No posts yet.</p>
      )}
    </div>
  );
};

export default Home;
