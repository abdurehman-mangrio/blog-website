import { Post } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2025',
    slug: 'future-web-development-2025',
    excerpt: 'Explore the emerging trends and technologies that will shape web development in the coming years.',
    content: `
# The Future of Web Development: What to Expect in 2025

Web development continues to evolve at a rapid pace, with new technologies, frameworks, and methodologies emerging regularly. As we look ahead to 2025, several trends stand out as particularly transformative for the industry.

## AI-Assisted Development

Artificial intelligence tools are revolutionizing how developers work. From code completion to bug detection and even automated testing, AI is becoming an indispensable part of the development workflow. By 2025, we expect to see even more sophisticated AI assistants that can understand complex requirements and generate substantial portions of applications.

## WebAssembly Dominance

WebAssembly (Wasm) has been gaining traction for years, but by 2025, it's likely to become a standard part of web development. Its near-native performance capabilities enable complex applications that were previously impossible in browsers. Look for more languages to compile to Wasm and for frameworks to incorporate it natively.

## Edge Computing Goes Mainstream

The edge computing paradigm pushes processing closer to data sources, reducing latency and improving performance. As edge networks expand, we'll see more web applications architected to distribute processing across the cloud, edge, and client. This shift will enable more responsive and reliable web experiences, especially for users in regions with less reliable connectivity.

## Conclusion

The web development landscape of 2025 will offer exciting opportunities for creating faster, more intelligent, and more accessible applications. Developers who stay ahead of these trends will be well-positioned to build the next generation of web experiences.
    `,
    coverImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: {
      id: 'author1',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Senior Developer with 10+ years of experience building web applications.',
    },
    category: {
      id: 'cat1',
      name: 'Technology',
      slug: 'technology',
    },
    readingTime: '5 min read',
    createdAt: '2025-01-15T08:30:00Z',
    updatedAt: '2025-01-15T08:30:00Z',
    featured: true,
    comments: [
      {
        id: 'comment1',
        author: 'Jamie Smith',
        authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'Great insights! I\'m particularly excited about the advances in WebAssembly.',
        createdAt: '2025-01-16T10:24:00Z',
      },
      {
        id: 'comment2',
        author: 'Taylor Johnson',
        authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'The edge computing predictions seem spot on. I\'ve already seen a shift toward this in my company.',
        createdAt: '2025-01-16T14:32:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Mastering React Hooks: Advanced Patterns for State Management',
    slug: 'mastering-react-hooks-advanced-patterns',
    excerpt: 'Take your React applications to the next level with these advanced hook patterns.',
    content: `
# Mastering React Hooks: Advanced Patterns for State Management

React Hooks revolutionized how we manage state and side effects in React applications. While the basic hooks like useState and useEffect are powerful on their own, combining them in specific patterns can lead to even more maintainable and performant code.

## The Reducer Pattern with useReducer

The useReducer hook provides a Redux-like state management solution within React components. This pattern is particularly useful for complex state logic where multiple values are interdependent or when the next state depends on the previous one.

\`\`\`jsx
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
\`\`\`

## Custom Hooks for Reusable Logic

Creating custom hooks allows you to extract component logic into reusable functions. This pattern is especially valuable for sharing behavior between components without duplicating code.

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue];
}
\`\`\`

## Conclusion

Mastering these advanced React hook patterns can significantly improve your application's architecture and developer experience. As hooks continue to evolve, staying current with these patterns will help you write more elegant and maintainable React code.
    `,
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: {
      id: 'author2',
      name: 'Samantha Lee',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'React specialist and open source contributor.',
    },
    category: {
      id: 'cat2',
      name: 'React',
      slug: 'react',
    },
    readingTime: '8 min read',
    createdAt: '2025-01-10T14:45:00Z',
    updatedAt: '2025-01-12T09:15:00Z',
    comments: [
      {
        id: 'comment3',
        author: 'Chris Davis',
        authorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'This article helped me understand useReducer so much better. Thank you!',
        createdAt: '2025-01-11T11:24:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications: A Comprehensive Guide',
    slug: 'building-accessible-web-applications',
    excerpt: 'Learn how to make your web applications usable by everyone, regardless of ability.',
    content: `
# Building Accessible Web Applications: A Comprehensive Guide

Web accessibility is not just a nice-to-have feature—it's an essential aspect of modern web development. Creating accessible applications ensures that people with disabilities can use your product, expands your potential user base, and often helps you avoid legal complications.

## Semantic HTML: The Foundation of Accessibility

Using the right HTML elements for their intended purpose is the first step in building accessible applications. Semantic HTML provides built-in accessibility features that assistive technologies can leverage.

For example, using \`<button>\` elements for clickable actions instead of styled \`<div>\` elements ensures that keyboard users can navigate your application and screen readers can properly identify interactive elements.

## ARIA Attributes for Enhanced Accessibility

When HTML semantics aren't enough, ARIA (Accessible Rich Internet Applications) attributes can provide additional information to assistive technologies.

\`\`\`html
<div 
  role="alert" 
  aria-live="assertive" 
  aria-atomic="true"
>
  Form submitted successfully!
</div>
\`\`\`

This example uses ARIA attributes to create an alert that will be announced by screen readers when it appears on the page.

## Keyboard Navigation

Many users navigate websites using only their keyboard. Ensuring that all interactive elements are focusable and clearly indicate their focus state is crucial for these users.

\`\`\`css
:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
}
\`\`\`

Never remove focus indicators without providing suitable alternatives, as they are essential for keyboard users to track their position on the page.

## Conclusion

Building accessible web applications is both a technical and ethical imperative. By incorporating these practices into your development workflow, you'll create experiences that are usable by a wider audience and demonstrate your commitment to inclusive design.
    `,
    coverImage: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: {
      id: 'author3',
      name: 'Jordan Taylor',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Accessibility advocate and frontend engineer.',
    },
    category: {
      id: 'cat3',
      name: 'Accessibility',
      slug: 'accessibility',
    },
    readingTime: '6 min read',
    createdAt: '2025-01-05T10:20:00Z',
    updatedAt: '2025-01-05T10:20:00Z',
    comments: [
      {
        id: 'comment4',
        author: 'Morgan Williams',
        authorAvatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'As someone who relies on screen readers, I appreciate articles like this raising awareness about accessibility.',
        createdAt: '2025-01-06T09:14:00Z',
      },
      {
        id: 'comment5',
        author: 'Robin Chen',
        content: 'Great practical tips! I\'ll be implementing these in my next project.',
        createdAt: '2025-01-07T15:30:00Z',
      },
    ],
  },
  {
    id: '4',
    title: 'Performance Optimization Techniques for Modern Web Apps',
    slug: 'performance-optimization-techniques',
    excerpt: 'Discover practical strategies to make your web applications faster and more efficient.',
    content: `
# Performance Optimization Techniques for Modern Web Apps

In today's competitive digital landscape, performance isn't just a technical concern—it's a critical factor that directly impacts user experience, conversion rates, and even search engine rankings. Let's explore some effective techniques for optimizing web application performance.

## Code Splitting and Lazy Loading

Modern bundlers like Webpack, Rollup, and Vite support code splitting, allowing you to break your application into smaller chunks that load on demand. This approach significantly reduces initial load times by deferring the loading of non-critical resources.

\`\`\`jsx
// React example with lazy loading
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

## Image Optimization

Images often account for the majority of a page's weight. Implementing proper image optimization can dramatically improve load times:

1. Use modern formats like WebP or AVIF that offer better compression
2. Implement responsive images with the \`srcset\` attribute
3. Lazy load images that are below the fold

\`\`\`html
<img 
  src="small.jpg" 
  srcset="medium.jpg 1000w, large.jpg 2000w" 
  sizes="(max-width: 600px) 100vw, 50vw" 
  loading="lazy" 
  alt="Description" 
/>
\`\`\`

## Caching Strategies

Implementing effective caching strategies reduces server load and improves subsequent page loads:

1. Set appropriate Cache-Control headers for static assets
2. Implement service workers for offline capabilities
3. Use versioned file names or query parameters to invalidate caches when necessary

## Conclusion

Performance optimization is an ongoing process rather than a one-time task. By implementing these techniques and regularly measuring their impact using tools like Lighthouse and WebPageTest, you can ensure your application delivers a fast and smooth experience for all users.
    `,
    coverImage: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: {
      id: 'author1',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Senior Developer with 10+ years of experience building web applications.',
    },
    category: {
      id: 'cat4',
      name: 'Performance',
      slug: 'performance',
    },
    readingTime: '7 min read',
    createdAt: '2024-12-28T16:10:00Z',
    updatedAt: '2024-12-29T11:45:00Z',
    comments: [],
  },
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Technology', slug: 'technology' },
  { id: 'cat2', name: 'React', slug: 'react' },
  { id: 'cat3', name: 'Accessibility', slug: 'accessibility' },
  { id: 'cat4', name: 'Performance', slug: 'performance' },
  { id: 'cat5', name: 'CSS', slug: 'css' },
  { id: 'cat6', name: 'JavaScript', slug: 'javascript' },
];