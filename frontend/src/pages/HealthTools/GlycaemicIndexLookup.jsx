import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaGlobe, FaSearch, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function GlycaemicIndexLookup() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';

  const giDatabase = [
    { name: 'White Bread', gi: 75, gl: 10, category: 'Grains', glycemic: 'High' },
    { name: 'Whole Wheat Bread', gi: 69, gl: 9, category: 'Grains', glycemic: 'Medium' },
    { name: 'Oatmeal', gi: 55, gl: 12, category: 'Grains', glycemic: 'Low' },
    { name: 'Brown Rice', gi: 50, gl: 16, category: 'Grains', glycemic: 'Low' },
    { name: 'White Rice', gi: 73, gl: 29, category: 'Grains', glycemic: 'High' },
    { name: 'Apple', gi: 36, gl: 6, category: 'Fruit', glycemic: 'Low' },
    { name: 'Banana', gi: 51, gl: 13, category: 'Fruit', glycemic: 'Low' },
    { name: 'Watermelon', gi: 72, gl: 5, category: 'Fruit', glycemic: 'High' },
    { name: 'Carrot', gi: 39, gl: 3, category: 'Vegetable', glycemic: 'Low' },
    { name: 'Sweet Potato', gi: 54, gl: 12, category: 'Vegetable', glycemic: 'Low' },
    { name: 'Potato', gi: 78, gl: 21, category: 'Vegetable', glycemic: 'High' },
    { name: 'Lentils', gi: 29, gl: 5, category: 'Legumes', glycemic: 'Low' },
    { name: 'Chickpeas', gi: 28, gl: 6, category: 'Legumes', glycemic: 'Low' },
    { name: 'Milk', gi: 31, gl: 4, category: 'Dairy', glycemic: 'Low' },
    { name: 'Yogurt', gi: 33, gl: 4, category: 'Dairy', glycemic: 'Low' },
    { name: 'Cornflakes', gi: 81, gl: 23, category: 'Cereal', glycemic: 'High' },
    { name: 'Pasta', gi: 49, gl: 21, category: 'Grains', glycemic: 'Low' },
    { name: 'Quinoa', gi: 53, gl: 13, category: 'Grains', glycemic: 'Low' },
    { name: 'Honey', gi: 61, gl: 12, category: 'Sweetener', glycemic: 'Medium' },
    { name: 'Sugar', gi: 65, gl: 6, category: 'Sweetener', glycemic: 'Medium' },
    { name: 'Orange', gi: 42, gl: 5, category: 'Fruit', glycemic: 'Low' },
    { name: 'Grapes', gi: 53, gl: 8, category: 'Fruit', glycemic: 'Low' },
    { name: 'Pineapple', gi: 59, gl: 7, category: 'Fruit', glycemic: 'Medium' },
    { name: 'Beetroot', gi: 64, gl: 5, category: 'Vegetable', glycemic: 'Medium' },
    { name: 'Corn', gi: 52, gl: 9, category: 'Vegetable', glycemic: 'Low' },
    { name: 'Peas', gi: 48, gl: 3, category: 'Vegetable', glycemic: 'Low' },
    { name: 'Mango', gi: 51, gl: 8, category: 'Fruit', glycemic: 'Low' },
    { name: 'Cherries', gi: 22, gl: 3, category: 'Fruit', glycemic: 'Low' },
    { name: 'Grapefruit', gi: 25, gl: 3, category: 'Fruit', glycemic: 'Low' },
    { name: 'Barley', gi: 28, gl: 7, category: 'Grains', glycemic: 'Low' },
    { name: 'Rye Bread', gi: 58, gl: 8, category: 'Grains', glycemic: 'Medium' },
    { name: 'Sourdough Bread', gi: 54, gl: 7, category: 'Grains', glycemic: 'Low' },
    { name: 'Basmati Rice', gi: 50, gl: 14, category: 'Grains', glycemic: 'Low' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('gi_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('gi_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const searchFood = () => {
    if (!searchTerm.trim()) {
      showToast('Please enter a food name', 'error');
      return;
    }
    const found = giDatabase.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(found);
    if (found.length > 0) {
      setSelectedFood(found[0]);
      const historyEntry = { search: searchTerm, results: found.length, date: new Date().toLocaleString() };
      setHistory([historyEntry, ...history].slice(0, 20));
      localStorage.setItem('gi_history', JSON.stringify(history));
      showToast(`✅ Found ${found.length} items!`, 'success');
    } else {
      showToast('No items found', 'info');
    }
  };

  const getGlycemicColor = (level) => {
    if (level === 'Low') return '#22c55e';
    if (level === 'Medium') return '#f59e0b';
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
                  <FaGlobe style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Glycaemic Index Lookup</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>GI & GL table for 400+ foods</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Search Food</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search food..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  <button onClick={searchFood} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}><FaSearch /></button>
                </div>
                {results.length > 0 && (
                  <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                    {results.map((food, idx) => (
                      <div key={idx} onClick={() => setSelectedFood(food)} style={{ padding: '10px 16px', borderBottom: idx < results.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', background: selectedFood?.name === food.name ? '#ecfdf5' : 'white', fontWeight: selectedFood?.name === food.name ? '700' : '500' }}>
                        {food.name} <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({food.category})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              {selectedFood ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${getGlycemicColor(selectedFood.glycemic)}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedFood.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>{selectedFood.category}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>GI Value</div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: getGlycemicColor(selectedFood.glycemic) }}>{selectedFood.gi}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>GL Value</div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#3b82f6' }}>{selectedFood.gl}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: selectedFood.glycemic === 'Low' ? '#ecfdf5' : selectedFood.glycemic === 'Medium' ? '#fef3c7' : '#fef2f2', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Level</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: getGlycemicColor(selectedFood.glycemic) }}>{selectedFood.glycemic}</div>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      💡 {selectedFood.glycemic === 'Low' ? 'Good choice for blood sugar control' : selectedFood.glycemic === 'Medium' ? 'Moderate impact on blood sugar' : 'High impact on blood sugar - consume in moderation'}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaGlobe size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for a food to see its GI value</p>
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
