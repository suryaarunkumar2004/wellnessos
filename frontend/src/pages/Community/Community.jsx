import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaUsers, FaHeart, FaComment, FaShare, FaUser } from 'react-icons/fa';

export default function Community() {
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const communityPosts = [
      { id: 1, user: 'Sarah K.', avatar: '👩', content: 'Just completed my first 10K run! Feeling amazing! 🏃', likes: 45, comments: 12, time: '2h ago' },
      { id: 2, user: 'Mike R.', avatar: '👨', content: 'Any tips for healthy eating on a budget? Looking for affordable meal prep ideas! 🥗', likes: 28, comments: 18, time: '4h ago' },
      { id: 3, user: 'Priya S.', avatar: '👩', content: 'Celebrating 30 days of meditation! 🧘 Changed my life completely.', likes: 56, comments: 8, time: '6h ago' },
      { id: 4, user: 'James W.', avatar: '👨', content: 'What\'s the best exercise for lower back pain? Need some advice from the community!', likes: 34, comments: 15, time: '8h ago' },
      { id: 5, user: 'Emma L.', avatar: '👩', content: 'Finally hit my weight loss goal! Lost 15kg in 6 months! 🎉', likes: 72, comments: 24, time: '10h ago' },
      { id: 6, user: 'David C.', avatar: '👨', content: 'New to fitness - any beginner tips? Starting my journey today! 💪', likes: 19, comments: 22, time: '12h ago' },
      { id: 7, user: 'Lisa R.', avatar: '👩', content: 'Just tried HIIT for the first time - wow, what a workout! 🔥', likes: 41, comments: 9, time: '14h ago' },
      { id: 8, user: 'Tom H.', avatar: '👨', content: 'Meal prep ideas for the week? Need some inspiration for healthy lunches! 🥗', likes: 33, comments: 14, time: '16h ago' },
    ];
    setPosts(communityPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Loading community posts...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <Link to="/more?tab=tools" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '20px', color: emerald, fontWeight: '600',
            textDecoration: 'none', fontSize: '0.9rem'
          }}>
            <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Back to Dashboard
          </Link>

          <div style={{
            background: `linear-gradient(135deg, ${emerald} 0%, #047857 50%, #065f46 100%)`,
            borderRadius: '16px', padding: '32px 36px', marginBottom: '32px',
            position: 'relative', overflow: 'hidden', color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaUsers style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Community</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Connect, share, and grow together</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map((post) => (
              <div key={post.id} style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: emeraldLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{post.user}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{post.time}</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '12px', lineHeight: '1.6' }}>{post.content}</p>
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                    <FaHeart style={{ color: '#ef4444' }} /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                    <FaComment style={{ color: '#3b82f6' }} /> {post.comments}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                    <FaShare style={{ color: '#8b5cf6' }} /> Share
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
