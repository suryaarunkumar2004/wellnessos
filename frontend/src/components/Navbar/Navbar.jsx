import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUserMd, FaHeartbeat, FaPills, FaBook, 
  FaRegHeart, FaHeart, FaShoppingCart, FaCalendarAlt,
  FaBell, FaCog, FaVideo, FaChevronDown,
  FaBookmark, FaUser, FaSignOutAlt, FaUserCircle, FaHistory, FaShieldAlt,
  FaBars, FaTimes
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState({ date: '', time: '' });
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const moreRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { favorites } = useFavorites();
  const { bookmarks } = useBookmarks();

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const validFavorites = Array.isArray(favorites) ? favorites.filter(f => f && (f.id !== undefined && f.id !== null)) : [];
  const validBookmarks = Array.isArray(bookmarks) ? bookmarks.filter(b => b && (b.id !== undefined && b.id !== null)) : [];
  const validCartItems = Array.isArray(cartItems) ? cartItems.filter(c => c && (c.id !== undefined && c.id !== null)) : [];
  const itemCount = validCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };


  const mainNavItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Doctors', path: '/doctors', icon: FaUserMd },
    { name: 'Health Tracker', path: '/health-tracker', icon: FaHeartbeat },
    { name: 'Services', path: '/services', icon: FaPills },
    { name: 'Dosage Guide', path: '/dosage-guide', icon: FaBook },
  ];

  const moreItems = [
    { name: 'Dashboard', path: '/more', icon: FaHome, description: 'Overview' },
    { name: 'Calendar', path: '/more?tab=calendar', icon: FaCalendarAlt, description: 'Schedule' },
    { name: 'Notifications', path: '/more?tab=notifications', icon: FaBell, description: 'Alerts' },
    { name: 'Health Tools', path: '/more?tab=tools', icon: FaCog, description: 'Tools' },
    { name: 'Telehealth', path: '/telehealth', icon: FaVideo, description: 'Video consultation' },
    { name: 'Blog', path: '/blog', icon: FaBook, description: 'Health articles' },
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
      padding: '12px 16px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '44px',
        boxSizing: 'border-box'
      }}>
        {/* BRAND LOGO */}
        <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}>
          <FaRegHeart style={{ color: emerald, fontSize: '28px' }} />
          <span style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: '800',
            fontSize: '1.6rem',
            letterSpacing: '-0.5px',
          }}>WellNest</span>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {mainNavItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              style={{
                color: emerald,
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                padding: '6px 0',
                borderBottom: '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={e => { e.target.style.color = emeraldDark; e.target.style.borderBottomColor = emeraldDark; }}
              onMouseLeave={e => { e.target.style.color = emerald; e.target.style.borderBottomColor = 'transparent'; }}
            >
              <item.icon style={{ fontSize: '0.85rem' }} />
              {item.name}
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              style={{
                color: isMoreOpen ? emeraldDark : emerald,
                fontSize: '0.95rem',
                fontWeight: '600',
                padding: '6px 0',
                borderBottom: isMoreOpen ? `2px solid ${emeraldDark}` : '2px solid transparent',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                fontFamily: "'Inter', system-ui, sans-serif"
              }}
            >
              More <FaChevronDown style={{ fontSize: '0.75rem' }} />
            </button>

            {isMoreOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: '240px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
                padding: '8px',
                zIndex: 200,
                animation: 'dropdownSlide 0.2s ease'
              }}>
                {moreItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#1f2937',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1f2937'; }}
                  >
                    <item.icon style={{ fontSize: '1.1rem', color: emerald, minWidth: '20px' }} />
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE ROW (DATE/TIME, CART, FAVS, BOOKMARKS, PROFILE, MOBILE MENU TOGGLE) */}
        <div className="right-nav-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Favorites Button (Desktop Only) */}
          <button 
            className="desktop-nav"
            onClick={() => { setIsMobileMenuOpen(false); navigate('/favorites'); }} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'all 0.2s', position: 'relative', color: emerald, fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5,150,105,0.08)'; }} 
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FaHeart />
            {validFavorites.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                minWidth: '14px',
                textAlign: 'center',
              }}>
                {validFavorites.length}
              </span>
            )}
          </button>

          {/* Bookmarks Button (Desktop Only) */}
          <button 
            className="desktop-nav"
            onClick={() => { setIsMobileMenuOpen(false); navigate('/my-bookmarks'); }} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'all 0.2s', position: 'relative', color: emerald, fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5,150,105,0.08)'; }} 
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FaBookmark />
            {validBookmarks.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                minWidth: '14px',
                textAlign: 'center',
              }}>
                {validBookmarks.length}
              </span>
            )}
          </button>

          {/* Cart Button (Desktop Only) */}
          <button 
            className="desktop-nav"
            onClick={() => { setIsMobileMenuOpen(false); navigate('/cart'); }} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'all 0.2s', position: 'relative', color: emerald, fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5,150,105,0.08)'; }} 
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FaShoppingCart />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                minWidth: '14px',
                textAlign: 'center',
              }}>
                {itemCount}
              </span>
            )}
          </button>

          {/* Date Time Badge (Desktop Only) */}
          <div className="desktop-nav datetime-badge-container" style={{
            background: 'rgba(5,150,105,0.08)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(5,150,105,0.18)',
            borderRadius: '20px',
            padding: '3px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '500',
            color: '#047857',
            cursor: 'default',
            boxSizing: 'border-box'
          }}>
            <div className="datetime-date" style={{ fontSize: '0.55rem', opacity: 0.8, letterSpacing: '0.3px' }}>{currentDateTime.date}</div>
            <div className="datetime-time" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.2px', marginTop: '-2px' }}>{currentDateTime.time}</div>
          </div>

          {/* Profile Dropdown Menu (Desktop Only) */}
          <div ref={profileRef} className="desktop-nav" style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.2s',
                color: emerald,
                fontSize: '1.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5,150,105,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <FaUserCircle />
            </button>

            {isProfileOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: '220px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
                padding: '8px',
                zIndex: 200,
                animation: 'dropdownSlide 0.2s ease'
              }}>
                <div style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '4px'
                }}>
                  <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.85rem' }}>
                    {user?.name || 'User'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {user?.email || ''}
                  </div>
                </div>

                <Link to="/profile" onClick={() => setIsProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', color: '#1f2937', textDecoration: 'none', transition: 'all 0.15s', fontSize: '0.85rem', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1f2937'; }}>
                  <FaUser style={{ fontSize: '0.95rem', color: emerald, minWidth: '20px' }} />
                  <span>Profile</span>
                </Link>
                <Link to="/medical-history" onClick={() => setIsProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', color: '#1f2937', textDecoration: 'none', transition: 'all 0.15s', fontSize: '0.85rem', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1f2937'; }}>
                  <FaHistory style={{ fontSize: '0.95rem', color: emerald, minWidth: '20px' }} />
                  <span>Medical History</span>
                </Link>
                <Link to="/settings" onClick={() => setIsProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', color: '#1f2937', textDecoration: 'none', transition: 'all 0.15s', fontSize: '0.85rem', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1f2937'; }}>
                  <FaCog style={{ fontSize: '0.95rem', color: emerald, minWidth: '20px' }} />
                  <span>Settings</span>
                </Link>
                <Link to="/privacy" onClick={() => setIsProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', color: '#1f2937', textDecoration: 'none', transition: 'all 0.15s', fontSize: '0.85rem', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.background = emeraldLight; e.currentTarget.style.color = emerald; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1f2937'; }}>
                  <FaShieldAlt style={{ fontSize: '0.95rem', color: emerald, minWidth: '20px' }} />
                  <span>Privacy Policy</span>
                </Link>
                <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#ef4444',
                    transition: 'all 0.15s',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, sans-serif"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <FaSignOutAlt style={{ fontSize: '0.95rem', minWidth: '20px' }} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '8px', 
              borderRadius: '50%', 
              transition: 'all 0.2s', 
              color: emerald, 
              fontSize: '1.4rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER BACKDROP */}
      <div 
        className={`slider-backdrop ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* MOBILE DRAWER SIDE SLIDER */}
      <div className={`side-slider ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Slider Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaRegHeart style={{ color: emerald, fontSize: '24px' }} />
            <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#1e293b' }}>Menu</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Date Time Badge (Mobile Drawer Only) */}
        <div style={{
          background: 'rgba(5,150,105,0.08)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(5,150,105,0.18)',
          borderRadius: '16px',
          padding: '10px 16px',
          textAlign: 'center',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontWeight: '500',
          color: '#047857',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{ fontSize: '0.65rem', opacity: 0.8, letterSpacing: '0.3px', marginBottom: '2px' }}>{currentDateTime.date}</div>
          <div style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '0.2px' }}>{currentDateTime.time}</div>
        </div>

        {/* Compact Utilities Row (Favorites, Bookmarks, Cart) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '24px' }}>
          {/* Favorites */}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/favorites'); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 6px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', position: 'relative' }}
          >
            <FaHeart style={{ color: emerald, fontSize: '1.2rem' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569' }}>Favorites</span>
            {validFavorites.length > 0 && (
              <span style={{ position: 'absolute', top: '4px', right: '4px', background: emerald, color: 'white', borderRadius: '50%', padding: '1px 5px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                {validFavorites.length}
              </span>
            )}
          </button>

          {/* Bookmarks */}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/my-bookmarks'); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 6px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', position: 'relative' }}
          >
            <FaBookmark style={{ color: emerald, fontSize: '1.2rem' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569' }}>Bookmarks</span>
            {validBookmarks.length > 0 && (
              <span style={{ position: 'absolute', top: '4px', right: '4px', background: emerald, color: 'white', borderRadius: '50%', padding: '1px 5px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                {validBookmarks.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/cart'); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 6px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', position: 'relative' }}
          >
            <FaShoppingCart style={{ color: emerald, fontSize: '1.2rem' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569' }}>Cart</span>
            {itemCount > 0 && (
              <span style={{ position: 'absolute', top: '4px', right: '4px', background: emerald, color: 'white', borderRadius: '50%', padding: '1px 5px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Main items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Navigation</span>
          {mainNavItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                color: '#334155',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                background: '#f8fafc',
                transition: 'all 0.2s'
              }}
            >
              <item.icon style={{ color: emerald, fontSize: '1rem' }} />
              {item.name}
            </Link>
          ))}
        </div>

        {/* More items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>More Features</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {moreItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '10px',
                  borderRadius: '10px',
                  color: '#334155',
                  textDecoration: 'none',
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  boxSizing: 'border-box'
                }}
              >
                <item.icon style={{ color: emerald, fontSize: '1rem' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User profile actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 4px', marginBottom: '4px' }}>
                <FaUserCircle style={{ fontSize: '2.2rem', color: emerald, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.85rem' }}>{user.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{user.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', color: '#1f2937', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #f1f5f9' }}>
                  <FaUser style={{ color: emerald, fontSize: '0.95rem' }} /> <span>Profile</span>
                </Link>
                <Link to="/medical-history" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', color: '#1f2937', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #f1f5f9' }}>
                  <FaHistory style={{ color: emerald, fontSize: '0.95rem' }} /> <span>Medical History</span>
                </Link>
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', color: '#1f2937', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #f1f5f9' }}>
                  <FaCog style={{ color: emerald, fontSize: '0.95rem' }} /> <span>Settings</span>
                </Link>
                <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', color: '#1f2937', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #f1f5f9' }}>
                  <FaShieldAlt style={{ color: emerald, fontSize: '0.95rem' }} /> <span>Privacy Policy</span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#ef4444',
                    background: '#fef2f2',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    fontFamily: 'inherit',
                    textAlign: 'left'
                  }}
                >
                  <FaSignOutAlt style={{ fontSize: '0.95rem' }} /> <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '10px', background: emerald, color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '700', justifyContent: 'center' }}>
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .datetime-badge-container,
        .datetime-badge-container * {
          font-family: 'SF Mono', 'Fira Code', monospace !important;
        }
        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .side-slider {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 300px;
          background: white;
          box-shadow: 10px 0 30px rgba(0,0,0,0.08);
          z-index: 10000;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-100%);
          display: flex;
          flex-direction: column;
          padding: 24px;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .side-slider.open {
          transform: translateX(0);
        }
        .slider-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .slider-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 991px) {
          .brand-logo {
            order: 2 !important;
          }
          .right-nav-row {
            order: 1 !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .datetime-badge-container {
            padding: 3px 10px !important;
          }
          .datetime-date {
            display: none !important;
          }
        }
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
