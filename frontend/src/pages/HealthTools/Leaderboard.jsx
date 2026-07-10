import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaTrophy, FaMedal, FaCrown, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [period, setPeriod] = useState('weekly');
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const sampleUsers = [
    { id: 1, name: 'Alex Johnson', steps: 12450, points: 2850, workouts: 12, avatar: '👨' },
    { id: 2, name: 'Sarah Williams', steps: 11800, points: 2700, workouts: 10, avatar: '👩' },
    { id: 3, name: 'Michael Chen', steps: 11200, points: 2600, workouts: 11, avatar: '��' },
    { id: 4, name: 'Emily Davis', steps: 10800, points: 2500, workouts: 9, avatar: '👩' },
    { id: 5, name: 'James Rodriguez', steps: 10200, points: 2400, workouts: 10, avatar: '👨' },
    { id: 6, name: 'Lisa Thompson', steps: 9800, points: 2300, workouts: 8, avatar: '👩' },
    { id: 7, name: 'David Kim', steps: 9500, points: 2200, workouts: 9, avatar: '👨' },
    { id: 8, name: 'Maria Garcia', steps: 9200, points: 2100, workouts: 7, avatar: '👩' },
    { id: 9, name: 'Robert Smith', steps: 8800, points: 2000, workouts: 8, avatar: '👨' },
    { id: 10, name: 'Jennifer Lee', steps: 8500, points: 1900, workouts: 6, avatar: '👩' },
    { id: 11, name: 'Daniel Martinez', steps: 8200, points: 1800, workouts: 7, avatar: '👨' },
    { id: 12, name: 'Amanda Wilson', steps: 7900, points: 1700, workouts: 6, avatar: '👩' },
  ];

  useEffect(() => {
    generateLeaderboard();
  }, [period]);

  const generateLeaderboard = () => {
    const sorted = [...sampleUsers].sort((a, b) => b.points - a.points);
    setLeaderboard(sorted);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getMedal = (index) => {
    if (index === 0) return <FaCrown style={{ color: '#fbbf24', fontSize: '1.2rem' }} />;
    if (index === 1) return <FaMedal style={{ color: '#94a3b8', fontSize: '1.2rem' }} />;
    if (index === 2) return <FaMedal style={{ color: '#cd7f32', fontSize: '1.2rem' }} />;
    return <span style={{ fontWeight: '700', color: '#94a3b8', minWidth: '20px' }}>#{index + 1}</span>;
  };

  const getPeriodLabel = () => ({
    weekly: 'This Week',
    monthly: 'This Month',
    alltime: 'All Time'
  }[period] || 'This Week');

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <Link to="/more?tab=tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: emerald, fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Back to Health Tools
          </Link>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)', borderRadius: '16px', padding: '32px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 20px rgba(5, 150, 105, 0.25)' }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaTrophy style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Leaderboard</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Community health challenge rankings</p>
                </div>
              </div>
            </div>
          </div>

          {toastMessage && (
            <div style={{ position: 'fixed', top: '100px', right: '24px', zIndex: 9999, padding: '14px 24px', borderRadius: '12px', background: toastMessage.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1px solid ${toastMessage.type === 'error' ? '#fecaca' : '#a7f3d0'}`, color: toastMessage.type === 'error' ? '#dc2626' : '#059669', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {toastMessage.message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['weekly', 'monthly', 'alltime'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: `2px solid ${period === p ? emerald : '#e2e8f0'}`,
                  background: period === p ? emeraldLight : 'white',
                  color: period === p ? emerald : '#64748b',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: `2px solid ${emerald}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>
                  {getPeriodLabel()} Rankings
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  👥 {leaderboard.length} participants
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
                {leaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: index < 3 ? emeraldLight : '#f8fafc',
                      border: index < 3 ? `2px solid ${emerald}30` : '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{ minWidth: '40px', textAlign: 'center' }}>
                      {getMedal(index)}
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>{user.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{user.name}</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#64748b' }}>
                        <span>🏃 {user.steps.toLocaleString()} steps</span>
                        <span>🔥 {user.workouts} workouts</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '800', color: emerald, fontSize: '1.2rem' }}>{user.points}</div>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              💪 Keep moving! Complete challenges to earn more points!
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
