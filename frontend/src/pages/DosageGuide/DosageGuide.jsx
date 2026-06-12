import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalculator, FaExclamationTriangle, FaPills, FaBell, FaDownload, FaTrash, FaPlus, FaInfoCircle, FaYoutube, FaBook, FaUserMd } from 'react-icons/fa';

const dosageDB = {
  'paracetamol': { adult: '500mg every 4-6 hours, max 3000mg/day', child: '15mg/kg every 6 hours', note: 'Do not exceed 4 doses in 24h.' },
  'ibuprofen': { adult: '200-400mg every 6-8 hours', child: '5-10mg/kg every 8 hours', note: 'Take with food.' },
  'amoxicillin': { adult: '250-500mg every 8 hours', child: '20-40mg/kg/day divided every 8h', note: 'Complete full course.' },
  'cetirizine': { adult: '10mg once daily', child: '5mg once daily (age 6-12)', note: 'May cause drowsiness.' },
  'metformin': { adult: '500mg twice daily with meals', child: 'Not typically used', note: 'Monitor blood sugar.' },
  'lisinopril': { adult: '10mg once daily', child: '0.1mg/kg once daily', note: 'May cause cough.' },
  'atorvastatin': { adult: '10-20mg once daily', child: 'Not recommended', note: 'Take at bedtime.' },
};

const interactionsDB = {
  'paracetamol': ['warfarin (increased bleeding risk - moderate)'],
  'ibuprofen': ['aspirin (increased bleeding risk - moderate)', 'lisinopril (reduced effect - minor)'],
  'amoxicillin': ['methotrexate (increased toxicity - moderate)'],
  'lisinopril': ['ibuprofen (reduced effect - minor)', 'potassium supplements (hyperkalemia - major)'],
  'warfarin': ['paracetamol (increased bleeding risk - moderate)', 'ibuprofen (major bleeding risk - major)'],
};

const sideEffectsDB = {
  'paracetamol': 'Generally well tolerated. Rare: allergic reactions, liver damage with overdose.',
  'ibuprofen': 'Common: stomach upset, heartburn. Serious: stomach bleeding, kidney issues.',
  'amoxicillin': 'Common: diarrhea, nausea, rash. Serious: allergic reaction (swelling, breathing trouble).',
  'lisinopril': 'Common: dry cough, dizziness. Serious: angioedema (swelling of face/lips).',
  'atorvastatin': 'Common: muscle aches, joint pain. Serious: liver damage, muscle breakdown.',
};

