import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

const Footer = () => {
  const emerald = '#059669';
  const emeraldDark = '#064e3b';

  return (
    <footer style={{
      background: emeraldDark,
      color: '#d1fae5',
      padding: '24px 16px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      marginTop: '40px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        {/* Centered WellNest Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <FaRegHeart style={{ color: emerald, fontSize: '20px', strokeWidth: '2.5' }} />
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px', color: emerald }}>
            WellNest
          </span>
        </div>

        {/* Centered Navigation Menu Links */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '24px', 
          flexWrap: 'wrap', 
          margin: '4px 0' 
        }}>
          {[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Doctors', path: '/doctors' },
            { label: 'Health Tracker', path: '/health-tracker' },
            { label: 'Blog', path: '/blog' },
            { label: 'Privacy Policy', path: '/privacy' }
          ].map((lnk, idx) => (
            <Link
              key={idx}
              to={lnk.path}
              style={{
                color: '#a7f3d0',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'color 0.2s',
                padding: '4px 8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = emerald}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a7f3d0'}
            >
              {lnk.label}
            </Link>
          ))}
        </div>

        {/* Centered Copyright */}
        <div style={{ fontSize: '0.75rem', color: '#a7f3d0', borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%', maxWidth: '400px', paddingTop: '12px', marginTop: '4px' }}>
          © 2026 WellNest. Empowering your health journey.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
