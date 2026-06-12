import React, { useState, useEffect } from 'react';
import { FaPrint, FaDownload, FaRedo, FaChartLine, FaCalendarWeek, FaCalendarAlt, FaTrash, FaPlus, FaMinus, FaHeartbeat, FaTint, FaBed, FaFire, FaRunning, FaBrain, FaWeight, FaTachometerAlt, FaPills, FaSyringe, FaBell } from 'react-icons/fa';

// Helper: generate realistic 30‑day history
const generateRealisticHistory = (days = 30) => {
  const today = new Date();
  const history = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const steps = 5000 + Math.floor(Math.random() * 8000) + (i % 7 === 0 ? 2000 : 0);
    const water = 4 + Math.floor(Math.random() * 6);
    const sleep = 6 + Math.random() * 3;
    const calories = 1800 + Math.floor(Math.random() * 1000);
    const weight = 68 + Math.random() * 6;
    const heartRate = 65 + Math.floor(Math.random() * 15);
    const systolic = 110 + Math.floor(Math.random() * 20);
    const diastolic = 70 + Math.floor(Math.random() * 12);
    const activeMinutes = 20 + Math.floor(Math.random() * 60);
    const meditationMinutes = Math.floor(Math.random() * 30);
    const bloodGlucose = 85 + Math.floor(Math.random() * 30);
    const oxygen = 94 + Math.floor(Math.random() * 5);
    const sleepQuality = 3 + Math.random() * 2;
    history.push({
      date: dateStr, steps, water, sleep, calories, weight, heartRate, systolic, diastolic,
      activeMinutes, meditationMinutes, bloodGlucose, oxygen, sleepQuality,
    });
  }
  return history;
};

