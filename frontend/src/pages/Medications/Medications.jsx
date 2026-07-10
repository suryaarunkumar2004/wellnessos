import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import { 
  FaPills, FaPlus, FaTrash, FaEdit, FaSearch, FaFilter, 
  FaClock, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, 
  FaBell, FaSyringe, FaVial, FaFlask, FaDna, FaBolt, 
  FaStar, FaHeart, FaBrain, FaLungs, FaBone, FaEye, 
  FaUserMd, FaShieldAlt, FaClipboardList, FaFileAlt, 
  FaDownload, FaPrint, FaShare, FaArrowLeft, FaArrowRight, 
  FaSpinner, FaCircle, FaTimesCircle, FaCheckDouble, FaSync,
  FaCalculator, FaMedal, FaTrophy, FaAward, FaGem, FaCrown,
  FaShoppingCart, FaBookmark, FaHeart as FaHeartIcon,
  FaCreditCard, FaPaypal, FaApplePay, FaGooglePay
} from 'react-icons/fa';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, medication, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '32px',
        maxWidth: '500px', width: '100%', maxHeight: '90vh',
        overflowY: 'auto', animation: 'slideUp 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>
            💳 Payment for {medication?.name}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
        </div>

        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>Medication</span>
            <span style={{ fontWeight: '600', color: '#1e293b' }}>{medication?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Amount</span>
            <span style={{ fontWeight: '700', color: '#059669' }}>${medication?.price || '29.99'}</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
            Payment Method
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'card', label: 'Credit Card', icon: FaCreditCard },
              { id: 'paypal', label: 'PayPal', icon: FaPaypal },
              { id: 'apple', label: 'Apple Pay', icon: FaApplePay },
              { id: 'google', label: 'Google Pay', icon: FaGooglePay },
            ].map(m => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                style={{
                  padding: '8px 16px', borderRadius: '10px', border: `2px solid ${paymentMethod === m.id ? '#059669' : '#e2e8f0'}`,
                  background: paymentMethod === m.id ? '#ecfdf5' : 'white', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.8rem', fontWeight: '600', color: paymentMethod === m.id ? '#059669' : '#64748b'
                }}>
                <m.icon size={16} /> {m.label}
              </button>
            ))}
          </div>
        </div>

        {(paymentMethod === 'card') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Cardholder Name</label>
              <input type="text" placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>Expiry Date</label>
                <input type="text" placeholder="MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>CVV</label>
                <input type="text" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }} />
              </div>
            </div>
          </div>
        )}

        <button onClick={handlePayment} disabled={processing}
          style={{
            width: '100%', padding: '14px', marginTop: '20px',
            background: processing ? '#94a3b8' : '#059669',
            color: 'white', border: 'none', borderRadius: '12px',
            fontWeight: '700', fontSize: '1rem', cursor: processing ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { if (!processing) e.currentTarget.style.background = '#047857'; }}
          onMouseLeave={e => { if (!processing) e.currentTarget.style.background = '#059669'; }}>
          {processing ? <FaSpinner className="spin" /> : <FaCheckCircle />}
          {processing ? 'Processing...' : `Pay $${medication?.price || '29.99'}`}
        </button>

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
};

