import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaUsers, FaTrophy, FaRunning, FaFire, FaMedal, FaCheckCircle, FaCalendarAlt, FaDownload, FaPrint, FaShare, FaTrash, FaHistory } from 'react-icons/fa';

export default function HealthChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [joined, setJoined] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const challengeList = [
    { id: 1, name: '10,000 Steps Challenge', description: 'Walk 10,000 steps daily for 7 days', participants: 342, reward: '100 points', icon: FaRunning, duration: '7 days', difficulty: 'Easy' },
    { id: 2, name: '30-Day Yoga Challenge', description: 'Complete 30 yoga sessions in 30 days', participants: 189, reward: '250 points', icon: FaMedal, duration: '30 days', difficulty: 'Medium' },
    { id: 3, name: 'Hydration Challenge', description: 'Drink 3L water daily for 14 days', participants: 256, reward: '150 points', icon: FaFire, duration: '14 days', difficulty: 'Easy' },
    { id: 4, name: 'Sleep Better Challenge', description: 'Get 8 hours sleep for 21 days', participants: 178, reward: '200 points', icon: FaMedal, duration: '21 days', difficulty: 'Medium' },
    { id: 5, name: 'Meditation Challenge', description: 'Meditate 10 minutes daily for 30 days', participants: 145, reward: '300 points', icon: FaTrophy, duration: '30 days', difficulty: 'Hard' },
    { id: 6, name: 'Healthy Eating Challenge', description: 'Eat 5 servings of vegetables daily', participants: 210, reward: '200 points', icon: FaCheckCircle, duration: '14 days', difficulty: 'Medium' },
    { id: 7, name: 'Morning Routine Challenge', description: 'Wake up at 6 AM and exercise for 30 days', participants: 156, reward: '250 points', icon: FaCalendarAlt, duration: '30 days', difficulty: 'Hard' },
    { id: 8, name: 'Sugar Detox Challenge', description: 'No added sugar for 21 days', participants: 134, reward: '300 points', icon: FaFire, duration: '21 days', difficulty: 'Hard' },
  ];

  useEffect(() => {
    setChallenges(challengeList);
    const saved = localStorage.getItem('joined_challenges');
    if (saved) setJoined(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (joined.length > 0) localStorage.setItem('joined_challenges', JSON.stringify(joined));
  }, [joined]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const joinChallenge = (id) => {
    if (joined.includes(id)) {
      setJoined(joined.filter(j => j !== id));
      showToast('↩ Left challenge', 'info');
    } else {
      setJoined([...joined, id]);
      showToast('✅ Joined challenge!', 'success');
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return '#22c55e';
    if (difficulty === 'Medium') return '#f59e0b';
    return '#ef4444';
  };

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
                  <FaUsers style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Challenges</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>8 community wellness challenges to transform your health</p>
                </div>
              </div>
            </div>
          </div>

          {toastMessage && (
            <div style={{ position: 'fixed', top: '100px', right: '24px', zIndex: 9999, padding: '14px 24px', borderRadius: '12px', background: toastMessage.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1px solid ${toastMessage.type === 'error' ? '#fecaca' : '#a7f3d0'}`, color: toastMessage.type === 'error' ? '#dc2626' : '#059669', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {toastMessage.message}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Active Challenges</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                {challenges.map((challenge) => {
                  const isJoined = joined.includes(challenge.id);
                  return (
                    <div key={challenge.id} style={{ padding: '16px', border: `2px solid ${isJoined ? emerald : '#e2e8f0'}`, borderRadius: '12px', background: isJoined ? emeraldLight : 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: isJoined ? emeraldLight : '#f1f5f9', padding: '10px', borderRadius: '10px' }}>
                          <challenge.icon style={{ color: isJoined ? emerald : '#64748b', fontSize: '1.2rem' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', color: '#1e293b' }}>{challenge.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{challenge.description}</div>
                          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                            <span>👥 {challenge.participants}</span>
                            <span>🎁 {challenge.reward}</span>
                            <span>📅 {challenge.duration}</span>
                            <span style={{ color: getDifficultyColor(challenge.difficulty) }}>{challenge.difficulty}</span>
                          </div>
                        </div>
                        <button onClick={() => joinChallenge(challenge.id)} style={{ padding: '8px 16px', background: isJoined ? '#fef2f2' : emerald, color: isJoined ? '#ef4444' : 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                          {isJoined ? 'Leave' : 'Join'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              {joined.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Challenges ({joined.length})</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {joined.map(id => {
                      const challenge = challenges.find(c => c.id === id);
                      return (
                        <div key={id} style={{ padding: '12px', background: emeraldLight, borderRadius: '10px', border: `1px solid ${emerald}` }}>
                          <div style={{ fontWeight: '700', color: '#1e293b' }}>{challenge.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>🎁 {challenge.reward} • 👥 {challenge.participants}</div>
                          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '99px', marginTop: '8px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.floor(Math.random() * 60 + 20)}%`, background: `linear-gradient(90deg, ${emerald}, #047857)`, borderRadius: '99px' }} />
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{challenge.difficulty} • {challenge.duration}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.8rem', color: '#64748b' }}>
                    💪 Complete all challenges to earn the <strong>Wellness Champion</strong> badge!
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaUsers size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Join challenges to track your progress</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
