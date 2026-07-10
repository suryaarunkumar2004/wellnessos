import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBook, FaHistory, FaDownload, FaPrint, FaShare, FaTrash } from 'react-icons/fa';

export default function FoodDiary() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    const saved = localStorage.getItem('fooddiary_entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (entries.length > 0) localStorage.setItem('fooddiary_entries', JSON.stringify(entries));
    calculateTotal();
  }, [entries]);

  const calculateTotal = () => {
    const todayEntries = entries.filter(e => e.date === date);
    const total = todayEntries.reduce((sum, e) => sum + parseInt(e.calories), 0);
    setTotalCalories(total);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addEntry = () => {
    if (!foodName || !calories) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const entry = {
      id: Date.now(),
      foodName,
      calories: parseInt(calories),
      mealType,
      date,
      timestamp: new Date().toISOString()
    };
    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
      showToast('✅ Entry updated!', 'success');
    } else {
      setEntries([entry, ...entries]);
      showToast('✅ Food logged!', 'success');
    }
    setFoodName('');
    setCalories('');
    setMealType('breakfast');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    showToast('🗑 Entry removed', 'info');
  };

  const editEntry = (entry) => {
    setFoodName(entry.foodName);
    setCalories(entry.calories.toString());
    setMealType(entry.mealType);
    setEditingId(entry.id);
  };

  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem('fooddiary_entries');
    showToast('All entries cleared', 'info');
  };

  const getMealEmoji = (type) => ({
    breakfast: '🍳',
    lunch: '🥗',
    dinner: '🍽️',
    snack: '🍿'
  }[type] || '🍽️');

  const getTodayEntries = () => entries.filter(e => e.date === date);

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
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Food Diary</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Log and analyse daily calorie intake</p>
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
                {editingId ? '✏️ Edit Entry' : '📝 Log Food'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="text" value={foodName} onChange={e => setFoodName(e.target.value)} placeholder="Food Name *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" value={calories} onChange={e => setCalories(e.target.value)} placeholder="Calories *" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['breakfast', 'lunch', 'dinner', 'snack'].map(m => (
                    <button key={m} onClick={() => setMealType(m)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `2px solid ${mealType === m ? emerald : '#e2e8f0'}`, background: mealType === m ? emeraldLight : 'white', color: mealType === m ? emerald : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                      {getMealEmoji(m)} {m}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={addEntry} style={{ flex: 2, padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                    {editingId ? 'Update' : 'Add'}
                  </button>
                  {editingId && <button onClick={() => { setEditingId(null); setFoodName(''); setCalories(''); }} style={{ flex: 1, padding: '14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>}
                </div>
              </div>
            </div>
            <div>
              {entries.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>Today's Log</h3>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: emerald }}>{totalCalories} kcal</span>
                      <button onClick={clearEntries} style={{ marginLeft: '8px', padding: '4px 8px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer' }}>Clear</button>
                    </div>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {getTodayEntries().map((entry) => (
                      <div key={entry.id} style={{ padding: '10px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '700', color: '#1e293b' }}>{getMealEmoji(entry.mealType)} {entry.foodName}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{entry.mealType}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontWeight: '700', color: emerald }}>{entry.calories} cal</span>
                          <button onClick={() => editEntry(entry)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}>✏️</button>
                          <button onClick={() => deleteEntry(entry.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444' }}>��</button>
                        </div>
                      </div>
                    ))}
                    {getTodayEntries().length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No entries for today</div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBook size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Start logging your daily food intake</p>
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
