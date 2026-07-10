import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaHospital, FaMapMarkerAlt, FaPhone, FaAmbulance, FaStar, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function NearestHospitalFinder() {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  const hospitalDatabase = [
    { name: 'WellNest Medical Center', address: '123 Health Blvd, Mumbai', phone: '+91-22-2345-6789', specialty: 'Multi-Specialty', distance: '0.5 km', rating: 4.8, emergency: true, beds: 350 },
    { name: 'City General Hospital', address: '456 Hospital Rd, Mumbai', phone: '+91-22-3456-7890', specialty: 'General', distance: '1.2 km', rating: 4.5, emergency: true, beds: 200 },
    { name: 'Apollo Medical Center', address: '789 Apollo St, Mumbai', phone: '+91-22-4567-8901', specialty: 'Cardiology', distance: '2.3 km', rating: 4.9, emergency: true, beds: 450 },
    { name: 'Fortis Healthcare', address: '321 Fortis Ave, Mumbai', phone: '+91-22-5678-9012', specialty: 'Neurology', distance: '3.1 km', rating: 4.7, emergency: true, beds: 300 },
    { name: 'Sahyadri Hospital', address: '654 Sahyadri Rd, Mumbai', phone: '+91-22-6789-0123', specialty: 'Multi-Specialty', distance: '4.5 km', rating: 4.6, emergency: true, beds: 250 },
    { name: 'Jupiter Hospital', address: '987 Jupiter Ln, Mumbai', phone: '+91-22-7890-1234', specialty: 'Orthopedics', distance: '5.2 km', rating: 4.4, emergency: false, beds: 180 },
    { name: 'Global Health City', address: '147 Global Dr, Mumbai', phone: '+91-22-8901-2345', specialty: 'Multi-Specialty', distance: '6.8 km', rating: 4.8, emergency: true, beds: 500 },
    { name: 'Rainbow Children\'s Hospital', address: '258 Rainbow St, Mumbai', phone: '+91-22-9012-3456', specialty: 'Pediatrics', distance: '7.3 km', rating: 4.9, emergency: true, beds: 150 },
    { name: 'Kokilaben Hospital', address: '369 Kokilaben Rd, Mumbai', phone: '+91-22-0123-4567', specialty: 'Multi-Specialty', distance: '8.1 km', rating: 4.7, emergency: true, beds: 400 },
    { name: 'Wockhardt Hospital', address: '741 Wockhardt Ave, Mumbai', phone: '+91-22-1234-5678', specialty: 'Multi-Specialty', distance: '9.5 km', rating: 4.6, emergency: true, beds: 280 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('hospital_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('hospital_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const findHospitals = () => {
    if (!location) {
      showToast('Please enter your location', 'error');
      return;
    }
    const nearby = hospitalDatabase
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 8);
    
    setHospitals(nearby);
    const resultData = {
      location: location,
      hospitals: nearby,
      count: nearby.length,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast(`✅ Found ${nearby.length} nearby hospitals!`, 'success');
  };

  const resetFinder = () => { setLocation(''); setHospitals([]); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('hospital_history'); showToast('History cleared', 'info'); };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} style={{ color: i < Math.floor(rating) ? '#fbbf24' : '#e2e8f0', fontSize: '0.7rem' }} />);
    }
    return stars;
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
                  <FaHospital style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Nearest Hospital Finder</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Locate verified emergency facilities near you</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Find Nearest Hospitals</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Your Location / City *</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Mumbai, Delhi, Bangalore" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={findHospitals} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Find Hospitals</button>
                  <button onClick={resetFinder} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>
            </div>

            <div>
              {hospitals.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Nearby Hospitals</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {hospitals.map((hospital, idx) => (
                      <div key={idx} style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontWeight: '700', color: '#1e293b' }}>{hospital.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}><FaMapMarkerAlt style={{ display: 'inline', marginRight: '4px', fontSize: '0.7rem' }} /> {hospital.address}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}><FaPhone style={{ display: 'inline', marginRight: '4px', fontSize: '0.7rem' }} /> {hospital.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              {renderStars(hospital.rating)}
                              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>({hospital.rating})</span>
                              {hospital.emergency && <span style={{ fontSize: '0.6rem', background: '#fef2f2', color: '#ef4444', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>🚨 ER</span>}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{hospital.specialty} • {hospital.beds} beds</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: emerald }}>{hospital.distance}</div>
                            <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>away</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <FaAmbulance style={{ display: 'inline', marginRight: '4px', color: '#ef4444' }} />
                      Emergency: <strong>108</strong> (India) | <strong>911</strong> (US) | <strong>112</strong> (EU)
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaHospital size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Enter your location to find nearby hospitals</p>
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
