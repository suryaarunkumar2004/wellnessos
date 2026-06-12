import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Mock login – check against stored users
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }
    const { password: _, ...userWithoutPassword } = found;
    localStorage.setItem('wellnessUser', JSON.stringify(userWithoutPassword));
    navigate('/');
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto', padding: '100px 20px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center' }}>Login</h1>
      {error && <div style={{ background: '#fee2e2', padding: '12px', borderRadius: '12px', color: '#991b1b', marginBottom: '16px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <button type="submit" disabled={loading} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <Link to="/signup" style={{ color: '#059669' }}>Sign up</Link></p>
      <p style={{ textAlign: 'center', marginTop: '10px' }}><Link to="/forgot-password" style={{ color: '#059669' }}>Forgot password?</Link></p>
    </div>
  );
};

export default Login;

