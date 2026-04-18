import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import { ArrowLeft, Search } from 'lucide-react';
import { Post } from '../types';

const SearchPage: React.FC = () => {
  const { posts, categories } = useBlog();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    if (!query && !selectedCategory) {
      setResults([]);
      return;
    }

    let filtered = [...posts];

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercasedQuery) ||
          post.excerpt.toLowerCase().includes(lowercasedQuery) ||
          post.content.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category.slug === selectedCategory
      );
    }

    setResults(filtered);
  }, [query, selectedCategory, posts]);

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
          Search Articles
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-primary-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="Search by keyword, title, or content..."
                />
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-primary-800 mb-2">Filter by category:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      !selectedCategory
                        ? 'bg-accent-500 text-white'
                        : 'bg-gray-100 text-primary-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category.slug
                          ? 'bg-accent-500 text-white'
                          : 'bg-gray-100 text-primary-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {query || selectedCategory ? (
                <>
                  <h3 className="font-medium text-xl text-primary-800 mb-4">
                    {results.length > 0
                      ? `Found ${results.length} result${results.length === 1 ? '' : 's'}`
                      : 'No results found'}
                  </h3>
                  
                  {results.length > 0 ? (
                    <div className="space-y-6">
                      {results.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-primary-600 mb-4">
                        No articles match your search criteria.
                      </p>
                      <button
                        onClick={() => {
                          setQuery('');
                          setSelectedCategory('');
                        }}
                        className="text-accent-600 hover:text-accent-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-primary-600 mb-2">
                    Enter keywords to search for articles
                  </p>
                  <p className="text-primary-500 text-sm">
                    Or select a category to browse
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;