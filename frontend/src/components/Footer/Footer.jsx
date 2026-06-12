import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#064e3b',
      color: '#d1fae5',
      padding: '32px 24px 24px',
      marginTop: '60px',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#a7f3d0', textDecoration: 'none' }}>Home</Link>
          <Link to="/doctors" style={{ color: '#a7f3d0', textDecoration: 'none' }}>Doctors</Link>
          <Link to="/services" style={{ color: '#a7f3d0', textDecoration: 'none' }}>Services</Link>
          <Link to="/contact" style={{ color: '#a7f3d0', textDecoration: 'none' }}>Contact</Link>
          <Link to="/privacy" style={{ color: '#a7f3d0', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} WellnessOS – Empowering your health journey</p>
        <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.7 }}>Live healthy, stay happy</p>
      </div>
    </footer>
  );
};

export default Footer;
