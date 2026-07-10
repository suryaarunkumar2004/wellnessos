import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaHeart, FaCalendarAlt, FaClock, FaUser, FaBookmark, FaArrowRight } from 'react-icons/fa';

const MyLikes = () => {
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  
  // Sample liked posts - in real app, this would come from API/context
  const [likedPosts] = useState([
    {
      id: 1,
      title: 'Understanding Heart Disease: Prevention and Management',
      category: 'Cardiology',
      author: 'Dr. Emily Carter',
      date: '2026-06-28',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Heart Surgery: What to Expect',
      category: 'Cardiology',
      author: 'Dr. James Wilson',
      date: '2026-06-27',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    }
  ]);

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
          borderRadius: '24px',
          padding: '48px 40px',
          marginBottom: '40px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FaHeart style={{ fontSize: '2.5rem' }} />
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>My Likes</h1>
              <p style={{ opacity: 0.9, margin: '4px 0 0 0' }}>{likedPosts.length} articles you've liked</p>
            </div>
          </div>
        </div>

        {likedPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px' }}>
            <FaHeart style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#1e293b' }}>No Likes Yet</h3>
            <p style={{ color: '#64748b' }}>Start exploring our blog and like articles you find valuable.</p>
            <Link to="/blog" style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '12px 32px',
              background: `linear-gradient(135deg, ${emerald}, #047857)`,
              color: 'white',
              borderRadius: '12px',
              textDecoration: 'none'
            }}>Browse Articles</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {likedPosts.map(post => (
              <div key={post.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(5,150,105,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <span style={{ background: emeraldLight, padding: '2px 10px', borderRadius: '12px', fontSize: '0.7rem', color: emerald }}>{post.category}</span>
                  <h3 style={{ fontSize: '1.1rem', margin: '8px 0', color: '#1e293b' }}>{post.title}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span><FaUser style={{ display: 'inline', marginRight: '4px' }} />{post.author}</span>
                    <span><FaCalendarAlt style={{ display: 'inline', marginRight: '4px' }} />{post.date}</span>
                    <span><FaClock style={{ display: 'inline', marginRight: '4px' }} />{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} style={{ display: 'inline-block', marginTop: '12px', color: emerald, textDecoration: 'none', fontWeight: '600' }}>
                    Read Article <FaArrowRight style={{ display: 'inline', marginLeft: '6px' }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      </div>
  );
};

export default MyLikes;
