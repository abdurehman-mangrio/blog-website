import React, { createContext, useContext, useState } from 'react';
import { posts as initialPosts, categories as initialCategories } from '../data/posts';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [categories] = useState(initialCategories);

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const getPostBySlug = (slug) => {
    return posts.find((post) => post.slug === slug);
  };

  const getPostsByCategory = (categorySlug) => {
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

  const addComment = (postId, comment) => {
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