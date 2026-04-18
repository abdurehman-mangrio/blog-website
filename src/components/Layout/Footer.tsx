import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

const Footer: React.FC = () => {
  const { categories } = useBlog();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              Thoughtscape
            </Link>
            <p className="text-primary-200 mb-6">
              Exploring ideas at the intersection of technology, design, and human experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-primary-200 hover:text-white transition-colors">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-primary-200 hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-primary-200 mb-4">Stay updated with our latest articles.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-primary-800 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 text-white"
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-800 pt-6 text-center text-primary-300">
          <p>&copy; {currentYear} Thoughtscape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;