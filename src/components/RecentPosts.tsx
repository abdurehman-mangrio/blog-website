import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from './BlogCard';

const RecentPosts: React.FC = () => {
  const { getRecentPosts } = useBlog();
  const recentPosts = getRecentPosts(4);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-bold text-primary-800">Recent Posts</h3>
        <Link to="/" className="text-accent-600 hover:text-accent-700 text-sm">
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <BlogCard key={post.id} post={post} variant="compact" />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;