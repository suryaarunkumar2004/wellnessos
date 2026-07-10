import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaRunning, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function FitnessAgeCalculator() {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [bmi, setBmi] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  useEffect(() => {
    const saved = localStorage.getItem('fitnessage_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('fitnessage_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateFitnessAge = () => {
    if (!age || !restingHR || !bmi) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const a = parseFloat(age);
    const hr = parseFloat(restingHR);
    const b = parseFloat(bmi);
    
    let fitnessAge = a;
    if (hr < 60) fitnessAge -= 5;
    else if (hr < 70) fitnessAge -= 2;
    else if (hr < 80) fitnessAge += 1;
    else if (hr < 90) fitnessAge += 4;
    else fitnessAge += 8;
    
    if (b >= 18.5 && b <= 24.9) fitnessAge -= 3;
    else if (b >= 25 && b <= 29.9) fitnessAge += 2;
    else if (b >= 30) fitnessAge += 5;
    
    const activityFactors = {
      sedentary: 5,
      light: 2,
      moderate: 0,
      active: -3,
      very_active: -6
    };
    fitnessAge += activityFactors[activityLevel] || 0;
    fitnessAge = Math.max(18, Math.min(80, Math.round(fitnessAge)));
    
    let category, color, advice;
    if (fitnessAge < a) {
      category = 'Younger than chronological age';
      color = '#22c55e';
      advice = 'Excellent fitness! You are biologically younger than your chronological age.';
    } else if (fitnessAge === a) {
      category = 'Same as chronological age';
      color = '#3b82f6';
      advice = 'Your fitness age matches your chronological age.';
    } else {
      category = 'Older than chronological age';
      color = '#f59e0b';
      advice = 'Your fitness age is higher than your chronological age. Focus on cardiovascular exercise.';
    }

    const resultData = {
      fitnessAge,
      chronologicalAge: a,
      category,
      color,
      advice,
      restingHR: hr,
      bmi: b,
      activityLevel,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('Fitness Age calculated! ✅', 'success');
  };

  const resetCalculator = () => { setAge(''); setRestingHR(''); setBmi(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('fitnessage_history'); showToast('History cleared', 'info'); };

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
                  <FaRunning style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Fitness Age Calculator</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Discover your biological fitness age</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Your Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={restingHR} onChange={e => setRestingHR(e.target.value)} placeholder="Resting Heart Rate (bpm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={bmi} onChange={e => setBmi(e.target.value)} placeholder="BMI *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Exercise</option>
                  <option value="moderate">Moderate Exercise</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </select>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateFitnessAge} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Calculate</button>
                  <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.fitnessAge}</div>
                    <div style={{ fontSize: '1rem', color: '#64748b' }}>Fitness Age</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: result.color }}>vs {result.chronologicalAge} years</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 {result.category}</strong></div>
                    <div style={{ fontSize: '0.8rem', color: '#1e293b', marginTop: '4px' }}>{result.advice}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaRunning size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your details to calculate fitness age</p>
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
