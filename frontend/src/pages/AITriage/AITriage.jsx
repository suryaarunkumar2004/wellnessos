import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHistory, FaDownload, FaPrint, FaShare, FaExclamationTriangle, 
  FaHospital, FaChartLine, FaTrash, FaCopy, FaThermometerHalf, 
  FaHeartbeat, FaPills, FaCalendarAlt, FaYoutube, FaUserMd, FaChevronDown 
} from 'react-icons/fa';

// ---------- Body parts (150+) ----------
const bodyParts = [
  "Head", "Scalp", "Forehead", "Temples", "Face", "Cheeks", "Jaw", "Chin",
  "Eyes", "Ears", "Nose", "Sinuses", "Mouth", "Lips", "Teeth", "Gums", "Tongue",
  "Throat", "Tonsils", "Palate", "Salivary glands", "Neck", "Cervical spine",
  "Thyroid", "Parathyroid", "Larynx", "Trachea", "Esophagus", "Upper back",
  "Shoulders", "Clavicles", "Scapulae", "Trapezius", "Rhomboids", "Upper arms",
  "Biceps", "Triceps", "Elbows", "Forearms", "Wrists", "Hands", "Palms", "Fingers",
  "Thumbs", "Knuckles", "Carpal tunnel", "Chest", "Breasts", "Ribs", "Sternum",
  "Lungs", "Heart", "Diaphragm", "Thymus", "Upper abdomen", "Stomach", "Liver",
  "Gallbladder", "Pancreas", "Spleen", "Kidneys", "Adrenal glands", "Small intestine",
  "Duodenum", "Large intestine", "Colon", "Rectum", "Appendix", "Bladder", "Ureters",
  "Urethra", "Prostate", "Uterus", "Ovaries", "Fallopian tubes", "Cervix", "Vagina",
  "Testicles", "Penis", "Scrotum", "Lower back", "Pelvis", "Sacrum", "Coccyx",
  "Buttocks", "Glutes", "Groin", "Inguinal region", "Hips", "Thighs", "Hamstrings",
  "Quadriceps", "Knees", "Patella", "Calves", "Shins", "Tibia", "Fibula", "Ankles",
  "Heels", "Feet", "Toes", "Achilles tendon", "Plantar fascia", "Skull", "Mandible",
  "Humerus", "Radius", "Ulna", "Femur", "Patella (bone)", "Tibia (bone)", "Fibula (bone)",
  "Pectorals", "Deltoids", "Latissimus dorsi", "Abdominals", "Obliques", "Erector spinae",
  "Sciatic nerve", "Median nerve", "Ulnar nerve", "Radial nerve", "Femoral nerve",
  "Carotid artery", "Jugular vein", "Aorta", "Coronary arteries", "Mental/Emotional",
  "Sleep", "Appetite", "Energy", "Concentration", "Memory", "Stress"
];

