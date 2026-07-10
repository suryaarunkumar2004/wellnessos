import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaShieldAlt, FaBandAid, FaHeartbeat, FaLungs, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function FirstAidGuide() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const guides = [
    { id: 1, title: 'CPR', icon: FaHeartbeat, steps: ['Check responsiveness', 'Call emergency services', 'Start chest compressions (100-120/min)', 'Give rescue breaths', 'Continue until help arrives'], description: 'Cardiopulmonary resuscitation (CPR) is an emergency procedure that combines chest compressions with rescue breathing to manually preserve brain function.' },
    { id: 2, title: 'Choking', icon: FaLungs, steps: ['Assess if person can speak/cough', 'Perform abdominal thrusts (Heimlich)', 'Repeat until object is expelled', 'If unconscious, start CPR'], description: 'Choking occurs when a foreign object blocks the airway, preventing normal breathing. Quick action is essential.' },
    { id: 3, title: 'Bleeding', icon: FaBandAid, steps: ['Apply direct pressure with sterile gauze', 'Elevate the wound above the heart', 'Apply pressure bandage', 'Seek medical attention if severe'], description: 'Severe bleeding can be life-threatening. Apply firm pressure and seek immediate medical attention.' },
    { id: 4, title: 'Burn Care', icon: FaShieldAlt, steps: ['Cool the burn with cool (not cold) water', 'Remove tight items near the burn', 'Cover with sterile dressing', 'Do not apply ointments or ice'], description: 'Burns require immediate care to prevent infection and promote healing. Cool the burn and protect it.' },
    { id: 5, title: 'Fracture', icon: FaBandAid, steps: ['Immobilize the injured area', 'Apply ice to reduce swelling', 'Do not attempt to realign bone', 'Seek medical attention immediately'], description: 'Fractures require proper immobilization to prevent further damage. Do not attempt to move the person if a neck or spine injury is suspected.' },
    { id: 6, title: 'Heart Attack', icon: FaHeartbeat, steps: ['Call emergency services immediately', 'Help person sit down and rest', 'Give aspirin if not allergic', 'Monitor until help arrives'], description: 'A heart attack occurs when blood flow to the heart is blocked. Time is critical - call emergency services immediately.' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('firstaid_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('firstaid_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectGuide = (guide) => {
    setSelectedGuide(guide);
    const historyEntry = { guide: guide.title, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('firstaid_history', JSON.stringify(history));
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
                  <FaShieldAlt style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>First Aid Guide</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Step-by-step emergency response procedures</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Emergency Guides</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {guides.map((guide) => (
                  <div key={guide.id} onClick={() => selectGuide(guide)} style={{ padding: '14px', border: `2px solid ${selectedGuide?.id === guide.id ? emerald : '#e2e8f0'}`, borderRadius: '12px', cursor: 'pointer', background: selectedGuide?.id === guide.id ? emeraldLight : 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: emeraldLight, padding: '10px', borderRadius: '10px' }}>
                        <guide.icon style={{ color: emerald, fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{guide.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{guide.description.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {selectedGuide ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedGuide.title}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>{selectedGuide.description}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedGuide.steps.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ background: emerald, color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700', flexShrink: 0 }}>{idx + 1}</span>
                        <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px', padding: '12px', background: '#fef2f2', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>🚨 Emergency: Call 911 immediately if the person is unresponsive or not breathing.</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaShieldAlt size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select a first aid guide</p>
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
