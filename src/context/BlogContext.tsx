import React, { createContext, useContext, useState } from 'react';
import { Post, Category } from '../types';
import { posts as initialPosts, categories as initialCategories } from '../data/posts';

interface BlogContextType {
  posts: Post[];
  categories: Category[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostsByCategory: (categorySlug: string) => Post[];
  getFeaturedPosts: () => Post[];
  getRecentPosts: (limit?: number) => Post[];
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories] = useState<Category[]>(initialCategories);

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((post) => post.slug === slug);
  };

  const getPostsByCategory = (categorySlug: string) => {
    return posts.filter((post) => post.category.slug === categorySlug);
  };

  const getFeaturedPosts = () => {
    return posts.filter((post) => post.featured);
  };

  const getRecentPosts = (limit = 5) => {
    return [...posts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            ...comment,
            id: `comment-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        addPost,
        updatePost,
        deletePost,
        getPostBySlug,
        getPostsByCategory,
        getFeaturedPosts,
        getRecentPosts,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};