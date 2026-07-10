import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaSearch, FaAppleAlt, FaBolt, FaUtensils, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function FoodNutritionSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const foodDatabase = [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, category: 'Fruit' },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, category: 'Fruit' },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, category: 'Meat' },
    { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13, fiber: 0, category: 'Seafood' },
    { name: 'Eggs', calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0, category: 'Dairy' },
    { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 2.5, fiber: 4, category: 'Grains' },
    { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6, fiber: 5, category: 'Grains' },
    { name: 'Avocado', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7, category: 'Fruit' },
    { name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, fiber: 3.8, category: 'Vegetable' },
    { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, category: 'Vegetable' },
    { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: 'Vegetable' },
    { name: 'Greek Yogurt', calories: 100, protein: 10, carbs: 4, fat: 5, fiber: 0, category: 'Dairy' },
    { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 49, fiber: 12, category: 'Nuts' },
    { name: 'Peanut Butter', calories: 188, protein: 8, carbs: 6, fat: 16, fiber: 2, category: 'Nuts' },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, category: 'Grains' },
    { name: 'Tuna', calories: 132, protein: 28, carbs: 0, fat: 1.3, fiber: 0, category: 'Seafood' },
    { name: 'Tofu', calories: 76, protein: 8, carbs: 2, fat: 4.8, fiber: 0.3, category: 'Protein' },
    { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, category: 'Legumes' },
    { name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, category: 'Fruit' },
    { name: 'Cottage Cheese', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, category: 'Dairy' },
    { name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, category: 'Nuts' },
    { name: 'Flaxseed', calories: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, category: 'Seeds' },
    { name: 'Chia Seeds', calories: 486, protein: 16, carbs: 42, fat: 31, fiber: 34, category: 'Seeds' },
    { name: 'Kale', calories: 33, protein: 3, carbs: 6, fat: 0.9, fiber: 2.6, category: 'Vegetable' },
    { name: 'Cauliflower', calories: 25, protein: 2, carbs: 5, fat: 0.1, fiber: 2, category: 'Vegetable' },
    { name: 'Strawberries', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, category: 'Fruit' },
    { name: 'Pineapple', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4, category: 'Fruit' },
    { name: 'Mango', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, category: 'Fruit' },
    { name: 'Watermelon', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, category: 'Fruit' },
    { name: 'Pumpkin Seeds', calories: 446, protein: 19, carbs: 14, fat: 29, fiber: 6, category: 'Seeds' },
    { name: 'Sunflower Seeds', calories: 584, protein: 21, carbs: 20, fat: 51, fiber: 9, category: 'Seeds' },
    { name: 'Coconut Oil', calories: 117, protein: 0, carbs: 0, fat: 13, fiber: 0, category: 'Oil' },
    { name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 14, fiber: 0, category: 'Oil' },
    { name: 'Brown Rice Pasta', calories: 200, protein: 6, carbs: 41, fat: 1.5, fiber: 3, category: 'Grains' },
    { name: 'Whole Wheat Bread', calories: 80, protein: 4, carbs: 14, fat: 1, fiber: 2, category: 'Grains' },
    { name: 'Milk', calories: 103, protein: 3.3, carbs: 4.8, fat: 2.4, fiber: 0, category: 'Dairy' },
    { name: 'Cheddar Cheese', calories: 113, protein: 7, carbs: 0.4, fat: 9, fiber: 0, category: 'Dairy' },
    { name: 'Dark Chocolate', calories: 170, protein: 2, carbs: 13, fat: 12, fiber: 3, category: 'Snack' },
    { name: 'Green Tea', calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, category: 'Beverage' },
    { name: 'Black Coffee', calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0, category: 'Beverage' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('food_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('food_history', JSON.stringify(history));
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
    const term = searchTerm.toLowerCase();
    const found = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(term) ||
      food.category.toLowerCase().includes(term)
    );
    setResults(found);
    if (found.length > 0) {
      setSelectedFood(found[0]);
      const historyEntry = { search: searchTerm, results: found.length, date: new Date().toLocaleString() };
      setHistory([historyEntry, ...history].slice(0, 20));
      localStorage.setItem('food_history', JSON.stringify(history));
      showToast(`✅ Found ${found.length} items!`, 'success');
    } else {
      showToast('No items found', 'info');
    }
  };

  const selectFood = (food) => {
    setSelectedFood(food);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setSelectedFood(null);
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
                  <FaSearch style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Food Nutrition Search</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>40+ food items with macro breakdown</p>
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
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search food items..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' }} />
                  <button onClick={searchFood} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Search</button>
                </div>
                <button onClick={clearSearch} style={{ padding: '10px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Clear</button>
                {results.length > 0 && (
                  <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                    {results.map((food, idx) => (
                      <div key={idx} onClick={() => selectFood(food)} style={{ padding: '10px 16px', borderBottom: idx < results.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', background: selectedFood?.name === food.name ? emeraldLight : 'white', fontWeight: selectedFood?.name === food.name ? '700' : '500' }}>
                        {food.name} <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({food.category})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              {selectedFood ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedFood.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>{selectedFood.category}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Calories</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>{selectedFood.calories}</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef2f2', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Protein</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444' }}>{selectedFood.protein}g</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#fef3c7', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Carbs</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#d97706' }}>{selectedFood.carbs}g</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ textAlign: 'center', background: '#ecfdf5', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Fat</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#059669' }}>{selectedFood.fat}g</div>
                    </div>
                    <div style={{ textAlign: 'center', background: '#eff6ff', padding: '12px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Fiber</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6' }}>{selectedFood.fiber}g</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b' }}>
                    💡 {selectedFood.fiber > 5 ? 'High in fiber - great for digestion!' : selectedFood.protein > 20 ? 'Excellent protein source!' : 'Good source of essential nutrients.'}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaSearch size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Search for a food to see nutrition facts</p>
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
