import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaCalendarCheck, FaUserMd, FaClock, FaMapMarkerAlt,
  FaVideo, FaPhone, FaStar, FaChevronRight, FaSearch,
  FaFilter, FaHeartbeat, FaStethoscope, FaSyringe,
  FaPills, FaAmbulance, FaHospital, FaMicroscope,
  FaUserInjured, FaBaby, FaTeeth, FaEye, FaBrain,
  FaLungs, FaBone, FaHeart, FaVirus, FaAllergies,
  FaVial, FaFlask, FaDna, FaUserPlus, FaCalendarAlt,
  FaSpinner, FaCheckCircle, FaExclamationCircle,
  FaArrowLeft, FaArrowRight, FaPrint, FaDownload,
  FaShare, FaBell, FaSmile, FaMeh, FaFrown, FaBolt,
  FaShieldAlt, FaComment, FaCalculator, FaSync
} from 'react-icons/fa';

const API_BASE = 'http://localhost:8080/api';

const SPECIALTIES = [
  { id: 1, name: 'Cardiology', icon: FaHeart, color: '#ef4444', desc: 'Heart & cardiovascular care' },
  { id: 2, name: 'Neurology', icon: FaBrain, color: '#8b5cf6', desc: 'Brain & nervous system' },
  { id: 3, name: 'Orthopedics', icon: FaBone, color: '#f59e0b', desc: 'Bones & joints' },
  { id: 4, name: 'Pulmonology', icon: FaLungs, color: '#3b82f6', desc: 'Lungs & respiratory' },
  { id: 5, name: 'Gastroenterology', icon: FaVial, color: '#10b981', desc: 'Digestive system' },
  { id: 6, name: 'Dermatology', icon: FaAllergies, color: '#f97316', desc: 'Skin & hair care' },
  { id: 7, name: 'Ophthalmology', icon: FaEye, color: '#06b6d4', desc: 'Eye care & surgery' },
  { id: 8, name: 'Dentistry', icon: FaTeeth, color: '#14b8a6', desc: 'Dental & oral health' },
  { id: 9, name: 'Pediatrics', icon: FaBaby, color: '#22c55e', desc: "Children's healthcare" },
  { id: 10, name: 'Obstetrics', icon: FaUserInjured, color: '#ec4899', desc: 'Pregnancy & childbirth' },
  { id: 11, name: 'Urology', icon: FaVirus, color: '#8b5cf6', desc: 'Urinary tract health' },
  { id: 12, name: 'Immunology', icon: FaShieldAlt, color: '#3b82f6', desc: 'Immune system disorders' },
];

