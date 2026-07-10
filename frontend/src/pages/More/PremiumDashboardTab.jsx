import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaRocket, FaHeartbeat, FaRunning, FaTint, FaMoon, 
  FaWeight, FaFire, FaCalendarCheck, FaPills, FaTrophy, FaMedal, 
  FaStar, FaBolt, FaChartLine, FaUsers, FaBrain, FaSmile, FaEye, 
  FaDumbbell, FaUserMd, FaTools, FaArrowRight, FaSync, FaHospital,
  FaAmbulance, FaClinicMedical, FaStethoscope, FaLungs, FaAppleAlt,
  FaBed, FaClock, FaCalendarAlt, FaPhone, FaEnvelope, FaGlobe,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin,
  FaHome, FaBook, FaBell, FaVideo
} from 'react-icons/fa';

const API_BASE = 'http://localhost:8080/api/premium/dashboard';

const getFallbackData = () => ({
  healthScore: 84,
  pointsTotal: 650,
  activeStreak: 7,
  badgesEarned: 12,
  challengesActive: 4,
  appointmentsUpcoming: 3,
  stepsToday: 8432,
  waterToday: 2100,
  sleepToday: 7.2,
  caloriesBurned: 2450,
  moodToday: 8,
  stressToday: 3,
  energyToday: 7,
  focusScore: 8,
  happinessScore: 9,
  productivityScore: 7,
  socialScore: 8,
  meditationMinutes: 15,
  oxygenSaturation: 98,
  bloodGlucose: 95,
  cholesterol: 175,
  bmi: 23.5,
  heartRate: 72,
  weight: 72.5,
  standingHours: 6,
  activeMinutes: 45,
  protein: 85,
  carbs: 220,
  fat: 55,
  fiber: 28,
  sugar: 30,
  sodium: 1800,
  vitaminD: 45,
  vitaminC: 90,
  calcium: 850,
  iron: 12,
  magnesium: 350,
  potassium: 2800,
  zinc: 10,
  omega3: 1200,
  coq10: 150,
  folate: 400,
  b12: 2.4,
  sleepQuality: 8,
  remSleep: 1.8,
  deepSleep: 2.1,
  lightSleep: 3.3,
  wakeCount: 2,
  bedTime: '22:30',
  wakeTime: '06:30',
  bodyFat: 18.5,
  muscleMass: 35.2,
  boneDensity: 1.2,
  metabolism: 1850,
  hydration: 65,
  flexibility: 75,
  endurance: 80,
  strength: 85,
  balance: 70,
  agility: 75,
  reactionTime: 0.25,
  vo2max: 42,
  restingHeartRate: 68,
  maxHeartRate: 185,
  recoveryHeartRate: 120,
  respiratoryRate: 14,
  temperature: 36.8,
  bloodPressure: '118/76',
  cholesterolHDL: 55,
  cholesterolLDL: 100,
  triglycerides: 130,
  homocysteine: 8,
  hsCRP: 0.5,
  ferritin: 120
});

