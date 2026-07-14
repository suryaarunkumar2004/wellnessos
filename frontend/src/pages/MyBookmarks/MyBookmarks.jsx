import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaArrowLeft, FaTrash } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { servicesData } from '../../data/servicesData';
import { drugDatabase } from '../../services/drugDatabase';
import { useBookmarks } from '../../contexts/BookmarksContext';

const MyBookmarks = () => {
  const navigate = useNavigate();
  const emerald = '#059669';
  const { bookmarks, toggleBookmark, loading } = useBookmarks();

  const validBookmarks = Array.isArray(bookmarks) ? bookmarks.filter(b => b && (b.id !== undefined && b.id !== null)) : [];

  const items = validBookmarks.map(f => {
    if (f.type === 'drug') {
      const d = drugDatabase.find(d => d.id === f.id);
      return {
        id: `drug-${f.id}`,
        originalId: f.id,
        name: d?.name || f.name || `Medication #${f.id}`,
        category: d?.category || f.category || 'Medication',
        price: d?.price || f.price || 49,
        type: 'Drug',
        icon: '💊',
        description: d?.description || f.description || 'Prescription medication',
        source: 'Dosage Guide',
        path: `/dosage-guide/${f.id}`
      };
    } else if (f.type === 'blog') {
      return {
        id: `blog-${f.id}`,
        originalId: f.id,
        name: f.name || f.title || `Blog Post #${f.id}`,
        category: f.category || 'Health Article',
        type: 'Blog',
        icon: '📝',
        description: f.description || 'Health article & insights',
        source: 'Blog',
        path: `/blog/${f.id}`
      };
    } else if (f.type === 'doctor') {
      return {
        id: `doctor-${f.id}`,
        originalId: f.id,
        name: f.name || f.doctor || `Dr. Consultant #${f.id}`,
        category: f.specialty || f.category || 'Medical Specialist',
        type: 'Doctor',
        icon: '👨‍⚕️',
        description: f.bio || 'Board-certified medical specialist',
        source: 'Telehealth',
        path: `/doctors`
      };
    } else {
      const s = servicesData.find(s => s.id === f.id);
      return {
        id: `service-${f.id}`,
        originalId: f.id,
        name: s?.name || f.name || f.title || `Service #${f.id}`,
        category: s?.category || f.category || 'General Service',
        price: s?.price || f.price || 199,
        type: 'Service',
        icon: '🏥',
        description: s?.description || f.description || 'Premium healthcare service',
        source: 'Services',
        path: `/services/${f.id}`
      };
    }
  });

  const handleRemove = (originalId) => {
    toggleBookmark(originalId);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #ecfdf5', borderTopColor: '#059669', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ color: '#94a3b8' }}>Loading...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '24px', fontFamily: 'inherit' }}>
            <FaArrowLeft /> Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '16px' }}>
              <FaBookmark style={{ fontSize: '2rem', color: '#d97706' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Your Bookmarks</h1>
              <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>{items.length} items saved</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
              <FaBookmark style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '8px' }}>No Bookmarks Yet</h3>
              <p style={{ color: '#94a3b8' }}>Click the 🔖 icon on any service, drug, or blog post to save it here.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/services')} style={{ padding: '10px 20px', background: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Browse Services</button>
                <button onClick={() => navigate('/dosage-guide')} style={{ padding: '10px 20px', background: 'white', color: '#059669', border: '2px solid #059669', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Browse Drugs</button>
                <button onClick={() => navigate('/blog')} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Browse Blog</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {items.map(item => (
                <div key={item.id} onClick={() => navigate(item.path)} style={{ background: 'white', borderRadius: '16px', padding: '16px 18px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = emerald; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                      <span style={{ background: '#ecfdf5', color: emerald, padding: '2px 10px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: '600' }}>{item.type}</span>
                      <span style={{ background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '12px', fontSize: '0.55rem', fontWeight: '500' }}>{item.source}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleRemove(item.originalId); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}><FaTrash /></button>
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', margin: '6px 0 2px 0' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 6px 0' }}>{item.category}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    {item.price && <span style={{ fontWeight: '700', color: emerald }}>${item.price}</span>}
                    {!item.price && <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>📖 Article</span>}
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>🔖 Bookmarked</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default MyBookmarks;
