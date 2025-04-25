import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import CategoryFilter from '../components/CategoryFilter';
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';
import '../styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
// Get top posts with maximum likes

  // Fetch posts
  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sorted);
        setFilteredPosts(sorted);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  // Filter based on category + search
  useEffect(() => {
    let tempPosts = [...posts];

    if (selectedCategory) {
      tempPosts = tempPosts.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      tempPosts = tempPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(tempPosts);
  }, [selectedCategory, searchQuery, posts]);

  // Get top 5 most liked posts
  const getPopularPosts = () => {
    return [...posts]
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 2);
  };

  return (
    <>
<Hero/>
      <div className="home-container">
        <div className="main-content">

          {/* Filters */}
          <div className="filter-bar">
            <CategoryFilter onSelectCategory={setSelectedCategory} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>

          {/* Most Liked Section */}
          {getPopularPosts().length > 0 && (
            <div className="featured-section">
              <h2>🔥 Most Liked Posts</h2>
              <hr />
              <div className="featured-grid">
                {getPopularPosts().map(post => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}
            <hr />
          {/* All Posts */}
          <h2 id="blogs" className="section-title">📰 Latest Blogs</h2>
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map(post => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}

        </div>
      </div>
      </>
  );
};

export default Home;
