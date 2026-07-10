import React from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Compare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const compareList = location.state?.compareList || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} style={{ color: '#facc15' }} />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" style={{ color: '#facc15' }} />);
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} style={{ color: '#facc15' }} />);
    return stars;
  };

  if (compareList.length === 0) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '100vh', background: '#f5f7fc' }}>
        <h2 style={{ color: '#1f2937' }}>No services to compare</h2>
        <p style={{ color: '#6b7280' }}>Add services from the Services page to compare them here.</p>
        <button onClick={() => navigate('/services')} style={{ background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '16px' }}>Browse Services</button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#f5f7fc', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <button onClick={() => navigate('/services')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem' }}>
          <FaArrowLeft /> Back to Services
        </button>
        
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>Compare Services ({compareList.length})</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(compareList.length, 4)}, 1fr)`, gap: '20px' }}>
          {compareList.map((service) => (
            <div key={service.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>{service.name}</h3>
              <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', padding: '2px 10px', borderRadius: '999px', fontSize: '0.75rem', marginTop: '8px' }}>{service.category}</span>
              <div style={{ marginTop: '12px' }}>{renderStars(service.rating)}</div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '8px' }}>{service.description}</p>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Duration:</strong> {service.duration}</p>
                <p><strong>Rating:</strong> {service.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </div>
  );
};

export default Compare;
