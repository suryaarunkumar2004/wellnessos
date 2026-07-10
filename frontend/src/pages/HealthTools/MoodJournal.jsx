import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBook, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function MoodJournal() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const moodOptions = [
    { value: 'amazing', label: 'Amazing', icon: '😍', color: '#22c55e' },
    { value: 'good', label: 'Good', icon: '😊', color: '#3b82f6' },
    { value: 'okay', label: 'Okay', icon: '😐', color: '#f59e0b' },
    { value: 'bad', label: 'Bad', icon: '😞', color: '#f97316' },
    { value: 'terrible', label: 'Terrible', icon: '😢', color: '#ef4444' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('mood_journal_entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (entries.length > 0) localStorage.setItem('mood_journal_entries', JSON.stringify(entries));
  }, [entries]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addEntry = () => {
    if (!mood) {
      showToast('Please select a mood', 'error');
      return;
    }
    const moodData = moodOptions.find(m => m.value === mood);
    const entry = {
      id: Date.now(),
      date,
      mood,
      moodLabel: moodData.label,
      moodColor: moodData.color,
      note: note || 'No notes',
      timestamp: new Date().toISOString()
    };
    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
      showToast('✅ Entry updated!', 'success');
    } else {
      setEntries([entry, ...entries]);
      showToast('✅ Journal entry saved!', 'success');
    }
    setMood('');
    setNote('');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    showToast('🗑 Entry removed', 'info');
  };

  const editEntry = (entry) => {
    setMood(entry.mood);
    setNote(entry.note);
    setDate(entry.date);
    setEditingId(entry.id);
  };

  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem('mood_journal_entries');
    showToast('All entries cleared', 'info');
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
                  <FaBook style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Mood Journal</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Daily emotional reflection and tracking</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>
                {editingId ? '✏️ Edit Entry' : '📝 New Journal Entry'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {moodOptions.map((m) => (
                    <button key={m.value} onClick={() => setMood(m.value)}
                      style={{
                        padding: '10px', borderRadius: '10px', border: `2px solid ${mood === m.value ? m.color : '#e2e8f0'}`,
                        background: mood === m.value ? m.color + '20' : 'white',
                        color: mood === m.value ? m.color : '#64748b',
                        fontWeight: '700', cursor: 'pointer', textAlign: 'center'
                      }}>
                      <div style={{ fontSize: '1.5rem' }}>{m.icon}</div>
                      {m.label}
                    </button>
                  ))}
                </div>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What's on your mind?" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', resize: 'vertical', minHeight: '80px' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={addEntry} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  {editingId && <button onClick={() => { setEditingId(null); setMood(''); setNote(''); }} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>}
                </div>
              </div>
            </div>
            <div>
              {entries.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>Your Journal ({entries.length})</h3>
                    <button onClick={clearEntries} style={{ padding: '6px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Clear</button>
                  </div>
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    {entries.slice(0, 15).map((entry) => {
                      const moodData = moodOptions.find(m => m.value === entry.mood);
                      return (
                        <div key={entry.id} style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ color: moodData.color, fontWeight: '700' }}>{moodData.icon} {moodData.label}</span>
                              <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '8px' }}>{entry.date}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => editEntry(entry)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}>✏️</button>
                              <button onClick={() => deleteEntry(entry.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444' }}>🗑</button>
                            </div>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{entry.note}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBook size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start journaling your daily mood</p>
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
