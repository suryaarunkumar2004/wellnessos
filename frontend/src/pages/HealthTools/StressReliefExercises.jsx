import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBrain, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function StressReliefExercises() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const exercises = [
    { id: 1, name: 'Deep Breathing', description: 'Inhale slowly through nose for 4 seconds, hold for 4, exhale through mouth for 4. Repeat 5 times.', duration: '5 min', benefit: 'Reduces anxiety, lowers blood pressure' },
    { id: 2, name: 'Box Breathing', description: 'Inhale 4 sec, hold 4 sec, exhale 4 sec, hold 4 sec. Repeat 10 times.', duration: '8 min', benefit: 'Calms nervous system, improves focus' },
    { id: 3, name: 'Guided Meditation', description: 'Close your eyes, focus on your breath. Count each exhale from 1 to 10, then repeat.', duration: '10 min', benefit: 'Reduces stress, improves mindfulness' },
    { id: 4, name: 'Muscle Relaxation', description: 'Tense and release each muscle group from toes to head. Hold tension for 5 seconds, release for 10.', duration: '15 min', benefit: 'Releases physical tension, improves sleep' },
    { id: 5, name: 'Visualization', description: 'Imagine a peaceful place. Engage all senses - what do you see, hear, smell, feel?', duration: '10 min', benefit: 'Reduces anxiety, improves mood' },
    { id: 6, name: 'Mindfulness Walk', description: 'Walk slowly and focus on each step. Notice the ground beneath your feet, the air, the sounds around you.', duration: '15 min', benefit: 'Grounds you in the present, reduces stress' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('stress_relief_completed');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (completed.length > 0) localStorage.setItem('stress_relief_completed', JSON.stringify(completed));
  }, [completed]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const markComplete = (id) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
      showToast('✅ Exercise completed!', 'success');
    } else {
      setCompleted(completed.filter(c => c !== id));
      showToast('↩ Unmarked', 'info');
    }
  };

  const isCompleted = (id) => completed.includes(id);

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
                  <FaBrain style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Stress Relief Exercises</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Evidence-based CBT relaxation techniques</p>
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
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Exercises</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exercises.map((ex) => (
                  <div key={ex.id} onClick={() => setSelectedExercise(ex)} style={{ padding: '14px', border: `2px solid ${selectedExercise?.id === ex.id ? emerald : '#e2e8f0'}`, borderRadius: '12px', cursor: 'pointer', background: selectedExercise?.id === ex.id ? emeraldLight : 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{ex.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>⏱️ {ex.duration}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); markComplete(ex.id); }} style={{ background: isCompleted(ex.id) ? emerald : '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isCompleted(ex.id) ? 'white' : '#94a3b8' }}>
                        {isCompleted(ex.id) ? '✅' : '✓'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>✅ {completed.length}/{exercises.length} completed</div>
              </div>
            </div>
            <div>
              {selectedExercise ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedExercise.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>⏱️ {selectedExercise.duration}</div>
                  <div style={{ background: emeraldLight, padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.6' }}>{selectedExercise.description}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>💡 Benefit: {selectedExercise.benefit}</div>
                  </div>
                  {isCompleted(selectedExercise.id) ? (
                    <div style={{ marginTop: '12px', padding: '12px', background: '#ecfdf5', borderRadius: '10px', textAlign: 'center', color: emerald, fontWeight: '700' }}>✅ Completed!</div>
                  ) : (
                    <button onClick={() => markComplete(selectedExercise.id)} style={{ marginTop: '12px', width: '100%', padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Mark as Complete</button>
                  )}
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBrain size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select an exercise to learn more</p>
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
