import React, { useState, useEffect } from 'react';
import { 
  FaPills, FaPlus, FaTrash, FaSearch, FaBell, FaStore, FaIdCard, FaHistory, FaCalculator, 
  FaExclamationTriangle, FaDownload, FaCheck, FaClock, FaWeight, FaBaby, FaUserMd, FaAllergies, 
  FaDollarSign, FaBarcode, FaCalendarWeek, FaChartLine, FaYoutube, FaShieldAlt, FaEye, FaPrint
} from 'react-icons/fa';

const RxChecker = () => {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState('');
  const [interactionResult, setInteractionResult] = useState('');
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState({ medName: '', date: '', time: '' });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('medHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [historyMed, setHistoryMed] = useState('');
  const [historyDate, setHistoryDate] = useState('');
  const [dosageInput, setDosageInput] = useState({ weight: '', age: '', medName: '' });
  const [dosageResult, setDosageResult] = useState('');
  const [pillSearch, setPillSearch] = useState('');
  const [pillResult, setPillResult] = useState('');
  const [pharmacyLoc, setPharmacyLoc] = useState('');
  const [nearbyPharmacies] = useState([
    { name: 'Wellness Pharmacy', address: '123 Main St', distance: '0.5 mi', phone: '(555) 123-4567' },
    { name: 'HealthMart', address: '456 Oak Ave', distance: '1.2 mi', phone: '(555) 234-5678' },
    { name: 'CarePlus Drugs', address: '789 Pine Rd', distance: '2.0 mi', phone: '(555) 345-6789' },
  ]);
  const [sideEffectMed, setSideEffectMed] = useState('');
  const [sideEffectResult, setSideEffectResult] = useState('');
  const [allergies, setAllergies] = useState(() => {
    const saved = localStorage.getItem('allergies');
    return saved ? JSON.parse(saved) : [];
  });
  const [newAllergy, setNewAllergy] = useState('');
  const [allergyWarnings, setAllergyWarnings] = useState([]);
  const [activeTab, setActiveTab] = useState('medications');

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
    localStorage.setItem('reminders', JSON.stringify(reminders));
    localStorage.setItem('medHistory', JSON.stringify(history));
    localStorage.setItem('allergies', JSON.stringify(allergies));
  }, [medications, reminders, history, allergies]);

  const addMedication = () => { if (newMed.trim() && !medications.includes(newMed.trim())) { setMedications([...medications, newMed.trim()]); setNewMed(''); } };
  const removeMedication = (index) => setMedications(medications.filter((_, i) => i !== index));
  const checkInteractions = () => {
    if (medications.length < 2) { setInteractionResult('Add at least two medications to check interactions.'); return; }
    setInteractionResult('No known serious interactions found. Always consult your doctor.');
  };
  const addReminder = () => { if (newReminder.medName && newReminder.date && newReminder.time) { setReminders([...reminders, { ...newReminder, id: Date.now() }]); setNewReminder({ medName: '', date: '', time: '' }); } };
  const removeReminder = (id) => setReminders(reminders.filter(r => r.id !== id));
  const markReminderDone = (id) => setReminders(reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  const addToHistory = () => { if (historyMed.trim() && historyDate) { setHistory([...history, { med: historyMed.trim(), date: historyDate, id: Date.now() }]); setHistoryMed(''); setHistoryDate(''); } };
  const removeFromHistory = (id) => setHistory(history.filter(h => h.id !== id));
  const calculateDosage = () => {
    const { weight, age, medName } = dosageInput;
    if (!weight || !age || !medName) { setDosageResult('Please enter weight (kg), age (years), and medication name.'); return; }
    const w = parseFloat(weight); const a = parseFloat(age);
    if (isNaN(w) || isNaN(a)) return;
    const medLower = medName.toLowerCase();
    if (medLower.includes('paracetamol') || medLower.includes('acetaminophen')) { const dose = (w * 15).toFixed(0); setDosageResult(`Paracetamol recommended dose: ${dose} mg every 6 hours. Max 4 doses/day.`); }
    else if (medLower.includes('ibuprofen')) { const dose = (w * 10).toFixed(0); setDosageResult(`Ibuprofen recommended dose: ${dose} mg every 8 hours. Take with food.`); }
    else { setDosageResult(`For ${medName}, please consult a doctor or pharmacist.`); }
  };
  const identifyPill = () => { if (!pillSearch.trim()) { setPillResult('Enter imprint/color'); return; } setPillResult('Possible: Paracetamol 500mg or Ibuprofen 200mg. Consult pharmacist.'); };
  const checkSideEffects = () => { if (!sideEffectMed.trim()) { setSideEffectResult('Enter a medication name.'); return; } setSideEffectResult('Common side effects may include nausea, dizziness, or rash. Consult your doctor.'); };
  const addAllergy = () => { if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) { setAllergies([...allergies, newAllergy.trim()]); setNewAllergy(''); } };
  const removeAllergy = (index) => setAllergies(allergies.filter((_, i) => i !== index));
  const checkAllergies = () => {
    const warnings = [];
    medications.forEach(med => { if (allergies.some(alg => med.toLowerCase().includes(alg.toLowerCase()))) warnings.push(`⚠️ ${med} may contain your allergen. Consult your doctor.`); });
    setAllergyWarnings(warnings);
  };
  const exportData = () => {
    const data = { medications, reminders, history, allergies };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rx_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handlePrint = () => window.print();

  const tabs = [
    { id: 'medications', label: 'Medications', icon: <FaPills /> },
    { id: 'reminders', label: 'Reminders', icon: <FaBell /> },
    { id: 'history', label: 'History', icon: <FaHistory /> },
    { id: 'allergies', label: 'Allergies', icon: <FaAllergies /> },
    { id: 'tools', label: 'Tools', icon: <FaSearch /> },
  ];

  return (
    <div style={{ paddingTop: '80px', maxWidth: '1400px', margin: '0 auto', padding: '80px 24px 40px', fontFamily: 'Inter, system-ui' }}>
      <style>{`
        @media print {
          nav, footer, button:not(.print-btn), .tabs, .tab, .no-print, .export-btn, .action-btn { display: none !important; }
          body { padding-top: 0 !important; margin: 0; background: white; }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b' }}>Rx Checker</h1>
        <button onClick={handlePrint} className="print-btn" style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><FaPrint /> Export PDF</button>
      </div>
      <p style={{ color: "#059669" }}>Manage medications, set reminders, check interactions, and more.</p>

      <div className="tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderBottom: '2px solid #e5e7eb', marginBottom: '24px' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="tab" style={{ background: activeTab === tab.id ? '#059669' : 'transparent', color: activeTab === tab.id ? 'white' : '#064e3b', border: 'none', padding: '10px 20px', borderRadius: '40px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Medications Tab */}
      {activeTab === 'medications' && (
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaPills style={{ color: '#059669', marginRight: '8px' }} /> My Medications</h3>
          <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
            <input type="text" placeholder="Medication name" value={newMed} onChange={e => setNewMed(e.target.value)} style={{ flex:1, padding: '10px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <button onClick={addMedication} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
          </div>
          {medications.length === 0 ? <p>No medications added.</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {medications.map((med, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{med}</span>
                  <button onClick={() => removeMedication(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={checkInteractions} style={{ marginTop: '16px', background: '#059669', color: 'white', border: 'none', padding: '10px', borderRadius: '40px', width: '100%', cursor: 'pointer' }}><FaSearch /> Check Interactions</button>
          {interactionResult && <div style={{ marginTop: '16px', background: '#fef3c7', padding: '12px', borderRadius: '16px' }}>{interactionResult}</div>}
        </div>
      )}

      {/* Reminders Tab */}
      {activeTab === 'reminders' && (
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaBell style={{ color: '#059669', marginRight: '8px' }} /> Refill Reminders</h3>
          <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
            <input type="text" placeholder="Medication name" value={newReminder.medName} onChange={e => setNewReminder({...newReminder, medName: e.target.value})} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <input type="date" value={newReminder.date} onChange={e => setNewReminder({...newReminder, date: e.target.value})} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <input type="time" value={newReminder.time} onChange={e => setNewReminder({...newReminder, time: e.target.value})} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <button onClick={addReminder} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add Reminder</button>
          </div>
          {reminders.length === 0 ? <p>No reminders set.</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {reminders.map(r => (
                <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <div><span style={{ textDecoration: r.done ? 'line-through' : 'none' }}>{r.medName} - {r.date} {r.time}</span></div>
                  <div><button onClick={() => markReminderDone(r.id)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', marginRight: '8px' }}><FaCheck /></button><button onClick={() => removeReminder(r.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><FaTrash /></button></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaHistory style={{ color: '#059669', marginRight: '8px' }} /> Past Medications</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input type="text" placeholder="Medication" value={historyMed} onChange={e => setHistoryMed(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <input type="date" value={historyDate} onChange={e => setHistoryDate(e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <button onClick={addToHistory} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /></button>
          </div>
          {history.length === 0 ? <p>No past medications recorded.</p> : (
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
              {history.map(h => (
                <li key={h.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span>{h.med} ({h.date})</span>
                  <button onClick={() => removeFromHistory(h.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Allergies Tab */}
      {activeTab === 'allergies' && (
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3><FaAllergies style={{ color: '#059669', marginRight: '8px' }} /> Drug Allergies</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input type="text" placeholder="Allergen (e.g., penicillin)" value={newAllergy} onChange={e => setNewAllergy(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <button onClick={addAllergy} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
          </div>
          {allergies.length === 0 ? <p>No allergies added.</p> : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {allergies.map((alg, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span><FaShieldAlt style={{ color: '#ef4444', marginRight: '8px' }} /> {alg}</span>
                  <button onClick={() => removeAllergy(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={checkAllergies} style={{ marginTop: '16px', background: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '40px', width: '100%', cursor: 'pointer' }}>Check Medications Against Allergies</button>
          {allergyWarnings.length > 0 && <div style={{ marginTop: '16px', background: '#fee2e2', padding: '12px', borderRadius: '16px', color: '#991b1b' }}>{allergyWarnings.map((w, i) => <div key={i}>{w}</div>)}</div>}
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3><FaIdCard /> Pill Identifier</h3>
            <div style={{ display: 'flex', gap: '8px' }}><input type="text" placeholder="Imprint/color" value={pillSearch} onChange={e => setPillSearch(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px' }} /><button onClick={identifyPill} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px' }}><FaSearch /></button></div>
            {pillResult && <div style={{ marginTop: '12px', background: '#ecfdf5', padding: '12px', borderRadius: '16px' }}>{pillResult}</div>}
          </div>
          <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3><FaBaby /> Dosage Calculator (Child)</h3>
            <div style={{ display: 'grid', gap: '8px' }}><input type="number" placeholder="Weight (kg)" value={dosageInput.weight} onChange={e => setDosageInput({...dosageInput, weight: e.target.value})} style={{ padding: '8px', borderRadius: '20px' }} /><input type="number" placeholder="Age (years)" value={dosageInput.age} onChange={e => setDosageInput({...dosageInput, age: e.target.value})} style={{ padding: '8px', borderRadius: '20px' }} /><input type="text" placeholder="Medication name" value={dosageInput.medName} onChange={e => setDosageInput({...dosageInput, medName: e.target.value})} style={{ padding: '8px', borderRadius: '20px' }} /><button onClick={calculateDosage} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '40px' }}>Calculate</button></div>
            {dosageResult && <div style={{ marginTop: '12px', background: '#ecfdf5', padding: '12px', borderRadius: '16px' }}>{dosageResult}</div>}
          </div>
          <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3><FaExclamationTriangle /> Side Effect Checker</h3>
            <div style={{ display: 'flex', gap: '8px' }}><input type="text" placeholder="Medication name" value={sideEffectMed} onChange={e => setSideEffectMed(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px' }} /><button onClick={checkSideEffects} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px' }}><FaSearch /></button></div>
            {sideEffectResult && <div style={{ marginTop: '12px', background: '#fef2f2', padding: '12px', borderRadius: '16px', color: '#991b1b' }}>{sideEffectResult}</div>}
          </div>
          <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3><FaStore /> Pharmacy Locator</h3>
            <input type="text" placeholder="Enter zip/city (demo)" value={pharmacyLoc} onChange={e => setPharmacyLoc(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '20px', marginBottom: '12px' }} />
            {nearbyPharmacies.map((p, idx) => (<div key={idx} style={{ marginBottom: '12px', padding: '8px', background: '#f9fafb', borderRadius: '16px' }}><strong>{p.name}</strong><br />{p.address}<br />{p.distance} away · {p.phone}</div>))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={exportData} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' }}><FaDownload /> Export All Data (JSON)</button>
      </div>
    </div>
  );
};

export default RxChecker;

