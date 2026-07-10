import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaClock, FaUser, FaTag, FaHeart, 
  FaRegHeart, FaBookmark, FaRegBookmark, FaShare, 
  FaComment, FaCalendarAlt, FaEye, FaYoutube, FaPlay,
  FaTwitter, FaFacebook, FaWhatsapp, FaEnvelope,
  FaPrint, FaLink, FaSpinner
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import blogImages from '../../data/blogImages.js';
import { blogContents } from '../../data/blogContents.js';

// Doctor images - SYNCED with Doctors page (all 50 doctors)
const getAuthorImage = (authorName) => {
  const femaleImages = {
    'Dr. Emily Carter': 'https://randomuser.me/api/portraits/women/1.jpg',
    'Dr. Sarah Johnson': 'https://randomuser.me/api/portraits/women/3.jpg',
    'Dr. Maya Lee': 'https://randomuser.me/api/portraits/women/5.jpg',
    'Dr. Sarah Mitchell': 'https://randomuser.me/api/portraits/women/2.jpg',
    'Dr. Lisa Park': 'https://randomuser.me/api/portraits/women/4.jpg',
    'Dr. Rachel Adams': 'https://randomuser.me/api/portraits/women/7.jpg',
    'Dr. Laura Martinez': 'https://randomuser.me/api/portraits/women/8.jpg',
    'Dr. Jessica Park': 'https://randomuser.me/api/portraits/women/9.jpg',
    'Dr. Priya Sharma': 'https://randomuser.me/api/portraits/women/10.jpg',
    'Dr. Elizabeth White': 'https://randomuser.me/api/portraits/women/11.jpg',
    'Dr. Maria Garcia': 'https://randomuser.me/api/portraits/women/12.jpg',
    'Dr. Lisa Martinez': 'https://randomuser.me/api/portraits/women/13.jpg',
    'Dr. Katherine Wright': 'https://randomuser.me/api/portraits/women/14.jpg',
    'Dr. Jennifer Davis': 'https://randomuser.me/api/portraits/women/15.jpg',
    'Dr. Amanda Green': 'https://randomuser.me/api/portraits/women/6.jpg',
    'Dr. Angela Clark': 'https://randomuser.me/api/portraits/women/17.jpg',
    'Dr. Amanda White': 'https://randomuser.me/api/portraits/women/18.jpg',
    'Dr. Karen Scott': 'https://randomuser.me/api/portraits/women/19.jpg',
    'Dr. Patricia Miller': 'https://randomuser.me/api/portraits/women/20.jpg',
    'Dr. Jessica Taylor': 'https://randomuser.me/api/portraits/women/21.jpg',
    'Dr. Susan Chen': 'https://randomuser.me/api/portraits/women/22.jpg',
    'Dr. Laura Bennett': 'https://randomuser.me/api/portraits/women/23.jpg',
    'Dr. Elizabeth Foster': 'https://randomuser.me/api/portraits/women/24.jpg',
    'Dr. Rachel Kim': 'https://randomuser.me/api/portraits/women/25.jpg',
    'Dr. Christine Park': 'https://randomuser.me/api/portraits/women/26.jpg',
    'Dr. Sophia Chen': 'https://randomuser.me/api/portraits/women/27.jpg',
  };

  const maleImages = {
    'Dr. James Wilson': 'https://randomuser.me/api/portraits/men/26.jpg',
    'Dr. Michael Roberts': 'https://randomuser.me/api/portraits/men/27.jpg',
    'Dr. David Chen': 'https://randomuser.me/api/portraits/men/28.jpg',
    'Dr. Raj Patel': 'https://randomuser.me/api/portraits/men/29.jpg',
    'Dr. James Anderson': 'https://randomuser.me/api/portraits/men/30.jpg',
    'Dr. Kevin Brown': 'https://randomuser.me/api/portraits/men/31.jpg',
    'Dr. Arthur Pendelton': 'https://randomuser.me/api/portraits/men/32.jpg',
    'Dr. Thomas Wright': 'https://randomuser.me/api/portraits/men/33.jpg',
    'Dr. Michael Chen': 'https://randomuser.me/api/portraits/men/34.jpg',
    'Dr. Robert Kim': 'https://randomuser.me/api/portraits/men/35.jpg',
    'Dr. James Taylor': 'https://randomuser.me/api/portraits/men/36.jpg',
    'Dr. David Kim': 'https://randomuser.me/api/portraits/men/37.jpg',
    'Dr. Brian Thompson': 'https://randomuser.me/api/portraits/men/38.jpg',
    'Dr. Mark Wilson': 'https://randomuser.me/api/portraits/men/39.jpg',
    'Dr. John Miller': 'https://randomuser.me/api/portraits/men/40.jpg',
    'Dr. Robert Taylor': 'https://randomuser.me/api/portraits/men/41.jpg',
    'Dr. Daniel Lee': 'https://randomuser.me/api/portraits/men/42.jpg',
    'Dr. Thomas Brown': 'https://randomuser.me/api/portraits/men/43.jpg',
    'Dr. William Davis': 'https://randomuser.me/api/portraits/men/44.jpg',
    'Dr. Charles Evans': 'https://randomuser.me/api/portraits/men/45.jpg',
    'Dr. William Parker': 'https://randomuser.me/api/portraits/men/46.jpg',
    'Dr. Peter Johnson': 'https://randomuser.me/api/portraits/men/47.jpg',
    'Dr. Daniel Murphy': 'https://randomuser.me/api/portraits/men/48.jpg',
  };

  const femaleNames = ['Emily', 'Sarah', 'Maya', 'Lisa', 'Rachel', 'Laura', 'Jessica', 'Priya', 'Elizabeth', 'Maria', 'Katherine', 'Jennifer', 'Amanda', 'Angela', 'Karen', 'Patricia', 'Susan', 'Christine', 'Sophia'];
  
  let isFemale = false;
  if (authorName) {
    for (const name of femaleNames) {
      if (authorName.includes(name)) {
        isFemale = true;
        break;
      }
    }
  }

  if (isFemale) {
    return femaleImages[authorName] || 'https://randomuser.me/api/portraits/women/1.jpg';
  } else {
    return maleImages[authorName] || 'https://randomuser.me/api/portraits/men/26.jpg';
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const commentsRef = useRef(null);
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)';

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(0);
  const [commentTotal, setCommentTotal] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [autoPlayVideo, setAutoPlayVideo] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  const { toggleBookmark, isBookmarked: isPostBookmarked } = useBookmarks();
  const { toggleFavorite, isFavorite } = useFavorites();
  const postId = parseInt(id);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playVideo = params.get('play');
    if (playVideo) {
      setAutoPlayVideo(playVideo);
    }
    fetchPost();
    loadSavedState();
    loadComments(0, true);
    
    // Check if we need to scroll to comments
    if (location.hash === '#comments') {
      setTimeout(() => {
        if (commentsRef.current) {
          commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [id, location]);

  const getVideoId = (postId) => {
    if (blogImages[postId]) {
      return blogImages[postId].videoId;
    }
    return null;
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

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        const imageData = blogImages[parseInt(id)] || {};
        const videoId = getVideoId(parseInt(id));
        const authorImage = getAuthorImage(data.author);
        
        setPost({
          ...data,
          imageUrl: data.imageUrl || imageData.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80',
          thumbnail: data.thumbnail || imageData.thumbnail || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
          videoId: data.videoId || videoId || null,
          comments: data.comments || 0,
          authorImage: authorImage
        });
      } else {
        const localContent = blogContents[postId];
        if (localContent) {
          const imageData = blogImages[postId] || {};
          const authorImage = getAuthorImage('WellNest Team');
          setPost({
            id: postId,
            title: localContent.title,
            content: localContent.content,
            category: getCategoryFromId(postId),
            imageUrl: imageData.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80',
            thumbnail: imageData.thumbnail || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            videoId: imageData.videoId || null,
            author: 'WellNest Team',
            authorImage: authorImage,
            readTime: Math.floor(localContent.content?.split(' ').length / 200) + 1 || 5,
            views: 0,
            likes: 0,
            comments: 0,
            date: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      const localContent = blogContents[postId];
      if (localContent) {
        const imageData = blogImages[postId] || {};
        const authorImage = getAuthorImage('WellNest Team');
        setPost({
          id: postId,
          title: localContent.title,
          content: localContent.content,
          category: getCategoryFromId(postId),
          imageUrl: imageData.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80',
          thumbnail: imageData.thumbnail || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
          videoId: imageData.videoId || null,
          author: 'WellNest Team',
          authorImage: authorImage,
          readTime: Math.floor(localContent.content?.split(' ').length / 200) + 1 || 5,
          views: 0,
          likes: 0,
          comments: 0,
          date: new Date().toISOString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (page, reset = false) => {
    if (loadingComments) return;
    setLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:8080/api/blog/${id}/comments?page=${page}&size=20`);
      if (response.ok) {
        const data = await response.json();
        const newComments = data.content || [];
        if (reset) {
          setComments(newComments);
        } else {
          setComments(prev => [...prev, ...newComments]);
        }
        setCommentTotal(data.totalElements || 0);
        setHasMoreComments(!data.last);
        setCommentPage(page);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const loadMoreComments = () => {
    if (hasMoreComments && !loadingComments) {
      loadComments(commentPage + 1);
    }
  };

  const loadSavedState = () => {
    const savedLikes = localStorage.getItem('blogLikedPosts');
    if (savedLikes) {
      const likes = JSON.parse(savedLikes);
      setLiked(likes.includes(postId));
    }
  };

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    const savedLikes = localStorage.getItem('blogLikedPosts');
    let likes = savedLikes ? JSON.parse(savedLikes) : [];
    if (newLiked) {
      likes.push(postId);
    } else {
      likes = likes.filter(l => l !== postId);
    }
    localStorage.setItem('blogLikedPosts', JSON.stringify(likes));
  };

  const handleToggleFavorite = () => {
    toggleFavorite(postId, {
      title: post?.title,
      type: 'blog',
      category: post?.category
    });
  };

  const handleToggleBookmark = () => {
    toggleBookmark(postId, { 
      title: post?.title, 
      type: 'blog', 
      category: post?.category 
    });
  };

  const handleShare = () => {
    setShowShare(!showShare);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const scrollToComments = () => {
    setTimeout(() => {
      if (commentsRef.current) {
        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const formatContent = (content) => {
    if (!content) return '';
    let formatted = content;
    formatted = formatted.replace(/#/g, '');
    formatted = formatted.replace(/\*/g, '');
    formatted = formatted.replace(/^([A-Z][A-Z\s]+:)/gm, '<strong style="font-size:1.2rem;color:#059669;display:block;margin-top:20px;margin-bottom:10px;">$1</strong>');
    formatted = formatted.replace(/^(\d+\.\s+[A-Za-z][^:]+:)/gm, '<strong style="color:#1e293b;display:block;margin-top:10px;margin-bottom:5px;">$1</strong>');
    formatted = formatted.replace(/^[•\-]\s+([A-Za-z][^:]+:)/gm, '• <strong style="color:#1e293b;">$1</strong>');
    
    const lines = formatted.split('\n');
    let html = '';
    let inList = false;
    
    lines.forEach(line => {
      line = line.trim();
      if (!line) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        return;
      }
      
      if (line.startsWith('<strong') && line.includes('font-size:1.2rem')) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += line;
        return;
      }
      
      if (line.match(/^\d+\./)) {
        if (!inList) {
          html += '<ol style="margin-bottom:12px;line-height:1.8;color:#334155;padding-left:20px;">';
          inList = true;
        }
        html += `<li>${line.replace(/^\d+\.\s*/, '')}</li>`;
        return;
      }
      
      if (line.startsWith('•') || line.startsWith('-')) {
        if (!inList) {
          html += '<ul style="margin-bottom:12px;line-height:1.8;color:#334155;list-style-type:disc;padding-left:20px;">';
          inList = true;
        }
        html += `<li>${line.replace(/^[•\-]\s*/, '')}</li>`;
        return;
      }
      
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      
      html += `<p style="margin-bottom:12px;line-height:1.8;color:#334155;">${line}</p>`;
    });
    
    if (inList) {
      html += '</ul>';
    }
    
    return html;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!commentAuthor.trim()) {
      alert('Please enter your name');
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await fetch(`http://localhost:8080/api/blog/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: commentAuthor.trim(),
          text: newComment.trim()
        })
      });
      if (response.ok) {
        const data = await response.json();
        setComments(prev => [data, ...prev]);
        setCommentTotal(prev => prev + 1);
        setPost(prev => ({ ...prev, comments: (prev.comments || 0) + 1 }));
        setNewComment('');
        setCommentAuthor('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <FaSpinner style={{ fontSize: '3rem', color: emerald, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b' }}>Loading article...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>Article Not Found</h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>The article you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/blog')} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Back to Blog
            </button>
          </div>
        </div>
      </>
    );
  }

  const videoId = post.videoId || autoPlayVideo;
  const isBookmarked = isPostBookmarked(postId);
  const isFav = isFavorite(postId);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginBottom: '24px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = emerald; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
          >
            <FaArrowLeft /> Back to Blog
          </button>

          {videoId && (
            <div style={{
              position: 'relative',
              paddingTop: '56.25%',
              background: '#000',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={post.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(255,0,0,0.85)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <FaYoutube /> Watch Video
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{
              background: '#f1f5f9',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#475569'
            }}>
              {post.category || 'General'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <FaCalendarAlt style={{ fontSize: '0.7rem' }} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <FaClock style={{ fontSize: '0.7rem' }} />
              {post.readTime || '5 min read'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <FaEye style={{ fontSize: '0.7rem' }} />
              {post.views || 0} views
            </span>
          </div>

          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#1e293b',
            lineHeight: '1.2',
            marginBottom: '20px',
            letterSpacing: '-0.5px'
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 0',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '32px'
          }}>
            <img 
              src={post.authorImage} 
              alt={post.author}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${emeraldLight}`
              }}
            />
            <div>
              <div style={{ fontWeight: '600', color: '#1e293b' }}>{post.author || 'Unknown'}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Health Writer</div>
            </div>
          </div>

          <div style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: '#334155',
            marginBottom: '32px'
          }}>
            {post.content ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(post.content) 
                }} 
              />
            ) : (
              <p style={{ color: '#64748b' }}>Content not available</p>
            )}
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '20px 0',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '32px'
          }}>
            <button
              onClick={toggleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: liked ? '#fef2f2' : 'white',
                color: liked ? '#ef4444' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{post.likes || 0}</span>
            </button>

            <button
              onClick={handleToggleFavorite}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: isFav ? '#fef2f2' : 'white',
                color: isFav ? '#ef4444' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            >
              {isFav ? <FaHeart /> : <FaRegHeart />}
              <span>Favorite</span>
            </button>

            <button
              onClick={handleToggleBookmark}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: isBookmarked ? '#fffbeb' : 'white',
                color: isBookmarked ? '#f59e0b' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              <span>Bookmark</span>
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: 'white',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            >
              <FaShare /> Share
            </button>

            <button
              onClick={scrollToComments}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: 'white',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = emerald; e.currentTarget.style.borderColor = emerald; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <FaComment /> Comments ({commentTotal})
            </button>

            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: 'white',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
            >
              <FaPrint /> Print
            </button>
          </div>

          {showShare && (
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              padding: '16px',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #f1f5f9'
            }}>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#1da1f2', color: 'white', cursor: 'pointer' }}>
                <FaTwitter /> Twitter
              </button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#1877f2', color: 'white', cursor: 'pointer' }}>
                <FaFacebook /> Facebook
              </button>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#25d366', color: 'white', cursor: 'pointer' }}>
                <FaWhatsapp /> WhatsApp
              </button>
              <button onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ea4335', color: 'white', cursor: 'pointer' }}>
                <FaEnvelope /> Email
              </button>
              <button onClick={copyLink} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#64748b', color: 'white', cursor: 'pointer' }}>
                <FaLink /> Copy Link
              </button>
            </div>
          )}

          {/* Comments Section with ref */}
          <div ref={commentsRef} style={{
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '1px solid #f1f5f9'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaComment style={{ color: emerald }} />
              Comments ({commentTotal})
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.boxShadow = `0 0 0 3px ${emeraldLight}`; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.boxShadow = `0 0 0 3px ${emeraldLight}`; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button
                onClick={handleSubmitComment}
                disabled={submittingComment || !newComment.trim() || !commentAuthor.trim()}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: (submittingComment || !newComment.trim() || !commentAuthor.trim()) ? '#94a3b8' : emeraldGradient,
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: (submittingComment || !newComment.trim() || !commentAuthor.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  alignSelf: 'flex-start',
                  opacity: (submittingComment || !newComment.trim() || !commentAuthor.trim()) ? 0.6 : 1,
                  boxShadow: (submittingComment || !newComment.trim() || !commentAuthor.trim()) ? 'none' : '0 4px 15px rgba(5,150,105,0.3)'
                }}
                onMouseEnter={e => { 
                  if (!submittingComment && newComment.trim() && commentAuthor.trim()) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={e => { 
                  if (!submittingComment && newComment.trim() && commentAuthor.trim()) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>

            {comments.length > 0 ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {comments.map((comment) => (
                    <div key={comment.id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '1px solid #f1f5f9',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: emeraldLight,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: emerald,
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {comment.author?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1e293b' }}>{comment.author || 'Anonymous'}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                            {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
                {hasMoreComments && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                      onClick={loadMoreComments}
                      disabled={loadingComments}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        color: emerald,
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: loadingComments ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => { 
                        if (!loadingComments) {
                          e.currentTarget.style.background = emeraldLight;
                          e.currentTarget.style.borderColor = emerald;
                        }
                      }}
                      onMouseLeave={(e) => { 
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      {loadingComments ? 'Loading more...' : 'Load More Comments'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #f1f5f9'
              }}>
                <FaComment style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '16px' }} />
                <h4 style={{ color: '#1e293b', marginBottom: '8px' }}>No comments yet</h4>
                <p style={{ color: '#94a3b8' }}>Be the first to share your thoughts on this article!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
