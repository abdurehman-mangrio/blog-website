import React from 'react';
import { format } from 'date-fns';
import { Comment as CommentType } from '../types';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { author, authorAvatar, content, createdAt } = comment;
  
  return (
    <div className="flex space-x-4 py-6 animate-fade-in">
      <div className="flex-shrink-0">
        {authorAvatar ? (
          <img 
            src={authorAvatar} 
            alt={author} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent-200 flex items-center justify-center text-accent-700 font-medium">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <h4 className="font-medium text-primary-800">{author}</h4>
            <span className="mx-2 text-gray-300">•</span>
            <time className="text-sm text-primary-500">
              {format(new Date(createdAt), 'MMM d, yyyy')}
            </time>
          </div>
          <p className="text-primary-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;