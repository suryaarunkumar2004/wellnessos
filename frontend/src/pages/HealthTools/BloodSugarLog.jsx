import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaTint, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function BloodSugarLog() {
  const [glucose, setGlucose] = useState('');
  const [type, setType] = useState('fasting');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('glucose_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (logs.length > 0) localStorage.setItem('glucose_logs', JSON.stringify(logs));
  }, [logs]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logGlucose = () => {
    if (!glucose || !date) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const g = parseInt(glucose);
    let status, color, advice;
    
    if (type === 'fasting') {
      if (g < 70) { status = 'Low (Hypoglycemia)'; color = '#ef4444'; advice = 'Your blood sugar is low. Eat something with sugar.'; }
      else if (g < 100) { status = 'Normal'; color = '#22c55e'; advice = 'Your fasting blood sugar is normal.'; }
      else if (g < 126) { status = 'Prediabetic'; color = '#f59e0b'; advice = 'Your fasting glucose is elevated.'; }
      else { status = 'Diabetic'; color = '#dc2626'; advice = 'Your fasting glucose indicates diabetes. Consult your doctor.'; }
    } else {
      if (g < 140) { status = 'Normal'; color = '#22c55e'; advice = 'Your post-meal glucose is normal.'; }
      else if (g < 180) { status = 'Elevated'; color = '#f59e0b'; advice = 'Your post-meal glucose is elevated.'; }
      else if (g < 200) { status = 'Prediabetic'; color = '#f97316'; advice = 'Your post-meal glucose is high.'; }
      else { status = 'Diabetic'; color = '#dc2626'; advice = 'Your post-meal glucose is very high.'; }
    }

    const logEntry = {
      date,
      glucose: g,
      type: type === 'fasting' ? 'Fasting' : 'Post-Meal',
      status,
      color,
      advice,
      timestamp: new Date().toISOString()
    };
    setLogs([logEntry, ...logs]);
    setResult(logEntry);
    showToast('Blood sugar logged! ✅', 'success');
  };

  const clearLogs = () => { setLogs([]); localStorage.removeItem('glucose_logs'); showToast('Logs cleared', 'info'); };
  const getAvgGlucose = () => logs.length ? Math.round(logs.reduce((sum, l) => sum + l.glucose, 0) / logs.length) : 0;

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
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Blood Sugar Log</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Monitor your glucose levels</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Log Your Reading</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setType('fasting')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${type === 'fasting' ? emerald : '#e2e8f0'}`, background: type === 'fasting' ? emeraldLight : 'white', fontWeight: '700', cursor: 'pointer' }}>🍞 Fasting</button>
                  <button onClick={() => setType('postmeal')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${type === 'postmeal' ? emerald : '#e2e8f0'}`, background: type === 'postmeal' ? emeraldLight : 'white', fontWeight: '700', cursor: 'pointer' }}>🍽️ Post-Meal</button>
                </div>
                <input type="number" value={glucose} onChange={e => setGlucose(e.target.value)} placeholder="Blood Glucose (mg/dL) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={logGlucose} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Log Reading</button>
                  <button onClick={clearLogs} style={{ flex: 1, padding: '14px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Clear All</button>
                </div>
              </div>
            </div>
            <div>
              {logs.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Stats</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: emerald }}>{getAvgGlucose()} mg/dL</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Average Glucose</div>
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {logs.slice(0, 10).map((log, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.date}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.type}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: log.color }}>{log.glucose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaTint size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start tracking your blood sugar</p>
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
