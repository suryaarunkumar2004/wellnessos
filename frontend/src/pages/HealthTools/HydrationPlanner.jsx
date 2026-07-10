import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaTint, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function HydrationPlanner() {
  const [targetWater, setTargetWater] = useState('');
  const [currentWater, setCurrentWater] = useState('');
  const [logs, setLogs] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('hydration_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (logs.length > 0) localStorage.setItem('hydration_logs', JSON.stringify(logs));
    calculateTodayTotal();
  }, [logs]);

  const calculateTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter(l => l.date === today);
    const total = todayLogs.reduce((sum, l) => sum + parseInt(l.amount), 0);
    setTodayTotal(total);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logWater = () => {
    if (!currentWater) {
      showToast('Please enter amount', 'error');
      return;
    }
    const amount = parseInt(currentWater);
    const entry = {
      id: Date.now(),
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString()
    };
    setLogs([entry, ...logs]);
    setCurrentWater('');
    showToast(`💧 Logged ${amount}ml!`, 'success');
  };

  const deleteLog = (id) => {
    setLogs(logs.filter(l => l.id !== id));
    showToast('🗑 Log removed', 'info');
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('hydration_logs');
    showToast('All logs cleared', 'info');
  };

  const setTarget = () => {
    if (!targetWater) {
      showToast('Please enter target', 'error');
      return;
    }
    localStorage.setItem('hydration_target', targetWater);
    showToast(`🎯 Target set to ${targetWater}ml`, 'success');
  };

  const getTarget = () => {
    const saved = localStorage.getItem('hydration_target');
    return saved ? parseInt(saved) : 3000;
  };

  const target = getTarget();
  const progress = Math.min(100, Math.round((todayTotal / target) * 100));

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
                  <FaTint style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Hydration Planner</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Hourly hydration reminder schedule</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Log Water Intake</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" value={targetWater} onChange={e => setTargetWater(e.target.value)} placeholder="Target (ml)" style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  <button onClick={setTarget} style={{ padding: '12px 20px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Set</button>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Target: <strong>{target}ml</strong></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" value={currentWater} onChange={e => setCurrentWater(e.target.value)} placeholder="Amount (ml)" style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  <button onClick={logWater} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Log</button>
                </div>
                <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Today's Progress</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: emerald }}>{todayTotal}ml / {target}ml</div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: progress >= 100 ? '#22c55e' : '#f59e0b' }}>{progress}%</div>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: progress >= 100 ? '#22c55e' : emerald, borderRadius: '99px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
                <button onClick={clearLogs} style={{ padding: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Clear All Logs</button>
              </div>
            </div>
            <div>
              {logs.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Recent Logs</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {logs.slice(0, 20).map((log) => (
                      <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '700', color: '#1e293b' }}>{log.amount}ml</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{log.date} at {log.time}</div>
                        </div>
                        <button onClick={() => deleteLog(log.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444' }}>🗑</button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaTint size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start logging your water intake</p>
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
