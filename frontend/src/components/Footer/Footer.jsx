import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const emerald = '#059669';
  const emeraldDark = '#064e3b';

  return (
    <footer style={{
      background: emeraldDark,
      color: '#d1fae5',
      padding: '40px 24px 24px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      marginTop: '60px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px'
      }}>
        {/* Desktop View (Visible on screens > 768px) */}
        <div className="footer-desktop-grid">
          {/* Column 1: About */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaRegHeart style={{ color: emerald, fontSize: '20px', strokeWidth: '2.5' }} />
              <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px', color: emerald }}>
                WellNest
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#a7f3d0', lineHeight: '1.6', margin: '4px 0 12px 0' }}>
              Your comprehensive healthcare companion. Empowering patients with advanced monitoring, professional consultation, and digital health tools.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#a7f3d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope style={{ fontSize: '0.75rem', color: emerald }} />
                <span>support@wellnest.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaPhoneAlt style={{ fontSize: '0.75rem', color: emerald }} />
                <span>+1 (555) 019-2834</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaMapMarkerAlt style={{ fontSize: '0.75rem', color: emerald }} />
                <span>100 Health Science Plaza, Suite 400</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'white', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
              Quick Links
            </h4>
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Doctors', path: '/doctors' },
              { label: 'Health Tracker', path: '/health-tracker' },
              { label: 'Blog', path: '/blog' },
              { label: 'Dosage Guide', path: '/dosage-guide' },
              { label: 'Privacy Policy', path: '/privacy' }
            ].map((lnk, idx) => (
              <Link key={idx} to={lnk.path} className="footer-link-hover" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s', width: 'fit-content' }}>
                {lnk.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'white', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
              Health Features
            </h4>
            {[
              { label: 'Telehealth Portal', path: '/telehealth' },
              { label: 'Blood Pressure Log', path: '/health-tracker' },
              { label: 'Blood Sugar Log', path: '/health-tracker' },
              { label: 'Step Tracker', path: '/health-tracker' },
              { label: 'Sleep Tracker', path: '/health-tracker' },
              { label: 'Mood Journal', path: '/health-tracker' }
            ].map((lnk, idx) => (
              <Link key={idx} to={lnk.path} className="footer-link-hover" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s', width: 'fit-content' }}>
                {lnk.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'white', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
              Support & Legal
            </h4>
            {[
              { label: 'Help Center', path: '/support' },
              { label: 'FAQ', path: '/faq' },
              { label: 'Terms of Service', path: '/terms' },
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'HIPAA Statement', path: '/hipaa' }
            ].map((lnk, idx) => (
              <Link key={idx} to={lnk.path} className="footer-link-hover" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s', width: 'fit-content' }}>
                {lnk.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View (Visible on screens <= 768px) */}
        <div className="footer-mobile-view">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <FaRegHeart style={{ color: emerald, fontSize: '20px', strokeWidth: '2.5' }} />
            <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px', color: emerald }}>
              WellNest
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0' }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Doctors', path: '/doctors' },
              { label: 'Privacy Policy', path: '/privacy' }
            ].map((lnk, idx) => (
              <Link key={idx} to={lnk.path} className="footer-link-hover" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>
                {lnk.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div style={{
          fontSize: '0.75rem',
          color: '#a7f3d0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          width: '100%',
          paddingTop: '16px',
          textAlign: 'center',
          marginTop: '12px'
        }}>
          © 2026 WellNest. Empowering your health journey.
        </div>
      </div>

      <style>{`
        .footer-desktop-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          width: 100%;
          text-align: left;
        }
        .footer-mobile-view {
          display: none !important;
        }
        .footer-link-hover:hover {
          color: #10b981 !important;
        }
        @media (max-width: 768px) {
          .footer-desktop-grid {
            display: none !important;
          }
          .footer-mobile-view {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
