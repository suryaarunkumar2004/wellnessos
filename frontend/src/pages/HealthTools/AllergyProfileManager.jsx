import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaAllergies, FaPlus, FaTrash, FaEdit, FaDownload, FaPrint, FaShare, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function AllergyProfileManager() {
  const [allergyName, setAllergyName] = useState('');
  const [allergyType, setAllergyType] = useState('food');
  const [severity, setSeverity] = useState('moderate');
  const [allergies, setAllergies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [history, setHistory] = useState([]);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const allergyTypes = ['food', 'environmental', 'medication', 'insect', 'latex', 'other'];
  
  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish', 'Sesame',
    'Pollen', 'Dust Mites', 'Pet Dander', 'Mold', 'Cockroaches', 'Grass', 'Weeds', 'Trees',
    'Penicillin', 'Aspirin', 'Sulfa Drugs', 'Codeine', 'Morphine', 'Ibuprofen',
    'Bee Stings', 'Wasp Stings', 'Fire Ants', 'Mosquitoes',
    'Latex Gloves', 'Condoms', 'Balloons',
    'Nickel', 'Fragrances', 'Parabens', 'Sunscreen'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('allergy_history');
    if (saved) setAllergies(JSON.parse(saved));
    const hist = localStorage.getItem('allergy_profile_history');
    if (hist) setHistory(JSON.parse(hist));
  }, []);

  useEffect(() => {
    if (allergies.length > 0) localStorage.setItem('allergy_history', JSON.stringify(allergies));
  }, [allergies]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addAllergy = () => {
    if (!allergyName) {
      showToast('Please enter an allergy name', 'error');
      return;
    }
    const newAllergy = {
      id: Date.now(),
      name: allergyName,
      type: allergyType,
      severity: severity,
      date: new Date().toLocaleDateString(),
      status: 'active'
    };
    if (editingId) {
      setAllergies(allergies.map(a => a.id === editingId ? newAllergy : a));
      setEditingId(null);
      showToast('✅ Allergy updated!', 'success');
    } else {
      setAllergies([newAllergy, ...allergies]);
      const historyEntry = { action: 'Added', allergy: allergyName, date: new Date().toLocaleString() };
      setHistory([historyEntry, ...history].slice(0, 20));
      localStorage.setItem('allergy_profile_history', JSON.stringify(history));
      showToast('✅ Allergy added!', 'success');
    }
    setAllergyName('');
    setAllergyType('food');
    setSeverity('moderate');
  };

  const deleteAllergy = (id) => {
    const allergy = allergies.find(a => a.id === id);
    setAllergies(allergies.filter(a => a.id !== id));
    const historyEntry = { action: 'Removed', allergy: allergy?.name || 'Unknown', date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('allergy_profile_history', JSON.stringify(history));
    showToast('🗑 Allergy removed', 'info');
  };

  const editAllergy = (allergy) => {
    setAllergyName(allergy.name);
    setAllergyType(allergy.type);
    setSeverity(allergy.severity);
    setEditingId(allergy.id);
  };

  const clearAllergies = () => {
    setAllergies([]);
    localStorage.removeItem('allergy_history');
    showToast('All allergies cleared', 'info');
  };

  const getSeverityColor = (sev) => ({
    mild: '#22c55e',
    moderate: '#f59e0b',
    severe: '#ef4444'
  }[sev] || '#64748b');

  const getTypeEmoji = (type) => ({
    food: '🍽️',
    environmental: '🌿',
    medication: '💊',
    insect: '🐝',
    latex: '🧤',
    other: '🔍'
  }[type] || '🔍');

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
                  <FaAllergies style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Allergy Profile Manager</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Document and track allergen sensitivities</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>
                {editingId ? '✏️ Edit Allergy' : '➕ Add New Allergy'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Allergy Name *</label>
                  <input type="text" value={allergyName} onChange={e => setAllergyName(e.target.value)} placeholder="e.g., Peanuts, Pollen, Penicillin" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  {allergyName && (
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                      Suggestions: {commonAllergies.filter(a => a.toLowerCase().includes(allergyName.toLowerCase())).slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Type</label>
                  <select value={allergyType} onChange={e => setAllergyType(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', background: 'white' }}>
                    {allergyTypes.map(type => <option key={type} value={type}>{getTypeEmoji(type)} {type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Severity</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['mild', 'moderate', 'severe'].map(s => (
                      <button key={s} onClick={() => setSeverity(s)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${severity === s ? getSeverityColor(s) : '#e2e8f0'}`, background: severity === s ? getSeverityColor(s) + '15' : 'white', color: severity === s ? getSeverityColor(s) : '#64748b', fontWeight: '700', cursor: 'pointer' }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={addAllergy} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                    {editingId ? 'Update' : 'Add'} Allergy
                  </button>
                  {editingId && <button onClick={() => { setEditingId(null); setAllergyName(''); }} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>}
                </div>
              </div>
            </div>

            <div>
              {allergies.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>Your Allergies ({allergies.length})</h3>
                    <button onClick={clearAllergies} style={{ padding: '6px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Clear</button>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {allergies.map((allergy) => (
                      <div key={allergy.id} style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '700', color: '#1e293b' }}>{getTypeEmoji(allergy.type)} {allergy.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{allergy.type} • Added: {allergy.date}</div>
                          <span style={{ fontSize: '0.7rem', color: getSeverityColor(allergy.severity), fontWeight: '700' }}>{allergy.severity}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => editAllergy(allergy)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}><FaEdit size={12} /></button>
                          <button onClick={() => deleteAllergy(allergy.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444' }}><FaTrash size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaAllergies size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>No allergies logged. Start tracking your sensitivities.</p>
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
