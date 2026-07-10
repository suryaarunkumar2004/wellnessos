import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaShieldAlt, FaHeartbeat, FaExclamationTriangle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function HealthRiskAssessment() {
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [smoker, setSmoker] = useState('no');
  const [exercise, setExercise] = useState('moderate');
  const [familyHistory, setFamilyHistory] = useState('no');
  const [alcohol, setAlcohol] = useState('no');
  const [diet, setDiet] = useState('good');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  useEffect(() => {
    const saved = localStorage.getItem('risk_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('risk_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const assessRisk = () => {
    if (!age || !bmi) {
      showToast('Please fill in age and BMI', 'error');
      return;
    }
    const a = parseInt(age);
    const b = parseFloat(bmi);
    let score = 0;
    let riskLevel, color, advice, recommendations;

    // Age risk
    if (a > 60) score += 4;
    else if (a > 50) score += 3;
    else if (a > 40) score += 2;
    else if (a > 30) score += 1;

    // BMI risk
    if (b >= 30) score += 3;
    else if (b >= 25) score += 2;
    else if (b < 18.5) score += 1;

    // Lifestyle risks
    if (smoker === 'yes') score += 3;
    if (alcohol === 'yes') score += 2;
    if (exercise === 'sedentary') score += 2;
    if (familyHistory === 'yes') score += 2;
    if (diet === 'poor') score += 2;

    if (score <= 4) {
      riskLevel = 'Low';
      color = '#22c55e';
      advice = 'Your health risk is low. Maintain your current healthy lifestyle.';
      recommendations = ['Continue regular exercise', 'Maintain balanced diet', 'Regular health check-ups'];
    } else if (score <= 8) {
      riskLevel = 'Moderate';
      color = '#f59e0b';
      advice = 'Your health risk is moderate. Consider making some lifestyle improvements.';
      recommendations = ['Increase physical activity', 'Improve dietary habits', 'Reduce alcohol consumption', 'Monitor blood pressure regularly'];
    } else if (score <= 12) {
      riskLevel = 'High';
      color = '#f97316';
      advice = 'Your health risk is high. Please consult a healthcare provider.';
      recommendations = ['Schedule a comprehensive health check-up', 'Consider smoking cessation programs', 'Start a supervised exercise program', 'Monitor all vital signs regularly'];
    } else {
      riskLevel = 'Very High';
      color = '#ef4444';
      advice = 'Your health risk is very high. Seek immediate medical consultation.';
      recommendations = ['URGENT: Schedule a doctor\'s appointment today', 'Comprehensive health screening needed', 'Lifestyle intervention required', 'Medication review recommended'];
    }

    const resultData = {
      score,
      riskLevel,
      color,
      advice,
      recommendations,
      age: a,
      bmi: b,
      smoker,
      alcohol,
      exercise,
      familyHistory,
      diet,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('✅ Risk assessment complete!', 'success');
  };

  const resetAssessment = () => {
    setAge(''); setBmi(''); setSmoker('no'); setAlcohol('no'); setExercise('moderate'); setFamilyHistory('no'); setDiet('good'); setResult(null);
    showToast('Reset', 'info');
  };

  const clearHistory = () => { setHistory([]); localStorage.removeItem('risk_history'); showToast('History cleared', 'info'); };
  const exportResults = () => {
    if (!result) return;
    const data = `Health Risk Report\nDate: ${result.date}\nScore: ${result.score}\nRisk Level: ${result.riskLevel}\nAdvice: ${result.advice}\nAge: ${result.age}\nBMI: ${result.bmi}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `risk_report_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📄 Report exported!', 'success');
  };
  const printResults = () => { if (result) window.print(); };
  const shareResults = () => {
    if (!result) return;
    const text = `Health Risk: ${result.riskLevel} (Score: ${result.score})`;
    if (navigator.share) { navigator.share({ title: 'My Health Risk', text }).catch(() => {}); } else { navigator.clipboard.writeText(text); showToast('📋 Copied!', 'success'); }
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
                  <FaShieldAlt style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Risk Assessment</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Cardiovascular & lifestyle risk scoring</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Your Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" step="0.1" value={bmi} onChange={e => setBmi(e.target.value)} placeholder="BMI *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSmoker('yes')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${smoker === 'yes' ? emerald : '#e2e8f0'}`, background: smoker === 'yes' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>🚬 Smoker</button>
                  <button onClick={() => setSmoker('no')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${smoker === 'no' ? emerald : '#e2e8f0'}`, background: smoker === 'no' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>✅ Non-Smoker</button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setAlcohol('yes')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${alcohol === 'yes' ? emerald : '#e2e8f0'}`, background: alcohol === 'yes' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>🍷 Drinks</button>
                  <button onClick={() => setAlcohol('no')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${alcohol === 'no' ? emerald : '#e2e8f0'}`, background: alcohol === 'no' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>✅ No Alcohol</button>
                </div>

                <select value={exercise} onChange={e => setExercise(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Exercise</option>
                  <option value="moderate">Moderate Exercise</option>
                  <option value="active">Active</option>
                </select>

                <select value={diet} onChange={e => setDiet(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                  <option value="good">🥗 Good Diet</option>
                  <option value="average">🍕 Average Diet</option>
                  <option value="poor">🍔 Poor Diet</option>
                </select>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setFamilyHistory('yes')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${familyHistory === 'yes' ? emerald : '#e2e8f0'}`, background: familyHistory === 'yes' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>Family History</button>
                  <button onClick={() => setFamilyHistory('no')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${familyHistory === 'no' ? emerald : '#e2e8f0'}`, background: familyHistory === 'no' ? '#ecfdf5' : 'white', fontWeight: '700', cursor: 'pointer' }}>No History</button>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={assessRisk} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Assess Risk</button>
                  <button onClick={resetAssessment} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>

            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.score}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: result.color }}>{result.riskLevel} Risk</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Recommendations</div>
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} style={{ fontSize: '0.8rem', color: '#1e293b', marginTop: '2px' }}>• {rec}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>Age: {result.age}</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>BMI: {result.bmi}</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>{result.smoker === 'yes' ? '🚬 Smoker' : '✅ Non-Smoker'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={exportResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaDownload size={12} /> Export</button>
                    <button onClick={printResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaPrint size={12} /> Print</button>
                    <button onClick={shareResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaShare size={12} /> Share</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaShieldAlt size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your details to assess health risk</p>
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
