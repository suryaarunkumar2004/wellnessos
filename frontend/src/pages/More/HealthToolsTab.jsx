import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaWeight, FaHeartbeat, FaBrain, FaArrowRight, FaStethoscope,
  FaSyringe, FaShieldAlt, FaCalculator, FaRuler, FaHeart, FaLungs,
  FaAppleAlt, FaDumbbell, FaRunning, FaBed, FaThermometerHalf,
  FaTint, FaMoon, FaSmile, FaFrown, FaMeh, FaFire, FaGem,
  FaShare, FaDownload, FaSpinner, FaSearch, FaFilter,
  FaCheckCircle, FaPlus, FaMinus, FaStar, FaAward,
  FaFlask, FaPills, FaBook, FaBookOpen, FaUsers, FaTrophy,
  FaLeaf, FaComment, FaEye, FaVolumeUp, FaGlobe, FaLock,
  FaClipboardList, FaChartLine, FaBolt, FaTools, FaHistory,
  FaHospital, FaWheelchair, FaAllergies, FaVial, FaDna
} from 'react-icons/fa';

const TOOLS = [
  { id: 1, icon: FaWeight, label: 'BMI Calculator', desc: 'Calculate your Body Mass Index', category: 'Calculators', color: '#059669', popular: true, path: '/health-tools/bmi' },
  { id: 2, icon: FaHeart, label: 'BMR Calculator', desc: 'Basal Metabolic Rate calculator', category: 'Calculators', color: '#3b82f6', popular: true, path: '/health-tools/bmr' },
  { id: 3, icon: FaRuler, label: 'Body Fat Calculator', desc: 'Estimate body fat percentage', category: 'Calculators', color: '#8b5cf6', path: '/health-tools/body-fat' },
  { id: 4, icon: FaStar, label: 'Ideal Weight Calculator', desc: 'Find your optimal weight', category: 'Calculators', color: '#f59e0b', path: '/health-tools/ideal-weight' },
  { id: 5, icon: FaFire, label: 'Calorie Calculator', desc: 'Daily calorie needs calculator', category: 'Calculators', color: '#ef4444', popular: true, path: '/health-tools/calorie' },
  { id: 6, icon: FaAppleAlt, label: 'Macro Calculator', desc: 'Carbs, proteins & fats', category: 'Calculators', color: '#22c55e', path: '/health-tools/macro' },
  { id: 7, icon: FaTint, label: 'Water Intake Calculator', desc: 'Daily hydration needs', category: 'Calculators', color: '#0ea5e9', popular: true, path: '/health-tools/water' },
  { id: 8, icon: FaMoon, label: 'Sleep Calculator', desc: 'Optimal sleep duration', category: 'Calculators', color: '#6366f1', path: '/health-tools/sleep' },
  { id: 9, icon: FaBrain, label: 'Stress Level Checker', desc: 'Perceived stress assessment', category: 'Calculators', color: '#ec4899', path: '/health-tools/stress' },
  { id: 10, icon: FaRunning, label: 'Fitness Age Calculator', desc: 'Biological fitness age', category: 'Calculators', color: '#f97316', path: '/health-tools/fitness-age' },
  { id: 11, icon: FaRunning, label: 'Step Tracker', desc: 'Track daily steps', category: 'Trackers', color: '#059669', popular: true, path: '/health-tools/steps' },
  { id: 12, icon: FaHeartbeat, label: 'Heart Rate Monitor', desc: 'Log heart rate data', category: 'Trackers', color: '#ef4444', popular: true, path: '/health-tools/heart-rate' },
  { id: 13, icon: FaThermometerHalf, label: 'Blood Pressure Log', desc: 'Track blood pressure', category: 'Trackers', color: '#dc2626', path: '/health-tools/blood-pressure' },
  { id: 14, icon: FaTint, label: 'Blood Sugar Log', desc: 'Monitor glucose levels', category: 'Trackers', color: '#f59e0b', path: '/health-tools/blood-sugar' },
  { id: 15, icon: FaWeight, label: 'Weight Tracker', desc: 'Weight management log', category: 'Trackers', color: '#8b5cf6', path: '/health-tools/weight' },
  { id: 16, icon: FaMoon, label: 'Sleep Quality Tracker', desc: 'Sleep quality monitoring', category: 'Trackers', color: '#3b82f6', path: '/health-tools/sleep-quality' },
  { id: 17, icon: FaSmile, label: 'Mood Tracker', desc: 'Emotional wellness journal', category: 'Trackers', color: '#ec4899', path: '/health-tools/mood' },
  { id: 18, icon: FaLungs, label: 'SpO2 & Oxygen Tracker', desc: 'Blood oxygen monitoring', category: 'Trackers', color: '#06b6d4', path: '/health-tools/spo2' },
  { id: 19, icon: FaStethoscope, label: 'Symptom Checker', desc: 'AI-powered symptom triage', category: 'Medical', color: '#059669', popular: true, path: '/health-tools/symptom-checker' },
  { id: 20, icon: FaPills, label: 'Drug Interaction Checker', desc: 'Check medication interactions', category: 'Medical', color: '#8b5cf6', popular: true, path: '/health-tools/drug-interaction' },
  { id: 21, icon: FaCalculator, label: 'Drug Dosage Calculator', desc: 'Weight-based dosage guide', category: 'Medical', color: '#f59e0b', path: '/health-tools/drug-dosage' },
  { id: 22, icon: FaSyringe, label: 'Vaccine Schedule Planner', desc: 'CDC/WHO immunisation schedule', category: 'Medical', color: '#3b82f6', path: '/health-tools/vaccine-schedule' },
  { id: 23, icon: FaShieldAlt, label: 'Health Risk Assessment', desc: 'Cardiovascular risk scoring', category: 'Medical', color: '#ef4444', path: '/health-tools/health-risk' },
  { id: 24, icon: FaFlask, label: 'Lab Results Interpreter', desc: '120+ biomarker guide', category: 'Medical', color: '#14b8a6', path: '/health-tools/lab-results' },
  { id: 25, icon: FaHospital, label: 'Nearest Hospital Finder', desc: 'Emergency facility locator', category: 'Medical', color: '#dc2626', path: '/health-tools/hospital-finder' },
  { id: 26, icon: FaAllergies, label: 'Allergy Profile Manager', desc: 'Track allergen sensitivities', category: 'Medical', color: '#f97316', path: '/health-tools/allergy-profile' },
  { id: 27, icon: FaDumbbell, label: 'Workout Planner', desc: 'Weekly exercise planner', category: 'Fitness', color: '#059669', path: '/health-tools/workout-planner' },
  { id: 28, icon: FaRunning, label: 'Exercise Database', desc: '300+ exercises guide', category: 'Fitness', color: '#3b82f6', path: '/health-tools/exercise-database' },
  { id: 29, icon: FaHeartbeat, label: 'Fitness Level Test', desc: 'VO2max estimation', category: 'Fitness', color: '#ef4444', path: '/health-tools/fitness-level' },
  { id: 30, icon: FaRunning, label: 'Running Pace Calculator', desc: 'Pace, time & distance', category: 'Fitness', color: '#8b5cf6', path: '/health-tools/running-pace' },
  { id: 31, icon: FaFire, label: 'Calorie Burn Estimator', desc: 'MET-based burn calculator', category: 'Fitness', color: '#f97316', path: '/health-tools/calorie-burn' },
  { id: 32, icon: FaBolt, label: 'HIIT Timer', desc: 'Interval training timer', category: 'Fitness', color: '#eab308', path: '/health-tools/hiit' },
  { id: 33, icon: FaAppleAlt, label: 'Meal Planner', desc: '7-day balanced meal plan', category: 'Nutrition', color: '#059669', path: '/health-tools/meal-planner' },
  { id: 34, icon: FaSearch, label: 'Food Nutrition Search', desc: '10,000+ food database', category: 'Nutrition', color: '#3b82f6', path: '/health-tools/food-nutrition' },
  { id: 35, icon: FaBook, label: 'Food Diary', desc: 'Daily calorie log', category: 'Nutrition', color: '#f59e0b', path: '/health-tools/food-diary' },
  { id: 36, icon: FaLeaf, label: 'Supplement Guide', desc: 'Vitamin & mineral guide', category: 'Nutrition', color: '#22c55e', path: '/health-tools/supplement-guide' },
  { id: 37, icon: FaGlobe, label: 'Glycaemic Index Lookup', desc: 'GI & GL for 400+ foods', category: 'Nutrition', color: '#14b8a6', path: '/health-tools/gi-lookup' },
  { id: 38, icon: FaTint, label: 'Hydration Planner', desc: 'Hourly hydration reminder', category: 'Nutrition', color: '#0ea5e9', path: '/health-tools/hydration-planner' },
  { id: 39, icon: FaBrain, label: 'Stress Relief Exercises', desc: 'CBT relaxation techniques', category: 'Mental Health', color: '#8b5cf6', path: '/health-tools/stress-relief' },
  { id: 40, icon: FaHeart, label: 'Guided Meditation', desc: '5-30 minute sessions', category: 'Mental Health', color: '#6366f1', path: '/health-tools/meditation' },
  { id: 41, icon: FaLungs, label: 'Breathing Exercises', desc: '4-7-8, Box breathing', category: 'Mental Health', color: '#3b82f6', path: '/health-tools/breathing' },
  { id: 42, icon: FaSmile, label: 'Mood Journal', desc: 'PHQ-9 & GAD-7 tracking', category: 'Mental Health', color: '#ec4899', path: '/health-tools/mood-journal' },
  { id: 43, icon: FaMoon, label: 'Sleep Hygiene Guide', desc: 'Sleep optimisation', category: 'Mental Health', color: '#6366f1', path: '/health-tools/sleep-hygiene' },
  { id: 44, icon: FaComment, label: 'Mental Health Screener', desc: 'PHQ-9 and GAD-7 assessment', category: 'Mental Health', color: '#7c3aed', path: '/health-tools/mental-health' },
  { id: 45, icon: FaBook, label: 'Health Articles Library', desc: 'Curated medical literature', category: 'Education', color: '#059669', path: '/health-tools/articles' },
  { id: 46, icon: FaBookOpen, label: 'Medical Dictionary', desc: '5,000+ clinical terms', category: 'Education', color: '#3b82f6', path: '/health-tools/medical-dictionary' },
  { id: 47, icon: FaSearch, label: 'Symptom Library', desc: '800+ symptoms with causes', category: 'Education', color: '#8b5cf6', path: '/health-tools/symptom-library' },
  { id: 48, icon: FaShieldAlt, label: 'First Aid Guide', desc: 'Emergency response guide', category: 'Education', color: '#ef4444', path: '/health-tools/first-aid' },
  { id: 49, icon: FaChartLine, label: 'Health Stats Dashboard', desc: 'WHO & CDC statistics', category: 'Education', color: '#14b8a6', path: '/health-tools/stats-dashboard' },
  { id: 50, icon: FaShare, label: 'Share Results', desc: 'Share health summaries', category: 'Community', color: '#059669', path: '/health-tools/share-results' },
  { id: 51, icon: FaUsers, label: 'Health Challenges', desc: 'Community wellness challenges', category: 'Community', color: '#3b82f6', path: '/health-tools/challenges' },
  { id: 52, icon: FaTrophy, label: 'Leaderboard', desc: 'Weekly health streaks', category: 'Community', color: '#f59e0b', path: '/health-tools/leaderboard' },
];

