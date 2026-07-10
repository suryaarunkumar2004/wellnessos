import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaCheckCircle, FaRegHeart } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const emerald = '#059669';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!acceptedTerms) {
      setError('Please accept the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created successfully!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
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
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
        border: '1px solid rgba(5,150,105,0.08)'
      }}>
        {/* WellNest Logo - Same as Navbar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '28px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}>
          <FaRegHeart style={{ 
            color: emerald, 
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

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px'
          }}>
            Create Account
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
            Start your health journey today
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
            <span style={{ fontSize: '1.2rem' }}>⚠️</span> {error}
          </div>
        )}

        {success && (
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
            <FaCheckCircle /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Full Name
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
              e.currentTarget.style.borderColor = emerald;
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(5,150,105,0.08)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <FaUser style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
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
              e.currentTarget.style.borderColor = emerald;
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Password
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
              e.currentTarget.style.borderColor = emerald;
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(5,150,105,0.08)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <FaLock style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '8px',
                  fontSize: '1rem'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Confirm Password
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
              e.currentTarget.style.borderColor = emerald;
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(5,150,105,0.08)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <FaLock style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Terms & Conditions */}
          <div style={{
            marginBottom: '24px',
            padding: '14px 16px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: emerald,
                  cursor: 'pointer',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              />
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(!showTerms)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: emerald,
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '0.8rem',
                      padding: 0
                    }}
                  >
                    Terms & Conditions
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(!showTerms)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: emerald,
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '0.8rem',
                      padding: 0
                    }}
                  >
                    Privacy Policy
                  </button>
                </span>
                {showTerms && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    maxHeight: '120px',
                    overflowY: 'auto',
                    fontSize: '0.75rem',
                    color: '#475569',
                    lineHeight: '1.6'
                  }}>
                    <strong>WellNest Terms & Conditions</strong><br />
                    By creating an account, you agree to our terms of service.
                    We protect your health data with industry-standard encryption.
                    Your data is never shared with third parties without your explicit consent.
                    You have the right to access, modify, or delete your data at any time.
                    For full details, please visit our Privacy Policy page.
                  </div>
                )}
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: loading || !acceptedTerms ? '#94a3b8' : `linear-gradient(135deg, ${emerald} 0%, #047857 100%)`,
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: loading || !acceptedTerms ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
              boxShadow: loading || !acceptedTerms ? 'none' : '0 4px 20px rgba(5,150,105,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={e => {
              if (!loading && acceptedTerms) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = loading || !acceptedTerms ? 'none' : '0 4px 20px rgba(5,150,105,0.3)';
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
                Creating account...
              </span>
            ) : (
              <>Create Account <FaArrowRight style={{ fontSize: '0.8rem' }} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: emerald,
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#047857'}
            onMouseLeave={e => e.currentTarget.style.color = emerald}>
              Sign In
            </Link>
          </p>
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

export default Signup;
