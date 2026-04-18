import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Post, Category } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

const CreateEditPostPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { categories, getPostBySlug, addPost, updatePost } = useBlog();
  
  const isEditMode = !!slug;
  const existingPost = isEditMode ? getPostBySlug(slug) : undefined;
  
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [categoryId, setCategoryId] = useState(existingPost?.category.id || categories[0]?.id || '');
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage || 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (isEditMode && !existingPost) {
      navigate('/not-found', { replace: true });
    }
  }, [isEditMode, existingPost, navigate]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !categoryId) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    
    const selectedCategory = categories.find(cat => cat.id === categoryId)!;
    
    const postData: Post = {
      id: existingPost?.id || `post-${Date.now()}`,
      title,
      slug: existingPost?.slug || generateSlug(title),
      content,
      excerpt: excerpt || `${content.substring(0, 150)}...`,
      coverImage,
      category: selectedCategory,
      author: existingPost?.author || {
        id: 'author1',
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        bio: 'Senior Developer with 10+ years of experience building web applications.',
      },
      readingTime: estimateReadingTime(content),
      createdAt: existingPost?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: existingPost?.comments || [],
    };
    
    // Simulate network request
    setTimeout(() => {
      if (isEditMode) {
        updatePost(postData);
      } else {
        addPost(postData);
      }
      
      setIsSaving(false);
      navigate(`/post/${postData.slug}`);
    }, 800);
  };

  return (
    <div className="bg-gray-50 pt-24 pb-12 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <Link 
          to={isEditMode ? `/post/${slug}` : '/'}
          className="inline-flex items-center text-primary-600 hover:text-accent-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          {isEditMode ? 'Back to Post' : 'Back to Home'}
        </Link>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-8">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-primary-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-primary-700 mb-1">
                Excerpt
              </label>
              <input
                type="text"
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Brief description (optional)"
              />
              <p className="mt-1 text-sm text-primary-500">
                If left empty, an excerpt will be generated from the content.
              </p>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-primary-700 mb-1">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter image URL"
                required
              />
              {coverImage && (
                <div className="mt-2 w-full h-40 rounded-md overflow-hidden">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-primary-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[400px]"
                placeholder="Write your post content (Markdown supported)"
                required
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md transition-colors ${
                  isSaving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <Save size={20} className="mr-2" />
                {isSaving ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditPostPage;