import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaShare, FaCopy, FaTwitter, FaFacebook, FaWhatsapp, FaEnvelope, FaHistory, FaDownload, FaPrint, FaTrash } from 'react-icons/fa';

export default function ShareResults() {
  const [resultType, setResultType] = useState('bmi');
  const [resultValue, setResultValue] = useState('');
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('share_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('share_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generateResult = () => {
    const values = {
      bmi: (Math.random() * 15 + 18).toFixed(1),
      bmr: Math.floor(Math.random() * 500 + 1500),
      bodyfat: (Math.random() * 20 + 10).toFixed(1),
      water: Math.floor(Math.random() * 1500 + 2000),
      sleep: (Math.random() * 3 + 6).toFixed(1)
    };
    setResultValue(values[resultType]);
    const historyEntry = { type: resultType, value: values[resultType], date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('share_history', JSON.stringify(history));
    showToast('✅ Result generated!', 'success');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My ${resultType.toUpperCase()} result: ${resultValue}`);
    showToast('📋 Copied to clipboard!', 'success');
  };

  const shareOnSocial = (platform) => {
    const text = `My ${resultType.toUpperCase()} result: ${resultValue}`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=My Health Result&body=${encodeURIComponent(text)}`
    };
    window.open(urls[platform], '_blank');
    showToast(`📤 Shared on ${platform}!`, 'success');
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
                  <FaShare style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Share Results</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Share health summaries with your care team</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Generate & Share</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <select value={resultType} onChange={e => setResultType(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                  <option value="bmi">BMI</option>
                  <option value="bmr">BMR</option>
                  <option value="bodyfat">Body Fat %</option>
                  <option value="water">Water Intake</option>
                  <option value="sleep">Sleep Hours</option>
                </select>
                <button onClick={generateResult} style={{ padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Generate Result</button>
                {resultValue && (
                  <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{resultType.toUpperCase()} Result</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: emerald }}>{resultValue}</div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={copyToClipboard} style={{ padding: '10px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>Copy</button>
                  <button onClick={() => shareOnSocial('twitter')} style={{ padding: '10px 16px', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>Twitter</button>
                  <button onClick={() => shareOnSocial('facebook')} style={{ padding: '10px 16px', background: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>Facebook</button>
                  <button onClick={() => shareOnSocial('whatsapp')} style={{ padding: '10px 16px', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}>WhatsApp</button>
                </div>
              </div>
            </div>
            <div>
              {history.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Share History</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {history.slice(0, 10).map((entry, idx) => (
                      <div key={idx} style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: '700', color: '#1e293b' }}>{entry.type.toUpperCase()}</span>
                          <span style={{ color: emerald, fontWeight: '700' }}>{entry.value}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{entry.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaShare size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Generate a result to share</p>
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
