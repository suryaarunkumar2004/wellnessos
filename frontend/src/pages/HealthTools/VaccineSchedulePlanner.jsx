import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaSyringe, FaCalendarAlt, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function VaccineSchedulePlanner() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const vaccines = [
    { name: 'HepB', fullName: 'Hepatitis B', age: 0, dose: 'Birth', booster: 'No' },
    { name: 'DTaP', fullName: 'Diphtheria, Tetanus, Pertussis', age: 2, dose: 'Primary', booster: 'Yes at 4-6 years' },
    { name: 'IPV', fullName: 'Polio (Inactivated)', age: 2, dose: 'Primary', booster: 'Yes at 4-6 years' },
    { name: 'Hib', fullName: 'Haemophilus influenzae type b', age: 2, dose: 'Primary', booster: 'Yes at 12-15 months' },
    { name: 'PCV', fullName: 'Pneumococcal Conjugate', age: 2, dose: 'Primary', booster: 'Yes at 12-15 months' },
    { name: 'Rotavirus', fullName: 'Rotavirus', age: 2, dose: 'Primary', booster: 'No' },
    { name: 'MMR', fullName: 'Measles, Mumps, Rubella', age: 12, dose: 'Primary', booster: 'Yes at 4-6 years' },
    { name: 'Varicella', fullName: 'Chickenpox', age: 12, dose: 'Primary', booster: 'Yes at 4-6 years' },
    { name: 'HepA', fullName: 'Hepatitis A', age: 12, dose: 'Primary', booster: 'Yes at 18-24 months' },
    { name: 'DTaP Booster', fullName: 'Tetanus, Diphtheria, Pertussis (Booster)', age: 48, dose: 'Booster', booster: 'No' },
    { name: 'IPV Booster', fullName: 'Polio (Booster)', age: 48, dose: 'Booster', booster: 'No' },
    { name: 'MMR Booster', fullName: 'Measles, Mumps, Rubella (Booster)', age: 48, dose: 'Booster', booster: 'No' },
    { name: 'Varicella Booster', fullName: 'Chickenpox (Booster)', age: 48, dose: 'Booster', booster: 'No' },
    { name: 'HPV', fullName: 'Human Papillomavirus', age: 132, dose: 'Series', booster: 'No' },
    { name: 'Tdap', fullName: 'Tetanus, Diphtheria, Pertussis (Adolescent)', age: 132, dose: 'Booster', booster: 'Every 10 years' },
    { name: 'Meningococcal', fullName: 'Meningitis (MenACWY)', age: 132, dose: 'Primary', booster: 'Yes at 16 years' },
    { name: 'COVID-19', fullName: 'COVID-19 Vaccine', age: 6, dose: 'Series', booster: 'Yes annually' },
    { name: 'Influenza', fullName: 'Flu Shot', age: 6, dose: 'Annual', booster: 'Yes annually' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('vaccine_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('vaccine_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const planVaccines = () => {
    if (!age) {
      showToast('Please enter your age', 'error');
      return;
    }
    const a = parseInt(age);
    if (isNaN(a) || a < 0) {
      showToast('Please enter a valid age', 'error');
      return;
    }

    const recommended = vaccines.filter(v => v.age <= a);
    const upcoming = vaccines.filter(v => v.age > a);
    const urgent = vaccines.filter(v => v.age <= a && v.age > a - 6);

    const resultData = {
      age: a,
      recommended: recommended.map(v => ({ name: v.name, fullName: v.fullName, dose: v.dose, booster: v.booster })),
      upcoming: upcoming.map(v => ({ name: v.name, fullName: v.fullName, dose: v.dose, booster: v.booster })),
      urgent: urgent.map(v => ({ name: v.name, fullName: v.fullName, dose: v.dose, booster: v.booster })),
      total: recommended.length,
      upcomingCount: upcoming.length,
      urgentCount: urgent.length,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('✅ Vaccine schedule planned!', 'success');
  };

  const resetPlanner = () => { setAge(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('vaccine_history'); showToast('History cleared', 'info'); };

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
                  <FaSyringe style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Vaccine Schedule Planner</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>CDC/WHO immunisation schedule for all ages</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Your Age</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Age (months) *</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g., 24" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={planVaccines} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Plan Schedule</button>
                  <button onClick={resetPlanner} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>

            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Schedule</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: emeraldLight, padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Vaccines Due</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: emerald }}>{result.total}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Upcoming</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#d97706' }}>{result.upcomingCount}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef2f2', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Urgent</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ef4444' }}>{result.urgentCount}</div>
                    </div>
                  </div>

                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {result.urgent.length > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>⚠️ Urgent (Due within 6 months):</div>
                        {result.urgent.map((v, i) => (
                          <div key={i} style={{ padding: '6px 8px', background: '#fef2f2', borderRadius: '6px', marginBottom: '4px', fontSize: '0.8rem' }}>
                            {v.name} - {v.fullName} ({v.dose})
                          </div>
                        ))}
                      </div>
                    )}

                    {result.recommended.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>✅ Due Now:</div>
                        {result.recommended.map((v, i) => (
                          <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{v.name} - {v.fullName}</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{v.dose}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.upcoming.length > 0 && (
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>📅 Upcoming:</div>
                        {result.upcoming.map((v, i) => (
                          <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{v.name} - {v.fullName}</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{v.dose}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b' }}>
                    📋 Booster: {result.recommended.find(v => v.booster !== 'No') ? result.recommended.find(v => v.booster !== 'No').booster : 'Check with your doctor'}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaSyringe size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your age to plan your vaccine schedule</p>
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
