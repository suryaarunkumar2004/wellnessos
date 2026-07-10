import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaAppleAlt, FaUtensils, FaClock, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function MealPlanner() {
  const [goal, setGoal] = useState('balanced');
  const [meals, setMeals] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const mealDatabase = {
    balanced: {
      name: 'Balanced Diet',
      meals: [
        { day: 'Monday', breakfast: 'Oatmeal with berries and almonds', lunch: 'Grilled chicken salad with olive oil dressing', dinner: 'Salmon with quinoa and roasted vegetables', calories: 1800, protein: '45g', carbs: '65g', fat: '30g' },
        { day: 'Tuesday', breakfast: 'Greek yogurt with granola and honey', lunch: 'Turkey and avocado wrap with whole grain tortilla', dinner: 'Stir-fry tofu and vegetables with brown rice', calories: 1750, protein: '42g', carbs: '60g', fat: '28g' },
        { day: 'Wednesday', breakfast: 'Smoothie bowl with banana, spinach, and chia seeds', lunch: 'Quinoa and chickpea bowl with tahini dressing', dinner: 'Grilled fish with sweet potato and asparagus', calories: 1850, protein: '48g', carbs: '70g', fat: '32g' },
        { day: 'Thursday', breakfast: 'Eggs with whole grain toast and avocado', lunch: 'Lentil soup with side salad', dinner: 'Chicken breast with broccoli and wild rice', calories: 1700, protein: '40g', carbs: '55g', fat: '25g' },
        { day: 'Friday', breakfast: 'Protein pancakes with berries', lunch: 'Tuna salad sandwich on whole grain bread', dinner: 'Pasta with vegetables and lean meat sauce', calories: 1900, protein: '50g', carbs: '75g', fat: '35g' },
        { day: 'Saturday', breakfast: 'Avocado toast with poached eggs', lunch: 'Grilled vegetable wrap with hummus', dinner: 'Steak with roasted vegetables and potatoes', calories: 1950, protein: '52g', carbs: '72g', fat: '38g' },
        { day: 'Sunday', breakfast: 'French toast with fresh fruit', lunch: 'Mediterranean bowl with olives and feta', dinner: 'Baked chicken with rice and steamed vegetables', calories: 1850, protein: '46g', carbs: '68g', fat: '30g' }
      ]
    },
    vegetarian: {
      name: 'Vegetarian Diet',
      meals: [
        { day: 'Monday', breakfast: 'Oatmeal with almonds and dried fruit', lunch: 'Chickpea salad with lemon dressing', dinner: 'Vegetable curry with basmati rice', calories: 1600, protein: '35g', carbs: '55g', fat: '22g' },
        { day: 'Tuesday', breakfast: 'Green smoothie with spinach and banana', lunch: 'Quinoa and vegetable bowl', dinner: 'Lentil soup with whole grain bread', calories: 1550, protein: '32g', carbs: '50g', fat: '20g' },
        { day: 'Wednesday', breakfast: 'Fruit and nut granola with plant milk', lunch: 'Vegetable wrap with avocado', dinner: 'Tofu stir-fry with vegetables', calories: 1650, protein: '38g', carbs: '58g', fat: '25g' },
        { day: 'Thursday', breakfast: 'Avocado toast on rye bread', lunch: 'Hummus and vegetable sandwich', dinner: 'Pasta with vegetables and pesto', calories: 1600, protein: '34g', carbs: '52g', fat: '24g' },
        { day: 'Friday', breakfast: 'Berry smoothie bowl', lunch: 'Falafel wrap with tahini sauce', dinner: 'Vegetable curry with naan bread', calories: 1700, protein: '36g', carbs: '60g', fat: '26g' },
        { day: 'Saturday', breakfast: 'Pancakes with berries and maple syrup', lunch: 'Quinoa salad with vegetables', dinner: 'Stuffed peppers with rice and beans', calories: 1650, protein: '35g', carbs: '55g', fat: '23g' },
        { day: 'Sunday', breakfast: 'Yogurt and fruit parfait', lunch: 'Vegetable and cheese sandwich', dinner: 'Mushroom risotto with asparagus', calories: 1600, protein: '33g', carbs: '52g', fat: '22g' }
      ]
    },
    highProtein: {
      name: 'High Protein Diet',
      meals: [
        { day: 'Monday', breakfast: 'Egg white omelet with vegetables', lunch: 'Grilled chicken breast with quinoa', dinner: 'Salmon with roasted vegetables', calories: 2000, protein: '65g', carbs: '45g', fat: '30g' },
        { day: 'Tuesday', breakfast: 'Protein shake with oats and berries', lunch: 'Turkey and cheese wrap', dinner: 'Steak with broccoli and sweet potato', calories: 2100, protein: '70g', carbs: '50g', fat: '35g' },
        { day: 'Wednesday', breakfast: 'Greek yogurt with nuts and seeds', lunch: 'Chicken salad with mixed greens', dinner: 'Fish with quinoa and asparagus', calories: 1950, protein: '62g', carbs: '42g', fat: '28g' },
        { day: 'Thursday', breakfast: 'Eggs with turkey sausage', lunch: 'Tuna sandwich on whole grain bread', dinner: 'Chicken thigh with vegetables and rice', calories: 2050, protein: '68g', carbs: '48g', fat: '32g' },
        { day: 'Friday', breakfast: 'Protein pancakes with peanut butter', lunch: 'Beef and vegetable stir-fry', dinner: 'Salmon with sweet potato and green beans', calories: 2150, protein: '72g', carbs: '52g', fat: '38g' },
        { day: 'Saturday', breakfast: 'Omelet with cheese and ham', lunch: 'Chicken wrap with avocado', dinner: 'Pork chop with vegetables and potatoes', calories: 2100, protein: '69g', carbs: '50g', fat: '36g' },
        { day: 'Sunday', breakfast: 'Scrambled eggs with bacon', lunch: 'Protein bowl with chicken and rice', dinner: 'Grilled fish with vegetables and quinoa', calories: 2000, protein: '66g', carbs: '46g', fat: '30g' }
      ]
    },
    keto: {
      name: 'Ketogenic Diet',
      meals: [
        { day: 'Monday', breakfast: 'Eggs with bacon and avocado', lunch: 'Chicken salad with mayo and greens', dinner: 'Steak with buttered vegetables', calories: 1800, protein: '55g', carbs: '15g', fat: '60g' },
        { day: 'Tuesday', breakfast: 'Bulletproof coffee with butter and MCT oil', lunch: 'Tuna salad with olive oil', dinner: 'Salmon with cream sauce and asparagus', calories: 1750, protein: '52g', carbs: '12g', fat: '58g' },
        { day: 'Wednesday', breakfast: 'Cheese and egg muffin cups', lunch: 'Caesar salad with chicken and parmesan', dinner: 'Pork chops with cauliflower mash', calories: 1850, protein: '58g', carbs: '14g', fat: '62g' },
        { day: 'Thursday', breakfast: 'Avocado and eggs with cheese', lunch: 'Turkey and cheese roll-ups', dinner: 'Beef stir-fry with vegetables', calories: 1700, protein: '50g', carbs: '10g', fat: '55g' },
        { day: 'Friday', breakfast: 'Cream cheese pancakes', lunch: 'Chicken thighs with olive oil', dinner: 'Grilled fish with garlic butter and greens', calories: 1900, protein: '60g', carbs: '13g', fat: '65g' },
        { day: 'Saturday', breakfast: 'Eggs with sausage and cheese', lunch: 'Salmon salad with mayo', dinner: 'Ribeye steak with roasted vegetables', calories: 1950, protein: '62g', carbs: '11g', fat: '68g' },
        { day: 'Sunday', breakfast: 'Bacon and eggs with avocado', lunch: 'Chicken and cheese lettuce wraps', dinner: 'Lamb chops with green beans', calories: 1850, protein: '56g', carbs: '12g', fat: '60g' }
      ]
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('meal_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length > 0) localStorage.setItem('meal_history', JSON.stringify(history));
  }, [history]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generateMealPlan = () => {
    const plan = mealDatabase[goal];
    setMeals(plan.meals);
    const resultData = {
      goal: goal,
      planName: plan.name,
      meals: plan.meals,
      date: new Date().toLocaleString()
    };
    setResult(resultData);
    setHistory([resultData, ...history].slice(0, 20));
    showToast(`✅ ${plan.name} meal plan generated!`, 'success');
  };

  const resetPlanner = () => { setMeals([]); setResult(null); showToast('Reset', 'info'); };
  const clearHistory = () => { setHistory([]); localStorage.removeItem('meal_history'); showToast('History cleared', 'info'); };

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
                  <FaAppleAlt style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Meal Planner</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>4 diet plans with detailed 7-day meal plans</p>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Choose Your Plan</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['balanced', 'vegetarian', 'highProtein', 'keto'].map(g => (
                    <button key={g} onClick={() => setGoal(g)} style={{ padding: '10px', borderRadius: '10px', border: `2px solid ${goal === g ? emerald : '#e2e8f0'}`, background: goal === g ? emeraldLight : 'white', color: goal === g ? emerald : '#64748b', fontWeight: '700', cursor: 'pointer' }}>
                      {g === 'balanced' ? '⚖️ Balanced' : g === 'vegetarian' ? '🥗 Vegetarian' : g === 'highProtein' ? '💪 High Protein' : '🥩 Keto'}
                    </button>
                  ))}
                </div>
                <button onClick={generateMealPlan} style={{ padding: '14px', background: emerald, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Generate 7-Day Plan</button>
              </div>
            </div>

            <div>
              {meals.length > 0 ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{result?.planName || 'Meal Plan'}</h3>
                  <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {meals.map((meal, idx) => (
                      <div key={idx} style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: '700', color: emerald }}>{meal.day}</div>
                        <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>🍳 {meal.breakfast}</div>
                        <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>🥗 {meal.lunch}</div>
                        <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>🍽️ {meal.dinner}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', gap: '12px', marginTop: '2px' }}>
                          <span>{meal.calories} kcal</span>
                          <span>💪 {meal.protein}</span>
                          <span>⚡ {meal.carbs}</span>
                          <span>🥑 {meal.fat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaAppleAlt size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Choose a plan to generate your meal plan</p>
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
