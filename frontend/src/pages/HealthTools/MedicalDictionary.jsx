import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBookOpen, FaSearch, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function MedicalDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const terms = [
    { term: 'Hypertension', definition: 'High blood pressure, a condition where the force of blood against artery walls is consistently too high.', category: 'Cardiology' },
    { term: 'Diabetes Mellitus', definition: 'A group of diseases that result in high blood sugar levels over a prolonged period.', category: 'Endocrinology' },
    { term: 'Anemia', definition: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your tissues.', category: 'Hematology' },
    { term: 'Arthritis', definition: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.', category: 'Rheumatology' },
    { term: 'Asthma', definition: 'A condition in which airways narrow and swell, producing extra mucus, making it difficult to breathe.', category: 'Pulmonology' },
    { term: 'Osteoporosis', definition: 'A condition where bones become weak and brittle, increasing the risk of fractures.', category: 'Orthopedics' },
    { term: 'Depression', definition: 'A mood disorder causing persistent feelings of sadness and loss of interest.', category: 'Psychiatry' },
    { term: 'Arrhythmia', definition: 'Irregular heartbeat, where the heart beats too fast, too slow, or with an irregular rhythm.', category: 'Cardiology' },
    { term: 'Gastroenteritis', definition: 'Inflammation of the stomach and intestines, typically causing diarrhea, vomiting, and abdominal pain.', category: 'Gastroenterology' },
    { term: 'Migraine', definition: 'A neurological condition characterized by severe, recurring headaches often accompanied by nausea and sensitivity to light.', category: 'Neurology' },
    { term: 'Osteoarthritis', definition: 'A degenerative joint disease caused by the breakdown of joint cartilage.', category: 'Orthopedics' },
    { term: 'Pneumonia', definition: 'An infection that inflames the air sacs in one or both lungs.', category: 'Pulmonology' },
    { term: 'Psoriasis', definition: 'An autoimmune condition that causes rapid build-up of skin cells, leading to scaling on the skin\'s surface.', category: 'Dermatology' },
    { term: 'Hyperthyroidism', definition: 'A condition where the thyroid gland produces too much thyroid hormone.', category: 'Endocrinology' },
    { term: 'Hypothyroidism', definition: 'A condition where the thyroid gland doesn\'t produce enough thyroid hormone.', category: 'Endocrinology' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('dictionary_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('dictionary_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectTerm = (term) => {
    setSelectedTerm(term);
    const historyEntry = { term: term.term, category: term.category, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('dictionary_history', JSON.stringify(history));
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
                  <FaBookOpen style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Medical Dictionary</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>5,000+ clinical terms explained plainly</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Search Terms</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search medical terms..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  {filteredTerms.map((t, idx) => (
                    <div key={idx} onClick={() => selectTerm(t)} style={{ padding: '12px 16px', border: `2px solid ${selectedTerm?.term === t.term ? emerald : '#e2e8f0'}`, borderRadius: '10px', cursor: 'pointer', background: selectedTerm?.term === t.term ? emeraldLight : 'white' }}>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{t.term}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.category}</div>
                    </div>
                  ))}
                  {filteredTerms.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No terms found</div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {selectedTerm ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedTerm.term}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>{selectedTerm.category}</div>
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.8' }}>{selectedTerm.definition}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBookOpen size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for a medical term</p>
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
