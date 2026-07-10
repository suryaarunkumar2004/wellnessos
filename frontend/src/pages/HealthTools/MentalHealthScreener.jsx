import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaComment, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function MentalHealthScreener() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const questions = [
    { id: 'q1', text: 'Little interest or pleasure in doing things?' },
    { id: 'q2', text: 'Feeling down, depressed, or hopeless?' },
    { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much?' },
    { id: 'q4', text: 'Feeling tired or having little energy?' },
    { id: 'q5', text: 'Poor appetite or overeating?' },
    { id: 'q6', text: 'Feeling bad about yourself?' },
    { id: 'q7', text: 'Trouble concentrating on things?' },
    { id: 'q8', text: 'Moving or speaking so slowly that others have noticed?' },
    { id: 'q9', text: 'Thoughts that you would be better off dead?' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('mental_screener_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('mental_screener_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + parseInt(val), 0);
    let severity, color, advice, recommendation;

    if (total <= 4) {
      severity = 'Minimal Depression';
      color = '#22c55e';
      advice = 'Your symptoms are minimal. Continue maintaining your mental health.';
      recommendation = 'Practice mindfulness and maintain social connections.';
    } else if (total <= 9) {
      severity = 'Mild Depression';
      color = '#3b82f6';
      advice = 'You have mild symptoms. Consider talking to a counselor.';
      recommendation = 'Schedule a mental health check-up.';
    } else if (total <= 14) {
      severity = 'Moderate Depression';
      color = '#f59e0b';
      advice = 'Your symptoms are moderate. Professional support is recommended.';
      recommendation = 'Please consult a mental health professional.';
    } else if (total <= 19) {
      severity = 'Moderately Severe Depression';
      color = '#f97316';
      advice = 'Your symptoms are significant. Please seek professional help.';
      recommendation = 'Reach out to a mental health professional today.';
    } else {
      severity = 'Severe Depression';
      color = '#ef4444';
      advice = 'Your symptoms are severe. Immediate professional support is needed.';
      recommendation = 'Contact a mental health professional or crisis hotline immediately.';
    }

    const resultData = { total, severity, color, advice, recommendation, date: new Date().toLocaleString() };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    localStorage.setItem('mental_screener_history', JSON.stringify(history));
    showToast('✅ Screening complete!', 'success');
  };

  const resetScreener = () => {
    setAnswers({});
    setResult(null);
    showToast('Reset', 'info');
  };

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
                  <FaComment style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Mental Health Screener</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Validated PHQ-9 and GAD-7 assessments</p>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                {questions.map((q) => (
                  <div key={q.id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>{q.text}</div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[0, 1, 2, 3].map(val => (
                        <button key={val} onClick={() => setAnswers({ ...answers, [q.id]: val })}
                          style={{
                            padding: '4px 8px', borderRadius: '6px', border: `1px solid ${answers[q.id] === val ? emerald : '#e2e8f0'}`,
                            background: answers[q.id] === val ? emeraldLight : 'white',
                            color: answers[q.id] === val ? emerald : '#64748b',
                            fontWeight: '700', fontSize: '0.7rem', cursor: 'pointer', flex: 1
                          }}>
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button onClick={calculateScore} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Get Results</button>
                <button onClick={resetScreener} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.total}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: result.color }}>{result.severity}</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                    <div style={{ fontSize: '0.85rem', color: result.color, marginTop: '8px' }}><strong>📋 Recommendation:</strong> {result.recommendation}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaComment size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Answer all questions to get your mental health screening</p>
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
