import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

const heroData = [
  { img: "/luke-chesser-JKUTrJ4vK00-unsplash.jpg", bg: "#5ba89d" },
  { img: "/growtika-k5AxNUn4c5o-unsplash.jpg", bg: "#69aca0" },
  { img: "/DS1.jpg", bg: "#66b2a6" },
  { img: "/CC2.jpg", bg: "#66b2a6" },
  { img: "/blog.jpg", bg: "#66b2a6" }
];

const BloggerHero = () => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`blogger-hero ${animate ? "fade-in" : ""}`}
      style={{ backgroundColor: heroData[current].bg }}
    >
      <div className="hero-content-wrapper">
        <div className="hero-text">
          <h1>Publish your passions, your way</h1>
          <p>Create a unique and beautiful blog easily.</p>
          <Link to="/create">
            <button className="create-btn">CREATE YOUR BLOG</button>
          </Link>
        </div>
        <div className="hero-preview fade-img">
          <img
            key={heroData[current].img}
            src={heroData[current].img}
            alt="blog preview"
          />
        </div>
      </div>
    </div>
  );
};

export default BloggerHero;
