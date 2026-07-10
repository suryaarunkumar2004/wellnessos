import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import { FaDumbbell, FaRunning, FaHeartbeat, FaFire, FaClock, FaCalendarAlt, FaCheckCircle, FaStar, FaTrophy, FaMedal, FaGem, FaBolt, FaArrowRight, FaPlay, FaPause, FaPlus, FaSearch, FaFilter, FaSpinner, FaChartLine, FaUserPlus, FaShare, FaDownload, FaPrint, FaBell, FaUsers, FaCrown, FaAward, FaAppleAlt, FaBed, FaMoon, FaBrain, FaSmile } from 'react-icons/fa';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const emerald = '#059669';

  useEffect(() => {
    setWorkouts([
      { id: 1, name: 'Strength Training', category: 'Strength', duration: 45, calories: 400, difficulty: 'Intermediate', exercises: 8, progress: 75 },
      { id: 2, name: 'Cardio Blast', category: 'Cardio', duration: 30, calories: 350, difficulty: 'Beginner', exercises: 6, progress: 90 },
      { id: 3, name: 'Yoga Flow', category: 'Yoga', duration: 40, calories: 250, difficulty: 'Beginner', exercises: 12, progress: 45 },
      { id: 4, name: 'HIIT Warrior', category: 'HIIT', duration: 25, calories: 450, difficulty: 'Advanced', exercises: 10, progress: 30 },
      { id: 5, name: 'Pilates Core', category: 'Pilates', duration: 35, calories: 280, difficulty: 'Intermediate', exercises: 9, progress: 60 },
    ]);
  }, []);

  const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates'];
  const filteredWorkouts = workouts.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'All' || w.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white' }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaDumbbell style={{ fontSize: '2rem' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Workouts</h2>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>200+ Premium Features • Track fitness • Achieve goals</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Total Workouts', value: workouts.length, icon: FaDumbbell },
                  { label: 'This Week', value: '5', icon: FaCalendarAlt },
                  { label: 'Calories Burned', value: '2,450', icon: FaFire },
                  { label: 'Streak', value: '7d', icon: FaBolt },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <s.icon style={{ fontSize: '1rem', opacity: 0.8 }} />
                      <div><div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div><div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <FaSearch style={{ color: '#94a3b8' }} />
              <input type="text" placeholder="Search workouts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '12px 0', width: '100%', fontSize: '0.9rem', background: 'transparent' }} />
            </div>
            <CustomDropdown
              options={categories}
              value={filterCategory}
              onChange={setFilterCategory}
              placeholder="Filter Category"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 360px))',
            gap: '16px',
            justifyContent: 'center'
          }}>
            {filteredWorkouts.map(workout => (
              <div key={workout.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', transition: 'all 0.22s', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{workout.name}</div>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', background: '#f1f5f9', color: '#475569', padding: '2px 10px', borderRadius: '20px' }}>{workout.category}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', background: '#fef3c7', color: '#d97706', padding: '2px 10px', borderRadius: '20px', marginLeft: '6px' }}>{workout.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: emerald }}>{workout.progress}%</div>
                </div>
                <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div><div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Duration</div><div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{workout.duration}m</div></div>
                  <div><div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Calories</div><div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{workout.calories}</div></div>
                  <div><div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Exercises</div><div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{workout.exercises}</div></div>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${workout.progress}%`, background: 'linear-gradient(90deg, #059669, #047857)', borderRadius: '99px', transition: 'width 0.8s ease' }} />
                </div>
                <button style={{ marginTop: '14px', width: '100%', padding: '10px', background: emerald, color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}><FaPlay size={12} /> Start Workout</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}><FaBolt style={{ color: '#f59e0b', marginRight: '8px' }} />200+ Premium Fitness Features</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
              {[
                { label: 'Personal Trainer', icon: FaUserPlus, color: '#059669' },
                { label: 'Progress Tracking', icon: FaChartLine, color: '#3b82f6' },
                { label: 'Video Library', icon: FaPlay, color: '#8b5cf6' },
                { label: 'Nutrition Guide', icon: FaAppleAlt, color: '#22c55e' },
                { label: 'Recovery Tips', icon: FaHeartbeat, color: '#ef4444' },
                { label: 'Community', icon: FaUsers, color: '#ec4899' },
                { label: 'Achievements', icon: FaTrophy, color: '#f59e0b' },
                { label: 'Export Data', icon: FaDownload, color: '#10b981' },
                { label: 'Share Progress', icon: FaShare, color: '#f97316' },
                { label: 'Badges', icon: FaMedal, color: '#eab308' },
              ].map((f, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = f.color; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  onClick={() => window.location.href = '/workouts'}>
                  <f.icon style={{ color: f.color, fontSize: '0.9rem' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#1e293b' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
