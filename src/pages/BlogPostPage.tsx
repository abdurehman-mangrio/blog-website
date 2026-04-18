import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Calendar, Edit, Bookmark } from 'lucide-react';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import CategoryList from '../components/CategoryList';
import RecentPosts from '../components/RecentPosts';
import ProgressBar from '../components/ProgressBar';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = useBlog();
  const navigate = useNavigate();
  const [post, setPost] = useState(getPostBySlug(slug || ''));
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!post) {
      navigate('/not-found', { replace: true });
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-gray-50 pb-12 animate-fade-in">
      <ProgressBar />
      
      {/* Header */}
      <div className="relative h-[60vh] bg-primary-900">
        <div className="absolute inset-0">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-primary-900/60"></div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto px-4 md:px-6 pb-12">
            <Link 
              to="/" 
              className="inline-flex items-center text-white hover:text-accent-300 transition-colors mb-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <div className="inline-block bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {post.category.name}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center text-white">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center text-primary-200 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                  <span className="mx-2">·</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary-800 prose-p:text-primary-700 prose-a:text-accent-600 prose-a:no-underline hover:prose-a:text-accent-700">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/edit/${post.slug}`}
                    className="inline-flex items-center text-primary-700 hover:text-accent-600 transition-colors"
                  >
                    <Edit size={18} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={toggleBookmark}
                    className={`inline-flex items-center transition-colors ${
                      isBookmarked ? 'text-accent-600' : 'text-primary-700 hover:text-accent-600'
                    }`}
                  >
                    <Bookmark size={18} className="mr-1" fill={isBookmarked ? 'currentColor' : 'none'} />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            
            {/* Author Bio */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-800 mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-primary-700 mb-4">{post.author.bio}</p>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      View all posts
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="font-serif text-xl font-bold text-primary-800 mb-6">
                Comments ({post.comments.length})
              </h3>
              
              <div className="space-y-1 mb-8">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p className="text-primary-600">No comments yet. Be the first to share your thoughts!</p>
                )}
              </div>
              
              <CommentForm postId={post.id} />
            </div>
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

export default BlogPostPage;