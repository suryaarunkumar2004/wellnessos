import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowRight, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaRegHeart } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // First check if email exists in database
      const checkResponse = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkResponse.json();

      if (!checkData.exists) {
        setError('Email not found. Please check your email address.');
        setLoading(false);
        return;
      }

      // If email exists, send reset link
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Password reset link has been sent to your email.');
        setTimeout(() => navigate('/reset-password'), 2000);
      } else {
        setError(data.error || 'Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
      padding: '20px',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{
        background: 'white',
        borderRadius: '28px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
        border: '1px solid rgba(5,150,105,0.08)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}>
            <FaRegHeart style={{ 
              color: '#059669', 
              fontSize: '38px',
              strokeWidth: '2.5'
            }} />
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: '800',
              fontSize: '2rem',
              letterSpacing: '-0.5px',
            }}>
              WellNest
            </span>
          </div>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px'
          }}>
            Reset Password
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
            Enter your email to receive a reset link
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '14px 16px',
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaTimesCircle /> {error}
          </div>
        )}

        {message && (
          <div style={{
            background: '#f0fdf4',
            color: '#059669',
            padding: '14px 16px',
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            border: '1px solid #86efac',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaCheckCircle /> {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#1e293b',
              display: 'block',
              marginBottom: '6px'
            }}>
              Email Address
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0 16px',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(5,150,105,0.08)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <FaEnvelope style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: 'none',
                  padding: '14px 12px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  background: 'transparent',
                  color: '#1e293b'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Sending...
              </span>
            ) : (
              <>Send Reset Link <FaArrowRight style={{ fontSize: '0.8rem' }} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/login" style={{
            color: '#64748b',
            fontSize: '0.9rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#059669'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
            <FaArrowLeft style={{ fontSize: '0.7rem' }} /> Back to Sign In
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