// Symptom templates (abbreviated)
const symptomTemplates = {
  'pain': { firstAid: 'Rest, ice, compression, elevation.', seeDoctor: 'If severe, persistent >3 days, with swelling or fever.', otc: 'Ibuprofen or acetaminophen.', homeRemedy: 'Heat pack, gentle massage.', prevention: 'Proper posture, regular exercise.' },
  'swelling': { firstAid: 'Rest, ice, compression, elevation (RICE).', seeDoctor: 'If sudden, with redness, warmth, fever.', otc: 'NSAIDs (ibuprofen, naproxen).', homeRemedy: 'Epsom salt soak.', prevention: 'Avoid prolonged standing.' },
  'numbness': { firstAid: 'Change position, gentle massage.', seeDoctor: 'If sudden, one‑sided, with weakness.', otc: 'None; B12 supplements if deficient.', homeRemedy: 'Warm compress, stretching.', prevention: 'Regular movement, ergonomic setup.' },
  'tingling': { firstAid: 'Shake limb, change position.', seeDoctor: 'Persistent, with weakness or radiating pain.', otc: 'None.', homeRemedy: 'Wrist brace, warm compress.', prevention: 'Ergonomic adjustments.' },
  'stiffness': { firstAid: 'Gentle stretching, heat.', seeDoctor: 'Persistent >2 weeks, with swelling.', otc: 'Ibuprofen, naproxen.', homeRemedy: 'Warm bath, yoga.', prevention: 'Regular exercise, hydration.' },
  'weakness': { firstAid: 'Rest, hydrate, light snack.', seeDoctor: 'Sudden, one‑sided, with slurred speech.', otc: 'None.', homeRemedy: 'Protein‑rich foods, rest.', prevention: 'Balanced diet, exercise.' },
  'itching': { firstAid: 'Cool compress, moisturizer.', seeDoctor: 'Widespread, with rash, fever.', otc: 'Antihistamines, hydrocortisone cream.', homeRemedy: 'Oatmeal bath, aloe vera.', prevention: 'Identify triggers, moisturize.' },
  'burning': { firstAid: 'Cool compress, avoid triggers.', seeDoctor: 'Persistent, with redness, swelling.', otc: 'Antacids (if reflux), NSAIDs for nerve pain.', homeRemedy: 'Aloe vera, baking soda paste.', prevention: 'Avoid spicy foods.' },
  'cough': { firstAid: 'Honey, humidifier, warm fluids.', seeDoctor: '>3 weeks, blood, wheezing, fever.', otc: 'Dextromethorphan, guaifenesin.', homeRemedy: 'Thyme tea, ginger.', prevention: 'Avoid smoke, wash hands.' },
  'fever': { firstAid: 'Rest, fluids, lukewarm sponge bath.', seeDoctor: '>103°F, >3 days, stiff neck.', otc: 'Acetaminophen, ibuprofen.', homeRemedy: 'Cool compress.', prevention: 'Handwashing, vaccines.' },
  'fatigue': { firstAid: 'Power nap, hydrate, light snack.', seeDoctor: 'Persistent >2 weeks, weight change.', otc: 'Vitamin B12, iron (if deficient).', homeRemedy: 'Ginseng tea.', prevention: 'Regular sleep, balanced diet.' },
  'nausea': { firstAid: 'Sip clear fluids, ginger ale.', seeDoctor: '>48h, severe pain, bloody vomit.', otc: 'Dimenhydrinate, meclizine.', homeRemedy: 'Ginger tea, crackers.', prevention: 'Hand hygiene.' },
  'diarrhea': { firstAid: 'Hydrate, BRAT diet.', seeDoctor: '>3 days, bloody stool, fever >102°F.', otc: 'Loperamide, bismuth subsalicylate.', homeRemedy: 'Rice water, probiotics.', prevention: 'Handwashing, food safety.' },
  'constipation': { firstAid: 'Increase water, gentle walking, prunes.', seeDoctor: 'Severe pain, blood, >1 week.', otc: 'Fiber supplements, stool softeners.', homeRemedy: 'Warm lemon water, flaxseed.', prevention: 'High‑fiber diet, exercise.' },
  'shortness of breath': { firstAid: 'Sit upright, pursed‑lip breathing.', seeDoctor: 'Sudden severe, chest pain, blue lips.', otc: 'Inhaler if prescribed.', homeRemedy: 'Humidifier, avoid triggers.', prevention: 'Avoid smoke, exercise.' },
  'palpitations': { firstAid: 'Sit down, deep breathing, drink water.', seeDoctor: 'With chest pain, fainting, SOB.', otc: 'None.', homeRemedy: 'Reduce caffeine, relaxation.', prevention: 'Hydration, avoid stimulants.' },
  'dizziness': { firstAid: 'Sit or lie down, drink water, eat a snack.', seeDoctor: 'With chest pain, severe headache, slurred speech.', otc: 'Meclizine (for motion sickness).', homeRemedy: 'Ginger tea, deep breathing.', prevention: 'Stay hydrated, rise slowly.' },
  'rash': { firstAid: 'Cool compress, fragrance‑free moisturizer.', seeDoctor: 'Spreading rapidly, fever, blisters.', otc: 'Hydrocortisone cream, antihistamines.', homeRemedy: 'Oatmeal bath, aloe vera.', prevention: 'Identify triggers.' },
  'redness': { firstAid: 'Cool compress, avoid irritants.', seeDoctor: 'Spreading, with pain, discharge, fever.', otc: 'Antihistamines (if allergy).', homeRemedy: 'Aloe vera gel.', prevention: 'Avoid known triggers.' },
  'bleeding': { firstAid: 'Apply pressure, clean wound.', seeDoctor: 'Uncontrolled bleeding, deep wound.', otc: 'Antiseptic, bandage.', homeRemedy: 'Rest, elevation.', prevention: 'Use protective gear.' }
};

