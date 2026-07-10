import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaRuler, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  useEffect(() => {
    const saved = localStorage.getItem('bodyfat_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('bodyfat_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateBodyFat = () => {
    if (!height || !weight || !waist || !neck) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const ws = parseFloat(waist);
    const n = parseFloat(neck);
    let bodyFat;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(ws - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(ws - n) - 97.684 * Math.log10(h) - 78.387;
    }
    bodyFat = Math.max(2, Math.min(50, bodyFat));
    let category, color;
    if (bodyFat < 6) { category = 'Essential Fat'; color = '#3b82f6'; }
    else if (bodyFat < 14) { category = 'Athletic'; color = '#22c55e'; }
    else if (bodyFat < 18) { category = 'Fitness'; color = '#059669'; }
    else if (bodyFat < 25) { category = 'Average'; color = '#f59e0b'; }
    else if (bodyFat < 30) { category = 'Overfat'; color = '#f97316'; }
    else { category = 'Obese'; color = '#ef4444'; }

    const resultData = { bodyFat: bodyFat.toFixed(1), category, color, height: h, weight: w, gender, date: new Date().toLocaleString() };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('Body Fat calculated successfully! ✅', 'success');
  };

  const resetCalculator = () => { setHeight(''); setWeight(''); setWaist(''); setNeck(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('bodyfat_history'); showToast('History cleared', 'info'); };

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
                  <FaRuler style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Body Fat Calculator</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Estimate your body fat percentage</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Your Measurements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setGender('male')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'male' ? emerald : '#e2e8f0'}`, background: gender === 'male' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>Male</button>
                  <button onClick={() => setGender('female')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'female' ? emerald : '#e2e8f0'}`, background: gender === 'female' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>Female</button>
                </div>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="Waist (cm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder="Neck (cm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateBodyFat} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Calculate</button>
                  <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.bodyFat}%</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: result.color }}>{result.category}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.category === 'Athletic' || result.category === 'Fitness' ? 'Great body composition!' : 'Consult a healthcare provider for personalized advice.'}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaRuler size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your measurements</p>
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
