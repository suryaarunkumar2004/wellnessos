import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaPills, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function DrugInteractionChecker() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const drugDatabase = {
    'Metformin': { interactions: ['Lisinopril', 'Atorvastatin', 'Furosemide'], severity: 'Moderate' },
    'Lisinopril': { interactions: ['Metformin', 'Atorvastatin', 'Ibuprofen', 'Potassium'], severity: 'High' },
    'Atorvastatin': { interactions: ['Metformin', 'Lisinopril', 'Gemfibrozil'], severity: 'Moderate' },
    'Aspirin': { interactions: ['Ibuprofen', 'Warfarin', 'Heparin'], severity: 'High' },
    'Ibuprofen': { interactions: ['Aspirin', 'Lisinopril', 'Warfarin'], severity: 'Moderate' },
    'Warfarin': { interactions: ['Aspirin', 'Ibuprofen', 'Amoxicillin'], severity: 'Critical' },
    'Amoxicillin': { interactions: ['Warfarin', 'Allopurinol'], severity: 'Moderate' },
    'Furosemide': { interactions: ['Metformin', 'Lisinopril', 'Digoxin'], severity: 'Moderate' },
    'Digoxin': { interactions: ['Furosemide', 'Amiodarone'], severity: 'High' },
    'Levothyroxine': { interactions: ['Calcium', 'Iron', 'Omeprazole'], severity: 'Moderate' },
  };

  useEffect(() => {
    const saved = localStorage.getItem('interaction_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('interaction_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const checkInteraction = () => {
    if (!drug1 || !drug2) {
      showToast('Please enter both drug names', 'error');
      return;
    }
    if (drug1 === drug2) {
      showToast('Please enter two different drugs', 'error');
      return;
    }

    const d1 = drug1.charAt(0).toUpperCase() + drug1.slice(1).toLowerCase();
    const d2 = drug2.charAt(0).toUpperCase() + drug2.slice(1).toLowerCase();

    let interaction = null;
    let severity = 'None';
    let color = '#22c55e';
    let advice = 'No known interactions between these medications.';
    let recommendation = 'Safe to take as prescribed.';

    const drug1Data = drugDatabase[d1];
    const drug2Data = drugDatabase[d2];

    if (drug1Data && drug1Data.interactions.includes(d2)) {
      interaction = drug1Data;
      severity = drug1Data.severity;
    } else if (drug2Data && drug2Data.interactions.includes(d1)) {
      interaction = drug2Data;
      severity = drug2Data.severity;
    }

    if (severity === 'Critical') {
      color = '#dc2626';
      advice = '⚠️ CRITICAL interaction detected! These medications should not be taken together.';
      recommendation = 'Consult your healthcare provider immediately.';
    } else if (severity === 'High') {
      color = '#ef4444';
      advice = '⚠️ High interaction detected. Monitor closely and consult your doctor.';
      recommendation = 'Schedule a consultation with your healthcare provider.';
    } else if (severity === 'Moderate') {
      color = '#f59e0b';
      advice = '⚠️ Moderate interaction detected. Monitor for side effects.';
      recommendation = 'Consult your pharmacist or doctor for guidance.';
    }

    const resultData = {
      drug1: d1,
      drug2: d2,
      severity,
      color,
      advice,
      recommendation,
      hasInteraction: severity !== 'None',
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('Interaction check complete! ✅', 'success');
  };

  const resetChecker = () => { setDrug1(''); setDrug2(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('interaction_history'); showToast('History cleared', 'info'); };

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
                  <FaPills style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Drug Interaction Checker</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Check medication interactions</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Medications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" value={drug1} onChange={e => setDrug1(e.target.value)} placeholder="Medication 1 *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="text" value={drug2} onChange={e => setDrug2(e.target.value)} placeholder="Medication 2 *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={checkInteraction} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Check Interaction</button>
                  <button onClick={resetChecker} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Interaction Result</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: result.color }}>{result.severity}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{result.drug1} ↔ {result.drug2}</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 {result.hasInteraction ? 'Interaction Found' : 'No Interaction'}</strong></div>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b', marginTop: '4px' }}>{result.advice}</div>
                    <div style={{ fontSize: '0.85rem', color: result.color, marginTop: '8px' }}><strong>📋 Recommendation:</strong> {result.recommendation}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaPills size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter two medications to check for interactions</p>
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
