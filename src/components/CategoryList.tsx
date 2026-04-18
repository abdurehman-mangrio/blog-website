import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const CategoryList: React.FC = () => {
  const { categories } = useBlog();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-fade-in">
      <h3 className="text-xl font-serif font-bold text-primary-800 mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="px-3 py-1 bg-gray-100 text-primary-700 rounded-full text-sm hover:bg-accent-100 hover:text-accent-700 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;