const DOCTORS = [
  { id: 1, name: 'Dr. Emily Carter', specialty: 'Cardiology', rating: 4.9, reviews: 127, fee: 250, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', hospital: 'WellNest Medical Center' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, reviews: 98, fee: 280, avatar: 'https://randomuser.me/api/portraits/men/34.jpg', hospital: 'NeuroCare Institute' },
  { id: 3, name: 'Dr. Priya Sharma', specialty: 'Obstetrics', rating: 4.9, reviews: 156, fee: 220, avatar: 'https://randomuser.me/api/portraits/women/10.jpg', hospital: "Women's Health Center" },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', rating: 4.7, reviews: 89, fee: 240, avatar: 'https://randomuser.me/api/portraits/men/45.jpg', hospital: 'OrthoCare Hospital' },
  { id: 5, name: 'Dr. Sarah Lee', specialty: 'Dermatology', rating: 4.8, reviews: 112, fee: 200, avatar: 'https://randomuser.me/api/portraits/women/22.jpg', hospital: 'Skin & Aesthetics Clinic' },
];

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

export default function BookAppointment() {
  const location = useLocation();
  const passedDoctor = location.state?.doctor;
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [doctorsList, setDoctorsList] = useState(DOCTORS);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (passedDoctor) {
      if (!doctorsList.some(d => d.id === passedDoctor.id)) {
        const formatted = {
          id: passedDoctor.id,
          name: passedDoctor.name,
          specialty: passedDoctor.specialty,
          rating: passedDoctor.rating,
          reviews: passedDoctor.experience ? passedDoctor.experience * 10 + 7 : 89,
          fee: passedDoctor.specialty === 'Cardiology' ? 250 : 200,
          avatar: passedDoctor.image || 'https://randomuser.me/api/portraits/men/1.jpg',
          hospital: 'WellNest Medical Center'
        };
        setDoctorsList(prev => [formatted, ...prev]);
        setSelectedDoctor(formatted);
        setSelectedSpecialty(formatted.specialty);
        setStep(2);
      } else {
        const found = doctorsList.find(d => d.id === passedDoctor.id);
        if (found) {
          setSelectedDoctor(found);
          setSelectedSpecialty(found.specialty);
          setStep(2);
        }
      }
    }
  }, [passedDoctor]);

  const filteredDoctors = doctorsList.filter(d => {
    const matchSpecialty = !selectedSpecialty || d.specialty === selectedSpecialty;
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSpecialty && matchSearch;
  });

  const handleBooking = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (user && user.email) {
        try {
          await fetch('http://localhost:8080/api/notifications/appointment/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: user.email,
              patientName: user.name || 'Patient',
              doctorName: selectedDoctor?.name || 'Doctor',
              date: selectedDate || '',
              time: selectedTime || '',
              meetingLink: `http://localhost:5173/video-consultation/${Math.floor(Math.random() * 100000)}`
            })
          });
        } catch (mailErr) {
          console.error('Failed to send confirmation email:', mailErr);
        }
      }

      setBookingSuccess(true);
      setStep(4);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>

          {/* ── HERO ── */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '24px', padding: '40px 36px', marginBottom: '32px',
            position: 'relative', overflow: 'hidden', color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaCalendarCheck style={{ fontSize: '2rem' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                    Book Appointment
                  </h2>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                    200+ Premium Healthcare Features • Find the best doctors
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Doctors Available', value: '150+', icon: FaUserMd },
                  { label: 'Specialties', value: '25+', icon: FaStethoscope },
                  { label: 'Appointments Today', value: '48', icon: FaClock },
                  { label: 'Patient Rating', value: '4.9★', icon: FaStar },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <s.icon style={{ fontSize: '1rem', opacity: 0.8 }} />
                      <div>
                        <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── STEP PROGRESS ── */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {[
              { step: 1, label: 'Select Specialty', icon: FaStethoscope },
              { step: 2, label: 'Choose Doctor', icon: FaUserMd },
              { step: 3, label: 'Select Time', icon: FaClock },
              { step: 4, label: 'Confirm Booking', icon: FaCheckCircle },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px', borderRadius: '12px',
                background: step >= s.step ? emerald : 'white',
                color: step >= s.step ? 'white' : '#94a3b8',
                border: `1px solid ${step >= s.step ? emerald : '#e2e8f0'}`,
                flex: 1, minWidth: '150px'
              }}>
                <s.icon size={14} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{s.label}</span>
                {step > s.step && <FaCheckCircle size={12} style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>

          {/* ── STEP 1: SPECIALTIES ── */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>
                <FaStethoscope style={{ color: emerald, marginRight: '8px' }} />
                Select a Specialty
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                {SPECIALTIES.map(spec => (
                  <div key={spec.id} onClick={() => { setSelectedSpecialty(spec.name); setStep(2); }}
                    style={{
                      background: selectedSpecialty === spec.name ? emeraldLight : 'white',
                      border: `2px solid ${selectedSpecialty === spec.name ? emerald : '#e2e8f0'}`,
                      borderRadius: '14px', padding: '18px 16px', cursor: 'pointer',
                      transition: 'all 0.22s', textAlign: 'center'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}><spec.icon style={{ color: spec.color }} /></div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b' }}>{spec.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{spec.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: DOCTORS ── */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                  <FaUserMd style={{ color: emerald, marginRight: '8px' }} />
                  Available Doctors
                </h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <FaSearch style={{ color: '#94a3b8' }} />
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      style={{ border: 'none', outline: 'none', padding: '10px 0', width: '150px', fontSize: '0.85rem', background: 'transparent' }} />
                  </div>
                  <button onClick={() => { setSelectedSpecialty(null); setStep(1); }}
                    style={{ padding: '10px 16px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', color: '#475569' }}>
                    ← Back
                  </button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} onClick={() => { setSelectedDoctor(doctor); setStep(3); }}
                    style={{
                      background: selectedDoctor?.id === doctor.id ? emeraldLight : 'white',
                      border: `2px solid ${selectedDoctor?.id === doctor.id ? emerald : '#e2e8f0'}`,
                      borderRadius: '16px', padding: '20px', cursor: 'pointer',
                      transition: 'all 0.22s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <img src={doctor.avatar} alt={doctor.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{doctor.name}</div>
                        <div style={{ fontSize: '0.8rem', color: emerald, fontWeight: '600' }}>{doctor.specialty}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{doctor.hospital}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <FaStar style={{ color: '#f59e0b', fontSize: '0.8rem' }} />
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{doctor.rating}</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({doctor.reviews} reviews)</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: emerald, marginLeft: 'auto' }}>${doctor.fee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: DATE & TIME ── */}
          {step === 3 && selectedDoctor && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                  <FaClock style={{ color: emerald, marginRight: '8px' }} />
                  Select Date & Time
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setStep(2)} style={{ padding: '10px 16px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', color: '#475569' }}>← Back</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Dates */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Available Dates</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {Array.from({ length: 21 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const dateStr = date.toISOString().split('T')[0];
                      const isToday = i === 0;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <div key={i} onClick={() => setSelectedDate(dateStr)}
                          style={{
                            padding: '10px 4px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                            background: isSelected ? emerald : isToday ? emeraldLight : 'white',
                            border: `1px solid ${isSelected ? emerald : isToday ? emerald : '#e2e8f0'}`,
                            color: isSelected ? 'white' : isToday ? emerald : '#1e293b',
                            fontWeight: isSelected ? '800' : isToday ? '700' : '600',
                            fontSize: '0.7rem',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = emerald; }}
                          onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                          <div>{date.getDate()}</div>
                          <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>{date.toLocaleDateString('en', { month: 'short' })}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Times */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Available Times</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {TIME_SLOTS.map(time => {
                      const isSelected = selectedTime === time;
                      const isAvailable = Math.random() > 0.3;
                      return (
                        <div key={time} onClick={() => { if (isAvailable) setSelectedTime(time); }}
                          style={{
                            padding: '10px 8px', textAlign: 'center', borderRadius: '10px', cursor: isAvailable ? 'pointer' : 'not-allowed',
                            background: isSelected ? emerald : isAvailable ? 'white' : '#f1f5f9',
                            border: `1px solid ${isSelected ? emerald : isAvailable ? '#e2e8f0' : '#f1f5f9'}`,
                            color: isSelected ? 'white' : isAvailable ? '#1e293b' : '#cbd5e1',
                            fontWeight: isSelected ? '800' : '600',
                            fontSize: '0.75rem',
                            opacity: isAvailable ? 1 : 0.5,
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={e => { if (isAvailable && !isSelected) e.currentTarget.style.borderColor = emerald; }}
                          onMouseLeave={e => { if (isAvailable && !isSelected) e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                          {time}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <button onClick={handleBooking} disabled={loading}
                  style={{
                    marginTop: '20px', padding: '14px 32px', background: emerald, color: 'white',
                    border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                    boxShadow: '0 4px 16px rgba(5,150,105,0.3)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  {loading ? <FaSpinner className="spin" /> : <FaCheckCircle />}
                  {loading ? 'Booking...' : 'Confirm Appointment'}
                </button>
              )}
            </div>
          )}

          {/* ── STEP 4: SUCCESS ── */}
          {step === 4 && bookingSuccess && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Appointment Confirmed!</h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '24px' }}>
                Your appointment with <strong>{selectedDoctor?.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been confirmed.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => { setStep(1); setSelectedDoctor(null); setSelectedDate(null); setSelectedTime(null); setBookingSuccess(false); }}
                  style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  Book Another
                </button>
                <Link to="/more?tab=dashboard" style={{ padding: '12px 24px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' }}>
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* ── PREMIUM FEATURES SECTION ── */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>
              <FaStar style={{ color: '#f59e0b', marginRight: '8px' }} />
              200+ Premium Healthcare Features
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Doctor Search', icon: FaSearch, color: '#3b82f6' },
                { label: 'Video Consultation', icon: FaVideo, color: '#8b5cf6' },
                { label: 'Instant Booking', icon: FaBolt, color: '#f59e0b' },
                { label: 'Patient Reviews', icon: FaStar, color: '#eab308' },
                { label: 'Medical Records', icon: FaFlask, color: '#10b981' },
                { label: 'Prescription Refill', icon: FaPills, color: '#ef4444' },
                { label: 'Health Insurance', icon: FaShieldAlt, color: '#3b82f6' },
                { label: 'Lab Results', icon: FaMicroscope, color: '#8b5cf6' },
                { label: 'Emergency Care', icon: FaAmbulance, color: '#ef4444' },
                { label: 'Hospital Map', icon: FaMapMarkerAlt, color: '#f97316' },
                { label: 'Appointment Reminders', icon: FaBell, color: '#ec4899' },
                { label: 'Health Assessment', icon: FaHeartbeat, color: '#10b981' },
              ].map((f, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: '12px', padding: '14px 12px',
                  border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px',
                  transition: 'all 0.22s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = f.color; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <f.icon style={{ color: f.color, fontSize: '1rem' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1e293b' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
      </>
  );
}
