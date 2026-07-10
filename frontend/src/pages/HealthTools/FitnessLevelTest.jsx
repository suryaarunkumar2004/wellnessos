import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaHeartbeat, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function FitnessLevelTest() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [restingHR, setRestingHR] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('moderate');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('fitness_test_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('fitness_test_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateFitness = () => {
    if (!age || !restingHR) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const a = parseInt(age);
    const hr = parseInt(restingHR);
    let score = 0;
    let fitnessLevel, color, advice;

    if (a < 30) score += 20;
    else if (a < 40) score += 18;
    else if (a < 50) score += 15;
    else if (a < 60) score += 12;
    else score += 8;

    if (hr < 60) score += 25;
    else if (hr < 70) score += 20;
    else if (hr < 80) score += 15;
    else if (hr < 90) score += 10;
    else score += 5;

    const freqScores = { sedentary: 5, light: 12, moderate: 20, active: 25, very_active: 30 };
    score += freqScores[exerciseFrequency] || 10;
    score += gender === 'male' ? 2 : 0;

    if (score >= 70) {
      fitnessLevel = 'Excellent';
      color = '#22c55e';
      advice = 'Your fitness level is excellent! You are in great shape.';
    } else if (score >= 55) {
      fitnessLevel = 'Good';
      color = '#3b82f6';
      advice = 'Your fitness level is good! You are on the right track.';
    } else if (score >= 40) {
      fitnessLevel = 'Average';
      color = '#f59e0b';
      advice = 'Your fitness level is average. Regular exercise can improve this.';
    } else if (score >= 25) {
      fitnessLevel = 'Below Average';
      color = '#f97316';
      advice = 'Your fitness level is below average. Start with light exercise.';
    } else {
      fitnessLevel = 'Needs Improvement';
      color = '#ef4444';
      advice = 'Your fitness level needs improvement. Please consult a healthcare provider.';
    }

    const resultData = {
      score,
      fitnessLevel,
      color,
      advice,
      age: a,
      gender,
      restingHR: hr,
      exerciseFrequency,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    localStorage.setItem('fitness_test_history', JSON.stringify(history));
    showToast('✅ Fitness test complete!', 'success');
  };

  const resetTest = () => { setAge(''); setRestingHR(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('fitness_test_history'); showToast('History cleared', 'info'); };

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
                  <FaHeartbeat style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Fitness Level Test</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>VO2max estimation and fitness grading</p>
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
                  <button onClick={() => setGender('male')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'male' ? emerald : '#e2e8f0'}`, background: gender === 'male' ? emeraldLight : 'white', fontWeight: '700', cursor: 'pointer' }}>👨 Male</button>
                  <button onClick={() => setGender('female')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === 'female' ? emerald : '#e2e8f0'}`, background: gender === 'female' ? emeraldLight : 'white', fontWeight: '700', cursor: 'pointer' }}>👩 Female</button>
                </div>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={restingHR} onChange={e => setRestingHR(e.target.value)} placeholder="Resting Heart Rate (bpm) *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <select value={exerciseFrequency} onChange={e => setExerciseFrequency(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light (1-2x/week)</option>
                  <option value="moderate">Moderate (3-4x/week)</option>
                  <option value="active">Active (5-6x/week)</option>
                  <option value="very_active">Very Active (7x/week)</option>
                </select>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateFitness} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Test Fitness</button>
                  <button onClick={resetTest} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>
            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}` }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: result.color }}>{result.score}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: result.color }}>{result.fitnessLevel}</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>Age: {result.age}</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', fontSize: '0.7rem' }}>HR: {result.restingHR} bpm</span>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaHeartbeat size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your details to test your fitness</p>
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
