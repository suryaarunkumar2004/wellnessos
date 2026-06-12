import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaEdit, FaCalendarAlt, FaClock, FaLanguage, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

// Generate mock services (same as on listing page)
const allServices = [];
const cats = ['Consultation', 'Nutrition', 'Fitness', 'Mindfulness', 'Therapy'];
for (let i = 1; i <= 100; i++) {
  allServices.push({
    id: i,
    name: `${cats[i % cats.length]} Service ${i}`,
    category: cats[i % cats.length],
    price: Math.floor(Math.random() * 200) + 20,
    duration: ['30 min', '60 min', '90 min'][i % 3],
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    description: `This is a detailed description for ${cats[i % cats.length]} service ${i}. It includes benefits, what to expect, and preparation tips.`,
    provider: {
      name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
      credentials: 'MD, PhD',
      bio: `Experienced healthcare professional with over ${10 + (i % 20)} years in ${cats[i % cats.length]}.`,
      languages: ['English', i % 2 === 0 ? 'Spanish' : 'French'],
    },
  });
}

const ServiceDetail = () => {
  const { id } = useParams();
  const service = allServices.find(s => s.id === parseInt(id));
  const [provider, setProvider] = useState(() => {
    const saved = localStorage.getItem(`provider_${id}`);
    return saved ? JSON.parse(saved) : (service ? service.provider : {});
  });
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'Alice', rating: 5, comment: 'Excellent service! Highly recommend.', date: '2025-05-10' },
      { id: 2, user: 'Bob', rating: 4, comment: 'Very professional, a bit pricey but worth it.', date: '2025-05-15' },
    ];
  });
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingProvider, setEditingProvider] = useState(false);
  const [editedProvider, setEditedProvider] = useState({ ...provider });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', date: '', time: '10:00' });
  const [favorite, setFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('serviceFavorites') || '[]');
    return favs.includes(parseInt(id));
  });

  if (!service) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Service not found. <Link to="/services">Back to Services</Link></div>;

  const saveProvider = () => {
    localStorage.setItem(`provider_${id}`, JSON.stringify(editedProvider));
    setProvider(editedProvider);
    setEditingProvider(false);
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
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ rating: 5, comment: '' });
  };

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('serviceFavorites') || '[]');
    let newFavs;
    if (favorite) {
      newFavs = favs.filter(f => f !== parseInt(id));
    } else {
      newFavs = [...favs, parseInt(id)];
    }
    localStorage.setItem('serviceFavorites', JSON.stringify(newFavs));
    setFavorite(!favorite);
  };

  const handleBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.date) {
      alert('Please fill all booking details');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ serviceId: parseInt(id), serviceName: service.name, ...bookingData, bookedAt: new Date().toISOString() });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking saved! You will receive a confirmation (demo).');
    setShowBookingModal(false);
    setBookingData({ name: '', email: '', date: '', time: '10:00' });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} style={{ color: '#fbbf24' }} /> : <FaRegStar key={i} style={{ color: '#cbd5e1' }} />);
    }
    return stars;
  };

  return (
    <div style={{ paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', fontFamily: 'Inter, system-ui' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/services" style={{ color: '#059669', textDecoration: 'none' }}>← Back to Services</Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {/* Main content */}
        <div style={{ flex: 2, minWidth: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h1 style={{ fontSize: '32px', color: '#064e3b' }}>{service.name}</h1>
            <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer' }}>
              {favorite ? <FaHeart style={{ color: '#ef4444' }} /> : <FaRegHeart style={{ color: '#ef4444' }} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', color: '#4b5563' }}>
            <span>{service.category}</span> <span>•</span> <span>{service.duration}</span> <span>•</span>
            <span>{renderStars(service.rating)} {service.rating}</span>
          </div>
          <p style={{ marginTop: '24px', lineHeight: 1.6, color: '#1f2937' }}>{service.description}</p>

          <div style={{ marginTop: '32px', background: '#f9fafb', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '12px' }}>Price breakdown</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Base price</span><span>${service.price}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated tax</span><span>${(service.price * 0.1).toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '12px' }}><span>Total</span><span>${(service.price * 1.1).toFixed(2)}</span></div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3>Reviews ({reviews.length})</h3>
            <div style={{ marginTop: '16px', background: '#f3f4f6', padding: '20px', borderRadius: '16px' }}>
              <h4>Add your review</h4>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                <span>Your rating: </span>
                {[1,2,3,4,5].map(r => (
                  <FaStar key={r} style={{ color: r <= newReview.rating ? '#fbbf24' : '#d1d5db', cursor: 'pointer', fontSize: '20px' }} onClick={() => setNewReview({...newReview, rating: r})} />
                ))}
              </div>
              <textarea rows="3" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Write your experience..." value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} />
              <button onClick={addReview} style={{ marginTop: '12px', background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '24px', cursor: 'pointer' }}>Submit Review</button>
            </div>
            <div style={{ marginTop: '24px' }}>
              {reviews.map(r => (
                <div key={r.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{r.user}</strong><span style={{ fontSize: '12px', color: '#6b7280' }}>{r.date}</span></div>
                  <div>{renderStars(r.rating)}</div>
                  <p style={{ marginTop: '8px' }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Provider</h3>
              <button onClick={() => setEditingProvider(true)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer' }}><FaEdit /></button>
            </div>
            {editingProvider ? (
              <div>
                <input type="text" value={editedProvider.name} onChange={e => setEditedProvider({...editedProvider, name: e.target.value})} style={{ width: '100%', marginBottom: '8px', padding: '6px' }} />
                <input type="text" value={editedProvider.credentials} onChange={e => setEditedProvider({...editedProvider, credentials: e.target.value})} style={{ width: '100%', marginBottom: '8px', padding: '6px' }} />
                <textarea value={editedProvider.bio} onChange={e => setEditedProvider({...editedProvider, bio: e.target.value})} rows="3" style={{ width: '100%', marginBottom: '8px', padding: '6px' }} />
                <input type="text" value={editedProvider.languages.join(', ')} onChange={e => setEditedProvider({...editedProvider, languages: e.target.value.split(',')})} style={{ width: '100%', marginBottom: '8px', padding: '6px' }} placeholder="languages (comma)" />
                <button onClick={saveProvider} style={{ background: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', marginRight: '8px' }}>Save</button>
                <button onClick={() => setEditingProvider(false)} style={{ background: '#9ca3af', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px' }}>Cancel</button>
              </div>
            ) : (
              <div>
                <img src={`https://randomuser.me/api/portraits/${service.id % 2 === 0 ? 'women' : 'men'}/${(service.id % 70) + 1}.jpg`} alt="provider" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }} />
                <h4>{provider.name}, {provider.credentials}</h4>
                <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>{provider.bio}</p>
                <div style={{ marginTop: '12px' }}><FaLanguage /> <strong>Languages:</strong> {provider.languages.join(', ')}</div>
              </div>
            )}
          </div>

          <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px', marginTop: '24px' }}>
            <h3>Book this service</h3>
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><FaCalendarAlt /> <input type="date" style={{ padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1' }} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><FaClock /> <select style={{ padding: '6px', borderRadius: '8px' }}><option>10:00 AM</option><option>11:00 AM</option><option>2:00 PM</option><option>4:00 PM</option></select></div>
            </div>
            <button onClick={() => setShowBookingModal(true)} style={{ width: '100%', background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>Book Now</button>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3>You may also like</h3>
            {allServices.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3).map(s => (
              <Link key={s.id} to={`/service/${s.id}`} style={{ textDecoration: 'none', color: '#059669', display: 'block', marginTop: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}>
                <strong>{s.name}</strong><br /><span style={{ fontSize: '12px', color: '#4b5563' }}>${s.price} / {s.duration}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '24px', maxWidth: '400px', width: '90%' }}>
            <h3>Confirm Booking</h3>
            <input type="text" placeholder="Your name" value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            <input type="email" placeholder="Your email" value={bookingData.email} onChange={e => setBookingData({...bookingData, email: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            <input type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '8px' }} />
            <select value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '8px' }}>
              <option>10:00</option><option>11:00</option><option>14:00</option><option>16:00</option>
            </select>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleBooking} style={{ flex: 1, background: '#059669', color: 'white', border: 'none', padding: '10px', borderRadius: '40px', cursor: 'pointer' }}>Confirm</button>
              <button onClick={() => setShowBookingModal(false)} style={{ flex: 1, background: '#9ca3af', color: 'white', border: 'none', padding: '10px', borderRadius: '40px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;

