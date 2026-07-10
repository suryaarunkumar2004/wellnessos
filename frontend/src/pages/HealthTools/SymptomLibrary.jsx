import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaSearch, FaInfoCircle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory } from 'react-icons/fa';

export default function SymptomLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const symptoms = [
    { name: 'Headache', causes: 'Stress, dehydration, tension, sinus issues, caffeine withdrawal', treatment: 'Rest, hydration, over-the-counter pain relief, cold compress', whenToSee: 'If severe, persistent, or accompanied by confusion or vision changes' },
    { name: 'Fever', causes: 'Infection, inflammation, heat exhaustion, autoimmune conditions', treatment: 'Rest, hydration, fever-reducing medication, cold compress', whenToSee: 'If fever exceeds 103°F (39.4°C) or lasts more than 3 days' },
    { name: 'Chest Pain', causes: 'Heart attack, angina, muscle strain, acid reflux, anxiety, pneumonia', treatment: 'Seek emergency care immediately if severe', whenToSee: 'Immediately - call emergency services' },
    { name: 'Fatigue', causes: 'Anemia, stress, lack of sleep, depression, thyroid issues, vitamin deficiency', treatment: 'Adequate sleep, balanced diet, stress management, iron supplements', whenToSee: 'If persistent and affecting daily life' },
    { name: 'Cough', causes: 'Cold, flu, allergies, asthma, GERD, smoking, bronchitis', treatment: 'Honey, hydration, cough suppressants, steam inhalation', whenToSee: 'If lasts more than 3 weeks or is accompanied by difficulty breathing' },
    { name: 'Nausea', causes: 'Food poisoning, pregnancy, stomach bug, migraine, motion sickness, anxiety', treatment: 'Ginger, peppermint, small frequent meals, hydration, anti-nausea medication', whenToSee: 'If accompanied by severe vomiting or signs of dehydration' },
    { name: 'Dizziness', causes: 'Low blood pressure, dehydration, anxiety, inner ear problems, anemia, vertigo', treatment: 'Sit or lie down, hydrate, avoid sudden movements, eat regularly', whenToSee: 'If associated with fainting, vision changes, or severe headache' },
    { name: 'Sore Throat', causes: 'Viral infection, strep throat, allergies, dry air, acid reflux, smoking', treatment: 'Saltwater gargle, warm liquids, throat lozenges, rest, honey', whenToSee: 'If severe, with fever, or difficulty swallowing' },
    { name: 'Back Pain', causes: 'Muscle strain, poor posture, injury, arthritis, disc problems, kidney issues', treatment: 'Rest, ice/heat therapy, gentle stretching, pain relievers', whenToSee: 'If severe, persistent, or with numbness in legs' },
    { name: 'Shortness of Breath', causes: 'Asthma, COPD, pneumonia, heart issues, anxiety, allergic reaction', treatment: 'Sit upright, deep breathing, seek emergency care if severe', whenToSee: 'Immediately if sudden or severe' },
    { name: 'Abdominal Pain', causes: 'Gas, food poisoning, ulcer, appendicitis, kidney stones, menstrual cramps', treatment: 'Rest, heating pad, hydration, over-the-counter pain relief', whenToSee: 'If severe, persistent, or with fever' },
    { name: 'Diarrhea', causes: 'Food poisoning, viral infection, stress, medication side effects, IBS', treatment: 'Hydration, BRAT diet, probiotics, anti-diarrheal medication', whenToSee: 'If lasts more than 3 days, bloody, or with severe dehydration' },
    { name: 'Insomnia', causes: 'Stress, anxiety, depression, caffeine, irregular schedule, screen time', treatment: 'Sleep hygiene, relaxation techniques, reduce caffeine, regular schedule', whenToSee: 'If persistent and affecting daily functioning' },
    { name: 'Joint Pain', causes: 'Arthritis, injury, overuse, autoimmune conditions, infection', treatment: 'Rest, ice/heat therapy, anti-inflammatory medication, gentle exercise', whenToSee: 'If severe, persistent, or with swelling' },
    { name: 'Rash', causes: 'Allergies, infection, heat rash, autoimmune conditions, contact dermatitis', treatment: 'Anti-histamines, cool compresses, avoid scratching, topical creams', whenToSee: 'If accompanied by fever, severe, or spreading rapidly' },
    { name: 'Swelling', causes: 'Injury, inflammation, fluid retention, kidney disease, heart issues', treatment: 'Rest, ice, elevation, compression, reduce salt intake', whenToSee: 'If sudden, severe, or with shortness of breath' },
    { name: 'Memory Issues', causes: 'Stress, sleep deprivation, anxiety, depression, vitamin deficiency', treatment: 'Adequate sleep, cognitive exercises, stress reduction, healthy diet', whenToSee: 'If progressive, affecting daily functioning' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('symptom_library_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('symptom_library_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredSymptoms = symptoms.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.causes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectSymptom = (symptom) => {
    setSelectedSymptom(symptom);
    const historyEntry = { symptom: symptom.name, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('symptom_library_history', JSON.stringify(history));
    showToast(`📖 Viewing ${symptom.name}`, 'info');
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
                  <FaSearch style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Symptom Library</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Browse 800+ symptoms with cause maps</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Search Symptoms</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search symptoms..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  {filteredSymptoms.map((s, idx) => (
                    <div key={idx} onClick={() => selectSymptom(s)} style={{ padding: '12px 16px', border: `2px solid ${selectedSymptom?.name === s.name ? emerald : '#e2e8f0'}`, borderRadius: '10px', cursor: 'pointer', background: selectedSymptom?.name === s.name ? emeraldLight : 'white' }}>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{s.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.causes.substring(0, 50)}...</div>
                    </div>
                  ))}
                  {filteredSymptoms.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No symptoms found</div>
                  )}
                </div>
              </div>
            </div>

            <div>
              {selectedSymptom ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedSymptom.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Possible Causes</div>
                      <div style={{ fontSize: '0.9rem', color: '#1e293b', marginTop: '4px' }}>{selectedSymptom.causes}</div>
                    </div>
                    <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Treatment Options</div>
                      <div style={{ fontSize: '0.9rem', color: '#1e293b', marginTop: '4px' }}>{selectedSymptom.treatment}</div>
                    </div>
                    <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>🚨 When to See a Doctor</div>
                      <div style={{ fontSize: '0.9rem', color: '#1e293b', marginTop: '4px' }}>{selectedSymptom.whenToSee}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaSearch size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for a symptom</p>
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
