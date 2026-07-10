import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaMoon, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function SleepQualityTracker() {
  const [sleepHours, setSleepHours] = useState('');
  const [quality, setQuality] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('sleepquality_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (logs.length > 0) localStorage.setItem('sleepquality_logs', JSON.stringify(logs));
  }, [logs]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logSleep = () => {
    if (!sleepHours || !quality || !date) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const hours = parseFloat(sleepHours);
    const q = parseInt(quality);
    let status, color, advice;
    
    if (q >= 8) { status = 'Excellent'; color = '#22c55e'; advice = 'Great sleep quality! You\'re well rested.'; }
    else if (q >= 6) { status = 'Good'; color = '#3b82f6'; advice = 'Good sleep quality. Aim for more deep sleep.'; }
    else if (q >= 4) { status = 'Fair'; color = '#f59e0b'; advice = 'Fair sleep quality. Consider improving sleep hygiene.'; }
    else { status = 'Poor'; color = '#ef4444'; advice = 'Poor sleep quality. Please consult a sleep specialist.'; }

    const logEntry = {
      date,
      hours,
      quality: q,
      status,
      color,
      advice,
      timestamp: new Date().toISOString()
    };
    setLogs([logEntry, ...logs]);
    setResult(logEntry);
    showToast('Sleep logged! ✅', 'success');
  };

  const clearLogs = () => { setLogs([]); localStorage.removeItem('sleepquality_logs'); showToast('Logs cleared', 'info'); };
  const getAvgSleep = () => logs.length ? (logs.reduce((sum, l) => sum + l.hours, 0) / logs.length).toFixed(1) : 0;
  const getAvgQuality = () => logs.length ? Math.round(logs.reduce((sum, l) => sum + l.quality, 0) / logs.length) : 0;

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
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Sleep Quality Tracker</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Monitor your sleep patterns</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Log Your Sleep</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" step="0.5" value={sleepHours} onChange={e => setSleepHours(e.target.value)} placeholder="Sleep Hours *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={quality} onChange={e => setQuality(e.target.value)} placeholder="Quality (1-10) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={logSleep} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Log Sleep</button>
                  <button onClick={clearLogs} style={{ flex: 1, padding: '14px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Clear All</button>
                </div>
              </div>
            </div>
            <div>
              {logs.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Stats</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: emeraldLight, padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Avg Sleep</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', color: emerald }}>{getAvgSleep()} hrs</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Avg Quality</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#d97706' }}>{getAvgQuality()}/10</div>
                    </div>
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {logs.slice(0, 10).map((log, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.date}</span>
                        <span style={{ fontSize: '0.8rem', color: log.color }}>{log.hours}h</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: log.color }}>{log.quality}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaMoon size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start tracking your sleep quality</p>
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
