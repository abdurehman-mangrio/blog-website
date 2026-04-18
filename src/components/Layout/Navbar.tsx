import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, PenLine } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { categories } = useBlog();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="font-serif text-2xl font-bold text-primary-800 transition-all duration-200 hover:text-primary-600"
          >
            Thoughtscape
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={`font-medium transition-colors hover:text-accent-500 ${
                    location.pathname === `/category/${category.slug}`
                      ? 'text-accent-600'
                      : isScrolled || location.pathname !== '/'
                      ? 'text-primary-800'
                      : 'text-primary-800'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className={`p-2 rounded-full transition-colors hover:bg-gray-100 ${
                  isScrolled || location.pathname !== '/'
                    ? 'text-primary-800'
                    : 'text-primary-800'
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </Link>
              <Link
                to="/create"
                className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                <PenLine size={18} />
                <span>Write</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-800"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t mt-3 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="font-medium py-2 text-primary-800 hover:text-accent-500 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <div className="border-t pt-3 mt-3 flex flex-col space-y-3">
                <Link
                  to="/search"
                  className="flex items-center space-x-2 text-primary-800 hover:text-accent-500 transition-colors py-2"
                >
                  <Search size={20} />
                  <span>Search</span>
                </Link>
                <Link
                  to="/create"
                  className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md transition-colors duration-200 w-fit"
                >
                  <PenLine size={18} />
                  <span>Write new post</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;