const DosageGuide = () => {
  const [drug, setDrug] = useState('');
  const [info, setInfo] = useState(null);
  const [savedMeds, setSavedMeds] = useState(() => {
    const saved = localStorage.getItem('savedMeds');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState('');
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState({ med: '', date: '', time: '' });
  const [interactionDrug, setInteractionDrug] = useState('');
  const [interactionResult, setInteractionResult] = useState('');
  const [sideEffectDrug, setSideEffectDrug] = useState('');
  const [sideEffectResult, setSideEffectResult] = useState('');
  const [weight, setWeight] = useState('');
  const [calcMed, setCalcMed] = useState('');
  const [calcResult, setCalcResult] = useState('');

  useEffect(() => {
    localStorage.setItem('savedMeds', JSON.stringify(savedMeds));
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [savedMeds, reminders]);

  const lookupDrug = () => {
    const key = drug.toLowerCase().trim();
    if (dosageDB[key]) setInfo(dosageDB[key]);
    else setInfo({ error: 'Drug not found. Try: paracetamol, ibuprofen, amoxicillin, cetirizine, metformin, lisinopril, atorvastatin.' });
  };

  const addSavedMed = () => {
    if (newMed.trim() && !savedMeds.includes(newMed.trim())) {
      setSavedMeds([...savedMeds, newMed.trim()]);
      setNewMed('');
    }
  };
  const removeSavedMed = (index) => setSavedMeds(savedMeds.filter((_, i) => i !== index));

  const addReminder = () => {
    if (newReminder.med && newReminder.date && newReminder.time) {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ med: '', date: '', time: '' });
    }
  };
  const removeReminder = (id) => setReminders(reminders.filter(r => r.id !== id));

  const checkInteraction = () => {
    const key = interactionDrug.toLowerCase().trim();
    if (interactionsDB[key]) setInteractionResult(interactionsDB[key].join('; '));
    else setInteractionResult('No known interactions found for this drug.');
  };

  const checkSideEffect = () => {
    const key = sideEffectDrug.toLowerCase().trim();
    if (sideEffectsDB[key]) setSideEffectResult(sideEffectsDB[key]);
    else setSideEffectResult('No common side effects recorded. Consult your doctor.');
  };

  const calculateDosage = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) { setCalcResult('Enter a valid weight (kg).'); return; }
    const med = calcMed.toLowerCase().trim();
    if (med === 'paracetamol') {
      const dose = (w * 15).toFixed(0);
      setCalcResult(`Paracetamol: ${dose} mg every 6 hours (max 4 doses/day).`);
    } else if (med === 'ibuprofen') {
      const dose = (w * 10).toFixed(0);
      setCalcResult(`Ibuprofen: ${dose} mg every 8 hours (take with food).`);
    } else {
      setCalcResult('Dosage calculator only for paracetamol and ibuprofen.');
    }
  };

  const exportData = () => {
    const data = { savedMeds, reminders };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dosage_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', paddingTop: '80px', maxWidth: '1400px', margin: '0 auto', padding: '80px 24px 40px', fontFamily: 'Inter, system-ui' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', marginBottom: '8px' }}>Dosage Guide</h1>
      <p style={{ color: "#059669" }}>Find standard dosages, interactions, side effects, and manage your medications.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '28px' }}>
        {/* Drug Lookup */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaSearch style={{ color: '#059669', marginRight: '8px' }} /> Drug Lookup</h3>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <input type="text" placeholder="Drug name (e.g., paracetamol)" value={drug} onChange={e => setDrug(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={lookupDrug} style={{ background: '#059669', color: 'white', border: 'none', padding: '0 24px', borderRadius: '40px', cursor: 'pointer' }}>Lookup</button>
          </div>
          {info && (
            <div style={{ marginTop: '20px', background: '#f0fdf4', borderRadius: '16px', padding: '16px' }}>
              {info.error ? <p style={{ color: '#dc2626' }}>{info.error}</p> : (
                <>
                  <p><strong>Adult dosage:</strong> {info.adult}</p>
                  <p><strong>Child dosage:</strong> {info.child}</p>
                  <p><strong>Note:</strong> {info.note}</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Saved Medications */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaPills style={{ color: '#059669', marginRight: '8px' }} /> My Medications</h3>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <input type="text" placeholder="Add medication" value={newMed} onChange={e => setNewMed(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={addSavedMed} style={{ background: '#059669', color: 'white', border: 'none', padding: '0 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
          </div>
          {savedMeds.length === 0 ? <p style={{ marginTop: '16px', color: '#6b7280' }}>No saved medications.</p> : (
            <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0 }}>
              {savedMeds.map((med, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{med}</span>
                  <button onClick={() => removeSavedMed(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Refill Reminders */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaBell style={{ color: '#059669', marginRight: '8px' }} /> Refill Reminders</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Medication" value={newReminder.med} onChange={e => setNewReminder({...newReminder, med: e.target.value})} style={{ flex: 2, minWidth: '120px', padding: '8px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <input type="date" value={newReminder.date} onChange={e => setNewReminder({...newReminder, date: e.target.value})} style={{ padding: '8px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <input type="time" value={newReminder.time} onChange={e => setNewReminder({...newReminder, time: e.target.value})} style={{ padding: '8px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={addReminder} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
          </div>
          {reminders.length === 0 ? <p>No reminders set.</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {reminders.map(r => (
                <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{r.med} – {r.date} at {r.time}</span>
                  <button onClick={() => removeReminder(r.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Interaction Checker */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaExclamationTriangle style={{ color: '#059669', marginRight: '8px' }} /> Interaction Checker</h3>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <input type="text" placeholder="Drug name" value={interactionDrug} onChange={e => setInteractionDrug(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={checkInteraction} style={{ background: '#059669', color: 'white', border: 'none', padding: '0 24px', borderRadius: '40px', cursor: 'pointer' }}>Check</button>
          </div>
          {interactionResult && <div style={{ marginTop: '16px', background: '#fef3c7', padding: '12px', borderRadius: '16px' }}>{interactionResult}</div>}
        </div>

        {/* Side Effect Checker */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaInfoCircle style={{ color: '#059669', marginRight: '8px' }} /> Side Effect Checker</h3>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <input type="text" placeholder="Drug name" value={sideEffectDrug} onChange={e => setSideEffectDrug(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={checkSideEffect} style={{ background: '#059669', color: 'white', border: 'none', padding: '0 24px', borderRadius: '40px', cursor: 'pointer' }}>Check</button>
          </div>
          {sideEffectResult && <div style={{ marginTop: '16px', background: '#fee2e2', padding: '12px', borderRadius: '16px', color: '#991b1b' }}>{sideEffectResult}</div>}
        </div>

        {/* Dosage Calculator (pediatric) */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaCalculator style={{ color: '#059669', marginRight: '8px' }} /> Pediatric Dosage Calculator</h3>
          <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} style={{ padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <input type="text" placeholder="Medication (paracetamol / ibuprofen)" value={calcMed} onChange={e => setCalcMed(e.target.value)} style={{ padding: '10px', borderRadius: '40px', border: '1px solid #cbd5e1' }} />
            <button onClick={calculateDosage} style={{ background: '#059669', color: 'white', border: 'none', padding: '10px', borderRadius: '40px', cursor: 'pointer' }}>Calculate</button>
          </div>
          {calcResult && <div style={{ marginTop: '16px', background: '#ecfdf5', padding: '12px', borderRadius: '16px' }}>{calcResult}</div>}
        </div>

        {/* Educational Resources & Export */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaBook style={{ color: '#059669', marginRight: '8px' }} /> Resources & Export</h3>
          <div style={{ marginTop: '16px' }}>
            <p><a href="https://www.youtube.com/results?search_query=how+to+read+prescription+label" target="_blank" rel="noopener noreferrer" style={{ color: '#059669' }}><FaYoutube style={{ marginRight: '6px' }} /> How to Read Prescription Labels</a></p>
            <p><a href="https://www.fda.gov/drugs" target="_blank" rel="noopener noreferrer" style={{ color: '#059669' }}><FaUserMd /> FDA Drug Information</a></p>
            <p><a href="https://www.cdc.gov/medication-safety/index.html" target="_blank" rel="noopener noreferrer" style={{ color: '#059669' }}>CDC Medication Safety</a></p>
            <button onClick={exportData} style={{ marginTop: '16px', background: '#059669', color: 'white', border: 'none', padding: '10px', borderRadius: '40px', width: '100%', cursor: 'pointer' }}><FaDownload /> Export Data (JSON)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DosageGuide;

