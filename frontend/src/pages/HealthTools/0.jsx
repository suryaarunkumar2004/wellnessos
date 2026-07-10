import React from 'react';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTools } from 'react-icons/fa';

export default function ToolPage() {
  const emerald = '#059669';
  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <div id="health-tools-breadcrumb" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <a href="/more?tab=tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', color: '#059669', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(5,150,105,0.15)'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
            </a>
          </div>

                <div>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>HIIT Timer</h2>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Interval training timer • 150+ Premium Features</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '20px', padding: '60px 40px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <FaTools size={64} style={{ color: '#e2e8f0', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>🚀 Coming Soon!</h3>
            <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 20px' }}>
              This health tool is currently being developed with 150+ premium features. Check back soon!
            </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
