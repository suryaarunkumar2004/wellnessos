import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaCalculator, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function DrugDosageCalculator() {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [drugType, setDrugType] = useState('antibiotic');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const drugData = {
    antibiotic: { 
      name: 'Amoxicillin', 
      unit: 'mg/kg', 
      dose: 25, 
      max: 50, 
      frequency: 'Twice Daily',
      description: 'Broad-spectrum penicillin antibiotic',
      commonUses: 'Respiratory infections, UTI, skin infections'
    },
    painkiller: { 
      name: 'Ibuprofen', 
      unit: 'mg/kg', 
      dose: 5, 
      max: 10, 
      frequency: 'Three Times Daily',
      description: 'NSAID pain reliever',
      commonUses: 'Pain, inflammation, fever'
    },
    antihistamine: { 
      name: 'Cetirizine', 
      unit: 'mg/kg', 
      dose: 0.25, 
      max: 0.5, 
      frequency: 'Once Daily',
      description: 'Second-generation antihistamine',
      commonUses: 'Allergies, hay fever, hives'
    },
    antiviral: { 
      name: 'Acyclovir', 
      unit: 'mg/kg', 
      dose: 20, 
      max: 40, 
      frequency: 'Three Times Daily',
      description: 'Antiviral medication',
      commonUses: 'Herpes, chickenpox, shingles'
    },
    antifungal: { 
      name: 'Fluconazole', 
      unit: 'mg/kg', 
      dose: 6, 
      max: 12, 
      frequency: 'Once Daily',
      description: 'Antifungal medication',
      commonUses: 'Yeast infections, fungal infections'
    },
    corticosteroid: {
      name: 'Prednisolone',
      unit: 'mg/kg',
      dose: 0.5,
      max: 2,
      frequency: 'Once Daily',
      description: 'Corticosteroid anti-inflammatory',
      commonUses: 'Inflammation, autoimmune conditions'
    },
    antacid: {
      name: 'Omeprazole',
      unit: 'mg/kg',
      dose: 0.5,
      max: 1.5,
      frequency: 'Once Daily',
      description: 'Proton pump inhibitor',
      commonUses: 'GERD, acid reflux, heartburn'
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('dosage_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('dosage_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const calculateDosage = () => {
    if (!weight) {
      showToast('Please enter your weight', 'error');
      return;
    }
    const w = parseFloat(weight);
    if (w <= 0) {
      showToast('Please enter a valid weight', 'error');
      return;
    }

    const drug = drugData[drugType];
    const minDose = drug.dose * w;
    const maxDose = drug.max * w;
    const avgDose = (minDose + maxDose) / 2;
    const totalDaily = avgDose * (drug.frequency.includes('Twice') ? 2 : drug.frequency.includes('Three') ? 3 : 1);

    const resultData = {
      drug: drug.name,
      weight: w,
      age: age || 'N/A',
      minDose: minDose.toFixed(1),
      maxDose: maxDose.toFixed(1),
      avgDose: avgDose.toFixed(1),
      totalDaily: totalDaily.toFixed(1),
      unit: drug.unit,
      frequency: drug.frequency,
      description: drug.description,
      commonUses: drug.commonUses,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast('✅ Dosage calculated successfully!', 'success');
  };

  const resetCalculator = () => { setWeight(''); setAge(''); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('dosage_history'); showToast('History cleared', 'info'); };
  const exportResults = () => {
    if (!result) return;
    const data = `Dosage Report\nDate: ${result.date}\nDrug: ${result.drug}\nWeight: ${result.weight} kg\nRecommended Dose: ${result.avgDose} ${result.unit}\nRange: ${result.minDose} - ${result.maxDose} ${result.unit}\nFrequency: ${result.frequency}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dosage_report_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📄 Report exported!', 'success');
  };
  const printResults = () => { if (result) window.print(); };
  const shareResults = () => {
    if (!result) return;
    const text = `Dosage for ${result.drug}: ${result.avgDose} ${result.unit} (${result.frequency})`;
    if (navigator.share) { navigator.share({ title: 'My Dosage Result', text }).catch(() => {}); } else { navigator.clipboard.writeText(text); showToast('📋 Copied!', 'success'); }
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
                  <FaCalculator style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Drug Dosage Calculator</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Weight-based dosage guidance for 20+ common drugs</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Enter Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Drug Type</label>
                  <select value={drugType} onChange={e => setDrugType(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                    {Object.entries(drugData).map(([key, val]) => (
                      <option key={key} value={key}>{val.name} - {val.description}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Weight (kg) *</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g., 70" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Age (optional)</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g., 30" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={calculateDosage} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Calculate</button>
                  <button onClick={resetCalculator} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>

            <div>
              {result ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Your Results</h3>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: emerald }}>{result.drug}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{result.weight} kg • Age: {result.age}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: emeraldLight, padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Min Dose</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: emerald }}>{result.minDose} {result.unit}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Avg Dose</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#d97706' }}>{result.avgDose} {result.unit}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef2f2', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Max Dose</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ef4444' }}>{result.maxDose} {result.unit}</div>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>Frequency: <strong>{result.frequency}</strong></div>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>Total Daily: <strong>{result.totalDaily} {result.unit}</strong></div>
                  </div>
                  <div style={{ background: emeraldLight, padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#1e293b' }}>💡 {result.description}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1e293b', marginTop: '2px' }}>📋 Common uses: {result.commonUses}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={exportResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaDownload size={12} /> Export</button>
                    <button onClick={printResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaPrint size={12} /> Print</button>
                    <button onClick={shareResults} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaShare size={12} /> Share</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaCalculator size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter weight to calculate dosage</p>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {history.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: emerald }}>{item.drug}</span>
                      <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{item.date.split(',')[0]}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.avgDose} {item.unit} • {item.frequency}</div>
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
