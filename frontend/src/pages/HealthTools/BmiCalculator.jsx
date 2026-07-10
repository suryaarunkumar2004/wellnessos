import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaWeight, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  useEffect(() => {
    const saved = localStorage.getItem('bmi_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('bmi_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateBMI = () => {
    if (!height || !weight) {
      showToast('Please enter both height and weight', 'error');
      return;
    }
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmi = w / (h * h);
    let category, color, advice;
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; advice = 'Consider gaining weight through a balanced diet.'; }
    else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e'; advice = 'Great job! Maintain your current healthy lifestyle.'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; advice = 'Consider a gradual weight loss plan.'; }
    else if (bmi < 35) { category = 'Obese Class I'; color = '#f97316'; advice = 'Consult a healthcare provider for a weight management plan.'; }
    else if (bmi < 40) { category = 'Obese Class II'; color = '#ef4444'; advice = 'Medical evaluation is recommended.'; }
    else { category = 'Obese Class III'; color = '#dc2626'; advice = 'Immediate medical consultation is strongly advised.'; }
    
    const resultData = { bmi: bmi.toFixed(1), category, color, advice, height: parseFloat(height), weight: parseFloat(weight), date: new Date().toLocaleString() };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('BMI calculated successfully! ✅', 'success');
  };

  const resetCalculator = () => { setHeight(''); setWeight(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('bmi_history'); showToast('History cleared', 'info'); };

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
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>BMI Calculator</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Calculate your Body Mass Index</p>
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
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateBMI} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Calculate</button>
                  <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.bmi}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: result.color }}>{result.category}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => { navigator.clipboard.writeText(`BMI: ${result.bmi} (${result.category})`); showToast('Copied!', 'success'); }} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>Copy</button>
                    <button onClick={() => window.print()} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>Print</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaWeight size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your height and weight</p>
                </div>
              )}
            </div>
          </div>

          {history.length > 0 && (
            <div style={{ marginTop: '32px', background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}><FaHistory style={{ color: emerald }} /> History ({history.length})</h3>
                <button onClick={clearHistory} style={{ padding: '6px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Clear</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {history.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: `1px solid ${item.color}30` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '700', color: item.color }}>{item.bmi}</span>
                      <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{item.date.split(',')[0]}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: item.color, fontWeight: '600' }}>{item.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      </>
  );
}
