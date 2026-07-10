import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeartbeat, FaWalking, FaTint, FaBed, FaWeight, FaBolt,
  FaFire, FaLungs, FaBrain, FaCalendarCheck, FaChartLine,
  FaClock, FaStar, FaMedal, FaTrophy, FaAward,
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle,
  FaUserMd, FaPills, FaBook, FaVideo,
  FaTools, FaCalendarAlt, FaBell
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ⭐ FORCE VERSION - COMPLETE REWRITE
  const VERSION = 'v4.0-FINAL';

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const mockData = {
        stats: {
          totalSteps: 45230,
          avgWaterIntake: 6.2,
          avgSleepHours: 7.4,
          avgHeartRate: 72,
          avgGlucose: 94,
          totalRecords: 24,
          latestWeight: 68.6,
          latestBMI: 23.6,
          latestMood: 'happy',
          currentStreak: 12,
          weeklyGoalProgress: 85
        },
        quickStats: {
          stepsToday: 8423,
          waterToday: 6,
          sleepToday: 7.5,
          heartRateToday: 72,
          glucoseToday: 95,
          meditationToday: 15,
          weightToday: 68.6,
          oxygenToday: 97
        },
        weeklyTrends: [
          { date: '2026-06-21', steps: 4200, water: 5, sleep: 6.5, heartRate: 70, weight: 69.2, glucose: 96, mood: 'happy' },
          { date: '2026-06-22', steps: 3800, water: 6, sleep: 7.0, heartRate: 71, weight: 69.0, glucose: 94, mood: 'neutral' },
          { date: '2026-06-23', steps: 5100, water: 4, sleep: 7.5, heartRate: 72, weight: 68.8, glucose: 95, mood: 'happy' },
          { date: '2026-06-24', steps: 4600, water: 7, sleep: 8.0, heartRate: 70, weight: 68.5, glucose: 93, mood: 'energetic' },
          { date: '2026-06-25', steps: 3500, water: 6, sleep: 7.0, heartRate: 72, weight: 68.3, glucose: 96, mood: 'neutral' },
          { date: '2026-06-26', steps: 4900, water: 5, sleep: 6.5, heartRate: 73, weight: 68.1, glucose: 97, mood: 'sad' },
          { date: '2026-06-27', steps: 8423, water: 6, sleep: 7.5, heartRate: 72, weight: 68.6, glucose: 95, mood: 'happy' }
        ],
        insights: [
          { title: '🌟 Excellent Progress!', description: 'Your health metrics are improving steadily. Keep it up!', type: 'success' },
          { title: '💧 Hydration Reminder', description: 'You\'re drinking 6.2 cups daily. Aim for 8 cups.', type: 'warning' },
          { title: '😴 Sleep Alert', description: 'You\'re averaging 7.4 hours. Keep it up!', type: 'info' }
        ],
        achievements: [
          { title: '🔥 7-Day Streak', description: 'Logged health data for 7 days straight', unlocked: true },
          { title: '👣 Step Master', description: 'Reached 10,000 steps in a day', unlocked: true },
          { title: '💧 Hydration Hero', description: 'Drank 8 cups of water in a day', unlocked: false },
          { title: '😴 Sleep Master', description: 'Maintained 8+ hours sleep for 5 days', unlocked: true },
          { title: '❤️ Cardiac Stability', description: 'Consistent heart rate under 75 bpm for 30 days', unlocked: true }
        ],
        lastUpdated: new Date().toISOString()
      };
      setDashboardData(mockData);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    { icon: FaWalking, label: 'Steps', value: dashboardData?.quickStats?.stepsToday || 0, color: '#059669', bg: '#ecfdf5', target: '10,000' },
    { icon: FaTint, label: 'Water', value: dashboardData?.quickStats?.waterToday || 0, color: '#06b6d4', bg: '#ecfeff', unit: ' cups', target: '8 cups' },
    { icon: FaBed, label: 'Sleep', value: dashboardData?.quickStats?.sleepToday || 0, color: '#8b5cf6', bg: '#f3e8ff', unit: ' hrs', target: '8 hrs' },
    { icon: FaHeartbeat, label: 'Heart Rate', value: dashboardData?.quickStats?.heartRateToday || 0, color: '#ef4444', bg: '#fef2f2', unit: ' bpm', target: '72 bpm' },
    { icon: FaBolt, label: 'Glucose', value: dashboardData?.quickStats?.glucoseToday || 0, color: '#3b82f6', bg: '#eff6ff', unit: ' mg/dL', target: '100 mg/dL' },
    { icon: FaWeight, label: 'Weight', value: dashboardData?.quickStats?.weightToday || 0, color: '#f59e0b', bg: '#fffbeb', unit: ' kg', target: '68.6 kg' },
    { icon: FaLungs, label: 'O₂ Sat', value: dashboardData?.quickStats?.oxygenToday || 0, color: '#14b8a6', bg: '#f0fdfa', unit: ' %', target: '98%' },
  ];

  // ⭐⭐⭐ HARDCODED FEATURES - CANNOT BE CACHED ⭐⭐⭐
  const features = [
    { icon: FaCalendarCheck, label: 'Book Appointment', path: '/book-appointment', color: '#059669', desc: 'Schedule a visit' },
    { icon: FaVideo, label: 'Telehealth Call', path: '/doctors', color: '#8b5cf6', desc: 'Connect instantly' },
    { icon: FaUserMd, label: 'Find Doctors', path: '/doctors', color: '#06b6d4', desc: 'Find a specialist' },
    { icon: FaPills, label: 'Services', path: '/services', color: '#f59e0b', desc: 'Explore services' },
    { icon: FaTools, label: 'Health Tools', path: '/more?tab=tools', color: '#ef4444', desc: '52+ tools' },
    { icon: FaCalendarAlt, label: 'Calendar', path: '/more?tab=calendar', color: '#8b5cf6', desc: 'Schedule & events' },
    { icon: FaBell, label: 'Notifications', path: '/more?tab=notifications', color: '#3b82f6', desc: 'Stay informed' },
    { icon: FaBook, label: 'Blog', path: '/blog', color: '#059669', desc: 'Health articles' },
  ];

  const stepsChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: dashboardData?.weeklyTrends?.map(d => d.steps) || [],
        borderColor: '#059669',
        backgroundColor: 'rgba(5,150,105,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#059669',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      }
    ]
  };

  const stepsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' }
      }
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fc' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚠️</div>
          <h3 style={{ color: '#dc2626' }}>Error loading dashboard</h3>
          <p style={{ color: '#6b7280' }}>{error}</p>
          <button onClick={fetchDashboardData} style={{ marginTop: '16px', padding: '10px 24px', background: emeraldGradient, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f7fc', paddingBottom: '40px' }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-card {
          animation: fadeInUp 0.5s ease forwards;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* Header */}
      <div style={{ background: emeraldGradient, padding: '40px 20px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', fontSize: '200px', opacity: 0.05 }}>📊</div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                Health Dashboard
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontWeight: '400' }}>
                  {dashboardData?.stats?.currentStreak || 0} Day Streak ��
                </span>
              </h1>
              <p style={{ opacity: 0.9, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaClock style={{ fontSize: '0.8rem' }} />
                Last updated: {new Date(dashboardData?.lastUpdated || Date.now()).toLocaleString()}
              </p>
            </div>
            <button onClick={() => navigate('/health-tracker')} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>➕ Log Data</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {quickStats.map((stat, idx) => (
            <div key={idx} className="dashboard-card card-hover" style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', textAlign: 'center', transition: 'all 0.3s' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: stat.color }}>
                <stat.icon style={{ fontSize: '1rem' }} />
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1f2937' }}>
                {stat.value}{stat.unit}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{stat.label}</div>
              <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '4px' }}>🎯 {stat.target}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaChartLine style={{ color: emerald }} /> Weekly Steps
            </h3>
            <div style={{ height: '200px' }}>
              <Line data={stepsChartData} options={stepsChartOptions} />
            </div>
          </div>
        </div>

        {/* Insights & Achievements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaInfoCircle style={{ color: emerald }} /> Health Insights
            </h3>
            {dashboardData?.insights?.map((insight, idx) => (
              <div key={idx} style={{ marginBottom: '12px', padding: '12px', background: insight.type === 'success' ? '#f0fdf4' : insight.type === 'warning' ? '#fffbeb' : '#eff6ff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.85rem' }}>{insight.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{insight.description}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTrophy style={{ color: emerald }} /> Achievements
            </h3>
            {dashboardData?.achievements?.map((ach, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', marginBottom: '8px', background: ach.unlocked ? emeraldLight : '#f3f4f6', borderRadius: '10px', border: ach.unlocked ? `1px solid ${emerald}` : '1px solid #e5e7eb', opacity: ach.unlocked ? 1 : 0.6 }}>
                <div style={{ fontSize: '1.2rem' }}>{ach.title.split(' ')[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.85rem' }}>{ach.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{ach.description}</div>
                </div>
                {ach.unlocked && <FaCheckCircle style={{ color: emerald }} />}
              </div>
            ))}
          </div>
        </div>

        {/* ⭐⭐⭐ FINAL QUICK ACCESS - HARDCODED WITH VERSION ⭐⭐⭐ */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTools style={{ color: emerald }} /> Quick Access
            </h3>
            <span style={{ 
              fontSize: '0.55rem', 
              color: 'white', 
              background: emerald, 
              padding: '2px 10px', 
              borderRadius: '12px',
              fontWeight: '700'
            }}>
              {VERSION}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {features.map((feature, idx) => (
              <div 
                key={`${idx}-${VERSION}`} 
                onClick={() => navigate(feature.path)} 
                className="card-hover" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '14px 18px', 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s' 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  background: `${feature.color}15`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: feature.color, 
                  flexShrink: 0 
                }}>
                  <feature.icon style={{ fontSize: '1.1rem' }} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.85rem' }}>{feature.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </div>
  );
};

export default Dashboard;
