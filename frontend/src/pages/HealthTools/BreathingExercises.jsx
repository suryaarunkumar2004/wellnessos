import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaLungs, FaPlay, FaPause, FaStop, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function BreathingExercises() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [history, setHistory] = useState([]);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const exercises = [
    { id: 1, name: '4-7-8 Breathing', description: 'Inhale 4s, hold 7s, exhale 8s. Calms the nervous system and reduces anxiety.', pattern: [4, 7, 8], rounds: 4, benefit: 'Reduces anxiety, improves sleep' },
    { id: 2, name: 'Box Breathing', description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Used by Navy SEALs for stress reduction.', pattern: [4, 4, 4, 4], rounds: 8, benefit: 'Reduces stress, improves focus' },
    { id: 3, name: 'Wim Hof Method', description: 'Deep inhale, exhale, hold breath. Energizes and strengthens immune system.', pattern: [5, 0, 15], rounds: 3, benefit: 'Boosts energy, strengthens immunity' },
    { id: 4, name: 'Coherent Breathing', description: 'Breathe in for 5 seconds, out for 5 seconds. Balances heart rate variability.', pattern: [5, 0, 5], rounds: 10, benefit: 'Balances heart rate, improves HRV' },
    { id: 5, name: 'Diaphragmatic Breathing', description: 'Deep belly breathing. Activates parasympathetic nervous system.', pattern: [4, 0, 6], rounds: 6, benefit: 'Deep relaxation, lowers blood pressure' },
    { id: 6, name: 'Alternate Nostril', description: 'Close right nostril, inhale left. Close left, exhale right. Balances energy.', pattern: [4, 2, 4], rounds: 5, benefit: 'Balances energy, clears mind' },
    { id: 7, name: 'Fire Breath (Kapalabhati)', description: 'Rapid, short exhales followed by passive inhales. Energizes the body.', pattern: [0, 0, 0], rounds: 10, benefit: 'Energizes body, clears sinuses' },
    { id: 8, name: 'Three-Part Breath', description: 'Breathe into belly, then ribs, then chest. Complete breath cycle.', pattern: [4, 2, 6], rounds: 5, benefit: 'Full lung expansion, deep relaxation' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('breathing_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('breathing_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setPhase('inhale');
    setCount(0);
    setCompletedRounds(0);
    setIsActive(true);
    
    let currentPhase = 0;
    let currentCount = 0;
    const pattern = exercise.pattern;
    const totalRounds = exercise.rounds;
    let round = 0;

    const interval = setInterval(() => {
      if (currentCount < pattern[currentPhase]) {
        currentCount++;
        setCount(currentCount);
      } else {
        currentPhase = (currentPhase + 1) % pattern.length;
        currentCount = 0;
        if (currentPhase === 0) {
          round++;
          setCompletedRounds(round);
          if (round >= totalRounds) {
            clearInterval(interval);
            setIsActive(false);
            setTimer(null);
            const historyEntry = { exercise: exercise.name, rounds: round, date: new Date().toLocaleString() };
            setHistory([historyEntry, ...history].slice(0, 20));
            localStorage.setItem('breathing_history', JSON.stringify(history));
            showToast('✅ Exercise complete! Great job!', 'success');
            return;
          }
        }
        const phaseNames = ['inhale', 'hold', 'exhale', 'hold'];
        setPhase(phaseNames[currentPhase % phaseNames.length]);
        setCount(0);
      }
    }, 1000);
    setTimer(interval);
  };

  const stopExercise = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsActive(false);
    setSelectedExercise(null);
    setPhase('inhale');
    setCount(0);
    setCompletedRounds(0);
    showToast('🛑 Exercise stopped', 'info');
  };

  const getPhaseEmoji = (phaseName) => {
    const map = { inhale: '⬆️', hold: '⏸️', exhale: '⬇️' };
    return map[phaseName] || '⏸️';
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
                  <FaLungs style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Breathing Exercises</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>8 powerful breathing techniques for wellness</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Exercises</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exercises.map((ex) => (
                  <div key={ex.id} onClick={() => { if (!isActive) startExercise(ex); }} style={{ padding: '14px', border: `2px solid ${selectedExercise?.id === ex.id && isActive ? emerald : '#e2e8f0'}`, borderRadius: '12px', cursor: isActive ? 'not-allowed' : 'pointer', background: selectedExercise?.id === ex.id && isActive ? emeraldLight : 'white', opacity: isActive && selectedExercise?.id !== ex.id ? 0.5 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{ex.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>🔄 {ex.rounds} rounds • {ex.benefit}</div>
                      </div>
                      {selectedExercise?.id === ex.id && isActive && <span style={{ color: emerald, fontWeight: '700' }}>▶ Active</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {selectedExercise && isActive ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedExercise.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>{selectedExercise.benefit}</div>
                  <div style={{ fontSize: '4rem', margin: '20px 0' }}>{getPhaseEmoji(phase)}</div>
                  <div style={{ fontSize: '3rem', fontWeight: '800', color: emerald }}>{count}s</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', textTransform: 'uppercase' }}>{phase}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '8px' }}>Round {completedRounds + 1} of {selectedExercise.rounds}</div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.8rem', color: '#64748b' }}>
                    {selectedExercise.description}
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <button onClick={stopExercise} style={{ padding: '12px 24px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}><FaStop /> Stop</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaLungs size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select a breathing exercise to begin</p>
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
