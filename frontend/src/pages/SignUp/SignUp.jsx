import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      setLoading(false);
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem('wellnessUsers', JSON.stringify(users));
    localStorage.setItem('wellnessUser', JSON.stringify({ name, email }));
    navigate('/');
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
        borderRadius: '24px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#059669'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
          <FaArrowLeft /> Back to Home
        </Link>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #059669, #047857)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '2rem',
            color: 'white'
          }}>
            ❤️
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', margin: 0 }}>
            Start your health journey with WellNest
          </p>
        </div>
        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.9rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
              Full Name
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0 12px',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.background = 'white'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
              <FaUser style={{ color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 10px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
              Email Address
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0 12px',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.background = 'white'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
              <FaEnvelope style={{ color: '#94a3b8' }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 10px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
              Password
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0 12px',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.background = 'white'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
              <FaLock style={{ color: '#94a3b8' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 10px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
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
                  padding: '4px'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
              Confirm Password
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0 12px',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.background = 'white'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
              <FaLock style={{ color: '#94a3b8' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 10px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
