import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaRunning, FaSearch, FaHistory, FaDownload, FaPrint, FaShare, FaTrash, FaDumbbell, FaHeart, FaFire } from 'react-icons/fa';

export default function ExerciseDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const exercises = [
    { 
      name: 'Push-ups', 
      muscleGroup: 'Chest, Triceps, Shoulders', 
      equipment: 'Bodyweight', 
      difficulty: 'Easy', 
      reps: '10-15', 
      sets: '3-4',
      instructions: 'Start in plank position, lower chest to ground, push back up.',
      calories: 7,
      image: '💪'
    },
    { 
      name: 'Squats', 
      muscleGroup: 'Quads, Glutes, Hamstrings', 
      equipment: 'Bodyweight', 
      difficulty: 'Easy', 
      reps: '12-15', 
      sets: '3-4',
      instructions: 'Stand with feet shoulder-width apart, lower hips back and down, stand up.',
      calories: 8,
      image: '🏋️'
    },
    { 
      name: 'Bench Press', 
      muscleGroup: 'Chest, Triceps, Shoulders', 
      equipment: 'Barbell', 
      difficulty: 'Medium', 
      reps: '8-12', 
      sets: '3-4',
      instructions: 'Lie on bench, lower barbell to chest, push up to straight arms.',
      calories: 9,
      image: '🏋️'
    },
    { 
      name: 'Deadlifts', 
      muscleGroup: 'Back, Glutes, Hamstrings', 
      equipment: 'Barbell', 
      difficulty: 'Hard', 
      reps: '5-8', 
      sets: '3-5',
      instructions: 'Stand over barbell, hinge at hips, lift bar keeping back straight, lower down.',
      calories: 12,
      image: '🏋️'
    },
    { 
      name: 'Pull-ups', 
      muscleGroup: 'Back, Biceps', 
      equipment: 'Pull-up Bar', 
      difficulty: 'Hard', 
      reps: '6-10', 
      sets: '3-4',
      instructions: 'Grab bar with overhand grip, pull chin above bar, lower down slowly.',
      calories: 10,
      image: '🤸'
    },
    { 
      name: 'Lunges', 
      muscleGroup: 'Quads, Glutes, Hamstrings', 
      equipment: 'Bodyweight', 
      difficulty: 'Easy', 
      reps: '10-12', 
      sets: '3-4',
      instructions: 'Step forward with one leg, lower hips until both knees bent, return to start.',
      calories: 7,
      image: '��'
    },
    { 
      name: 'Plank', 
      muscleGroup: 'Core, Shoulders', 
      equipment: 'Bodyweight', 
      difficulty: 'Medium', 
      reps: '30-60s', 
      sets: '3-4',
      instructions: 'Hold push-up position with elbows bent, keep body in straight line.',
      calories: 5,
      image: '🧘'
    },
    { 
      name: 'Bicep Curls', 
      muscleGroup: 'Biceps', 
      equipment: 'Dumbbells', 
      difficulty: 'Easy', 
      reps: '10-15', 
      sets: '3-4',
      instructions: 'Hold dumbbells, curl weights up to shoulders, lower down slowly.',
      calories: 4,
      image: '💪'
    },
    { 
      name: 'Tricep Pushdowns', 
      muscleGroup: 'Triceps', 
      equipment: 'Cable Machine', 
      difficulty: 'Easy', 
      reps: '12-15', 
      sets: '3-4',
      instructions: 'Grab cable bar, push down to full extension, control the release.',
      calories: 4,
      image: '💪'
    },
    { 
      name: 'Rows', 
      muscleGroup: 'Back, Biceps', 
      equipment: 'Dumbbells/Barbell', 
      difficulty: 'Medium', 
      reps: '10-12', 
      sets: '3-4',
      instructions: 'Hinge at hips, pull weight toward chest, squeeze shoulder blades, lower down.',
      calories: 8,
      image: '🏋️'
    },
    { 
      name: 'Burpees', 
      muscleGroup: 'Full Body', 
      equipment: 'Bodyweight', 
      difficulty: 'Hard', 
      reps: '8-12', 
      sets: '3-4',
      instructions: 'Drop to squat, kick feet back to plank, do push-up, jump up.',
      calories: 15,
      image: '🔥'
    },
    { 
      name: 'Mountain Climbers', 
      muscleGroup: 'Core, Shoulders, Legs', 
      equipment: 'Bodyweight', 
      difficulty: 'Medium', 
      reps: '15-20', 
      sets: '3-4',
      instructions: 'Start in plank, alternate bringing knees to chest quickly.',
      calories: 12,
      image: '🏃'
    },
    { 
      name: 'Jump Squats', 
      muscleGroup: 'Quads, Glutes', 
      equipment: 'Bodyweight', 
      difficulty: 'Medium', 
      reps: '10-15', 
      sets: '3-4',
      instructions: 'Perform squat then jump explosively, land softly into next squat.',
      calories: 14,
      image: '🏋️'
    },
    { 
      name: 'Russian Twists', 
      muscleGroup: 'Core, Obliques', 
      equipment: 'Bodyweight', 
      difficulty: 'Easy', 
      reps: '15-20', 
      sets: '3-4',
      instructions: 'Sit with knees bent, lean back, twist torso side to side.',
      calories: 6,
      image: '🧘'
    },
    { 
      name: 'Glute Bridges', 
      muscleGroup: 'Glutes, Hamstrings', 
      equipment: 'Bodyweight', 
      difficulty: 'Easy', 
      reps: '12-15', 
      sets: '3-4',
      instructions: 'Lie on back, knees bent, lift hips up, squeeze glutes, lower down.',
      calories: 5,
      image: '🏋️'
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('exercise_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('exercise_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredExercises = exercises.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectExercise = (exercise) => {
    setSelectedExercise(exercise);
    const historyEntry = { exercise: exercise.name, muscleGroup: exercise.muscleGroup, date: new Date().toLocaleString() };
    setHistory([historyEntry, ...history].slice(0, 20));
    localStorage.setItem('exercise_history', JSON.stringify(history));
    showToast(`✅ Selected ${exercise.name}`, 'success');
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return '#22c55e';
    if (difficulty === 'Medium') return '#f59e0b';
    return '#ef4444';
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
                  <FaRunning style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Exercise Database</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Browse 300+ exercises with form guides and instructional videos</p>
                </div>
              </div>
            </div>
          </div>

          {toastMessage && (
            <div style={{ position: 'fixed', top: '100px', right: '24px', zIndex: 9999, padding: '14px 24px', borderRadius: '12px', background: toastMessage.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1px solid ${toastMessage.type === 'error' ? '#fecaca' : '#a7f3d0'}`, color: toastMessage.type === 'error' ? '#dc2626' : '#059669', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {toastMessage.message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <FaSearch style={{ color: '#94a3b8' }} />
              <input type="text" placeholder="Search exercise or muscle group..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '12px 0', width: '100%', fontSize: '0.9rem', background: 'transparent' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Exercises ({filteredExercises.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
                {filteredExercises.map((ex, idx) => (
                  <div key={idx} onClick={() => selectExercise(ex)} style={{ padding: '12px 16px', border: `2px solid ${selectedExercise?.name === ex.name ? emerald : '#e2e8f0'}`, borderRadius: '10px', cursor: 'pointer', background: selectedExercise?.name === ex.name ? emeraldLight : 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>{ex.image}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{ex.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{ex.muscleGroup}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', background: getDifficultyColor(ex.difficulty) + '20', color: getDifficultyColor(ex.difficulty), fontWeight: '600' }}>{ex.difficulty}</span>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>🔥 {ex.calories} cal</span>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredExercises.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No exercises found</div>
                )}
              </div>
            </div>

            <div>
              {selectedExercise ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2.5rem' }}>{selectedExercise.image}</span>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '4px' }}>{selectedExercise.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedExercise.muscleGroup}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Equipment</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedExercise.equipment}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Difficulty</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: getDifficultyColor(selectedExercise.difficulty) }}>{selectedExercise.difficulty}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Sets</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedExercise.sets}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Reps</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{selectedExercise.reps}</div>
                    </div>
                  </div>

                  <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Instructions</div>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b', marginTop: '4px' }}>{selectedExercise.instructions}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaDownload size={12} /> Save</button>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaPrint size={12} /> Print</button>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaShare size={12} /> Share</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaRunning size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for an exercise to see details</p>
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
