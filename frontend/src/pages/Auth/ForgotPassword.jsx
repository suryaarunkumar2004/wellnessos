import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    const found = users.find(u => u.email === email);
    if (!found) {
      setError('Email not found');
      setLoading(false);
      return;
    }
    setMessage('Password reset link sent to your email (demo).');
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto', padding: '100px 20px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center' }}>Reset Password</h1>
      {error && <div style={{ background: '#fee2e2', padding: '12px', borderRadius: '12px', color: '#991b1b', marginBottom: '16px' }}>{error}</div>}
      {message && <div style={{ background: '#d1fae5', padding: '12px', borderRadius: '12px', color: '#065f46', marginBottom: '16px' }}>{message}</div>}
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <button type="submit" disabled={loading} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Send Reset Link</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}><Link to="/login" style={{ color: '#059669' }}>Back to Login</Link></p>
    </div>
  );
};

export default ForgotPassword;

