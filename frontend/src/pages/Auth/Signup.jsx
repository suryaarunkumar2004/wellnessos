import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    if (users.find(u => u.email === email)) {
      setError('User already exists');
      setLoading(false);
      return;
    }
    const newUser = { id: Date.now(), email, name, password };
    users.push(newUser);
    localStorage.setItem('wellnessUsers', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('wellnessUser', JSON.stringify(userWithoutPassword));
    navigate('/');
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto', padding: '100px 20px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center' }}>Sign Up</h1>
      {error && <div style={{ background: '#fee2e2', padding: '12px', borderRadius: '12px', color: '#991b1b', marginBottom: '16px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
        </div>
        <button type="submit" disabled={loading} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <Link to="/login" style={{ color: '#059669' }}>Login</Link></p>
    </div>
  );
};

export default Signup;

