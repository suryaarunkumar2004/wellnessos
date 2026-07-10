import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaLeaf, FaSearch, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function SupplementGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const supplements = [
    { name: 'Vitamin D3', benefits: 'Bone health, immune support, mood regulation', dosage: '1000-4000 IU daily', source: 'Sunlight, fatty fish, egg yolks', deficiency: 'Fatigue, bone pain, depression', toxicity: 'Hypercalcemia, kidney stones' },
    { name: 'Omega-3', benefits: 'Heart health, brain function, inflammation reduction', dosage: '1000-2000 mg daily', source: 'Fish oil, flaxseed, walnuts', deficiency: 'Dry skin, poor memory, joint pain', toxicity: 'Blood thinning, fishy burps' },
    { name: 'Magnesium', benefits: 'Muscle relaxation, sleep quality, anxiety reduction', dosage: '300-400 mg daily', source: 'Nuts, leafy greens, whole grains', deficiency: 'Muscle cramps, anxiety, insomnia', toxicity: 'Diarrhea, nausea, low blood pressure' },
    { name: 'Zinc', benefits: 'Immune function, wound healing, taste and smell', dosage: '15-30 mg daily', source: 'Meat, shellfish, legumes, seeds', deficiency: 'Hair loss, poor immunity, loss of taste', toxicity: 'Nausea, copper deficiency, metallic taste' },
    { name: 'Vitamin C', benefits: 'Antioxidant, immune support, collagen synthesis', dosage: '500-1000 mg daily', source: 'Citrus fruits, bell peppers, strawberries', deficiency: 'Fatigue, easy bruising, joint pain', toxicity: 'Stomach upset, diarrhea, kidney stones' },
    { name: 'Probiotics', benefits: 'Gut health, digestion, immune function', dosage: '1-10 billion CFU daily', source: 'Yogurt, fermented foods, kimchi', deficiency: 'Digestive issues, bloating, frequent infections', toxicity: 'Rare, mild gas, bloating' },
    { name: 'Iron', benefits: 'Oxygen transport, energy production, immune function', dosage: '18 mg daily (women), 8 mg (men)', source: 'Red meat, spinach, legumes, fortified cereals', deficiency: 'Anemia, fatigue, weakness, pale skin', toxicity: 'Constipation, liver damage, nausea' },
    { name: 'Calcium', benefits: 'Bone health, muscle function, nerve transmission', dosage: '1000-1200 mg daily', source: 'Dairy, fortified foods, leafy greens', deficiency: 'Osteoporosis, muscle cramps, numbness', toxicity: 'Kidney stones, constipation, calcium buildup' },
    { name: 'Vitamin B12', benefits: 'Nerve function, red blood cells, energy production', dosage: '2.4 mcg daily', source: 'Animal products, fortified foods, supplements', deficiency: 'Fatigue, numbness, memory issues, weakness', toxicity: 'Rare, no known toxicity' },
    { name: 'CoQ10', benefits: 'Heart health, energy production, antioxidant', dosage: '100-200 mg daily', source: 'Meat, fish, whole grains', deficiency: 'Fatigue, muscle weakness, heart issues', toxicity: 'Mild digestive upset, insomnia' },
    { name: 'Vitamin E', benefits: 'Antioxidant, skin health, immune function', dosage: '15 mg daily', source: 'Nuts, seeds, vegetable oils', deficiency: 'Muscle weakness, vision problems, immune issues', toxicity: 'Bleeding risk, nausea, fatigue' },
    { name: 'Folic Acid', benefits: 'DNA synthesis, brain function, pregnancy support', dosage: '400-800 mcg daily', source: 'Leafy greens, legumes, fortified grains', deficiency: 'Fatigue, anemia, birth defects', toxicity: 'Masking B12 deficiency, digestive issues' },
    { name: 'Potassium', benefits: 'Blood pressure regulation, muscle function', dosage: '2000-3000 mg daily', source: 'Bananas, potatoes, avocados, beans', deficiency: 'Muscle cramps, weakness, irregular heartbeat', toxicity: 'Heart palpitations, nausea, tingling' },
    { name: 'Selenium', benefits: 'Antioxidant, thyroid function, immune support', dosage: '55-200 mcg daily', source: 'Brazil nuts, fish, eggs, sunflower seeds', deficiency: 'Fatigue, cognitive decline, hair loss', toxicity: 'Garlic breath, nausea, hair loss, nail changes' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('supplement_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('supplement_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const searchSupplement = () => {
    if (!searchTerm.trim()) {
      showToast('Please enter a supplement name', 'error');
      return;
    }
    const found = supplements.find(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (found) {
      setSelectedSupplement(found);
      const historyEntry = { search: searchTerm, supplement: found.name, date: new Date().toLocaleString() };
      setHistory([historyEntry, ...history].slice(0, 20));
      localStorage.setItem('supplement_history', JSON.stringify(history));
      showToast(`✅ Found information for ${found.name}!`, 'success');
    } else {
      showToast('Supplement not found', 'info');
    }
  };

  const clearSearch = () => { setSearchTerm(''); setSelectedSupplement(null); };

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
                  <FaLeaf style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Supplement Guide</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Evidence-based vitamin & mineral information</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Search Supplement</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search supplement..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  <button onClick={searchSupplement} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}><FaSearch /></button>
                </div>
                <button onClick={clearSearch} style={{ padding: '10px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Clear</button>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {supplements.map((supp, idx) => (
                    <div key={idx} onClick={() => { setSelectedSupplement(supp); setSearchTerm(supp.name); }} style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedSupplement?.name === supp.name ? emeraldLight : 'white', fontWeight: selectedSupplement?.name === supp.name ? '700' : '500' }}>
                      {supp.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {selectedSupplement ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedSupplement.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                    <div style={{ background: emeraldLight, padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Benefits</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedSupplement.benefits}</div>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Dosage</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedSupplement.dosage}</div>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Sources</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedSupplement.source}</div>
                    </div>
                    <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Deficiency Signs</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedSupplement.deficiency}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Toxicity / Overdose</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ef4444' }}>{selectedSupplement.toxicity}</div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b' }}>
                    ⚠️ Always consult your healthcare provider before starting any supplement regimen.
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaLeaf size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for a supplement</p>
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
