import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogCard = ({ post, variant = 'default' }) => {
  const {
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    readingTime,
    createdAt,
  } = post;

  if (variant === 'featured') {
    return (
      <div className="relative group overflow-hidden rounded-xl h-[500px] animate-fade-in">
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-transparent opacity-80"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col">
          <div className="mb-4">
            <Link
              to={`/category/${category.slug}`}
              className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block hover:bg-accent-600 transition-colors"
            >
              {category.name}
            </Link>
          </div>
          <Link to={`/post/${slug}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 group-hover:text-accent-300 transition-colors">
              {title}
            </h2>
          </Link>
          <p className="text-primary-100 mb-6 line-clamp-2">{excerpt}</p>
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div>
              <p className="text-white font-medium">{author.name}</p>
              <div className="flex text-primary-200 text-sm">
                <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
                <span className="mx-2">·</span>
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-4 items-start animate-fade-in">
        <Link to={`/post/${slug}`} className="shrink-0 w-24 h-24 overflow-hidden rounded-md">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="flex-1">
          <Link
            to={`/category/${category.slug}`}
            className="text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors mb-1 inline-block"
          >
            {category.name}
          </Link>
          <Link to={`/post/${slug}`}>
            <h3 className="font-serif font-bold text-primary-800 hover:text-primary-600 transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
          </Link>
          <div className="flex text-primary-500 text-xs">
            <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
            <span className="mx-2">·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <Link to={`/post/${slug}`} className="block overflow-hidden h-48 relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <Link
            to={`/category/${category.slug}`}
            className="text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors"
          >
            {category.name}
          </Link>
        </div>
        <Link to={`/post/${slug}`}>
          <h2 className="font-serif font-bold text-xl text-primary-800 hover:text-primary-600 transition-colors mb-2">
            {title}
          </h2>
        </Link>
        <p className="text-primary-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="text-primary-800 font-medium text-sm">{author.name}</p>
            <div className="flex text-primary-500 text-xs">
              <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
              <span className="mx-2">·</span>
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;