export default function Medications() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  useEffect(() => {
    const generateMedications = () => {
      const meds = [];
      const names = [
        'Metformin', 'Lisinopril', 'Atorvastatin', 'Vitamin D3', 'Omega-3',
        'Levothyroxine', 'Metoprolol', 'Aspirin', 'Albuterol', 'Pantoprazole',
        'Amoxicillin', 'Ciprofloxacin', 'Doxycycline', 'Azithromycin', 'Clindamycin',
        'Gabapentin', 'Pregabalin', 'Duloxetine', 'Venlafaxine', 'Sertraline',
        'Fluoxetine', 'Escitalopram', 'Bupropion', 'Mirtazapine', 'Trazodone'
      ];
      const dosages = ['500mg', '10mg', '20mg', '1000IU', '1000mg', '50mcg', '25mg', '81mg', '90mcg', '40mg'];
      const frequencies = ['Daily', 'Twice Daily', 'Once Daily', 'Three Times Daily', 'As Needed'];
      const doctors = ['Dr. Emily Carter', 'Dr. Michael Chen', 'Dr. Priya Sharma', 'Dr. James Wilson', 'Dr. Sarah Lee'];
      const pharmacies = ['CVS Pharmacy', 'Walgreens', 'Rite Aid', 'Walmart Pharmacy'];
      const statuses = ['Active', 'Active', 'Active', 'Active', 'Expiring'];

      for (let i = 0; i < 50; i++) {
        const name = names[i % names.length];
        const dosage = dosages[i % dosages.length];
        const frequency = frequencies[i % frequencies.length];
        const doctor = doctors[i % doctors.length];
        const pharmacy = pharmacies[i % pharmacies.length];
        const status = statuses[i % statuses.length];
        const refills = Math.floor(Math.random() * 5);
        const date = new Date();
        date.setDate(date.getDate() + (i % 30));
        
        meds.push({
          id: i + 1,
          name: `${name} ${dosage}`,
          dosage: dosage,
          frequency: frequency,
          refills: refills,
          status: status,
          nextRefill: date.toISOString().split('T')[0],
          prescribedBy: doctor,
          pharmacy: pharmacy,
          price: (15 + Math.random() * 50).toFixed(2),
          isActive: status === 'Active',
          isFavorite: false,
          isBookmarked: false
        });
      }
      return meds;
    };

    setMedications(generateMedications());
  }, []);

  const handleFavorite = (med) => {
    toggleFavorite(med);
    showToast(isFavorite(med.id) ? 'Removed from favorites 💔' : 'Added to favorites! ❤️', 'success');
  };

  const handleBookmark = (med) => {
    toggleBookmark(med);
    showToast(isBookmarked(med.id) ? 'Removed from bookmarks' : 'Bookmarked! 🔖', 'success');
  };

  const handleAddToCart = (med) => {
    addToCart({ ...med, quantity: 1 });
    showToast(`${med.name} added to cart! 🛒`, 'success');
  };

  const handleBuyNow = (med) => {
    setSelectedMedication(med);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    showToast('Payment successful! ✅ Your order has been confirmed.', 'success');
  };

  const filteredMeds = medications.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount = medications.filter(m => m.status === 'Active').length;
  const expiringCount = medications.filter(m => m.status === 'Expiring').length;
  const totalRefills = medications.reduce((sum, m) => sum + m.refills, 0);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          
          {/* Hero Section */}
          <div style={{ 
            background: `linear-gradient(135deg, ${emerald} 0%, ${emeraldDark} 50%, #065f46 100%)`, 
            borderRadius: '24px', padding: '40px 36px', marginBottom: '32px', 
            position: 'relative', overflow: 'hidden', color: 'white' 
          }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaPills style={{ fontSize: '2rem' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Medications</h2>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Manage prescriptions • Track adherence • Stay healthy</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Active Medications', value: activeCount, icon: FaCheckCircle, color: '#22c55e' },
                  { label: 'Total Prescriptions', value: medications.length, icon: FaClipboardList, color: '#3b82f6' },
                  { label: 'Expiring Soon', value: expiringCount, icon: FaExclamationTriangle, color: '#f59e0b' },
                  { label: 'Total Refills', value: totalRefills, icon: FaSync, color: '#8b5cf6' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <s.icon style={{ fontSize: '1rem', opacity: 0.8, color: s.color }} />
                      <div><div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div><div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <FaSearch style={{ color: '#94a3b8' }} />
              <input type="text" placeholder="Search medications..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '12px 0', width: '100%', fontSize: '0.9rem', background: 'transparent' }} />
            </div>
            <CustomDropdown
              options={['All', 'Active', 'Expiring']}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter Status"
            />
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: emerald, fontWeight: '800' }}>{filteredMeds.length}</span> medications found
            </span>
          </div>

          {/* Medications Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {filteredMeds.map(med => {
              const isFav = isFavorite(med.id);
              const isBook = isBookmarked(med.id);
              return (
                <div key={med.id} style={{ 
                  background: 'white', borderRadius: '16px', padding: '20px', 
                  border: `1px solid ${med.status === 'Expiring' ? '#fecaca' : '#e2e8f0'}`, 
                  transition: 'all 0.22s', boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  borderLeft: `4px solid ${med.status === 'Active' ? emerald : '#ef4444'}`
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${emerald}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaPills style={{ color: emerald, fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{med.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{med.dosage} • {med.frequency}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleFavorite(med)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                        <FaHeartIcon style={{ color: isFav ? '#ef4444' : '#94a3b8', fontSize: '1rem' }} />
                      </button>
                      <button onClick={() => handleBookmark(med)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                        <FaBookmark style={{ color: isBook ? '#f59e0b' : '#94a3b8', fontSize: '1rem' }} />
                      </button>
                    </div>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <span style={{ 
                      fontSize: '0.6rem', fontWeight: '700', padding: '2px 10px', borderRadius: '20px',
                      background: med.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                      color: med.status === 'Active' ? emerald : '#ef4444'
                    }}>
                      {med.status}
                    </span>
                  </div>

                  <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Refills Left</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{med.refills}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Next Refill</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{med.nextRefill}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#94a3b8' }}>
                    <span>Prescribed by: {med.prescribedBy}</span>
                    <span style={{ marginLeft: '12px' }}>💰 ${med.price}</span>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => handleAddToCart(med)} 
                      style={{ padding: '6px 14px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaShoppingCart size={12} /> Add to Cart
                    </button>
                    <button onClick={() => handleBuyNow(med)}
                      style={{ padding: '6px 14px', background: emeraldDark, color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCreditCard size={12} /> Buy Now
                    </button>
                    <button style={{ padding: '6px 14px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>
                      <FaEdit size={12} /> Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMeds.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              <FaPills size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
              <p style={{ fontWeight: '600' }}>No medications found matching your search.</p>
            </div>
          )}

        </div>
      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        medication={selectedMedication}
        onSuccess={handlePaymentSuccess}
      />


      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Footer />
      </>
  );
}
