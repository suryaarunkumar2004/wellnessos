import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaMoon, FaBed, FaClock, FaCheckCircle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function SleepHygieneGuide() {
  const [completed, setCompleted] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const sleepTips = [
    { id: 1, title: 'Consistent Schedule', description: 'Go to bed and wake up at the same time every day, even on weekends. This regulates your body\'s internal clock.', category: 'Schedule', benefit: 'Better sleep quality, easier waking' },
    { id: 2, title: 'Bedroom Environment', description: 'Keep your bedroom cool (65-68°F/18-20°C), dark, and quiet. Use blackout curtains and white noise if needed.', category: 'Environment', benefit: 'Deeper sleep, fewer disturbances' },
    { id: 3, title: 'Screen Time', description: 'Avoid screens 1 hour before bed. Blue light suppresses melatonin production and disrupts sleep.', category: 'Habits', benefit: 'Faster sleep onset' },
    { id: 4, title: 'Caffeine Management', description: 'Stop caffeine intake after 2 PM. It can stay in your system for 6-8 hours.', category: 'Diet', benefit: 'Better sleep continuity' },
    { id: 5, title: 'Wind Down Routine', description: 'Create a relaxing pre-sleep routine: reading, gentle stretching, meditation, or warm bath.', category: 'Routine', benefit: 'Reduced stress, easier transition to sleep' },
    { id: 6, title: 'Exercise Timing', description: 'Exercise daily but avoid intense workouts within 2-3 hours of bedtime.', category: 'Exercise', benefit: 'Better sleep quality, deeper sleep' },
    { id: 7, title: 'Heavy Meals', description: 'Avoid heavy meals within 2 hours of bedtime. If hungry, have a light snack like a banana or warm milk.', category: 'Diet', benefit: 'Better digestion, no discomfort' },
    { id: 8, title: 'Napping', description: 'Limit daytime naps to 20-30 minutes and avoid napping after 3 PM.', category: 'Habits', benefit: 'Better nighttime sleep' },
    { id: 9, title: 'Stress Management', description: 'Practice stress-reduction techniques like journaling, deep breathing, or progressive muscle relaxation before bed.', category: 'Mental', benefit: 'Less anxiety, better sleep' },
    { id: 10, title: 'Comfortable Bedding', description: 'Invest in a comfortable mattress, pillows, and breathable bedding. Replace mattress every 7-10 years.', category: 'Environment', benefit: 'Better sleep comfort' },
    { id: 11, title: 'Hydration Balance', description: 'Stay hydrated during the day but reduce fluid intake 1-2 hours before bed to avoid nighttime bathroom trips.', category: 'Habits', benefit: 'Uninterrupted sleep' },
    { id: 12, title: 'Natural Light Exposure', description: 'Get natural sunlight exposure during the day, especially in the morning. This helps regulate your circadian rhythm.', category: 'Environment', benefit: 'Better sleep-wake cycle' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('sleep_hygiene_completed');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (completed.length > 0) localStorage.setItem('sleep_hygiene_completed', JSON.stringify(completed));
  }, [completed]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleComplete = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(c => c !== id));
      showToast('↩ Unmarked', 'info');
    } else {
      setCompleted([...completed, id]);
      showToast('✅ Tip completed!', 'success');
    }
  };

  const progress = Math.round((completed.length / sleepTips.length) * 100);

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
                  <FaMoon style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Sleep Hygiene Guide</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>12 science-backed sleep optimisation protocols</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Sleep Tips</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto' }}>
                {sleepTips.map((tip) => {
                  const isCompleted = completed.includes(tip.id);
                  return (
                    <div key={tip.id} onClick={() => toggleComplete(tip.id)} style={{ padding: '12px', border: `1px solid ${isCompleted ? emerald : '#e2e8f0'}`, borderRadius: '10px', cursor: 'pointer', background: isCompleted ? emeraldLight : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b', textDecoration: isCompleted ? 'line-through' : 'none' }}>{tip.title}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{tip.category} • {tip.benefit}</div>
                      </div>
                      {isCompleted ? <FaCheckCircle style={{ color: emerald }} /> : <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Mark</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Progress</h3>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '800', color: emerald }}>{progress}%</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{completed.length} of {sleepTips.length} tips completed</div>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${emerald}, #047857)`, borderRadius: '99px', transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {progress === 100 ? '🎉 Amazing! You\'re a sleep hygiene expert!' : progress >= 50 ? '👍 Great progress! Keep going!' : '💪 Start with 2-3 tips today!'}
                  </div>
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: '#f0fdf4', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>💡 Did you know? Sleep hygiene practices are backed by over 50 years of sleep research from the Stanford Sleep Clinic.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
