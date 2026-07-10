import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaShoppingCart, FaTrash, FaPlus, FaMinus, 
  FaArrowLeft, FaCreditCard, FaPills, FaUserMd,
  FaRegHeart, FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)';

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    const num = Math.floor(100000 + Math.random() * 900000);
    const ordId = `ORD-${num}`;
    setOrderNumber(ordId);
    setOrderPlaced(true);
    
    if (user && user.email) {
      try {
        await fetch('http://localhost:8080/api/notifications/billing/invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            patientName: user.name || 'Patient',
            amount: `$${totalPrice.toFixed(2)}`,
            invoiceId: ordId,
            date: new Date().toLocaleDateString()
          })
        });
      } catch (mailErr) {
        console.error('Failed to send purchase confirmation email:', mailErr);
      }
    }
    
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
    }, 3000);
  };

  const getItemType = (item) => {
    if (item.type === 'service' || item.category === 'Service' || item.category === 'Cardiology' || 
        item.category === 'Pharmacy' || item.category === 'General Medicine' || 
        item.category === 'Emergency' || item.category === 'Lab Testing' ||
        item.category === 'Dentistry' || item.category === 'Neurology' ||
        item.category === 'Pulmonology' || item.category === 'Ophthalmology' ||
        item.category === 'Pediatrics' || item.category === 'Orthopedics' ||
        item.category === 'Rheumatology' || item.category === 'Genetics' ||
        item.category === 'Infectious Disease' || item.category === 'Allergy & Immunology' ||
        item.category === 'Dermatology' || item.category === 'Neonatology' ||
        item.category === 'Gynecology' || item.category === 'Urology' ||
        item.category === 'Cardiac Surgery' || item.category === 'Vaccination' ||
        item.category === 'Wound Care' || item.category === 'Health Screening' ||
        item.category === 'Wellness Programs' || item.category === 'Telemedicine') {
      return 'service';
    }
    return 'medication';
  };

  const getItemIcon = (item) => {
    if (getItemType(item) === 'service') {
      return <FaUserMd style={{ color: emerald }} />;
    }
    return <FaPills style={{ color: emerald }} />;
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <FaShoppingCart style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '16px' }} />
              <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>Your Cart is Empty</h2>
              <p style={{ color: '#64748b', marginBottom: '8px' }}>You haven't added any items to your cart yet.</p>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Browse our services or medications and add them to your cart.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/services')} style={{ padding: '12px 24px', background: emeraldGradient, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Browse Services
                </button>
                <button onClick={() => navigate('/dosage-guide')} style={{ padding: '12px 24px', background: 'white', color: emerald, border: `2px solid ${emerald}`, borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Browse Medications
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ background: '#d1fae5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg style={{ width: '40px', height: '40px', color: emerald }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>Order Placed Successfully!</h2>
              <p style={{ color: '#64748b', marginBottom: '8px' }}>Your order has been confirmed.</p>
              <p style={{ color: emerald, fontWeight: '600', fontSize: '1.2rem', marginBottom: '20px' }}>Order #{orderNumber}</p>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Thank you for shopping with WellnessOS!</p>
              <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: emeraldGradient, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Rest of the component (with items in cart)...
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaArrowLeft /> Back
              </button>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Your Cart</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ background: emeraldLight, padding: '6px 16px', borderRadius: '20px', color: emerald, fontWeight: '600' }}>
                {totalItems} items
              </span>
              <span style={{ background: emeraldLight, padding: '6px 16px', borderRadius: '20px', color: emerald, fontWeight: '600' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
            <div>
              {cartItems.map((item) => {
                const isService = getItemType(item) === 'service';
                return (
                  <div key={item.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: emeraldLight, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {getItemIcon(item)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
                        {item.name}
                        {isService ? ' (Service)' : ''}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 4px 0' }}>{item.category || item.specialty || 'Medication'}</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: '700', color: emerald, margin: 0 }}>${(item.price || 0).toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer', color: '#475569' }}>
                          <FaMinus />
                        </button>
                        <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer', color: '#475569' }}>
                          <FaPlus />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}

              {cartItems.length > 0 && (
                <button onClick={clearCart} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '8px 0' }}>
                  Clear All Items
                </button>
              )}
            </div>

            <div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0' }}>Order Summary</h3>
                
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Subtotal ({totalItems} items)</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Shipping</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>${totalPrice > 50 ? '0.00' : '5.00'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Tax</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>Total</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '700', color: emerald }}>
                    ${(totalPrice + (totalPrice > 50 ? 0 : 5) + (totalPrice * 0.08)).toFixed(2)}
                  </span>
                </div>

                <button onClick={handleCheckout} style={{ width: '100%', padding: '14px', background: emeraldGradient, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  <FaCreditCard style={{ marginRight: '8px' }} /> Proceed to Checkout
                </button>

                <p style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
                  Secure checkout powered by WellnessOS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'modalSlideIn 0.3s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>Checkout</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Complete your order securely</p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>Payment Method</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setPaymentMethod('card')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: paymentMethod === 'card' ? `2px solid ${emerald}` : '1px solid #e2e8f0', background: paymentMethod === 'card' ? emeraldLight : 'white', cursor: 'pointer' }}>
                  💳 Credit Card
                </button>
                <button onClick={() => setPaymentMethod('paypal')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: paymentMethod === 'paypal' ? `2px solid ${emerald}` : '1px solid #e2e8f0', background: paymentMethod === 'paypal' ? emeraldLight : 'white', cursor: 'pointer' }}>
                  📱 PayPal
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>CVV</label>
                    <input type="password" placeholder="•••" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
                  </div>
                </div>
              </>
            )}

            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Total</span>
                <span style={{ fontWeight: '700', color: '#1e293b' }}>${(totalPrice + (totalPrice > 50 ? 0 : 5) + (totalPrice * 0.08)).toFixed(2)}</span>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{totalItems} items • ${totalPrice.toFixed(2)} + shipping + tax</p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowCheckout(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={handlePlaceOrder} style={{ flex: 2, padding: '12px', background: emeraldGradient, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <Footer />
      </>
  );
};

export default Cart;