const HealthTracker = () => {
  const [viewMode, setViewMode] = useState('week');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('advHealthHistory');
    return saved ? JSON.parse(saved) : generateRealisticHistory(30);
  });
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('advHealthGoals');
    return saved ? JSON.parse(saved) : {
      steps: 10000, water: 8, sleep: 8, calories: 2200, activeMinutes: 45, meditationMinutes: 15,
    };
  });
  const [editingGoals, setEditingGoals] = useState(false);
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('advActivities');
    return saved ? JSON.parse(saved) : ['Morning walk', 'Meditation', 'Healthy lunch'];
  });
  const [newActivity, setNewActivity] = useState('');
  const [mood, setMood] = useState(() => localStorage.getItem('advMood') || '😐');
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('advMeds');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState('');
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('advWorkouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newWorkout, setNewWorkout] = useState('');
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('advReminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState('');
  const [todayData, setTodayData] = useState(() => {
    const saved = localStorage.getItem('advToday');
    if (saved) return JSON.parse(saved);
    const last = history[history.length-1];
    return {
      steps: 0, water: 0, sleep: 0, calories: 0, heartRate: 72, systolic: 118, diastolic: 78,
      weight: last?.weight || 70, activeMinutes: 0, meditationMinutes: 0, bloodGlucose: 95, oxygen: 97,
    };
  });

  // Persist all data
  useEffect(() => {
    localStorage.setItem('advHealthHistory', JSON.stringify(history));
    localStorage.setItem('advHealthGoals', JSON.stringify(goals));
    localStorage.setItem('advActivities', JSON.stringify(activities));
    localStorage.setItem('advMood', mood);
    localStorage.setItem('advToday', JSON.stringify(todayData));
    localStorage.setItem('advMeds', JSON.stringify(medications));
    localStorage.setItem('advWorkouts', JSON.stringify(workouts));
    localStorage.setItem('advReminders', JSON.stringify(reminders));
  }, [history, goals, activities, mood, todayData, medications, workouts, reminders]);

  // Derived stats
  const bmi = (todayData.weight / ((170/100)**2)).toFixed(1);
  const bmr = (10 * todayData.weight + 6.25 * 170 - 5 * 30 + 5).toFixed(0);
  const streak = (() => {
    let count = 0;
    for (let i = history.length-1; i >= 0; i--) {
      if (history[i].steps >= goals.steps) count++;
      else break;
    }
    return count;
  })();

  const logDay = () => {
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      steps: todayData.steps, water: todayData.water, sleep: todayData.sleep, calories: todayData.calories,
      weight: todayData.weight, heartRate: todayData.heartRate, systolic: todayData.systolic, diastolic: todayData.diastolic,
      activeMinutes: todayData.activeMinutes, meditationMinutes: todayData.meditationMinutes,
      bloodGlucose: todayData.bloodGlucose, oxygen: todayData.oxygen,
      sleepQuality: 0,
    };
    setHistory(prev => [...prev.slice(-29), newEntry]);
    setTodayData({
      ...todayData, steps: 0, water: 0, sleep: 0, calories: 0, activeMinutes: 0, meditationMinutes: 0,
    });
  };

  const exportCSV = () => {
    const headers = ['Date','Steps','Water','Sleep','Calories','Weight','HeartRate','Systolic','Diastolic','ActiveMin','MeditationMin','Glucose','O2'];
    const rows = history.map(h => [h.date, h.steps, h.water, h.sleep, h.calories, h.weight, h.heartRate, h.systolic, h.diastolic, h.activeMinutes, h.meditationMinutes, h.bloodGlucose, h.oxygen]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const data = { history, goals, activities, mood, medications, workouts, reminders };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handlePrint = () => window.print();

  // Add/remove helpers
  const addMedication = () => { if (newMed.trim()) setMedications([...medications, newMed.trim()]); setNewMed(''); };
  const removeMedication = (idx) => setMedications(medications.filter((_, i) => i !== idx));
  const addWorkout = () => { if (newWorkout.trim()) setWorkouts([...workouts, newWorkout.trim()]); setNewWorkout(''); };
  const removeWorkout = (idx) => setWorkouts(workouts.filter((_, i) => i !== idx));
  const addReminder = () => { if (newReminder.trim()) setReminders([...reminders, newReminder.trim()]); setNewReminder(''); };
  const removeReminder = (idx) => setReminders(reminders.filter((_, i) => i !== idx));

  const displayHistory = viewMode === 'week' ? history.slice(-7) : history;
  const getMax = (key) => Math.max(...displayHistory.map(d => d[key]), 1);
  const getMin = (key) => Math.min(...displayHistory.map(d => d[key]), 0);

  const ChartBlock = ({ title, dataKey, color }) => {
    const maxVal = getMax(dataKey);
    const minVal = getMin(dataKey);
    const points = displayHistory.map((d, i) => {
      const x = (i / (displayHistory.length - 1)) * 100;
      const y = 100 - ((d[dataKey] - minVal) / (maxVal - minVal)) * 80;
      return `${x},${y}`;
    }).join(' ');
    return (
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100px' }}>
          <polyline points={points} stroke={color} fill="none" strokeWidth="2" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '4px' }}>
          {displayHistory.map((d,i) => <span key={i}>{d.date}</span>)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: '80px', maxWidth: '1400px', margin: '0 auto', padding: '80px 24px 40px', fontFamily: 'Inter, system-ui' }}>
      <style>{`
        @media print {
          nav, footer, button:not(.print-btn), .no-print, .edit-goals-btn, .activity-add, .mood-selector, .medication-add, .workout-add, .reminder-add { display: none !important; }
          body { padding-top: 0 !important; margin: 0; background: white; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b' }}>Advanced Health Tracker</h1>
        <button onClick={handlePrint} className="print-btn" style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaPrint /> Export PDF
        </button>
      </div>
      <p style={{ color: "#059669" }}>Realistic data, trends, charts, and detailed insights.</p>

      {/* Goals */}
      <div style={{ background: '#f0fdf4', borderRadius: '20px', padding: '16px 20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ color: '#059669' }}>Daily Goals</strong>
          {editingGoals ? (
            <div style={{ marginTop: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <label>Steps: <input type="number" value={goals.steps} onChange={e => setGoals({...goals, steps: +e.target.value})} style={{ width: '80px' }} /></label>
              <label>Water: <input type="number" value={goals.water} onChange={e => setGoals({...goals, water: +e.target.value})} style={{ width: '60px' }} /></label>
              <label>Sleep: <input type="number" step="0.5" value={goals.sleep} onChange={e => setGoals({...goals, sleep: +e.target.value})} style={{ width: '70px' }} /></label>
              <label>Active min: <input type="number" value={goals.activeMinutes} onChange={e => setGoals({...goals, activeMinutes: +e.target.value})} style={{ width: '70px' }} /></label>
              <label>Meditation: <input type="number" value={goals.meditationMinutes} onChange={e => setGoals({...goals, meditationMinutes: +e.target.value})} style={{ width: '70px' }} /></label>
            </div>
          ) : (
            <div style={{ marginTop: '8px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <span>🚶 {goals.steps}</span><span>💧 {goals.water}</span><span>😴 {goals.sleep}h</span>
              <span>🏃 {goals.activeMinutes}min</span><span>🧘 {goals.meditationMinutes}min</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ background: '#059669', color: 'white', padding: '4px 12px', borderRadius: '40px' }}>🔥 Streak: {streak}</span>
          <button onClick={() => setEditingGoals(!editingGoals)} className="edit-goals-btn" style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '40px', cursor: 'pointer' }}>{editingGoals ? 'Save' : 'Edit'}</button>
        </div>
      </div>

      {/* Metrics Cards (with both + and -) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px', marginBottom: '24px' }}>
        <MetricCard title="Steps" value={todayData.steps} goal={goals.steps} unit="" onInc={() => setTodayData({...todayData, steps: todayData.steps + 500})} onDec={() => setTodayData({...todayData, steps: Math.max(0, todayData.steps - 500)})} incLabel="+500" decLabel="-500" />
        <MetricCard title="Water" value={todayData.water} goal={goals.water} unit="cups" onInc={() => setTodayData({...todayData, water: todayData.water + 1})} onDec={() => setTodayData({...todayData, water: Math.max(0, todayData.water - 1)})} incLabel="+1" decLabel="-1" />
        <MetricCard title="Sleep" value={todayData.sleep} goal={goals.sleep} unit="hrs" onInc={() => setTodayData({...todayData, sleep: todayData.sleep + 0.5})} onDec={() => setTodayData({...todayData, sleep: Math.max(0, todayData.sleep - 0.5)})} incLabel="+0.5" decLabel="-0.5" />
        <MetricCard title="Active" value={todayData.activeMinutes} goal={goals.activeMinutes} unit="min" onInc={() => setTodayData({...todayData, activeMinutes: todayData.activeMinutes + 15})} onDec={() => setTodayData({...todayData, activeMinutes: Math.max(0, todayData.activeMinutes - 15)})} incLabel="+15" decLabel="-15" />
        <MetricCard title="Meditation" value={todayData.meditationMinutes} goal={goals.meditationMinutes} unit="min" onInc={() => setTodayData({...todayData, meditationMinutes: todayData.meditationMinutes + 5})} onDec={() => setTodayData({...todayData, meditationMinutes: Math.max(0, todayData.meditationMinutes - 5)})} incLabel="+5" decLabel="-5" />
        <MetricCard title="Calories" value={todayData.calories} goal={goals.calories} unit="kcal" onInc={() => setTodayData({...todayData, calories: todayData.calories + 200})} onDec={() => setTodayData({...todayData, calories: Math.max(0, todayData.calories - 200)})} incLabel="+200" decLabel="-200" />
      </div>

      {/* Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '16px', marginBottom: '32px' }}>
        <VitalCard title="Heart Rate" value={todayData.heartRate} unit="bpm" onInc={() => setTodayData({...todayData, heartRate: todayData.heartRate+5})} onDec={() => setTodayData({...todayData, heartRate: Math.max(40, todayData.heartRate-5)})} />
        <VitalCard title="BP" value={`${todayData.systolic}/${todayData.diastolic}`} unit="mmHg" onInc={() => setTodayData({...todayData, systolic: todayData.systolic+5, diastolic: todayData.diastolic+3})} onDec={() => setTodayData({...todayData, systolic: Math.max(80, todayData.systolic-5), diastolic: Math.max(50, todayData.diastolic-3)})} />
        <VitalCard title="Weight" value={todayData.weight} unit="kg" onInc={() => setTodayData({...todayData, weight: todayData.weight+0.5})} onDec={() => setTodayData({...todayData, weight: Math.max(30, todayData.weight-0.5)})} />
        <VitalCard title="Blood Glucose" value={todayData.bloodGlucose} unit="mg/dL" onInc={() => setTodayData({...todayData, bloodGlucose: todayData.bloodGlucose+5})} onDec={() => setTodayData({...todayData, bloodGlucose: Math.max(70, todayData.bloodGlucose-5)})} />
        <VitalCard title="O₂ Sat" value={todayData.oxygen} unit="%" onInc={() => setTodayData({...todayData, oxygen: Math.min(100, todayData.oxygen+1)})} onDec={() => setTodayData({...todayData, oxygen: Math.max(90, todayData.oxygen-1)})} />
      </div>

      {/* Derived stats */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '16px 20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div><strong>BMI:</strong> {bmi} {bmi < 18.5 ? '(Underweight)' : bmi < 25 ? '(Normal)' : bmi < 30 ? '(Overweight)' : '(Obese)'}</div>
        <div><strong>BMR:</strong> {bmr} kcal/day</div>
        <div><strong>Today's progress:</strong> {Math.round((todayData.steps/goals.steps)*100)}% steps, {Math.round((todayData.water/goals.water)*100)}% water</div>
      </div>

      {/* Charts */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '20px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>Trends (last {viewMode === 'week' ? '7 days' : '30 days'})</h3>
          <div>
            <button onClick={() => setViewMode('week')} style={{ background: viewMode==='week' ? '#059669' : '#e5e7eb', color: viewMode==='week' ? 'white' : 'black', border: 'none', padding: '6px 12px', borderRadius: '20px', marginRight: '8px', cursor: 'pointer' }}><FaCalendarWeek /> Week</button>
            <button onClick={() => setViewMode('month')} style={{ background: viewMode==='month' ? '#059669' : '#e5e7eb', color: viewMode==='month' ? 'white' : 'black', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer' }}><FaCalendarAlt /> Month</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '24px' }}>
          <ChartBlock title="Steps" dataKey="steps" color="#059669" />
          <ChartBlock title="Sleep (hrs)" dataKey="sleep" color="#8b5cf6" />
          <ChartBlock title="Heart Rate" dataKey="heartRate" color="#ef4444" />
          <ChartBlock title="Weight (kg)" dataKey="weight" color="#f59e0b" />
        </div>
      </div>

      {/* Additional logs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3>Activities Log</h3>
          <ul style={{ marginTop: '12px', listStyle: 'none', padding: 0 }}>
            {activities.map((act, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span>{act}</span>
                <button onClick={() => setActivities(activities.filter((_,i)=>i!==idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><FaTrash /></button>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <input type="text" placeholder="New activity" value={newActivity} onChange={e => setNewActivity(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
            <button onClick={() => { if(newActivity.trim()) { setActivities([...activities, newActivity.trim()]); setNewActivity(''); } }} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3>Mood</h3>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '16px 0' }}>
            {['😊','😐','😔'].map(e => <button key={e} onClick={() => setMood(e)} style={{ background: mood===e ? '#059669' : '#f3f4f6', border: 'none', fontSize: '40px', padding: '8px 16px', borderRadius: '60px', cursor: 'pointer' }}>{e}</button>)}
          </div>
          <div style={{ textAlign: 'center', color: '#4b5563' }}>Current mood: {mood}</div>
        </div>
      </div>

      {/* Medication Log */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3><FaPills style={{ color: '#059669', marginRight: '8px' }} /> Medication Log</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input type="text" placeholder="Medication name" value={newMed} onChange={e => setNewMed(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
          <button onClick={addMedication} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
        </div>
        {medications.length === 0 ? <p>No medications logged.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {medications.map((med, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span><FaPills style={{ color: '#059669', marginRight: '8px' }} /> {med}</span>
                <button onClick={() => removeMedication(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Workout Log */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3><FaRunning style={{ color: '#059669', marginRight: '8px' }} /> Workout Log</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input type="text" placeholder="Workout (e.g., 30min run)" value={newWorkout} onChange={e => setNewWorkout(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
          <button onClick={addWorkout} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
        </div>
        {workouts.length === 0 ? <p>No workouts logged.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {workouts.map((workout, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span><FaRunning style={{ color: '#059669', marginRight: '8px' }} /> {workout}</span>
                <button onClick={() => removeWorkout(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reminders */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3><FaBell style={{ color: '#059669', marginRight: '8px' }} /> Reminders</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input type="text" placeholder="Reminder (e.g., Drink water)" value={newReminder} onChange={e => setNewReminder(e.target.value)} style={{ flex:1, padding: '8px', borderRadius: '20px', border: '1px solid #cbd5e1' }} />
          <button onClick={addReminder} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '40px', cursor: 'pointer' }}><FaPlus /> Add</button>
        </div>
        {reminders.length === 0 ? <p>No reminders set.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reminders.map((rem, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span><FaBell style={{ color: '#059669', marginRight: '8px' }} /> {rem}</span>
                <button onClick={() => removeReminder(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
        <button onClick={logDay} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}><FaChartLine /> Log Day & Reset</button>
        <button onClick={exportCSV} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '40px', cursor: 'pointer' }}><FaDownload /> Export CSV</button>
        <button onClick={exportJSON} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '40px', cursor: 'pointer' }}>Export JSON</button>
        <button onClick={resetAll} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '40px', cursor: 'pointer' }}><FaRedo /> Reset All</button>
      </div>
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>All data stored locally. Use "Log Day" to archive today's metrics.</div>
    </div>
  );
};

// Helper components
const MetricCard = ({ title, value, goal, unit, onInc, onDec, incLabel, decLabel }) => (
  <div style={{ background: 'white', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
    <div style={{ fontWeight: 'bold', color: '#059669' }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value} / {goal} {unit}</div>
    <div style={{ background: '#e5e7eb', borderRadius: '10px', height: '6px', margin: '8px 0' }}>
      <div style={{ width: `${Math.min(100, (value/goal)*100)}%`, background: '#059669', height: '6px', borderRadius: '10px' }}></div>
    </div>
    <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
      <button onClick={onInc} style={{ background: '#f3f4f6', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>{incLabel}</button>
      <button onClick={onDec} style={{ background: '#f3f4f6', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>{decLabel}</button>
    </div>
  </div>
);

const VitalCard = ({ title, value, unit, onInc, onDec }) => (
  <div style={{ background: 'white', borderRadius: '16px', padding: '12px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
    <div style={{ fontWeight: 'bold', color: '#059669' }}>{title}</div>
    <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{value} {unit}</div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
      <button onClick={onDec} style={{ background: '#f3f4f6', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>-</button>
      <button onClick={onInc} style={{ background: '#059669', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}>+</button>
    </div>
  </div>
);

export default HealthTracker;

