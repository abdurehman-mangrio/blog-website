import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center animate-fade-in">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="font-serif text-9xl font-bold text-primary-800 mb-4">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-primary-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Home size={20} className="mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center border border-primary-300 hover:bg-primary-100 text-primary-700 px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;