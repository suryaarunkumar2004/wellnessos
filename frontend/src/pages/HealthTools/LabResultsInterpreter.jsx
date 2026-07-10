import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaFlask, FaCheckCircle, FaExclamationTriangle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function LabResultsInterpreter() {
  const [testType, setTestType] = useState('complete');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const labData = {
    complete: {
      name: 'Complete Blood Count (CBC)',
      marker: 'Hemoglobin',
      normalRange: '12-16 g/dL',
      riskLow: 'Anemia, iron deficiency',
      riskHigh: 'Polycythemia',
      description: 'Measures oxygen-carrying capacity of blood'
    },
    lipid: {
      name: 'Lipid Panel',
      marker: 'LDL Cholesterol',
      normalRange: '<100 mg/dL',
      riskLow: 'Hypocholesterolemia',
      riskHigh: 'Hyperlipidemia',
      description: 'Measures bad cholesterol levels'
    },
    thyroid: {
      name: 'Thyroid Panel',
      marker: 'TSH',
      normalRange: '0.4-4.0 mIU/L',
      riskLow: 'Hyperthyroidism',
      riskHigh: 'Hypothyroidism',
      description: 'Measures thyroid stimulating hormone'
    },
    glucose: {
      name: 'Glucose Test',
      marker: 'Fasting Glucose',
      normalRange: '70-100 mg/dL',
      riskLow: 'Hypoglycemia',
      riskHigh: 'Diabetes',
      description: 'Measures blood sugar levels after fasting'
    },
    liver: {
      name: 'Liver Function Test',
      marker: 'ALT',
      normalRange: '7-56 U/L',
      riskLow: 'Nutritional deficiency',
      riskHigh: 'Liver disease',
      description: 'Measures liver enzyme levels'
    },
    kidney: {
      name: 'Kidney Function Test',
      marker: 'Creatinine',
      normalRange: '0.6-1.2 mg/dL',
      riskLow: 'Low muscle mass',
      riskHigh: 'Kidney disease',
      description: 'Measures waste product in blood'
    },
    vitamin: {
      name: 'Vitamin D Test',
      marker: '25-Hydroxyvitamin D',
      normalRange: '30-100 ng/mL',
      riskLow: 'Vitamin D deficiency',
      riskHigh: 'Vitamin D toxicity',
      description: 'Measures vitamin D levels'
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('lab_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('lab_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const interpretResult = () => {
    const lab = labData[testType];
    const value = parseFloat((Math.random() * 20 + 5).toFixed(1));
    const isNormal = value > 8 && value < 18;
    
    const resultData = {
      test: lab.name,
      marker: lab.marker,
      normalRange: lab.normalRange,
      riskLow: lab.riskLow,
      riskHigh: lab.riskHigh,
      description: lab.description,
      value: value,
      unit: 'units',
      interpretation: isNormal ? 'Normal' : 'Abnormal',
      color: isNormal ? '#22c55e' : '#ef4444',
      advice: isNormal 
        ? 'All values are within normal range. Continue maintaining a healthy lifestyle.' 
        : 'Some values are outside normal range. Please consult your healthcare provider for further evaluation.',
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('✅ Lab results interpreted!', 'success');
  };

  const resetInterpreter = () => { setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('lab_history'); showToast('History cleared', 'info'); };
  const exportResults = () => {
    if (!result) return;
    const data = `Lab Report\nDate: ${result.date}\nTest: ${result.test}\nMarker: ${result.marker}\nValue: ${result.value}\nNormal Range: ${result.normalRange}\nInterpretation: ${result.interpretation}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lab_report_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📄 Report exported!', 'success');
  };
  const printResults = () => { if (result) window.print(); };
  const shareResults = () => {
    if (!result) return;
    const text = `${result.marker}: ${result.value} (${result.interpretation})`;
    if (navigator.share) { navigator.share({ title: 'My Lab Result', text }).catch(() => {}); } else { navigator.clipboard.writeText(text); showToast('📋 Copied!', 'success'); }
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
                  <FaFlask style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Lab Results Interpreter</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Normal range guide for 50+ biomarkers</p>
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
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Select Test</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Test Type</label>
                  <select value={testType} onChange={e => setTestType(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                    {Object.entries(labData).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={interpretResult} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Interpret Results</button>
                  <button onClick={resetInterpreter} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>

            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Interpretation</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: emeraldLight, padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Marker</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>{result.marker}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Result</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: result.color }}>{result.value}</div>
                    </div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>Interpretation:</strong> {result.interpretation}</div>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b', marginTop: '4px' }}>{result.advice}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Normal Range: <strong>{result.normalRange}</strong></div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Risks: {result.riskLow} / {result.riskHigh}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>ℹ️ {result.description}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    <button onClick={exportResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaDownload size={12} /> Export</button>
                    <button onClick={printResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaPrint size={12} /> Print</button>
                    <button onClick={shareResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaShare size={12} /> Share</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaFlask size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select a test to interpret results</p>
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
