import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaStethoscope, FaCheckCircle, FaExclamationTriangle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const symptomList = [
    'Fever', 'Cough', 'Sore Throat', 'Headache', 'Fatigue', 'Body Aches',
    'Shortness of Breath', 'Chest Pain', 'Nausea', 'Dizziness', 'Loss of Taste',
    'Loss of Smell', 'Runny Nose', 'Sneezing', 'Watery Eyes', 'Rash',
    'Joint Pain', 'Muscle Weakness', 'Abdominal Pain', 'Diarrhea',
    'Back Pain', 'Insomnia', 'Anxiety', 'Palpitations', 'Sweating',
    'Chills', 'Loss of Appetite', 'Constipation', 'Bloating', 'Acid Reflux'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('symptom_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('symptom_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const checkSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      showToast('Please select at least one symptom', 'error');
      return;
    }

    let severity = 'Low';
    let color = '#22c55e';
    let advice = 'Your symptoms appear mild. Get plenty of rest and stay hydrated.';
    let recommendation = 'Monitor your symptoms. If they worsen, consult a doctor.';
    let possibleConditions = [];

    const symptomCount = selectedSymptoms.length;
    const severeSymptoms = ['Shortness of Breath', 'Chest Pain', 'Dizziness', 'Loss of Taste', 'Loss of Smell', 'Palpitations'];
    const severeCount = selectedSymptoms.filter(s => severeSymptoms.includes(s)).length;
    const respiratorySymptoms = ['Cough', 'Sore Throat', 'Runny Nose', 'Sneezing', 'Shortness of Breath'];
    const respiratoryCount = selectedSymptoms.filter(s => respiratorySymptoms.includes(s)).length;

    if (symptomCount >= 5 || severeCount >= 2) {
      severity = 'High';
      color = '#ef4444';
      advice = 'You have multiple symptoms. Please consult a healthcare provider immediately.';
      recommendation = 'URGENT: Seek medical attention as soon as possible.';
      possibleConditions = ['Influenza', 'COVID-19', 'Pneumonia'];
    } else if (symptomCount >= 3 || severeCount >= 1) {
      severity = 'Medium';
      color = '#f59e0b';
      advice = 'You have several symptoms. It\'s recommended to consult a healthcare provider.';
      recommendation = 'Schedule an appointment with your doctor within the next 24 hours.';
      possibleConditions = ['Viral infection', 'Allergic reaction', 'Bacterial infection'];
    } else if (respiratoryCount >= 3) {
      severity = 'Medium';
      color = '#f59e0b';
      advice = 'You have multiple respiratory symptoms. Monitor your breathing closely.';
      recommendation = 'Consult your doctor if symptoms persist.';
      possibleConditions = ['Common cold', 'Sinusitis', 'Allergies'];
    } else {
      possibleConditions = ['Minor illness', 'Stress-related', 'Allergic reaction'];
    }

    const resultData = {
      symptoms: [...selectedSymptoms],
      count: selectedSymptoms.length,
      severity,
      color,
      advice,
      recommendation,
      possibleConditions,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('✅ Symptom check complete!', 'success');
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setResult(null);
    showToast('Reset', 'info');
  };

  const clearHistory = () => { setHistory([]); localStorage.removeItem('symptom_history'); showToast('History cleared', 'info'); };

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
                  <FaStethoscope style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Symptom Checker</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>AI-powered symptom triage</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Select Your Symptoms</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '350px', overflowY: 'auto' }}>
                {symptomList.map((symptom) => (
                  <button key={symptom} onClick={() => toggleSymptom(symptom)}
                    style={{
                      padding: '10px', borderRadius: '10px', border: `2px solid ${selectedSymptoms.includes(symptom) ? emerald : '#e2e8f0'}`,
                      background: selectedSymptoms.includes(symptom) ? emeraldLight : 'white',
                      color: selectedSymptoms.includes(symptom) ? emerald : '#64748b',
                      fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'center'
                    }}>
                    {symptom}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button onClick={checkSymptoms} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Check Symptoms</button>
                <button onClick={resetChecker} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
              </div>
              {selectedSymptoms.length > 0 && (
                <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedSymptoms.length} symptoms selected</span>
                </div>
              )}
            </div>

            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${result.color}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Assessment Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: result.color }}>Severity: {result.severity}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{result.count} symptoms reported</div>
                  </div>
                  <div style={{ background: result.color + '15', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}><strong>💡 Advice:</strong> {result.advice}</div>
                    <div style={{ fontSize: '0.85rem', color: result.color, marginTop: '8px' }}><strong>📋 Recommendation:</strong> {result.recommendation}</div>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b', marginTop: '8px' }}><strong>🔍 Possible Conditions:</strong> {result.possibleConditions.join(', ')}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {result.symptoms.map(s => (
                      <span key={s} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem' }}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaStethoscope size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select symptoms to check your health</p>
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
