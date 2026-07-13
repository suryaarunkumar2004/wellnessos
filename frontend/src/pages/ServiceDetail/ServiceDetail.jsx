import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaStar, FaRegStar, FaEdit, FaCalendarAlt, FaClock, 
  FaLanguage, FaHeart, FaRegHeart, FaShoppingCart, 
  FaArrowLeft, FaUserMd, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaBookmark, FaRegBookmark, FaTrash
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { servicesData } from '../../data/servicesData';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Priya S.', rating: 5, comment: 'Excellent service! The doctor was very thorough and caring.', date: '2025-06-15' },
    { id: 2, user: 'Rahul K.', rating: 4, comment: 'Very professional team. A bit pricey but totally worth it.', date: '2025-06-10' },
    { id: 3, user: 'Ananya M.', rating: 5, comment: 'Life-changing experience! Highly recommend this service.', date: '2025-06-05' },
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', date: '', time: '10:00' });
  
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    const foundService = servicesData.find(s => s.id === parseInt(id));
    if (foundService) {
      setService(foundService);
    }
    setLoading(false);
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 4.5);
    const emptyStars = 5 - fullStars;
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#e2e8f0', fontSize: '0.9rem' }} />
        ))}
      </span>
    );
  };

  const addReview = () => {
    if (!newReview.comment.trim()) return;
    const review = {
      id: Date.now(),
      user: 'You',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.date) {
      alert('Please fill all booking details');
      return;
    }
    alert('✅ Booking confirmed! You will receive a confirmation email shortly.');
    setShowBookingModal(false);
    setBookingData({ name: '', email: '', date: '', time: '10:00' });
  };

  const isFav = isFavorite(parseInt(id));
  const isBookmark = isBookmarked(parseInt(id));

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading service details...</p>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#1e293b' }}>Service Not Found</h2>
          <p style={{ color: '#64748b' }}>The service you're looking for doesn't exist.</p>
          <Link to="/services" style={{ color: '#059669', textDecoration: 'none', marginTop: '16px' }}>← Back to Services</Link>
        </div>
      </>
    );
  }

  const priceValue = typeof service.price === 'number' ? service.price : parseInt(service.price) || 299;

  return (
    <>
      <Navbar />
      <div style={{ 
        paddingTop: '80px', 
        minHeight: '100vh', 
        background: '#f8fafc', 
        fontFamily: "'Inter', system-ui, sans-serif" 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <button
            onClick={() => navigate('/services')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginBottom: '24px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#059669'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
          >
            <FaArrowLeft /> Back to Services
          </button>

          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '40px', 
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div style={{ flex: 2, minWidth: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ 
                      display: 'inline-block',
                      background: '#f1f5f9',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#475569',
                      marginBottom: '8px'
                    }}>
                      {service.category || 'General'}
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                      {service.name}
                    </h1>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleFavorite(service.id, { name: service.name, type: 'service', category: service.category })}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: isFav ? '#fef2f2' : 'white',
                        color: isFav ? '#ef4444' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isFav ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button
                      onClick={() => toggleBookmark(service.id, { name: service.name, type: 'service', category: service.category })}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: isBookmark ? '#fffbeb' : 'white',
                        color: isBookmark ? '#f59e0b' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isBookmark ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>Duration:</span> {service.duration || '30 min'}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    {renderStars(service.rating || 4.5)}
                    <span style={{ marginLeft: '4px' }}>({service.rating || 4.5})</span>
                  </span>
                </div>

                <p style={{ 
                  fontSize: '1rem', 
                  color: '#475569', 
                  lineHeight: '1.8', 
                  marginTop: '20px',
                  marginBottom: '24px'
                }}>
                  {service.description}
                </p>

                <div style={{ 
                  background: '#f8fafc', 
                  padding: '20px', 
                  borderRadius: '16px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                    Price Breakdown
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ color: '#64748b' }}>Base Price</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>${priceValue}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ color: '#64748b' }}>Estimated Tax (10%)</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>${(priceValue * 0.1).toFixed(0)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '12px 0 0 0',
                    borderTop: '2px solid #e2e8f0',
                    marginTop: '4px',
                    fontWeight: '700',
                    color: '#059669'
                  }}>
                    <span>Total</span>
                    <span style={{ fontSize: '1.2rem' }}>${(priceValue * 1.1).toFixed(0)}</span>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                    Reviews ({reviews.length})
                  </h3>

                  <div style={{ 
                    background: '#f8fafc', 
                    padding: '20px', 
                    borderRadius: '16px', 
                    marginBottom: '16px' 
                  }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                      Add your review
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Your rating:</span>
                      {[1,2,3,4,5].map(r => (
                        <FaStar 
                          key={r} 
                          style={{ 
                            color: r <= newReview.rating ? '#f59e0b' : '#e2e8f0', 
                            cursor: 'pointer', 
                            fontSize: '1.2rem' 
                          }} 
                          onClick={() => setNewReview({...newReview, rating: r})} 
                        />
                      ))}
                    </div>
                    <textarea 
                      rows="3" 
                      style={{ 
                        width: '100%', 
                        padding: '10px 14px', 
                        borderRadius: '10px', 
                        border: '1px solid #e2e8f0',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        resize: 'vertical'
                      }} 
                      placeholder="Write your experience..." 
                      value={newReview.comment} 
                      onChange={e => setNewReview({...newReview, comment: e.target.value})} 
                    />
                    <button 
                      onClick={addReview} 
                      style={{ 
                        marginTop: '12px', 
                        background: '#059669', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 20px', 
                        borderRadius: '10px', 
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.85rem'
                      }}
                    >
                      Submit Review
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {reviews.map(r => (
                      <div key={r.id} style={{ 
                        border: '1px solid #f1f5f9', 
                        padding: '16px', 
                        borderRadius: '12px',
                        background: 'white'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: '#1e293b' }}>{r.user}</strong>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.date}</span>
                        </div>
                        <div style={{ marginTop: '4px' }}>{renderStars(r.rating)}</div>
                        <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#475569' }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '16px', 
                  padding: '24px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                    Book this service
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <FaCalendarAlt style={{ color: '#94a3b8' }} />
                    <input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0',
                        fontSize: '0.85rem',
                        flex: 1,
                        outline: 'none',
                        fontFamily: 'inherit'
                      }} 
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <FaClock style={{ color: '#94a3b8' }} />
                    <select 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0',
                        fontSize: '0.85rem',
                        flex: 1,
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>2:00 PM</option>
                      <option>4:00 PM</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => setShowBookingModal(true)} 
                    style={{ 
                      width: '100%', 
                      background: '#059669', 
                      color: 'white', 
                      border: 'none', 
                      padding: '12px', 
                      borderRadius: '10px', 
                      fontWeight: '700', 
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#047857'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#059669'; }}
                  >
                    Book Now
                  </button>
                </div>

                <button 
                  onClick={() => addToCart({ id: service.id, name: service.name, price: priceValue, type: 'service' })}
                  style={{ 
                    width: '100%', 
                    background: 'white', 
                    color: '#059669', 
                    border: '2px solid #059669', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    marginBottom: '20px'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#ecfdf5'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                    You may also like
                  </h4>
                  {servicesData
                    .filter(s => s.id !== service.id && s.category === service.category)
                    .slice(0, 3)
                    .map(s => (
                      <Link 
                        key={s.id} 
                        to={`/services/${s.id}`} 
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1e293b', 
                          display: 'block', 
                          marginBottom: '8px',
                          border: '1px solid #f1f5f9', 
                          borderRadius: '12px', 
                          padding: '12px 16px',
                          transition: 'all 0.2s ease',
                          background: 'white'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(5,150,105,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{s.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>${s.price || 299} / {s.duration || '30 min'}</div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(15,23,42,0.5)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 9999,
          padding: '24px'
        }}>
          <div style={{ 
            background: 'white', 
            padding: '32px', 
            borderRadius: '24px', 
            maxWidth: '440px', 
            width: '100%',
            boxShadow: '0 24px 60px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>
              Confirm Booking
            </h3>
            <input 
              type="text" 
              placeholder="Your name" 
              value={bookingData.name} 
              onChange={e => setBookingData({...bookingData, name: e.target.value})} 
              style={{ 
                width: '100%', 
                marginTop: '12px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }} 
            />
            <input 
              type="email" 
              placeholder="Your email" 
              value={bookingData.email} 
              onChange={e => setBookingData({...bookingData, email: e.target.value})} 
              style={{ 
                width: '100%', 
                marginTop: '12px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }} 
            />
            <input 
              type="date" 
              value={bookingData.date} 
              onChange={e => setBookingData({...bookingData, date: e.target.value})} 
              style={{ 
                width: '100%', 
                marginTop: '12px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }} 
            />
            <select 
              value={bookingData.time} 
              onChange={e => setBookingData({...bookingData, time: e.target.value})} 
              style={{ 
                width: '100%', 
                marginTop: '12px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            >
              <option>10:00</option>
              <option>11:00</option>
              <option>14:00</option>
              <option>16:00</option>
            </select>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={handleBooking} 
                style={{ 
                  flex: 1, 
                  background: '#059669', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}
              >
                Confirm
              </button>
              <button 
                onClick={() => setShowBookingModal(false)} 
                style={{ 
                  flex: 1, 
                  background: '#f1f5f9', 
                  color: '#64748b', 
                  border: 'none', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ServiceDetail;
