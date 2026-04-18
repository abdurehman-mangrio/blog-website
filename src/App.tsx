import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import CreateEditPostPage from './pages/CreateEditPostPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<BlogPostPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/create" element={<CreateEditPostPage />} />
        <Route path="/edit/:slug" element={<CreateEditPostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;