const CATEGORIES = ['All', 'Calculators', 'Trackers', 'Medical', 'Fitness', 'Nutrition', 'Mental Health', 'Education', 'Community'];
const CAT_COLORS = {
  Calculators: '#059669', Trackers: '#ef4444', Medical: '#8b5cf6',
  Fitness: '#3b82f6', Nutrition: '#22c55e', 'Mental Health': '#ec4899',
  Education: '#f59e0b', Community: '#0ea5e9'
};

export default function HealthToolsTab() {
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [pinned, setPinned] = useState([]);

  useEffect(() => {
    const ru = localStorage.getItem('wn_tools_recent');
    const pi = localStorage.getItem('wn_tools_pinned');
    if (ru) setRecentlyUsed(JSON.parse(ru));
    if (pi) setPinned(JSON.parse(pi));
  }, []);

  const trackUsage = (tool) => {
    const updated = [tool.id, ...recentlyUsed.filter(id => id !== tool.id)].slice(0, 6);
    setRecentlyUsed(updated);
    localStorage.setItem('wn_tools_recent', JSON.stringify(updated));
  };

  const togglePin = (id) => {
    const updated = pinned.includes(id) ? pinned.filter(p => p !== id) : [...pinned, id];
    setPinned(updated);
    localStorage.setItem('wn_tools_pinned', JSON.stringify(updated));
  };

  const handleToolClick = (tool) => {
    trackUsage(tool);
    if (tool.path) {
      navigate(tool.path);
    }
  };

  const filtered = TOOLS.filter(t => {
    const q = searchTerm.toLowerCase();
    return (
      (t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) &&
      (filterCategory === 'All' || t.category === filterCategory)
    );
  });

  const recentTools = TOOLS.filter(t => recentlyUsed.includes(t.id));
  const pinnedTools = TOOLS.filter(t => pinned.includes(t.id));

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      <div style={{
        background: `linear-gradient(135deg, ${emerald} 0%, #047857 50%, #065f46 100%)`,
        borderRadius: '24px', padding: '40px 36px', marginBottom: '32px',
        position: 'relative', overflow: 'hidden', color: 'white'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FaTools style={{ fontSize: '2rem' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Tools</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                52+ Premium Health Tools • Calculators • Trackers • Medical • Fitness • Nutrition
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Total Tools', value: TOOLS.length },
              { label: 'Categories', value: CATEGORIES.length - 1 },
              { label: 'Pinned', value: pinned.length },
              { label: 'Recently Used', value: recentlyUsed.length },
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

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CATEGORIES.map(cat => {
          const active = filterCategory === cat;
          const color = CAT_COLORS[cat] || emerald;
          return (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              style={{
                padding: '7px 16px', borderRadius: '20px',
                border: `1.5px solid ${active ? color : '#e2e8f0'}`,
                background: active ? color : 'white',
                color: active ? 'white' : '#475569',
                fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer',
                transition: 'all 0.15s'
              }}>
              {cat}{cat !== 'All' && <span style={{ marginLeft: '5px', opacity: 0.8, fontSize: '0.7rem' }}>({TOOLS.filter(t => t.category === cat).length})</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: '12px', padding: '0 14px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <FaSearch style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
          <input type="text" placeholder={`Search ${TOOLS.length} health tools...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', padding: '11px 0', width: '100%', fontSize: '0.88rem', background: 'transparent' }} />
        </div>
        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
          <span style={{ color: emerald, fontWeight: '800' }}>{filtered.length}</span> tools found
        </span>
      </div>

      {recentTools.length > 0 && searchTerm === '' && filterCategory === 'All' && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaHistory style={{ color: emerald }} /> Recently Used
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {recentTools.map(tool => (
              <div key={tool.id} onClick={() => handleToolClick(tool)}
                style={{
                  background: 'white', borderRadius: '12px', padding: '14px',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  transition: 'all 0.22s', display: 'flex', alignItems: 'center', gap: '12px'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = tool.color; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: tool.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <tool.icon style={{ color: tool.color, fontSize: '1rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{tool.category}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); togglePin(tool.id); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: pinned.includes(tool.id) ? '#f59e0b' : '#cbd5e1' }}>
                  <FaStar />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {pinnedTools.length > 0 && searchTerm === '' && filterCategory === 'All' && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaStar style={{ color: '#f59e0b' }} /> Pinned Tools
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {pinnedTools.map(tool => (
              <div key={tool.id} onClick={() => handleToolClick(tool)}
                style={{
                  background: 'white', borderRadius: '12px', padding: '14px',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  transition: 'all 0.22s', display: 'flex', alignItems: 'center', gap: '12px'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = tool.color; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: tool.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <tool.icon style={{ color: tool.color, fontSize: '1rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{tool.category}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); togglePin(tool.id); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: pinned.includes(tool.id) ? '#f59e0b' : '#cbd5e1' }}>
                  <FaStar />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaTools style={{ color: emerald }} />
        {searchTerm || filterCategory !== 'All' ? `Results (${filtered.length})` : 'All Tools'}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {filtered.map(tool => (
          <div key={tool.id} onClick={() => handleToolClick(tool)}
            style={{
              background: 'white', borderRadius: '16px', padding: '20px',
              border: '1px solid #e2e8f0', cursor: 'pointer',
              transition: 'all 0.22s', boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = tool.color; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: tool.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <tool.icon style={{ color: tool.color, fontSize: '1.3rem' }} />
              </div>
              <button onClick={(e) => { e.stopPropagation(); togglePin(tool.id); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: pinned.includes(tool.id) ? '#f59e0b' : '#cbd5e1' }}>
                <FaStar size={16} />
              </button>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '700', color: CAT_COLORS[tool.category] || '#64748b', background: (CAT_COLORS[tool.category] || '#64748b') + '15', display: 'inline-block', padding: '2px 8px', borderRadius: '20px', marginTop: '8px' }}>{tool.category}</div>
            <h4 style={{ margin: '6px 0 4px', fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>{tool.label}</h4>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{tool.desc}</p>
            <button onClick={(e) => { e.stopPropagation(); handleToolClick(tool); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                background: tool.color, color: 'white', border: 'none', borderRadius: '10px',
                fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer',
                width: '100%', justifyContent: 'center', transition: 'opacity 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Open Tool <FaArrowRight size={10} />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <FaSearch size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <p style={{ fontWeight: '600' }}>No tools found for "{searchTerm}"</p>
        </div>
      )}
      </div>
  );
}
