import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaHeartbeat, FaPills, FaRobot, FaBook, FaEllipsisH, FaRegHeart } from 'react-icons/fa';

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentDateTime({ date: dateStr, time: timeStr });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Health Tracker', path: '/health-tracker' },
    { name: 'Services', path: '/services' },
    { name: 'Rx Checker', path: '/rx-checker' },
    { name: 'AI Triage', path: '/ai-triage' },
    { name: 'Dosage Guide', path: '/dosage-guide' },
    { name: 'More', path: '/more' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      zIndex: 1000,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: '12px 8px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Logo (refined, no change) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaRegHeart style={{ color: '#059669', fontSize: '28px', filter: 'drop-shadow(0 1px 2px rgba(5,150,105,0.2))' }} />
          <span style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: '800',
            fontSize: '1.6rem',
            letterSpacing: '-0.5px',
            textShadow: '0 1px 2px rgba(5,150,105,0.05)',
          }}>WellNest</span>
        </div>

        {/* Navigation Links (emerald green) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', alignItems: 'center' }}>
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              style={{
                color: '#059669',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                padding: '6px 0',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={e => { e.target.style.color = '#047857'; e.target.style.borderBottomColor = '#047857'; }}
              onMouseLeave={e => { e.target.style.color = '#059669'; e.target.style.borderBottomColor = 'transparent'; }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Premium Date/Time Badge – glassmorphism */}
        <div style={{
          background: 'rgba(5,150,105,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(5,150,105,0.25)',
          borderRadius: '32px',
          padding: '6px 18px',
          textAlign: 'center',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontWeight: '500',
          color: '#047857',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)',
          cursor: 'default',
          minWidth: '130px',
        }}>
          <div style={{ fontSize: '0.7rem', opacity: 0.8, letterSpacing: '0.3px' }}>{currentDateTime.date}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.2px' }}>{currentDateTime.time}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
