import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import RecentPosts from '../components/RecentPosts';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostsByCategory, categories } = useBlog();
  
  const category = categories.find(cat => cat.slug === slug);
  const posts = getPostsByCategory(slug || '');

  return (
    <div className="bg-gray-50 pt-24 pb-12 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-accent-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-4">
          {category ? category.name : 'All Categories'}
        </h1>
        
        <p className="text-primary-600 mb-8 max-w-3xl">
          {category 
            ? `Explore our collection of articles about ${category.name.toLowerCase()}.` 
            : 'Browse all articles across different categories.'}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium text-primary-800 mb-2">No posts found</h3>
                <p className="text-primary-600 mb-4">
                  There are no articles in this category yet.
                </p>
                <Link 
                  to="/"
                  className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Browse all posts
                </Link>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <CategoryList />
            <RecentPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;