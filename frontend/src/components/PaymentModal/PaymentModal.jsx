import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, drug, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const emerald = '#059669';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)';

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        userId: 1,
        totalAmount: parseFloat(drug.price) * 1.08,
        taxAmount: parseFloat(drug.price) * 0.08,
        shippingAmount: 0,
        paymentMethod: paymentMethod,
        shippingAddress: '123 Wellness Way, Health City',
        billingAddress: '123 Wellness Way, Health City',
        notes: 'Order for ' + drug.name,
        items: [{
          drugId: drug.id,
          drugName: drug.name,
          category: drug.category,
          price: parseFloat(drug.price),
          quantity: 1,
          subtotal: parseFloat(drug.price)
        }]
      };

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        alert('Payment successful! Order #' + order.orderNumber);
        onPaymentSuccess(drug);
        onClose();
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '');
    const groups = v.match(/.{1,4}/g);
    return groups ? groups.join(' ') : v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)',
      zIndex: 99999,
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
        animation: 'modalSlideIn 0.3s ease',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#f1f5f9', border: 'none', width: '36px', height: '36px',
          borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b'
        }}>
          <FaTimes />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
          Complete Payment
        </h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>
          {drug?.name} - ${drug?.price}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
            Payment Method
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {[
              { id: 'card', icon: FaCreditCard, label: 'Card' },
              { id: 'paypal', icon: FaPaypal, label: 'PayPal' },
              { id: 'apple', icon: FaApplePay, label: 'Apple Pay' },
              { id: 'google', icon: FaGooglePay, label: 'Google Pay' }
            ].map((method) => (
              <button key={method.id} onClick={() => setPaymentMethod(method.id)} style={{
                padding: '12px 8px', borderRadius: '12px',
                border: paymentMethod === method.id ? '2px solid ' + emerald : '2px solid #e2e8f0',
                background: paymentMethod === method.id ? '#ecfdf5' : 'white',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
              }}>
                <method.icon style={{ fontSize: '1.5rem', color: paymentMethod === method.id ? emerald : '#94a3b8' }} />
                <span style={{ fontSize: '0.7rem', color: paymentMethod === method.id ? emerald : '#94a3b8', fontWeight: '600' }}>
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {paymentMethod === 'card' && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Card Number
              </label>
              <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} maxLength="19"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Cardholder Name
              </label>
              <input type="text" placeholder="John Doe" value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                  Expiry Date
                </label>
                <input type="text" placeholder="MM/YY" value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} maxLength="5"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                  CVV
                </label>
                <input type="password" placeholder="•••" value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} maxLength="4"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1rem' }} />
              </div>
            </div>
          </>
        )}

        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>Item</span>
            <span style={{ fontWeight: '600', color: '#1e293b' }}>{drug?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>Price</span>
            <span style={{ fontWeight: '700', color: emerald }}>${drug?.price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Tax (8%)</span>
            <span style={{ fontWeight: '600', color: '#1e293b' }}>${(parseFloat(drug?.price || 0) * 0.08).toFixed(2)}</span>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700', color: '#1e293b' }}>Total</span>
            <span style={{ fontWeight: '700', color: emerald, fontSize: '1.1rem' }}>
              ${(parseFloat(drug?.price || 0) * 1.08).toFixed(2)}
            </span>
          </div>
        </div>

        <button onClick={handlePayment} disabled={isProcessing} style={{
          width: '100%', padding: '14px',
          background: isProcessing ? '#94a3b8' : emeraldGradient,
          color: 'white', border: 'none', borderRadius: '12px',
          fontSize: '1rem', fontWeight: '600',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          opacity: isProcessing ? 0.7 : 1
        }}>
          {isProcessing ? 'Processing...' : 'Pay $' + (parseFloat(drug?.price || 0) * 1.08).toFixed(2)}
        </button>

        <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
          Secure payment powered by WellnessOS
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