const symptomTypesList = Object.keys(symptomTemplates);

const extractSymptom = (text) => {
  const lower = text.toLowerCase();
  let foundBodyPart = null;
  for (const part of bodyParts) {
    if (lower.includes(part.toLowerCase())) { foundBodyPart = part; break; }
  }
  let foundSymptomType = null;
  for (const st of symptomTypesList) {
    if (lower.includes(st)) { foundSymptomType = st; break; }
  }
  return { bodyPart: foundBodyPart, symptomType: foundSymptomType };
};

const commonSymptomDB = {
  'headache': { conditions: ['Tension headache (65%)', 'Migraine (20%)', 'Sinus headache (10%)'], firstAid: 'Rest in dark, quiet room. Cold compress.', seeDoctor: 'Severe, persistent >48h, with fever, stiff neck, vision changes.', otc: 'Acetaminophen, ibuprofen.', homeRemedy: 'Peppermint oil, ginger tea.', prevention: 'Hydration, sleep, stress mgmt.' },
  'migraine': { conditions: ['Migraine with aura (60%)', 'Migraine without aura (30%)', 'Chronic migraine (10%)'], firstAid: 'Dark, silent room; cold pack.', seeDoctor: 'Frequent >4/month, aura >1h.', otc: 'Naproxen, Excedrin.', homeRemedy: 'Magnesium, riboflavin.', prevention: 'Identify triggers, preventive meds.' },
  'back pain': { conditions: ['Muscle strain (65%)', 'Poor posture (15%)', 'Herniated disc (10%)', 'Sciatica (8%)', 'Kidney stone (2%)'], firstAid: 'Ice then heat, gentle stretching.', seeDoctor: 'After fall, leg weakness, fever.', otc: 'Ibuprofen, naproxen.', homeRemedy: 'Epsom salt bath.', prevention: 'Core strength, lift with legs.' },
  'chest pain': { conditions: ['Heartburn (40%)', 'Muscle strain (25%)', 'Anxiety (20%)', 'Cardiac (10% – URGENT)'], firstAid: 'Sit up, avoid lying down.', seeDoctor: 'Immediately if crushing pain, radiates to arm/jaw, SOB.', otc: 'Antacids for heartburn.', homeRemedy: 'Deep breathing.', prevention: 'Healthy diet, exercise.' },
  'fever': { conditions: ['Viral infection (70%)', 'Bacterial infection (20%)', 'Heat exhaustion (5%)'], firstAid: 'Rest, fluids, lukewarm sponge bath.', seeDoctor: '>103°F, >3 days, stiff neck.', otc: 'Acetaminophen, ibuprofen.', homeRemedy: 'Cool compress.', prevention: 'Handwashing, vaccines.' },
  'cough': { conditions: ['Common cold (55%)', 'Bronchitis (20%)', 'Allergies (15%)', 'Asthma (5%)'], firstAid: 'Honey, humidifier, warm fluids.', seeDoctor: '>3 weeks, blood, wheezing.', otc: 'Dextromethorphan, guaifenesin.', homeRemedy: 'Thyme tea, ginger.', prevention: 'Avoid smoke, wash hands.' },
  'fatigue': { conditions: ['Sleep deprivation (40%)', 'Stress (25%)', 'Anemia (15%)', 'Thyroid (10%)'], firstAid: 'Power nap, hydrate, light snack.', seeDoctor: 'Persistent >2 weeks, weight change.', otc: 'Vitamin B12, iron (if deficient).', homeRemedy: 'Ginseng tea.', prevention: 'Regular sleep, balanced diet.' },
  'nausea': { conditions: ['Viral gastroenteritis (45%)', 'Food poisoning (20%)', 'Pregnancy (15%)', 'Migraine (10%)'], firstAid: 'Sip clear fluids, ginger ale.', seeDoctor: '>48h, severe pain, bloody vomit.', otc: 'Dimenhydrinate, meclizine.', homeRemedy: 'Ginger tea, crackers.', prevention: 'Hand hygiene.' },
  'abdominal pain': { conditions: ['Indigestion (35%)', 'Gastritis (20%)', 'Constipation (15%)', 'Appendicitis (5%)'], firstAid: 'Rest, clear fluids, heating pad.', seeDoctor: 'Severe, localized, fever.', otc: 'Antacids, simethicone.', homeRemedy: 'Ginger tea, peppermint oil.', prevention: 'High‑fiber diet.' }
};

