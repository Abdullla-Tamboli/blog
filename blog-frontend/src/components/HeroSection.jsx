import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className=" py-16 px-6 text-center  ">
      <h1 className="text-4xl md:text-5xl font-bold text-violet-700 mb-4">
        Welcome to BlogVerse 
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Share your <span className="text-green-700 font-bold">voice,</span> explore <span className="text-green-700 font-bold">ideas</span>, and connect through stories.
      </p>
      <Link
        to="/create-post"
        className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg hover:bg-indigo-700 transition"
      >
        Start Writing
      </Link>
    </div>
  );
};

export default HeroSection;
