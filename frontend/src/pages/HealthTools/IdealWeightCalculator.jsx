import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaWeight, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  useEffect(() => {
    const saved = localStorage.getItem('idealweight_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('idealweight_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateIdealWeight = () => {
    if (!height) {
      showToast('Please enter your height', 'error');
      return;
    }
    const h = parseFloat(height);
    let weightLow, weightHigh, formula;
    if (gender === 'male') {
      weightLow = 50 + 0.91 * (h - 152.4);
      weightHigh = 56 + 0.91 * (h - 152.4);
      formula = 'Robinson Formula (Male)';
    } else {
      weightLow = 45.5 + 0.91 * (h - 152.4);
      weightHigh = 49 + 0.91 * (h - 152.4);
      formula = 'Robinson Formula (Female)';
    }
    const avg = (weightLow + weightHigh) / 2;
    const resultData = {
      weightLow: weightLow.toFixed(1),
      weightHigh: weightHigh.toFixed(1),
      avg: avg.toFixed(1),
      height: h,
      gender,
      formula,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('Ideal weight calculated! ✅', 'success');
  };

  const resetCalculator = () => { setHeight(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('idealweight_history'); showToast('History cleared', 'info'); };

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
                  <FaWeight style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Ideal Weight Calculator</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Find your optimal healthy weight range</p>
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
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setGender('male')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'male' ? emerald : '#e2e8f0'}`, background: gender === 'male' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>Male</button>
                  <button onClick={() => setGender('female')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'female' ? emerald : '#e2e8f0'}`, background: gender === 'female' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>Female</button>
                </div>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateIdealWeight} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Calculate</button>
                  <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: emerald }}>{result.avg} kg</div>
                    <div style={{ fontSize: '1rem', color: '#64748b' }}>Ideal Weight</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Range</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>{result.weightLow} - {result.weightHigh} kg</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Formula</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{result.formula}</div>
                    </div>
                  </div>
                  <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> Your ideal weight is around <strong>{result.avg} kg</strong></div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaWeight size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your height to find your ideal weight</p>
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
