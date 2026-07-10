import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRunning, FaTint, FaMoon, FaHeartbeat, FaWeight,
  FaArrowUp, FaArrowDown, FaCheckCircle, FaMedal,
  FaFire, FaCalendarCheck, FaBell, FaChartLine,
  FaUserMd, FaVideo, FaPills, FaTools, FaBolt,
  FaStar, FaAward, FaClock, FaBed, FaThermometerHalf,
  FaLungs, FaBrain, FaSmile, FaFrown, FaMeh,
  FaUsers, FaTrophy, FaGem, FaCrown,
  FaExclamationTriangle, FaSpinner, FaPlus, FaMinus,
  FaDownload, FaPrint, FaShareAlt, FaEdit,
  FaCog, FaSlidersH, FaHeart, FaAppleAlt,
  FaCalendarAlt, FaStethoscope, FaShieldAlt, FaLeaf,
  FaClipboardList, FaArrowRight, FaRegClock, FaBook
} from 'react-icons/fa';

// Simple Toast context fallback
const useToast = () => {
  const showToast = (message, type = 'info') => {
    console.log(`[Toast] ${type}: ${message}`);
  };
  return { showToast };
};

const UPCOMING_APPOINTMENTS = [
  { id: 1, doctor: 'Dr. Emily Carter',   specialty: 'Cardiology',   date: 'Tomorrow',  time: '10:00 AM', type: 'Video',    avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, doctor: 'Dr. Michael Chen',   specialty: 'Neurology',    date: 'Jul 12',    time: '11:30 AM', type: 'In-Person', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { id: 3, doctor: 'Dr. Priya Sharma',   specialty: 'Gynecology',   date: 'Jul 15',    time: '2:00 PM',  type: 'Video',    avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
];

const MEDICATIONS_TODAY = [
  { id: 1, name: 'Metformin 500mg',   time: '8:00 AM',  taken: true,  color: '#8b5cf6' },
  { id: 2, name: 'Lisinopril 10mg',   time: '9:00 AM',  taken: true,  color: '#3b82f6' },
  { id: 3, name: 'Atorvastatin 20mg', time: '8:00 PM',  taken: false, color: '#f59e0b' },
  { id: 4, name: 'Omega-3 1000mg',    time: '12:00 PM', taken: false, color: '#059669' },
];

// ⭐⭐⭐ UPDATED QUICK LINKS - NO Lab Results, NO My Medications ⭐⭐⭐
const QUICK_LINKS = [
  { label: 'Book Appointment', icon: FaCalendarCheck, path: '/book-appointment', color: '#059669', desc: 'Schedule a visit' },
  { label: 'Telehealth Call',  icon: FaVideo,         path: '/telehealth',       color: '#3b82f6', desc: 'Connect instantly' },
  { label: 'Find Doctors',     icon: FaUserMd,        path: '/doctors',          color: '#ef4444', desc: 'Find a specialist' },
  { label: 'Services',         icon: FaPills,         path: '/services',         color: '#f59e0b', desc: 'Explore services' },
  { label: 'Health Tools',     icon: FaTools,         path: '/more?tab=tools',   color: '#14b8a6', desc: '52+ tools' },
  { label: 'Calendar',         icon: FaCalendarAlt,   path: '/more?tab=calendar',color: '#8b5cf6', desc: 'Schedule & events' },
  { label: 'Notifications',    icon: FaBell,          path: '/more?tab=notifications',color: '#3b82f6', desc: 'Stay informed' },
  { label: 'Blog',             icon: FaBook,          path: '/blog',             color: '#059669', desc: 'Health articles' },
];

const HEALTH_TIPS = [
  { emoji: '💧', tip: 'Drink 8 glasses of water daily. Proper hydration improves cognition, energy and metabolism by up to 30%.' },
  { emoji: '🚶', tip: '10,000 steps a day reduces cardiovascular disease risk by 40%. Start with a 20-minute walk after dinner.' },
  { emoji: '😴', tip: '7-9 hours of sleep resets cortisol levels and boosts immune response. Avoid screens 1 hour before bed.' },
  { emoji: '🧘', tip: 'Five minutes of deep breathing reduces systolic blood pressure by an average of 5 mmHg.' },
  { emoji: '🥗', tip: 'Eating 5+ servings of vegetables per day cuts type 2 diabetes risk by 23% (WHO, 2023).' },
];

const MOODS = [
  { icon: FaSmile, label: 'Great',  color: '#22c55e' },
  { icon: FaMeh,   label: 'Okay',   color: '#f59e0b' },
  { icon: FaFrown, label: 'Low',    color: '#ef4444' },
];

const DEFAULT_METRICS = [
  { id: 1, icon: FaRunning,   label: 'Steps',           value: 8432,  target: 10000, unit: '',  color: '#059669' },
  { id: 2, icon: FaTint,      label: 'Water (L)',        value: 2.1,   target: 3.0,   unit: 'L', color: '#3b82f6' },
  { id: 3, icon: FaMoon,      label: 'Sleep (hrs)',      value: 7.2,   target: 8.0,   unit: 'h', color: '#8b5cf6' },
  { id: 4, icon: FaHeartbeat, label: 'Heart Rate',       value: 72,    target: 75,    unit: 'bpm', color: '#ef4444' },
  { id: 5, icon: FaClock,     label: 'Active (mins)',    value: 72,    target: 90,    unit: 'min', color: '#f59e0b' },
  { id: 6, icon: FaFire,      label: 'Calories Burned',  value: 2450,  target: 2800,  unit: 'kcal', color: '#f97316' },
];

const getIconForMetric = (label) => {
  const cleanLabel = (label || '').toLowerCase();
  if (cleanLabel.includes('step')) return FaRunning;
  if (cleanLabel.includes('water')) return FaTint;
  if (cleanLabel.includes('sleep')) return FaMoon;
  if (cleanLabel.includes('heart')) return FaHeartbeat;
  if (cleanLabel.includes('active')) return FaClock;
  if (cleanLabel.includes('calorie')) return FaFire;
  return FaRunning;
};

export default function DashboardTab() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [mood, setMood] = useState(null);
  const [meds, setMeds] = useState(MEDICATIONS_TODAY);
  const [showLogPanel, setShowLogPanel] = useState(false);
  const [logForm, setLogForm] = useState({ steps: '', water: '', sleep: '', heartRate: '' });
  const [dateRange, setDateRange] = useState('week');
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/dashboard/summary?userId=1');
        if (res.ok) {
          const data = await res.json();
          if (data.metrics) setMetrics(data.metrics);
        }
      } catch { /* use defaults */ } finally {
        const saved = localStorage.getItem('wn_dashboard_metrics');
        if (saved) setMetrics(JSON.parse(saved));
        const savedMood = localStorage.getItem('wn_today_mood');
        if (savedMood) setMood(savedMood);
        setTimeout(() => setLoading(false), 400);
      }
    };
    fetchDashboard();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTipIndex(i => (i + 1) % HEALTH_TIPS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const syncMetrics = (updated) => {
    setMetrics(updated);
    localStorage.setItem('wn_dashboard_metrics', JSON.stringify(updated));
  };

  const handleLogVitals = (e) => {
    e.preventDefault();
    const updated = metrics.map(m => {
      if (m.label === 'Steps' && logForm.steps)       return { ...m, value: parseInt(logForm.steps) };
      if (m.label === 'Water (L)' && logForm.water)   return { ...m, value: parseFloat(logForm.water) };
      if (m.label === 'Sleep (hrs)' && logForm.sleep) return { ...m, value: parseFloat(logForm.sleep) };
      if (m.label === 'Heart Rate' && logForm.heartRate) return { ...m, value: parseInt(logForm.heartRate) };
      return m;
    });
    syncMetrics(updated);
    showToast('✅ Vitals logged successfully!', 'success');
    setShowLogPanel(false);
    setLogForm({ steps: '', water: '', sleep: '', heartRate: '' });
  };

  const selectMood = (m) => {
    setMood(m);
    localStorage.setItem('wn_today_mood', m);
    showToast(`Mood logged: ${m} 👍`, 'success');
  };

  const toggleMed = (id) => {
    const updated = meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m);
    setMeds(updated);
    const med = updated.find(m => m.id === id);
    showToast(med.taken ? `✅ ${med.name} marked as taken` : `↩ ${med.name} unmarked`, med.taken ? 'success' : 'info');
  };

  const healthScore = Math.round(metrics.reduce((acc, m) => acc + Math.min(100, (m.value / m.target) * 100), 0) / metrics.length);
  const goalsMet = metrics.filter(m => m.value >= m.target).length;
  const medsTaken = meds.filter(m => m.taken).length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
        <div style={{ width: '44px', height: '44px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontWeight: '600' }}>Loading your health dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HERO HEADER ── */}
      <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <FaHeartbeat style={{ fontSize: '2rem' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Dashboard</h2>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                  {new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowLogPanel(!showLogPanel)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                <FaPlus size={11} /> Log Vitals
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Health Score', value: `${healthScore}%` },
              { label: 'Day Streak',   value: `${streak} days` },
              { label: 'Goals Met',    value: `${goalsMet}/${metrics.length}` },
              { label: 'Meds Taken',   value: `${medsTaken}/${meds.length}` },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LOG VITALS PANEL ── */}
      {showLogPanel && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaEdit style={{ color: emerald }} /> Log Today's Vitals
          </h3>
          <form onSubmit={handleLogVitals}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              {[
                { label: 'Steps', key: 'steps', placeholder: 'e.g. 8500', type: 'number' },
                { label: 'Water (L)', key: 'water', placeholder: 'e.g. 2.5', type: 'number' },
                { label: 'Sleep (hrs)', key: 'sleep', placeholder: 'e.g. 7.5', type: 'number' },
                { label: 'Heart Rate (bpm)', key: 'heartRate', placeholder: 'e.g. 70', type: 'number' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={logForm[f.key]} onChange={e => setLogForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ padding: '10px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.88rem' }}>Save Vitals</button>
              <button type="button" onClick={() => setShowLogPanel(false)} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* ── BIOMETRIC METRIC CARDS ── */}
      <h3 style={sectionTitle}><FaChartLine style={{ color: emerald }} /> Today's Metrics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {metrics.map(m => {
          const pct = Math.min(100, Math.round((m.value / m.target) * 100));
          const aboveTarget = m.value >= m.target;
          const IconComp = getIconForMetric(m.label);
          const isHovered = hoveredCard === m.id;
          return (
            <div key={m.id} 
              style={{ 
                background: 'white', 
                borderRadius: '16px', 
                padding: '20px', 
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: isHovered ? m.color : '#e2e8f0', 
                boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.08)' : '0 4px 16px rgba(0,0,0,0.04)', 
                transform: isHovered ? 'translateY(-4px)' : 'none',
                transition: 'all 0.22s' 
              }}
              onMouseEnter={() => setHoveredCard(m.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: m.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComp style={{ color: m.color, fontSize: '1.1rem' }} />
                </div>
                {aboveTarget
                  ? <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '20px', fontWeight: '800' }}>✓ Goal Met</span>
                  : <span style={{ fontSize: '0.65rem', background: '#fffbeb', color: '#f59e0b', padding: '2px 8px', borderRadius: '20px', fontWeight: '800' }}>{pct}%</span>
                }
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
                {m.value}<span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '3px', fontWeight: '600' }}>{m.unit}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '10px' }}>{m.label} · Target: {m.target}{m.unit}</div>
              <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: aboveTarget ? '#22c55e' : m.color, borderRadius: '99px', transition: 'width 0.8s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>

        {/* UPCOMING APPOINTMENTS */}
        <div style={whiteCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={cardTitle}><FaCalendarCheck style={{ color: emerald }} /> Upcoming Appointments</h3>
            <Link to="/appointments" style={{ fontSize: '0.75rem', color: emerald, fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <FaArrowRight size={9} /></Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {UPCOMING_APPOINTMENTS.map(appt => (
              <div key={appt.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.background = emeraldLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#f8fafc'; }}>
                <img src={appt.avatar} alt={appt.doctor} style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.doctor}</div>
                  <div style={{ fontSize: '0.72rem', color: emerald, fontWeight: '700' }}>{appt.specialty}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#1e293b' }}>{appt.date}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{appt.time}</div>
                  <span style={{ fontSize: '0.58rem', fontWeight: '700', background: appt.type === 'Video' ? '#eff6ff' : '#ecfdf5', color: appt.type === 'Video' ? '#3b82f6' : '#059669', padding: '1px 6px', borderRadius: '20px' }}>{appt.type}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/book-appointment" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', padding: '10px', background: emeraldLight, color: emerald, borderRadius: '10px', fontWeight: '700', fontSize: '0.82rem', textDecoration: 'none', border: `1px solid #a7f3d0`, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = emerald; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }}>
            <FaPlus size={11} /> Book New Appointment
          </Link>
        </div>

        {/* MEDICATIONS TODAY */}
        <div style={whiteCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={cardTitle}><FaPills style={{ color: '#8b5cf6' }} /> Medications Today</h3>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>{meds.filter(m => m.taken).length}/{meds.length} taken</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {meds.map(med => (
              <div key={med.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: med.taken ? '#f0fdf4' : '#f8fafc', borderRadius: '12px', border: `1px solid ${med.taken ? '#a7f3d0' : '#f1f5f9'}`, transition: 'all 0.2s' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: med.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b', textDecoration: med.taken ? 'line-through' : 'none', opacity: med.taken ? 0.6 : 1 }}>{med.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{med.time}</div>
                </div>
                <button onClick={() => toggleMed(med.id)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${med.taken ? '#22c55e' : '#e2e8f0'}`, background: med.taken ? '#22c55e' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                  {med.taken && <FaCheckCircle size={12} style={{ color: 'white' }} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MOOD + HEALTH TIP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={whiteCard}>
            <h3 style={{ ...cardTitle, marginBottom: '14px' }}><FaSmile style={{ color: '#ec4899' }} /> Today's Mood</h3>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {MOODS.map(m => (
                <button key={m.label} onClick={() => selectMood(m.label)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '14px 18px', border: `2px solid ${mood === m.label ? m.color : '#e2e8f0'}`, borderRadius: '14px', background: mood === m.label ? m.color + '15' : 'white', cursor: 'pointer', transition: 'all 0.2s', flex: 1 }}>
                  <m.icon style={{ color: mood === m.label ? m.color : '#94a3b8', fontSize: '1.5rem' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: mood === m.label ? m.color : '#94a3b8' }}>{m.label}</span>
                </button>
              ))}
            </div>
            {mood && <p style={{ textAlign: 'center', margin: '10px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Mood logged as <strong>{mood}</strong> today.</p>}
          </div>

          <div style={{ ...whiteCard, background: emeraldLight, border: `1px solid #a7f3d0` }}>
            <h3 style={{ ...cardTitle, marginBottom: '10px', color: '#047857' }}><FaLeaf style={{ color: emerald }} /> Daily Health Tip</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.8rem' }}>{HEALTH_TIPS[tipIndex].emoji}</span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#065f46', lineHeight: 1.6, fontWeight: '500' }}>{HEALTH_TIPS[tipIndex].tip}</p>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
              {HEALTH_TIPS.map((_, i) => (
                <button key={i} onClick={() => setTipIndex(i)}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', border: 'none', background: i === tipIndex ? emerald : '#a7f3d0', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ⭐ UPDATED QUICK ACCESS - 8 PREMIUM FEATURES ⭐                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <h3 style={sectionTitle}><FaBolt style={{ color: '#f59e0b' }} /> Quick Access</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {QUICK_LINKS.map((ql, i) => (
          <Link key={i} to={ql.path} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '18px 16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = ql.color; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)'; }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: ql.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ql.icon style={{ color: ql.color, fontSize: '1.2rem' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1e293b' }}>{ql.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>{ql.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── ACHIEVEMENTS ── */}
      <h3 style={sectionTitle}><FaTrophy style={{ color: '#f59e0b' }} /> Achievements</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {[
          { icon: FaFire,   label: '7-Day Streak',         unlocked: streak >= 7,                              color: '#f97316' },
          { icon: FaMedal,  label: '10K Steps Champion',    unlocked: metrics[0]?.value >= 10000,                color: '#eab308' },
          { icon: FaAward,  label: 'Perfect Hydration',     unlocked: metrics[1]?.value >= metrics[1]?.target,    color: '#3b82f6' },
          { icon: FaTrophy, label: 'Sleep Master',          unlocked: metrics[2]?.value >= metrics[2]?.target,    color: '#8b5cf6' },
          { icon: FaGem,    label: 'Cardiac Stability',     unlocked: metrics[3]?.value <= 75,                   color: '#ef4444' },
          { icon: FaCrown,  label: 'All Goals Complete',    unlocked: goalsMet === metrics.length,              color: '#f59e0b' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', background: a.unlocked ? a.color + '10' : '#f8fafc', borderRadius: '14px', border: `1px solid ${a.unlocked ? a.color + '40' : '#f1f5f9'}`, transition: 'all 0.22s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: a.unlocked ? a.color + '20' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <a.icon style={{ color: a.unlocked ? a.color : '#cbd5e1', fontSize: '1.1rem' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: a.unlocked ? '#1e293b' : '#94a3b8' }}>{a.label}</div>
              <div style={{ fontSize: '0.65rem', color: a.unlocked ? a.color : '#cbd5e1', fontWeight: '700', marginTop: '2px' }}>{a.unlocked ? '✓ Unlocked' : '🔒 Locked'}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
  );
}

const whiteCard = {
  background: 'white', borderRadius: '20px', padding: '20px',
  border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
};

const sectionTitle = {
  fontSize: '1rem', fontWeight: '800', color: '#1e293b',
  marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'
};

const cardTitle = {
  margin: 0, fontSize: '0.9rem', fontWeight: '800', color: '#1e293b',
  display: 'flex', alignItems: 'center', gap: '8px'
};
