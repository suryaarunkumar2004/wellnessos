import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaChartLine, FaHeartbeat, FaRunning, FaWeight, FaBed, FaAppleAlt, FaTint, FaFire, FaDownload, FaPrint, FaShare, FaTrash, FaHistory } from 'react-icons/fa';

export default function HealthStatsDashboard() {
  const [stats, setStats] = useState({
    steps: 0,
    heartRate: 0,
    weight: 0,
    sleep: 0,
    calories: 0,
    water: 0,
    activeMinutes: 0,
    standingHours: 0,
    mood: 0,
    energy: 0
  });
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    generateStats();
    const saved = localStorage.getItem('healthstats_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('healthstats_history', JSON.stringify(history));
  }, [history]);

  const generateStats = () => {
    setStats({
      steps: Math.floor(Math.random() * 5000) + 5000,
      heartRate: Math.floor(Math.random() * 30) + 60,
      weight: (Math.random() * 20 + 60).toFixed(1),
      sleep: (Math.random() * 3 + 6).toFixed(1),
      calories: Math.floor(Math.random() * 1000) + 1500,
      water: Math.floor(Math.random() * 1500) + 1500,
      activeMinutes: Math.floor(Math.random() * 60) + 30,
      standingHours: Math.floor(Math.random() * 8) + 4,
      mood: Math.floor(Math.random() * 4) + 7,
      energy: Math.floor(Math.random() * 4) + 6
    });
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshStats = () => {
    generateStats();
    const historyEntry = { stats: { ...stats }, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('healthstats_history', JSON.stringify(history));
    showToast('📊 Stats refreshed!', 'success');
  };

  const getMoodEmoji = (mood) => {
    if (mood >= 9) return '😍';
    if (mood >= 7) return '😊';
    if (mood >= 5) return '😐';
    if (mood >= 3) return '😞';
    return '😢';
  };

  const getEnergyEmoji = (energy) => {
    if (energy >= 9) return '⚡⚡⚡';
    if (energy >= 7) return '⚡⚡';
    if (energy >= 5) return '⚡';
    return '😴';
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
                  <FaChartLine style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Stats Dashboard</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Your daily health metrics at a glance</p>
                </div>
              </div>
            </div>
          </div>

          {toastMessage && (
            <div style={{ position: 'fixed', top: '100px', right: '24px', zIndex: 9999, padding: '14px 24px', borderRadius: '12px', background: toastMessage.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1px solid ${toastMessage.type === 'error' ? '#fecaca' : '#a7f3d0'}`, color: toastMessage.type === 'error' ? '#dc2626' : '#059669', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {toastMessage.message}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: `${emerald}15`, padding: '12px', borderRadius: '12px' }}>
                    <FaRunning style={{ color: emerald, fontSize: '1.5rem' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Daily Steps</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.steps.toLocaleString()}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Goal: 10,000</span>
              </div>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', marginTop: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (stats.steps / 10000) * 100)}%`, background: `linear-gradient(90deg, ${emerald}, #047857)`, borderRadius: '99px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '12px' }}>
                  <FaHeartbeat style={{ color: '#ef4444', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Heart Rate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.heartRate} bpm</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '12px' }}>
                  <FaWeight style={{ color: '#d97706', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Weight</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.weight} kg</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px' }}>
                  <FaBed style={{ color: '#059669', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Sleep</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.sleep} hrs</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '12px' }}>
                  <FaAppleAlt style={{ color: '#ef4444', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Calories</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.calories} kcal</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px' }}>
                  <FaTint style={{ color: '#3b82f6', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Water</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.water} ml</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#f5f3ff', padding: '12px', borderRadius: '12px' }}>
                  <FaFire style={{ color: '#8b5cf6', fontSize: '1.5rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Active Minutes</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.activeMinutes} min</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#fce7f3', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{getMoodEmoji(stats.mood)}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Mood</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.mood}/10</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#dbeafe', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{getEnergyEmoji(stats.energy)}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Energy Level</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{stats.energy}/10</div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={refreshStats} style={{ marginTop: '24px', padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Refresh Stats</button>
        </div>
      </div>
      <Footer />
      </>
  );
}
