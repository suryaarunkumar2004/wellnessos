import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark,
  FaShoppingCart, FaStar, FaClock, FaUserMd, FaAmbulance,
  FaStethoscope, FaPills, FaHeartbeat, FaBrain, FaTooth,
  FaEye, FaChild, FaFemale, FaMale, FaBone, FaLungs,
  FaFilter, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { servicesData } from '../../data/servicesData';

const Services = () => {
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';
  
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(12);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { addToCart, cartItems } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    setServices(servicesData);
    setFilteredServices(servicesData);
    const cats = ['All', ...new Set(servicesData.map(s => s.category).filter(Boolean))];
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...services];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name?.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term) ||
        s.category?.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory);
    }
    setFilteredServices(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, services]);

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price || 299,
      type: 'service'
    });
    if (showToast) showToast(`${service.name} added to cart!`, 'success');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Cardiology': <FaHeartbeat />,
      'Pharmacy': <FaPills />,
      'General Medicine': <FaStethoscope />,
      'Emergency': <FaAmbulance />,
      'Lab Testing': <FaUserMd />,
      'Dentistry': <FaTooth />,
      'Neurology': <FaBrain />,
      'Pulmonology': <FaLungs />,
      'Ophthalmology': <FaEye />,
      'Pediatrics': <FaChild />,
      'Orthopedics': <FaBone />,
      'Gynecology': <FaFemale />,
      'Urology': <FaMale />,
      'Wellness': <FaHeartbeat />,
      'Therapy': <FaUserMd />,
      'Surgery': <FaUserMd />,
      'Alternative Medicine': <FaUserMd />,
      'Premium': <FaStar />,
      'Home Health': <FaUserMd />,
      'ENT': <FaUserMd />,
      'Rheumatology': <FaUserMd />,
      'Endocrinology': <FaUserMd />,
      'Gastroenterology': <FaUserMd />,
      'Nutrition': <FaUserMd />,
      'Psychiatry': <FaBrain />
    };
    return icons[category] || <FaStethoscope />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Cardiology': '#ef4444',
      'Pharmacy': '#8b5cf6',
      'General Medicine': '#3b82f6',
      'Emergency': '#dc2626',
      'Lab Testing': '#059669',
      'Dentistry': '#ec4899',
      'Neurology': '#7c3aed',
      'Pulmonology': '#06b6d4',
      'Ophthalmology': '#14b8a6',
      'Pediatrics': '#f59e0b',
      'Orthopedics': '#f97316',
      'Gynecology': '#db2777',
      'Urology': '#059669',
      'Wellness': '#10b981',
      'Therapy': '#6366f1',
      'Surgery': '#dc2626',
      'Alternative Medicine': '#8b5cf6',
      'Premium': '#f59e0b',
      'Home Health': '#06b6d4',
      'ENT': '#3b82f6',
      'Rheumatology': '#6366f1',
      'Endocrinology': '#14b8a6',
      'Gastroenterology': '#f59e0b',
      'Nutrition': '#22c55e',
      'Psychiatry': '#7c3aed'
    };
    return colors[category] || '#64748b';
  };

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 4.5);
    const emptyStars = 5 - fullStars;
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#f59e0b', fontSize: '0.7rem' }} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#e2e8f0', fontSize: '0.7rem' }} />
        ))}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ color: '#64748b', marginTop: '16px' }}>Loading services...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-150px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaStethoscope style={{ fontSize: '2rem', opacity: 0.9 }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                    Healthcare Services
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, margin: '2px 0 0 0', fontWeight: '300' }}>
                    {filteredServices.length} premium healthcare services available
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginTop: '16px'
              }}>
                {[
                  { label: 'Total Services', value: services.length, icon: FaStethoscope },
                  { label: 'Categories', value: categories.length - 1, icon: FaFilter },
                  { label: 'Favorites', value: favorites.filter(f => f.type === 'service').length, icon: FaHeart },
                  { label: 'Bookmarks', value: bookmarks.filter(b => b.type === 'service').length, icon: FaBookmark },
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '8px' }}>
                      <stat.icon style={{ fontSize: '1rem', color: 'white' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.2' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '12px',
              padding: '0 16px',
              border: '2px solid #e2e8f0',
              minWidth: '200px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <FaSearch style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type="text"
                placeholder="Search 200+ premium healthcare services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 14px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '12px 40px 12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                  minWidth: '140px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <FaFilter style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Found <span style={{ color: emerald, fontWeight: '700' }}>{filteredServices.length}</span> premium services
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {currentServices.map((service) => {
              const isFav = isFavorite(service.id);
              const isBookmark = isBookmarked(service.id);
              const inCart = cartItems?.some(item => item.id === service.id);
              const color = getCategoryColor(service.category);
              const priceValue = service.price || 299;

              return (
                <div
                  key={service.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    paddingTop: '44px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '380px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = emerald;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: color,
                    color: 'white',
                    padding: '3px 12px',
                    borderRadius: '12px',
                    fontSize: '0.6rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 5,
                    maxWidth: '60%'
                  }}>
                    {getCategoryIcon(service.category)}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.category || 'General'}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '10px',
                    marginTop: '4px'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `${color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      color: color,
                      flexShrink: 0
                    }}>
                      {getCategoryIcon(service.category)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: 0,
                        lineHeight: '1.2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {service.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        {renderStars(service.rating || 4.5)}
                        <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>({service.rating || 4.5})</span>
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.78rem',
                    color: '#64748b',
                    lineHeight: '1.5',
                    margin: '0 0 12px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    {service.description || 'Premium healthcare service'}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '10px',
                    flexWrap: 'wrap',
                    flexShrink: 0
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.65rem',
                      color: '#94a3b8'
                    }}>
                      <FaClock style={{ fontSize: '0.5rem', color: emerald }} />
                      {service.duration || '30 min'}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px',
                    marginTop: 'auto',
                    flexShrink: 0
                  }}>
                    <div>
                      <span style={{ fontSize: '0.55rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Price</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: emerald }}>
                        ${priceValue}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(service.id, { id: service.id, name: service.name, type: 'service', category: service.category }); }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isFav ? '#fef2f2' : 'white',
                          color: isFav ? '#ef4444' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        {isFav ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(service.id, { id: service.id, name: service.name, type: 'service', category: service.category }); }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isBookmark ? '#fffbeb' : 'white',
                          color: isBookmark ? '#f59e0b' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        {isBookmark ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(service); }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: inCart ? '#d1fae5' : emerald,
                          color: inCart ? '#047857' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontWeight: '600',
                          fontSize: '0.7rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FaShoppingCart style={{ fontSize: '0.65rem' }} />
                        {inCart ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '20px',
              marginBottom: '40px',
              padding: '16px 0'
            }}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: currentPage === 1 ? '#e2e8f0' : '#64748b',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.85rem'
                }}
              >
                <FaArrowLeft />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: currentPage === pageNum ? `2px solid ${emerald}` : '1px solid #e2e8f0',
                      background: currentPage === pageNum ? emerald : 'white',
                      color: currentPage === pageNum ? 'white' : '#64748b',
                      cursor: 'pointer',
                      fontWeight: currentPage === pageNum ? '700' : '500',
                      transition: 'all 0.2s ease',
                      fontSize: '0.85rem'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: currentPage === totalPages ? '#e2e8f0' : '#64748b',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.85rem'
                }}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
      </>
  );
};

export default Services;
