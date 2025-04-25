import React from 'react';

const categories = [
  'Web Development',
  'Cloud Computing',
  'Data Science',
];

const CategoryFilter = ({ onSelectCategory }) => {
  return (
    <select onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;
