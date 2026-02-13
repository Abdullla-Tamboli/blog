import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import HeroSection from '../components/HeroSection';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // const categories = ['All', 'Cloud Computing', 'Data Science', 'Web Development', 'Cybersecurity'];
const categories = [
  'All',
  '🌿 Nature',
  '💻 Technology',
  '🤖 AI',
  'Data Science',
  'Web Development',
  'Cybersecurity',
  'Cloud Computing',
  '📱 Mobile',
  '✍️ Personal Blogs',
  '🔬 Science',
  '🎨 Design',
  '📚 Education',
];
  // Fetch on category change
  useEffect(() => {
    const fetch = async () => {
      try {
        const endpoint = selectedCategory === 'All' ? '/posts' : `/posts/category/${selectedCategory}`;
        const res = await axios.get(`${API_URL}${endpoint}`);
        setPosts(res.data);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [selectedCategory]);

  // Filter by search
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const featured = [...posts].sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <HeroSection />

      {/* Category Filter + Search */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search posts..."
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🔥 Featured Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.length > 0 ? (
            featured.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-gray-500">No featured posts yet.</p>
          )}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📰 Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">No posts found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-full font-semibold text-sm transition ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-indigo-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
