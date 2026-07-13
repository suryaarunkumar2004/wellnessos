import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaFilter, FaClock, FaUser, FaTag, 
  FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, 
  FaComment, FaCalendarAlt,
  FaArrowRight, FaList, FaThLarge,
  FaChevronLeft, FaChevronRight,
  FaNewspaper, FaPlay,
  FaYoutube, FaSpinner
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import blogImages from '../../data/blogImages.js';
import { blogContents } from '../../data/blogContents.js';

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emerald = '#059669';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)';

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [isInitialized, setIsInitialized] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const saveState = useCallback(() => {
    try {
      sessionStorage.setItem('blogPage', String(currentPage));
      sessionStorage.setItem('blogSearchTerm', searchTerm);
      sessionStorage.setItem('blogCategory', selectedCategory);
      sessionStorage.setItem('blogViewMode', viewMode);
      sessionStorage.setItem('blogScrollY', String(window.scrollY));
    } catch (e) {}
  }, [currentPage, searchTerm, selectedCategory, viewMode]);

  useEffect(() => {
    if (isInitialized) saveState();
  }, [currentPage, searchTerm, selectedCategory, viewMode, saveState, isInitialized]);

  useEffect(() => {
    const restoreState = () => {
      try {
        const savedPage = sessionStorage.getItem('blogPage');
        const savedSearch = sessionStorage.getItem('blogSearchTerm');
        const savedCategory = sessionStorage.getItem('blogCategory');
        const savedViewMode = sessionStorage.getItem('blogViewMode');
        const savedScroll = sessionStorage.getItem('blogScrollY');

        if (savedPage) setCurrentPage(parseInt(savedPage));
        if (savedSearch) setSearchTerm(savedSearch);
        if (savedCategory) setSelectedCategory(savedCategory);
        if (savedViewMode) setViewMode(savedViewMode);

        if (savedScroll && parseInt(savedScroll) > 0) {
          setTimeout(() => window.scrollTo(0, parseInt(savedScroll)), 300);
        }
      } catch (e) {}
    };
    restoreState();
    setIsInitialized(true);
  }, []);

  const getPostImage = (postId) => {
    if (blogImages[postId]) return blogImages[postId].image;
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80';
  };

  const getPostThumbnail = (postId) => {
    if (blogImages[postId]) return blogImages[postId].thumbnail || blogImages[postId].image;
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop';
  };

  const getVideoId = (postId) => {
    if (blogImages[postId]) return blogImages[postId].videoId;
    return null;
  };

  const handleVideoClick = (e, videoId, postId) => {
    e.stopPropagation();
    if (videoId) {
      saveState();
      navigate(`/blog/${postId}?play=${videoId}`);
    }
  };

  const handlePostClick = (postId) => {
    saveState();
    navigate(`/blog/${postId}`);
  };

  const handleCommentClick = (postId) => {
    saveState();
    navigate(`/blog/${postId}#comments`);
  };

  const getCategoryFromId = (id) => {
    if (id >= 1 && id <= 8) return 'Cardiology';
    if (id >= 9 && id <= 16) return 'Nutrition & Dietetics';
    if (id >= 17 && id <= 24) return 'Physical Therapy';
    if (id >= 25 && id <= 32) return 'General Medicine';
    if (id >= 33 && id <= 40) return 'Pediatrics';
    if (id >= 41 && id <= 46) return 'Mental Health';
    if (id >= 47 && id <= 54) return 'Women & Men Health';
    return 'Wellness';
  };

  const fetchPosts = () => {
    setLoading(true);
    try {
      const localPosts = Object.entries(blogContents).map(([id, content]) => {
        const postId = parseInt(id);
        const imageInfo = blogImages[postId] || {};
        return {
          id: postId,
          title: content.title,
          content: content.content,
          imageUrl: imageInfo.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80',
          thumbnail: imageInfo.thumbnail || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
          videoId: imageInfo.videoId || null,
          category: getCategoryFromId(postId),
          author: imageInfo.author || 'WellNest Team',
          authorImage: imageInfo.authorImage || 'https://randomuser.me/api/portraits/women/1.jpg',
          readTime: Math.floor((content.content || '').split(' ').length / 200) + 1 || 5,
          date: new Date().toISOString()
        };
      });
      setPosts(localPosts);
      setFilteredPosts(localPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = () => {
    const cats = new Set();
    Object.keys(blogContents).forEach(id => {
      cats.add(getCategoryFromId(parseInt(id)));
    });
    setCategories(['All', ...Array.from(cats)]);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Cardiology': '#ef4444',
      'Nutrition & Dietetics': '#22c55e',
      'Physical Therapy': '#3b82f6',
      'General Medicine': '#8b5cf6',
      'Pediatrics': '#ec4899',
      'Mental Health': '#f59e0b',
      'Women Health': '#14b8a6',
      'Men Health': '#059669',
      'Lifestyle & Wellness': '#059669'
    };
    return colors[category] || '#64748b';
  };

  useEffect(() => {
    if (!isInitialized) return;
    let result = [...posts];
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(post => 
        post.title?.toLowerCase().includes(term) ||
        post.content?.toLowerCase().includes(term) ||
        post.category?.toLowerCase().includes(term) ||
        post.author?.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }
    setFilteredPosts(result);
    if (!loading && posts.length > 0 && currentPage > Math.ceil(result.length / postsPerPage)) {
      setCurrentPage(1);
    }
  }, [searchTerm, selectedCategory, posts, isInitialized, loading]);

  const videoPosts = posts.filter(post => post.videoId);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      saveState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <FaSpinner style={{ fontSize: '3rem', color: emerald, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b' }}>Loading blog posts...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </>
    );
  }

  // GRID VIEW CARD - FIXED HEIGHT 380px
  const renderGridCard = (post) => {
    const videoId = post.videoId;
    let imageSrc = post.imageUrl || post.thumbnail;
    const isFav = isFavorite(post.id);
    const isBookmarkedPost = isBookmarked(post.id);

    return (
      <div
        key={post.id}
        style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '380px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = emerald;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
        onClick={() => handlePostClick(post.id)}
      >
        <div style={{ position: 'relative', height: '180px', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
          <img 
            src={imageSrc}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80'; }}
          />
          {videoId && (
            <div
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'rgba(255,0,0,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5 }}
              onClick={(e) => handleVideoClick(e, videoId, post.id)}
            >
              <FaPlay style={{ color: 'white', fontSize: '1rem', marginLeft: '2px' }} />
            </div>
          )}
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: getCategoryColor(post.category), color: 'white', padding: '3px 12px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
            <FaTag style={{ fontSize: '0.5rem' }} /> {post.category || 'General'}
          </div>
          {videoId && (
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,0,0,0.85)', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.55rem', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
              <FaYoutube style={{ fontSize: '0.55rem' }} /> Video
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.55rem', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
            <FaClock style={{ fontSize: '0.5rem' }} /> {post.readTime || '5 min read'}
          </div>
        </div>

        <div style={{ padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', overflow: 'hidden' }}>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {truncateContent(post.content, 85)}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: 'auto', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(post.id, { id: post.id, title: post.title, type: 'blog', category: post.category }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#ef4444' : '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
                <span style={{ fontSize: '0.6rem' }}>{post.likes || 0}</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id, { id: post.id, title: post.title, type: 'blog', category: post.category }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarkedPost ? '#f59e0b' : '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                {isBookmarkedPost ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleCommentClick(post.id); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                <FaComment />
                <span style={{ fontSize: '0.6rem' }}>{post.comments || 0}</span>
              </button>
            </div>
            <button
              onClick={() => handlePostClick(post.id)}
              style={{ padding: '4px 12px', borderRadius: '20px', background: emeraldGradient, color: 'white', border: 'none', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(5,150,105,0.25)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Read More <FaArrowRight style={{ fontSize: '0.5rem' }} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // LIST VIEW CARD
  const renderListCard = (post) => {
    const videoId = post.videoId;
    let imageSrc = post.imageUrl || post.thumbnail;
    const isFav = isFavorite(post.id);
    const isBookmarkedPost = isBookmarked(post.id);

    return (
      <div
        key={post.id}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          height: '150px',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = emerald;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
        onClick={() => handlePostClick(post.id)}
      >
        <div style={{ position: 'relative', width: '160px', height: '110px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', background: '#f1f5f9' }}>
          <img src={imageSrc} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80'; }} />
          {videoId && (
            <div
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '28px', height: '28px', background: 'rgba(255,0,0,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5 }}
              onClick={(e) => handleVideoClick(e, videoId, post.id)}
            >
              <FaPlay style={{ color: 'white', fontSize: '0.8rem', marginLeft: '2px' }} />
            </div>
          )}
          <div style={{ position: 'absolute', top: '6px', left: '6px', background: getCategoryColor(post.category), color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.5rem', fontWeight: '600', zIndex: 2 }}>
            {post.category || 'General'}
          </div>
          {videoId && (
            <div style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(255,0,0,0.85)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontSize: '0.45rem', display: 'flex', alignItems: 'center', gap: '3px', zIndex: 2 }}>
              <FaYoutube style={{ fontSize: '0.45rem' }} /> Video
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaClock style={{ fontSize: '0.45rem' }} /> {post.readTime || '5 min read'}
            </span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaCalendarAlt style={{ fontSize: '0.45rem' }} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 6px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {truncateContent(post.content, 90)}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(post.id, { id: post.id, title: post.title, type: 'blog', category: post.category }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#ef4444' : '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
                <span style={{ fontSize: '0.6rem' }}>{post.likes || 0}</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id, { id: post.id, title: post.title, type: 'blog', category: post.category }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarkedPost ? '#f59e0b' : '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                {isBookmarkedPost ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleCommentClick(post.id); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '6px' }}
              >
                <FaComment />
                <span style={{ fontSize: '0.6rem' }}>{post.comments || 0}</span>
              </button>
            </div>
            <button
              onClick={() => handlePostClick(post.id)}
              style={{ padding: '4px 14px', borderRadius: '20px', background: emeraldGradient, color: 'white', border: 'none', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(5,150,105,0.25)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Read More <FaArrowRight style={{ fontSize: '0.6rem' }} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 0px' }}>
          <div style={{ background: emeraldGradient, borderRadius: '24px', padding: '40px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white' }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-150px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaNewspaper style={{ fontSize: '1.8rem', opacity: 0.9 }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>Health Blog</h1>
                  <p style={{ fontSize: '0.95rem', opacity: 0.9, margin: '2px 0 0 0', fontWeight: '300' }}>{posts.length} articles on health, wellness, and medicine</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginTop: '12px' }}>
                {[
                  { label: 'Total Articles', value: posts.length, icon: FaNewspaper },
                  { label: 'Categories', value: categories.length - 1, icon: FaTag },
                  { label: 'Read Time', value: '5 min', icon: FaClock },
                  { label: 'Videos', value: videoPosts.length, icon: FaYoutube },
                ].map((stat, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '4px', borderRadius: '8px' }}><stat.icon style={{ fontSize: '0.9rem', color: 'white' }} /></div>
                    <div><div style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.2' }}>{stat.value}</div><div style={{ fontSize: '0.6rem', opacity: 0.8 }}>{stat.label}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'white', borderRadius: '12px', padding: '0 14px', border: '2px solid #e2e8f0', minWidth: '180px', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <FaSearch style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
              <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', padding: '10px 12px', width: '100%', outline: 'none', fontSize: '0.85rem', fontFamily: 'inherit', background: 'transparent' }} />
            </div>
            <div>
              <CustomDropdown
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Filter Category"
              />
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setViewMode('grid')} style={{ padding: '8px 10px', borderRadius: '10px', border: '2px solid #e2e8f0', background: viewMode === 'grid' ? emerald : 'white', color: viewMode === 'grid' ? 'white' : '#64748b', cursor: 'pointer', transition: 'all 0.3s ease' }}><FaThLarge /></button>
              <button onClick={() => setViewMode('list')} style={{ padding: '8px 10px', borderRadius: '10px', border: '2px solid #e2e8f0', background: viewMode === 'list' ? emerald : 'white', color: viewMode === 'list' ? 'white' : '#64748b', cursor: 'pointer', transition: 'all 0.3s ease' }}><FaList /></button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '500' }}>Found <span style={{ color: emerald, fontWeight: '700' }}>{filteredPosts.length}</span> articles</p>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Page {currentPage} of {totalPages || 1}</span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr', 
            gap: viewMode === 'grid' ? '24px' : '12px', 
            marginBottom: '32px', 
            alignItems: 'stretch',
            justifyContent: 'center'
          }}>
            {currentPosts.map(viewMode === 'grid' ? renderGridCard : renderListCard)}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '16px', marginBottom: '0px', padding: '12px 0 16px' }}>
              <button onClick={() => goToPage(1)} disabled={currentPage === 1} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#94a3b8' : '#1e293b', opacity: currentPage === 1 ? 0.5 : 1 }}><FaChevronLeft /><FaChevronLeft style={{ fontSize: '0.6rem' }} /></button>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#94a3b8' : '#1e293b', opacity: currentPage === 1 ? 0.5 : 1 }}><FaChevronLeft /></button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ padding: '6px 12px', borderRadius: '8px', border: currentPage === pageNum ? `2px solid ${emerald}` : '1px solid #e2e8f0', background: currentPage === pageNum ? emerald : 'transparent', color: currentPage === pageNum ? 'white' : '#1e293b', cursor: 'pointer', fontWeight: currentPage === pageNum ? '700' : '500' }}>{pageNum}</button>;
              })}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#94a3b8' : '#1e293b', opacity: currentPage === totalPages ? 0.5 : 1 }}><FaChevronRight /></button>
              <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#94a3b8' : '#1e293b', opacity: currentPage === totalPages ? 0.5 : 1 }}><FaChevronRight /><FaChevronRight style={{ fontSize: '0.6rem' }} /></button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
