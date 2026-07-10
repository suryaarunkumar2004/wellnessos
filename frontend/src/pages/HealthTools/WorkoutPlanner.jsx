import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaDumbbell, FaCalendarAlt, FaClock, FaFire, FaCheckCircle, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function WorkoutPlanner() {
  const [goal, setGoal] = useState('strength');
  const [days, setDays] = useState(4);
  const [workout, setWorkout] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [history, setHistory] = useState([]);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const workoutPlans = {
    strength: {
      name: 'Strength Training',
      exercises: ['Bench Press', 'Squats', 'Deadlifts', 'Overhead Press', 'Rows', 'Pull-ups'],
      days: [1, 2, 3, 4],
      intensity: 'High',
      focus: 'Muscle Building'
    },
    cardio: {
      name: 'Cardio Program',
      exercises: ['Running 5km', 'Cycling 30min', 'Swimming 25min', 'Rowing 20min', 'HIIT 15min', 'Jump Rope 10min'],
      days: [1, 2, 3, 4, 5],
      intensity: 'Medium',
      focus: 'Cardiovascular Health'
    },
    yoga: {
      name: 'Yoga Flow',
      exercises: ['Sun Salutation', 'Warrior Pose', 'Tree Pose', 'Downward Dog', 'Cobra Pose', 'Child Pose'],
      days: [1, 2, 3, 4],
      intensity: 'Low',
      focus: 'Flexibility & Mindfulness'
    },
    hiit: {
      name: 'HIIT Program',
      exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups', 'Lunges', 'Plank'],
      days: [1, 2, 3],
      intensity: 'Very High',
      focus: 'Fat Loss & Endurance'
    },
    pilates: {
      name: 'Pilates Core',
      exercises: ['Hundred', 'Roll-up', 'Leg Circles', 'Scissors', 'Bicycle', 'Plank'],
      days: [1, 2, 3, 4],
      intensity: 'Medium',
      focus: 'Core Strength & Stability'
    },
    fullbody: {
      name: 'Full Body Workout',
      exercises: ['Push-ups', 'Squats', 'Rows', 'Lunges', 'Plank', 'Russian Twists'],
      days: [1, 2, 3, 4, 5],
      intensity: 'Medium',
      focus: 'Overall Fitness'
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('workout_planner_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('workout_planner_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generateWorkout = () => {
    const plan = workoutPlans[goal];
    const selectedExercises = plan.exercises.slice(0, Math.min(days, plan.exercises.length));
    const workoutPlan = {
      name: plan.name,
      exercises: selectedExercises,
      days: days,
      duration: days * 45,
      calories: days * 350,
      intensity: plan.intensity,
      focus: plan.focus
    };
    setWorkout(workoutPlan);
    const historyEntry = { plan: plan.name, exercises: selectedExercises.length, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('workout_planner_history', JSON.stringify(history));
    showToast('✅ Workout plan generated!', 'success');
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
                  <FaDumbbell style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Workout Planner</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>6 fitness goals with custom workout plans</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Plan Your Workout</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Fitness Goal</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {['strength', 'cardio', 'yoga', 'hiit', 'pilates', 'fullbody'].map(g => (
                      <button key={g} onClick={() => setGoal(g)} style={{ padding: '8px', borderRadius: '8px', border: `2px solid ${goal === g ? emerald : '#e2e8f0'}`, background: goal === g ? emeraldLight : 'white', color: goal === g ? emerald : '#64748b', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.75rem' }}>
                        {g === 'hiit' ? 'HIIT' : g === 'fullbody' ? 'Full Body' : g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Days per Week</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[2, 3, 4, 5, 6].map(d => (
                      <button key={d} onClick={() => setDays(d)} style={{ padding: '8px 16px', borderRadius: '8px', border: `2px solid ${days === d ? emerald : '#e2e8f0'}`, background: days === d ? emeraldLight : 'white', color: days === d ? emerald : '#64748b', fontWeight: '700', cursor: 'pointer' }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={generateWorkout} style={{ padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Generate Plan</button>
              </div>
            </div>

            <div>
              {workout.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{workout.name}</h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap' }}>
                    <span>📅 {workout.days} days/week</span>
                    <span>⏱️ {workout.duration} min/week</span>
                    <span>🔥 ~{workout.calories} kcal/week</span>
                    <span style={{ color: workout.intensity === 'Very High' ? '#ef4444' : workout.intensity === 'High' ? '#f97316' : workout.intensity === 'Medium' ? '#f59e0b' : '#22c55e' }}>⚡ {workout.intensity}</span>
                    <span>🎯 {workout.focus}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {workout.exercises.map((ex, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ background: emerald, color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700' }}>{idx + 1}</span>
                        <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>{ex}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#94a3b8' }}>{Math.floor(Math.random() * 4 + 3)} sets x {Math.floor(Math.random() * 8 + 8)} reps</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b' }}>
                    💡 Rest 60-90 seconds between sets. Stay hydrated!
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaDumbbell size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select your goal and days to generate a plan</p>
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
