import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaSmile, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const moodOptions = [
    { value: 'amazing', label: 'Amazing', icon: FaSmile, color: '#22c55e' },
    { value: 'good', label: 'Good', icon: FaSmile, color: '#3b82f6' },
    { value: 'okay', label: 'Okay', icon: FaSmile, color: '#f59e0b' },
    { value: 'bad', label: 'Bad', icon: FaSmile, color: '#f97316' },
    { value: 'terrible', label: 'Terrible', icon: FaSmile, color: '#ef4444' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('mood_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (logs.length > 0) localStorage.setItem('mood_logs', JSON.stringify(logs));
  }, [logs]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logMood = () => {
    if (!mood || !date) {
      showToast('Please select a mood and date', 'error');
      return;
    }
    const moodData = moodOptions.find(m => m.value === mood);
    const logEntry = {
      date,
      mood,
      moodLabel: moodData.label,
      moodColor: moodData.color,
      note: note || 'No notes',
      timestamp: new Date().toISOString()
    };
    setLogs([logEntry, ...logs]);
    setResult(logEntry);
    showToast(`Mood logged: ${moodData.label}! ✅`, 'success');
  };

  const clearLogs = () => { setLogs([]); localStorage.removeItem('mood_logs'); showToast('Logs cleared', 'info'); };
  const getMoodCount = (moodValue) => logs.filter(l => l.mood === moodValue).length;

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
                  <FaSmile style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Mood Tracker</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Track your emotional wellness</p>
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
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Log Your Mood</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '4px' }}>
                  {moodOptions.map((m) => (
                    <button key={m.value} onClick={() => setMood(m.value)}
                      style={{
                        padding: '10px', borderRadius: '10px', border: `2px solid ${mood === m.value ? m.color : '#e2e8f0'}`,
                        background: mood === m.value ? m.color + '20' : 'white',
                        color: mood === m.value ? m.color : '#64748b',
                        fontWeight: '700', cursor: 'pointer', textAlign: 'center'
                      }}>
                      <span style={{ display: 'block', fontSize: '1.5rem' }}>😊</span>
                      {m.label}
                    </button>
                  ))}
                </div>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What's affecting your mood?" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', resize: 'vertical', minHeight: '60px' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={logMood} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Log Mood</button>
                  <button onClick={clearLogs} style={{ flex: 1, padding: '14px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Clear All</button>
                </div>
              </div>
            </div>
            <div>
              {logs.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Mood History</h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {logs.slice(0, 15).map((log, idx) => {
                      const moodData = moodOptions.find(m => m.value === log.mood);
                      return (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.date}</span>
                          <span style={{ color: moodData.color, fontWeight: '700' }}>{moodData.label}</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.note}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaSmile size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start tracking your mood</p>
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
