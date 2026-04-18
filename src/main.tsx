import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { BlogProvider } from './context/BlogContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BlogProvider>
        <App />
      </BlogProvider>
    </BrowserRouter>
  </StrictMode>
);