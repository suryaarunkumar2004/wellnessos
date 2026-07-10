import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaHeart, FaPlay, FaPause, FaStop, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function GuidedMeditation() {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timer, setTimer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const meditations = [
    { id: 1, name: 'Mindful Breathing', duration: 5, description: 'Focus on your breath, noticing each inhale and exhale without judgment. Great for beginners.', type: 'Breath', benefit: 'Reduces stress, improves focus' },
    { id: 2, name: 'Body Scan', duration: 10, description: 'Slowly scan your body from head to toe, noticing sensations without trying to change them.', type: 'Body', benefit: 'Releases tension, improves body awareness' },
    { id: 3, name: 'Loving Kindness', duration: 8, description: 'Send wishes of love and kindness to yourself and others. Cultivates compassion.', type: 'Heart', benefit: 'Increases empathy, reduces self-criticism' },
    { id: 4, name: 'Sleep Meditation', duration: 15, description: 'Relaxation meditation to help you drift into deep, restful sleep.', type: 'Sleep', benefit: 'Better sleep quality, faster sleep onset' },
    { id: 5, name: 'Anxiety Relief', duration: 10, description: 'Soothing meditation to calm anxiety and bring peace to the mind.', type: 'Calm', benefit: 'Reduces anxiety, promotes calmness' },
    { id: 6, name: 'Morning Gratitude', duration: 5, description: 'Start your day with gratitude and positive intention.', type: 'Gratitude', benefit: 'Positive mindset, improved mood' },
    { id: 7, name: 'Deep Relaxation', duration: 20, description: 'Deep progressive relaxation for complete mind and body rest.', type: 'Relax', benefit: 'Deep relaxation, stress relief' },
    { id: 8, name: 'Focus & Concentration', duration: 8, description: 'Enhance your focus and concentration through mindful attention.', type: 'Focus', benefit: 'Improved concentration, better work performance' },
    { id: 9, name: 'Emotional Balance', duration: 12, description: 'Find emotional balance and stability through mindful awareness.', type: 'Emotion', benefit: 'Emotional regulation, better relationships' },
    { id: 10, name: 'Chakra Meditation', duration: 15, description: 'Balance your energy centers through guided visualization and breathing.', type: 'Energy', benefit: 'Energy balance, spiritual connection' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('meditation_sessions');
    if (saved) setSessionCount(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('meditation_sessions', sessionCount.toString());
  }, [sessionCount]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const startMeditation = (meditation) => {
    setSelectedMeditation(meditation);
    setTimeLeft(meditation.duration * 60);
    setIsPlaying(true);
    showToast('🧘 Starting meditation...', 'info');
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setSessionCount(prevCount => prevCount + 1);
          showToast('✅ Meditation complete! Great job!', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const stopMeditation = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsPlaying(false);
    setTimeLeft(0);
    setSelectedMeditation(null);
    showToast('🛑 Meditation stopped', 'info');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
                  <FaHeart style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Guided Meditation</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>10 mindfulness sessions from 5-20 minutes</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Meditation Sessions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {meditations.map((med) => (
                  <div key={med.id} onClick={() => { if (!isPlaying) startMeditation(med); }} style={{ padding: '14px', border: `2px solid ${selectedMeditation?.id === med.id && isPlaying ? emerald : '#e2e8f0'}`, borderRadius: '12px', cursor: isPlaying ? 'not-allowed' : 'pointer', background: selectedMeditation?.id === med.id && isPlaying ? emeraldLight : 'white', opacity: isPlaying && selectedMeditation?.id !== med.id ? 0.5 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{med.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>⏱️ {med.duration} min • {med.type} • {med.benefit}</div>
                      </div>
                      {selectedMeditation?.id === med.id && isPlaying && <span style={{ color: emerald, fontWeight: '700' }}>▶ Playing</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>🧘 Total sessions completed: {sessionCount}</div>
              </div>
            </div>

            <div>
              {selectedMeditation && isPlaying ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedMeditation.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>{selectedMeditation.type} • {selectedMeditation.benefit}</div>
                  <div style={{ fontSize: '3rem', fontWeight: '800', color: emerald, margin: '20px 0' }}>{formatTime(timeLeft)}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>{selectedMeditation.description}</div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={stopMeditation} style={{ padding: '12px 24px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><FaStop /> Stop</button>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>🧘 Focus on your breath. Let thoughts come and go without judgment.</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaHeart size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select a meditation session to begin</p>
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