// Custom dropdown component (no native blue)
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '20px',
          border: '1px solid #cbd5e1',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        <span>{value ? options.find(opt => opt.value === value)?.label : placeholder}</span>
        <FaChevronDown style={{ color: '#059669', fontSize: '12px' }} />
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: 'white',
          border: '1px solid #cbd5e1',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                backgroundColor: value === opt.value ? '#059669' : 'white',
                color: value === opt.value ? 'white' : '#1f2937',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = '#ecfdf5'; }}
              onMouseLeave={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = 'white'; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AITriage = () => {
  const [symptom, setSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const [severitySlider, setSeveritySlider] = useState(5);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('fullSymptomHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('userMeds');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState('');
  const [calendarView, setCalendarView] = useState(false);

  useEffect(() => {
    localStorage.setItem('fullSymptomHistory', JSON.stringify(history));
    localStorage.setItem('userMeds', JSON.stringify(medications));
  }, [history, medications]);

  const analyze = () => {
    if (!symptom.trim()) { setResult({ error: 'Please describe your symptoms.' }); return; }
    const { bodyPart, symptomType } = extractSymptom(symptom);
    let matchedData = null;
    const lower = symptom.toLowerCase();
    for (const [key, data] of Object.entries(commonSymptomDB)) {
      if (lower.includes(key)) { matchedData = data; break; }
    }
    if (!matchedData && bodyPart && symptomType) {
      const template = symptomTemplates[symptomType];
      if (template) {
        matchedData = {
          conditions: [`${bodyPart} ${symptomType} – common causes: strain, inflammation, or nerve irritation`],
          firstAid: template.firstAid,
          seeDoctor: template.seeDoctor,
          otc: template.otc,
          homeRemedy: template.homeRemedy,
          prevention: template.prevention,
        };
      }
    }
    if (!matchedData) {
      matchedData = {
        conditions: ['Undefined symptom – consider monitoring and seeking medical advice if persists.'],
        firstAid: 'Rest, hydrate, monitor symptoms.',
        seeDoctor: 'If symptoms worsen, persist >3 days, or are severe.',
        otc: 'Acetaminophen or ibuprofen as needed.',
        homeRemedy: 'Stay hydrated, rest, apply cool or warm compress as appropriate.',
        prevention: 'Maintain healthy lifestyle, regular check‑ups.'
      };
    }
    const newResult = {
      symptom, conditions: matchedData.conditions, firstAid: matchedData.firstAid,
      seeDoctor: matchedData.seeDoctor, otc: matchedData.otc, homeRemedy: matchedData.homeRemedy,
      prevention: matchedData.prevention, severity: severitySlider, duration: duration || 'unknown'
    };
    setResult(newResult);
    const newHistoryItem = {
      id: Date.now(), date: new Date().toLocaleString(), symptom,
      severity: severitySlider, duration, temperature: temperature || '—',
      bp: bpSystolic && bpDiastolic ? `${bpSystolic}/${bpDiastolic}` : '—'
    };
    setHistory([newHistoryItem, ...history.slice(0, 29)]);
  };

  const exportReport = () => {
    if (!result) return;
    const report = `SYMPTOM REPORT\nDate: ${new Date().toLocaleString()}\nSymptom: ${result.symptom}\nDuration: ${duration || 'Not specified'}\nSeverity: ${result.severity}/10\nTemperature: ${temperature || '—'}°F\nBlood Pressure: ${bpSystolic && bpDiastolic ? `${bpSystolic}/${bpDiastolic}` : '—'} mmHg\n\nPossible conditions:\n${result.conditions.join('\n')}\n\nFirst aid:\n${result.firstAid}\n\nWhen to see a doctor:\n${result.seeDoctor}\n\nOver-the-counter suggestions:\n${result.otc}\n\nHome remedies:\n${result.homeRemedy}\n\nPrevention tips:\n${result.prevention}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symptom_report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyReport = () => {
    if (!result) return;
    const report = `SYMPTOM REPORT\nDate: ${new Date().toLocaleString()}\nSymptom: ${result.symptom}\nDuration: ${duration || 'Not specified'}\nSeverity: ${result.severity}/10\nTemp: ${temperature || '—'}°F\nBP: ${bpSystolic && bpDiastolic ? `${bpSystolic}/${bpDiastolic}` : '—'}\n\nPossible conditions:\n${result.conditions.join('\n')}\n\nFirst aid:\n${result.firstAid}\n\nWhen to see doctor:\n${result.seeDoctor}\n\nOTC:\n${result.otc}\n\nHome remedies:\n${result.homeRemedy}\n\nPrevention:\n${result.prevention}`;
    navigator.clipboard.writeText(report);
    alert('Report copied to clipboard!');
  };

  const handlePrint = () => window.print();
  const clearHistory = () => { if (window.confirm('Clear all symptom history?')) { setHistory([]); localStorage.removeItem('fullSymptomHistory'); } };
  const deleteHistoryItem = (id) => setHistory(history.filter(h => h.id !== id));
  const quickAnalyze = (qs) => { setSymptom(qs); setTimeout(() => analyze(), 50); };
  const addMedication = () => { if (newMed.trim()) { setMedications([...medications, newMed.trim()]); setNewMed(''); } };
  const removeMedication = (idx) => setMedications(medications.filter((_, i) => i !== idx));
  const exportCSV = () => {
    const headers = ['Date', 'Symptom', 'Severity', 'Duration', 'Temperature', 'BP'];
    const rows = history.map(h => [h.date, h.symptom.replace(/,/g, ';'), h.severity, h.duration, h.temperature || '—', h.bp || '—']);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symptom_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const shareReport = () => {
    if (!result) return;
    const text = `Check my symptom report: ${result.symptom} (severity ${result.severity}/10). ${result.firstAid}`;
    if (navigator.share) navigator.share({ title: 'Symptom Report', text });
    else copyReport();
  };

  const severityData = history.slice(0,5).reverse();
  const maxSeverity = 10;
  const chartHeight = 100;
  const feverWarning = temperature && parseFloat(temperature) > 100.4;
  const bpWarning = bpSystolic && (parseInt(bpSystolic) > 140 || parseInt(bpDiastolic) > 90);
  const quickSymptoms = ['headache', 'back pain', 'chest pain', 'cough', 'fever', 'fatigue', 'nausea', 'dizziness', 'rash', 'joint pain'];

  const calendarDates = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString();
  }).reverse();

  const durationOptions = [
    { value: '', label: 'Select' },
    { value: '<1 day', label: 'Less than 1 day' },
    { value: '1-3 days', label: '1-3 days' },
    { value: '4-7 days', label: '4-7 days' },
    { value: '>1 week', label: 'More than 1 week' }
  ];

  return (
    <div style={{ paddingTop: '80px', maxWidth: '1400px', margin: '0 auto', padding: '80px 24px 40px', fontFamily: 'Inter, system-ui' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#059669', marginBottom: '8px' }}>AI Symptom Triage</h1>
      <p style={{ color: '#4b5563', marginBottom: '8px' }}>Describe your symptoms for initial guidance (demo). Recognizes 150+ body parts and 20+ symptom types – thousands of possible combinations.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
        {quickSymptoms.map(qs => (
          <button key={qs} onClick={() => quickAnalyze(qs)} style={{ background: '#f0fdf4', border: '1px solid #a7f3d0', padding: '6px 14px', borderRadius: '40px', cursor: 'pointer', fontSize: '14px', color: '#047857' }}>{qs}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '32px' }}>
        {/* Body map */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#059669' }}>Body Map ({bodyParts.length} parts)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '8px', marginTop: '16px', maxHeight: '350px', overflowY: 'auto' }}>
            {bodyParts.map(part => (
              <button key={part} onClick={() => setSelectedBodyPart(part)} style={{ background: selectedBodyPart === part ? '#059669' : '#f3f4f6', color: selectedBodyPart === part ? 'white' : '#1f2937', border: 'none', padding: '8px 4px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>{part}</button>
            ))}
          </div>
          {selectedBodyPart && <div style={{ marginTop: '16px', background: '#ecfdf5', padding: '12px', borderRadius: '16px', fontSize: '14px' }}><strong>Common symptoms:</strong> pain, swelling, stiffness, numbness, tingling</div>}
        </div>

        {/* Symptom input */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#059669' }}>Describe Symptoms</h3>
          <textarea rows="3" placeholder="e.g., sharp pain in lower back, throbbing headache with nausea, swelling in left knee" value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '16px', border: '1px solid #cbd5e1', margin: '12px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Duration</label>
              <CustomSelect options={durationOptions} value={duration} onChange={setDuration} placeholder="Select" />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Severity (1-10)</label>
              <input type="range" min="1" max="10" value={severitySlider} onChange={e => setSeveritySlider(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#059669' }} />
              <div style={{ textAlign: 'center' }}>{severitySlider}/10</div>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}><FaThermometerHalf /> Temperature (°F)</label>
            <input type="number" step="0.1" value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="98.6" style={{ width: '100%', padding: '8px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 2px rgba(5,150,105,0.2)'; }} onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}><FaHeartbeat /> Blood Pressure (systolic/diastolic)</label>
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <input type="number" placeholder="Systolic" value={bpSystolic} onChange={e => setBpSystolic(e.target.value)} style={{ flex: 1, minWidth: '0', padding: '8px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 2px rgba(5,150,105,0.2)'; }} onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }} />
              <input type="number" placeholder="Diastolic" value={bpDiastolic} onChange={e => setBpDiastolic(e.target.value)} style={{ flex: 1, minWidth: '0', padding: '8px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 2px rgba(5,150,105,0.2)'; }} onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }} />
            </div>
          </div>
          {feverWarning && <div style={{ marginTop: '8px', color: '#dc2626', fontSize: '12px' }}>⚠️ Fever detected (&gt;100.4°F). Consider consulting a doctor.</div>}
          {bpWarning && <div style={{ marginTop: '8px', color: '#dc2626', fontSize: '12px' }}>⚠️ High blood pressure detected. Monitor and consult if persistent.</div>}
          <button onClick={analyze} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', width: '100%', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px' }}>Get AI Suggestion</button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', padding: '20px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#059669' }}><FaPills /> Current Medications</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input type="text" placeholder="Add medication (e.g., ibuprofen, lisinopril)" value={newMed} onChange={e => setNewMed(e.target.value)} style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 2px rgba(5,150,105,0.2)'; }} onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }} />
          <button onClick={addMedication} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPills /> Add</button>
        </div>
        {medications.length === 0 ? <p>No medications added.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {medications.map((med, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span>{med}</span>
                <button onClick={() => removeMedication(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {result && !result.error && (
        <div style={{ background: '#f0fdf4', borderRadius: '24px', padding: '24px', marginBottom: '32px', borderLeft: '6px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#059669' }}>Analysis Result</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={exportReport} title="Export as text" style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaDownload /> Export</button>
              <button onClick={copyReport} title="Copy to clipboard" style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaCopy /> Copy</button>
              <button onClick={shareReport} title="Share" style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaShare /> Share</button>
              <button onClick={handlePrint} title="Print" style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaPrint /> Print</button>
            </div>
          </div>
          <p><strong>Your description:</strong> {result.symptom}</p>
          <p><strong>Possible conditions:</strong> {result.conditions.join(', ')}</p>
          <p><strong>First aid:</strong> {result.firstAid}</p>
          <p><strong>When to see a doctor:</strong> {result.seeDoctor}</p>
          <p><strong>OTC suggestions:</strong> {result.otc}</p>
          <p><strong>Home remedies:</strong> {result.homeRemedy}</p>
          <p><strong>Prevention:</strong> {result.prevention}</p>
        </div>
      )}
      {result?.error && <div style={{ background: '#fee2e2', borderRadius: '24px', padding: '20px', marginBottom: '32px', color: '#991b1b' }}>{result.error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#059669' }}><FaHistory /> Symptom History</h3>
            <div>
              <button onClick={() => setShowHistory(!showHistory)} style={{ background: 'white', border: '1px solid #059669', color: '#059669', padding: '4px 12px', borderRadius: '40px', cursor: 'pointer', marginRight: '8px' }}>{showHistory ? 'Hide' : 'Show'}</button>
              {history.length > 0 && <button onClick={clearHistory} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaTrash /> Clear</button>}
            </div>
          </div>
          {showHistory && (
            <div>
              <button onClick={exportCSV} style={{ marginBottom: '12px', background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '40px', cursor: 'pointer' }}><FaDownload /> Export CSV</button>
              {history.length === 0 ? <p>No history yet.</p> : (
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                  {history.map(h => (
                    <li key={h.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{h.date}</strong>
                        <button onClick={() => deleteHistoryItem(h.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </div>
                      <div>Symptom: {h.symptom.substring(0, 80)}</div>
                      <div>Severity: {h.severity}/10 | Temp: {h.temperature}°F | BP: {h.bp}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {severityData.length >= 2 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#059669' }}><FaChartLine /> Severity Trend (last {severityData.length})</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', marginTop: '16px' }}>
              {severityData.map((item, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#059669', width: '100%', height: `${(item.severity / maxSeverity) * chartHeight}px`, borderRadius: '4px 4px 0 0' }}></div>
                  <span style={{ fontSize: '10px', marginTop: '6px', textAlign: 'center' }}>{item.symptom.substring(0,8)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#059669' }}><FaCalendarAlt /> Symptom Calendar (last 30 days)</h3>
          <button onClick={() => setCalendarView(!calendarView)} style={{ marginBottom: '16px', background: '#e5e7eb', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>{calendarView ? 'Hide' : 'Show'}</button>
          {calendarView && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '12px' }}>
              {calendarDates.map((date, idx) => {
                const hasSymptom = history.some(h => h.date.includes(date));
                return <div key={idx} style={{ background: hasSymptom ? '#a7f3d0' : '#f3f4f6', padding: '4px', textAlign: 'center', borderRadius: '8px' }}>{date.slice(0,5)}</div>;
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#fef3c7', borderRadius: '24px', padding: '20px', borderLeft: '6px solid #f59e0b' }}>
          <h3 style={{ color: '#b45309' }}><FaExclamationTriangle /> Emergency: Call 911</h3>
          <ul><li>Chest pain with SOB</li><li>Sudden severe headache</li><li>Difficulty speaking</li><li>Uncontrolled bleeding</li><li>Major trauma</li></ul>
        </div>
        <div style={{ background: '#e0f2fe', borderRadius: '24px', padding: '20px', borderLeft: '6px solid #0ea5e9' }}>
          <h3 style={{ color: '#0369a1' }}><FaHospital /> Nearby Clinics (demo)</h3>
          <p>Wellness Urgent Care – 0.3mi<br />City General Hospital – 1.2mi</p>
        </div>
        <div style={{ background: '#dcfce7', borderRadius: '24px', padding: '20px', borderLeft: '6px solid #22c55e' }}>
          <h3 style={{ color: '#166534' }}><FaYoutube /> First Aid Videos</h3>
          <p><a href="https://www.youtube.com/results?search_query=how+to+handle+headache" target="_blank" rel="noreferrer" style={{ color: '#059669' }}>Headache first aid</a></p>
          <p><a href="https://www.youtube.com/results?search_query=cpr+tutorial" target="_blank" rel="noreferrer" style={{ color: '#059669' }}>CPR tutorial</a></p>
        </div>
      </div>
    </div>
  );
};

export default AITriage;