export default function PremiumDashboardTab() {
  const [data, setData] = useState(() => getFallbackData());
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const emerald = '#059669';
  const emeraldDark = '#047857';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const fetchDashboard = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    try {
      const res = await fetch(`${API_BASE}/summary/1`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    }
  };


  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
        <div style={{ width: '44px', height: '44px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontWeight: '600' }}>Loading Premium Dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const d = data || getFallbackData();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", maxWidth: '1200px', margin: '0 auto', padding: '20px 0' }}>
      
      {/* ── BACK BUTTON ── */}
      <Link to="/more?tab=tools" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        marginBottom: '20px', color: emerald, fontWeight: '600',
        textDecoration: 'none', fontSize: '0.9rem'
      }}>
        <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Back to Dashboard
      </Link>

      {/* ── HERO HEADER - EMERALD GREEN ── */}
      <div style={{
        background: `linear-gradient(135deg, ${emerald} 0%, ${emeraldDark} 50%, #065f46 100%)`,
        borderRadius: '16px', padding: '32px 36px', marginBottom: '32px',
        position: 'relative', overflow: 'hidden', color: 'white'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FaRocket style={{ fontSize: '2rem' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                Premium Dashboard
              </h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                100+ Health Metrics • Track • Analyze • Achieve
              </p>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Health Score', value: d.healthScore + '%', icon: FaHeartbeat, color: '#ef4444' },
              { label: 'Points', value: d.pointsTotal, icon: FaStar, color: '#f59e0b' },
              { label: 'Streak', value: d.activeStreak + 'd', icon: FaFire, color: '#f97316' },
              { label: 'Badges', value: d.badgesEarned, icon: FaMedal, color: '#8b5cf6' },
              { label: 'Challenges', value: d.challengesActive, icon: FaTrophy, color: '#eab308' },
              { label: 'Appointments', value: d.appointmentsUpcoming, icon: FaCalendarCheck, color: '#3b82f6' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                padding: '12px 16px', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <stat.icon style={{ color: stat.color, fontSize: '1rem' }} />
                  <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK LINKS WITH 100+ DATA ── */}
      <h3 style={sectionTitle}><FaBolt style={{ color: '#f59e0b' }} /> Quick Access</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
        {[
          { label: 'Home', icon: FaHome, path: '/', color: '#059669', desc: 'Go to main home' },
          { label: 'Doctors', icon: FaUserMd, path: '/doctors', color: '#3b82f6', desc: 'Find specialists' },
          { label: 'Health Tracker', icon: FaHeartbeat, path: '/health-tracker', color: '#ef4444', desc: 'Log & track vitals' },
          { label: 'Services', icon: FaPills, path: '/services', color: '#8b5cf6', desc: 'Browse services' },
          { label: 'Dosage Guide', icon: FaBook, path: '/dosage-guide', color: '#ec4899', desc: 'Safety instructions' },
          { label: 'Dashboard', icon: FaChartLine, path: '/more', color: '#f59e0b', desc: 'Premium stats' },
          { label: 'Calendar', icon: FaCalendarAlt, path: '/more?tab=calendar', color: '#10b981', desc: 'View appointments' },
          { label: 'Notifications', icon: FaBell, path: '/more?tab=notifications', color: '#eab308', desc: 'Alerts & updates' },
          { label: 'Health Tools', icon: FaTools, path: '/more?tab=tools', color: '#14b8a6', desc: 'Calculator tools' },
          { label: 'Telehealth', icon: FaVideo, path: '/telehealth', color: '#3b82f6', desc: 'Online consults' },
          { label: 'Blog', icon: FaBook, path: '/blog', color: '#f97316', desc: 'Health articles' },
        ].map((link, i) => (
          <Link key={i} to={link.path} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: '12px', padding: '14px',
              border: '1px solid #e2e8f0', textAlign: 'center',
              transition: 'all 0.22s', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = link.color; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: link.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <link.icon style={{ color: link.color, fontSize: '1rem' }} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#1e293b' }}>{link.label}</div>
              <div style={{ fontSize: '0.55rem', color: '#94a3b8', marginTop: '2px' }}>{link.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── BADGES SECTION ── */}
      <h3 style={sectionTitle}><FaMedal style={{ color: '#f59e0b' }} /> Badges Earned ({d.badgesEarned})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '32px' }}>
        {[
          { name: 'First Steps', icon: '🚶' },
          { name: '10K Steps', icon: '🏃' },
          { name: 'Hydration Hero', icon: '💧' },
          { name: 'Sleep Champion', icon: '😴' },
          { name: 'Fitness Warrior', icon: '💪' },
          { name: 'Healthy Eater', icon: '🥗' },
          { name: 'Stress Buster', icon: '😌' },
          { name: 'Challenge Champ', icon: '🏆' },
          { name: 'Meditation Master', icon: '🧘' },
          { name: 'Cardio King', icon: '🏃' },
          { name: 'Protein Pro', icon: '🥩' },
          { name: 'Wellness Legend', icon: '🌟' },
          { name: 'Yoga Expert', icon: '🧘' },
          { name: 'Running Star', icon: '🏃' },
          { name: 'Strength Hero', icon: '💪' },
          { name: 'Mindfulness Guru', icon: '🧠' },
          { name: 'Community Leader', icon: '👥' },
          { name: 'Health Champion', icon: '🏆' },
        ].map((badge, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '10px', padding: '12px',
            border: '1px solid #e2e8f0', textAlign: 'center',
            transition: 'all 0.22s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '2px' }}>{badge.icon}</div>
            <div style={{ fontSize: '0.6rem', fontWeight: '700', color: '#1e293b' }}>{badge.name}</div>
            <span style={{ fontSize: '0.5rem', background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '20px', fontWeight: '700', display: 'inline-block', marginTop: '2px' }}>✓</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      </div>
  );
}

const sectionTitle = {
  fontSize: '1rem', fontWeight: '800', color: '#1e293b',
  marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px'
};
