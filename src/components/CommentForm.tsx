import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { addComment } = useBlog();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      addComment(postId, {
        author,
        content,
      });
      
      setAuthor('');
      setContent('');
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-fade-in">
      <h3 className="text-xl font-serif font-bold text-primary-800 mb-4">Leave a comment</h3>
      
      {isSuccess && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 animate-fade-in">
          Your comment has been posted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-primary-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="Your name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-primary-700 mb-1">
            Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[120px]"
            placeholder="Share your thoughts..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;