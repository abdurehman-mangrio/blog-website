import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const { getFeaturedPosts, getRecentPosts, categories } = useBlog();
  
  const featuredPost = getFeaturedPosts()[0];
  const recentPosts = getRecentPosts(6).filter(post => post.id !== featuredPost?.id);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-primary-900 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Thoughtscape
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl animate-slide-up" style={{animationDelay: '100ms'}}>
              Exploring ideas at the intersection of technology, design, and human experience. 
              Dive into in-depth articles crafted to inspire and inform.
            </p>
            <Link 
              to="/category/technology" 
              className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md transition-colors animate-slide-up"
              style={{animationDelay: '200ms'}}
            >
              Explore Topics <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-800">
              Featured Post
            </h2>
          </div>
          {featuredPost && <BlogCard post={featuredPost} variant="featured" />}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-800">
              Recent Articles
            </h2>
            <Link to="/category/all" className="text-accent-600 hover:text-accent-700 flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-800 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <h3 className="font-serif text-xl font-bold text-primary-800 group-hover:text-accent-600 transition-colors">
                  {category.name}
                </h3>
                <div className="flex justify-end mt-4">
                  <ArrowRight size={20} className="text-accent-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-primary-200 mb-6">
              Get the latest articles and insights delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md bg-primary-700 border border-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-500 text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;