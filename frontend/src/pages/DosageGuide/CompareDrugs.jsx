import React from 'react';
import Footer from '../../components/Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaShoppingCart, FaHeart, FaBookmark } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const CompareDrugs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const compareList = location.state?.compareList || [];
  const emerald = '#059669';

  if (compareList.length === 0) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>No Drugs to Compare</h2>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Please add drugs to compare from the Dosage Guide.</p>
          <button onClick={() => navigate('/dosage-guide')} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Go to Dosage Guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/dosage-guide')} style={{ padding: '10px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft /> Back
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Compare Drugs ({compareList.length})</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(compareList.length, 4)}, 1fr)`, gap: '24px' }}>
          {compareList.map((drug) => (
            <div key={drug.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{drug.name}</h3>
              <p style={{ fontSize: '0.9rem', color: emerald, fontWeight: '500', marginBottom: '8px' }}>{drug.category}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <FaStar style={{ color: '#f59e0b' }} />
                <span style={{ fontWeight: '600' }}>{drug.rating}</span>
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: '700', color: emerald, marginBottom: '8px' }}>${drug.price}</p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '12px' }}>{drug.description}</p>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px' }}>
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}><strong>Dosage:</strong> {drug.dosage}</p>
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}><strong>Side Effects:</strong> {Array.isArray(drug.sideEffects) ? drug.sideEffects.join(', ') : drug.sideEffects}</p>
                <p style={{ fontSize: '0.8rem', color: '#475569' }}><strong>Availability:</strong> {drug.availability}</p>
              </div>
              <button onClick={() => { addToCart({ id: drug.id, name: drug.name, price: parseFloat(drug.price) || 0, category: drug.category, quantity: 1 }); alert(`${drug.name} added to cart!`); }} style={{ width: '100%', padding: '10px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </div>
  );
};

export default CompareDrugs;
