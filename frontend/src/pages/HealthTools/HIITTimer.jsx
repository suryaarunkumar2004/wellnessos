import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBolt, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function HIITTimer() {
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [rounds, setRounds] = useState(8);
  const [currentRound, setCurrentRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [phase, setPhase] = useState('ready');
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('hiit_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('hiit_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const startTimer = () => {
    if (currentRound >= rounds) {
      resetTimer();
      return;
    }
    setIsActive(true);
    const isWork = phase === 'work' || phase === 'ready';
    setTimeLeft(isWork ? workTime : restTime);
    setPhase(isWork ? 'work' : 'rest');

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (phase === 'work') {
            setPhase('rest');
            setTimeLeft(restTime);
            return restTime;
          } else {
            const nextRound = currentRound + 1;
            setCurrentRound(nextRound);
            if (nextRound >= rounds) {
              clearInterval(interval);
              setIsActive(false);
              setPhase('complete');
              const historyEntry = { rounds: rounds, workTime: workTime, restTime: restTime, date: new Date().toLocaleString() };
              setHistory([historyEntry, ...history].slice(0, 20));
              localStorage.setItem('hiit_history', JSON.stringify(history));
              showToast('✅ HIIT workout complete!', 'success');
              return 0;
            }
            setPhase('work');
            return workTime;
          }
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsActive(false);
    showToast('⏸️ Paused', 'info');
  };

  const resumeTimer = () => {
    if (!isActive && timer === null) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (phase === 'work') {
              setPhase('rest');
              setTimeLeft(restTime);
              return restTime;
            } else {
              const nextRound = currentRound + 1;
              setCurrentRound(nextRound);
              if (nextRound >= rounds) {
                clearInterval(interval);
                setIsActive(false);
                setPhase('complete');
                const historyEntry = { rounds: rounds, workTime: workTime, restTime: restTime, date: new Date().toLocaleString() };
                setHistory([historyEntry, ...history].slice(0, 20));
                localStorage.setItem('hiit_history', JSON.stringify(history));
                showToast('✅ HIIT workout complete!', 'success');
                return 0;
              }
              setPhase('work');
              return workTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(interval);
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsActive(false);
    setCurrentRound(0);
    setTimeLeft(workTime);
    setPhase('ready');
    showToast('🔄 Reset', 'info');
  };

  const formatTime = (seconds) => {
    return `${seconds}s`;
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
                  <FaBolt style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>HIIT Timer</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Customisable interval training timer</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Timer Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Work Time</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[10, 15, 20, 30, 45, 60].map(t => (
                      <button key={t} onClick={() => { if (!isActive) setWorkTime(t); }} style={{ padding: '6px 12px', borderRadius: '8px', border: `2px solid ${workTime === t ? emerald : '#e2e8f0'}`, background: workTime === t ? emeraldLight : 'white', color: workTime === t ? emerald : '#64748b', fontWeight: '700', cursor: isActive ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Rest Time</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[5, 10, 15, 20, 30, 45].map(t => (
                      <button key={t} onClick={() => { if (!isActive) setRestTime(t); }} style={{ padding: '6px 12px', borderRadius: '8px', border: `2px solid ${restTime === t ? emerald : '#e2e8f0'}`, background: restTime === t ? emeraldLight : 'white', color: restTime === t ? emerald : '#64748b', fontWeight: '700', cursor: isActive ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>Rounds</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[4, 6, 8, 10, 12, 16].map(r => (
                      <button key={r} onClick={() => { if (!isActive) setRounds(r); }} style={{ padding: '6px 12px', borderRadius: '8px', border: `2px solid ${rounds === r ? emerald : '#e2e8f0'}`, background: rounds === r ? emeraldLight : 'white', color: rounds === r ? emerald : '#64748b', fontWeight: '700', cursor: isActive ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Timer</h3>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '4rem', fontWeight: '800', color: phase === 'work' ? '#ef4444' : phase === 'rest' ? '#3b82f6' : phase === 'complete' ? '#22c55e' : '#64748b' }}>
                    {formatTime(timeLeft)}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>
                    {phase === 'work' ? '💪 WORK!' : phase === 'rest' ? '😮‍💨 REST' : phase === 'complete' ? '🎉 COMPLETE!' : '⏱️ READY'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
                    Round {currentRound + 1} of {rounds}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {!isActive && phase !== 'complete' && (
                    <button onClick={startTimer} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Start</button>
                  )}
                  {isActive && (
                    <button onClick={pauseTimer} style={{ padding: '12px 24px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Pause</button>
                  )}
                  {!isActive && phase !== 'ready' && phase !== 'complete' && (
                    <button onClick={resumeTimer} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Resume</button>
                  )}
                  <button onClick={resetTimer} style={{ padding: '12px 24px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Reset</button>
                </div>
                {phase === 'complete' && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#ecfdf5', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: emerald }}>🎉 Workout Complete!</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{rounds} rounds • {workTime}s work • {restTime}s rest</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
