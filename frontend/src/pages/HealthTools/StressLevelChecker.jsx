import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBrain, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function StressLevelChecker() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const questions = [
    'How often do you feel overwhelmed?',
    'How often do you have trouble sleeping?',
    'How often do you feel anxious?',
    'How often do you feel irritable?',
    'How often do you have difficulty concentrating?',
    'How often do you feel tired?',
    'How often do you experience physical tension?',
    'How often do you feel sad or depressed?',
    'How often do you have racing thoughts?',
    'How often do you feel like you cannot cope?'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('stress_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('stress_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateStress = () => {
    const values = Object.values(answers);
    if (values.some(v => v === '')) {
      showToast('Please answer all questions', 'error');
      return;
    }
    const total = values.reduce((sum, v) => sum + parseInt(v), 0);
    let level, color, advice;

    if (total <= 10) {
      level = 'Low';
      color = '#22c55e';
      advice = 'Great! Your stress levels are well managed.';
    } else if (total <= 20) {
      level = 'Moderate';
      color = '#f59e0b';
      advice = 'You\'re experiencing some stress. Consider relaxation techniques.';
    } else if (total <= 30) {
      level = 'High';
      color = '#f97316';
      advice = 'Your stress levels are significant. Consider professional support.';
    } else {
      level = 'Severe';
      color = '#ef4444';
      advice = 'Your stress levels are severe. Please seek professional help.';
    }

    const resultData = {
      total,
      level,
      color,
      advice,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('Stress assessment complete! ✅', 'success');
  };

  const resetCalculator = () => {
    const reset = {};
    Object.keys(answers).forEach(key => reset[key] = '');
    setAnswers(reset);
    setResult(null);
    showToast('Reset', 'info');
  };

  const clearHistory = () => { setHistory([]); localStorage.removeItem('stress_history'); showToast('History cleared', 'info'); };

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
                  <FaBrain style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Stress Level Checker</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>PSS-based perceived stress assessment</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Answer the Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                {questions.map((q, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>{idx + 1}. {q}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(val => (
                        <button key={val} onClick={() => setAnswers({ ...answers, [`q${idx + 1}`]: val })}
                          style={{
                            padding: '4px 12px', borderRadius: '6px', border: `1px solid ${answers[`q${idx + 1}`] === val ? emerald : '#e2e8f0'}`,
                            background: answers[`q${idx + 1}`] === val ? emeraldLight : 'white',
                            color: answers[`q${idx + 1}`] === val ? emerald : '#64748b',
                            fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer'
                          }}>
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button onClick={calculateStress} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Check Stress</button>
                <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.total}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: result.color }}>{result.level} Stress</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBrain size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Answer all questions to assess your stress level</p>
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
