export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  readingTime: string;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  comments: Comment[];
}