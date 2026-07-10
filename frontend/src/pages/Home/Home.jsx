import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaUserMd, FaHeartbeat, FaPills, FaArrowRight } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const features = [
    { icon: FaHeadset, title: '24/7 Support', description: 'Round-the-clock assistance for all your health queries' },
    { icon: FaUserMd, title: 'Expert Doctors', description: 'Consult with top healthcare professionals' },
    { icon: FaHeartbeat, title: 'Health Tracker', description: 'Monitor your health metrics in real-time' },
  ];

  const services = [
    { icon: FaUserMd, title: 'Find Doctors', desc: 'Connect with top specialists', link: '/doctors' },
    { icon: FaPills, title: 'Dosage Guide', desc: 'Medication information', link: '/dosage-guide' },
    { icon: FaHeartbeat, title: 'Health Tracker', desc: 'Track your wellness', link: '/health-tracker' },
  ];

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatBubble {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-15px) scale(1.05); }
            100% { transform: translateY(0) scale(1); }
          }
          .premium-fade-1 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .premium-fade-2 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
          .premium-fade-3 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
          .bubble-float-1 { animation: floatBubble 8s ease-in-out infinite; }
          .bubble-float-2 { animation: floatBubble 12s ease-in-out infinite 1s; }
          .premium-card {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .premium-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 16px 40px rgba(5, 150, 105, 0.08) !important;
            border-color: #a7f3d0 !important;
          }
          .service-card {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .service-card:hover {
            transform: translateY(-6px) !important;
            background: #ecfdf5 !important;
            border-color: #10b981 !important;
            box-shadow: 0 16px 40px rgba(5, 150, 105, 0.08) !important;
          }
        `}</style>

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #065f46 100%)',
          padding: '130px 20px 90px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bubble-float-1" style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none'
          }} />
          <div className="bubble-float-2" style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none'
          }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="premium-fade-1" style={{
              fontSize: '3.6rem',
              fontWeight: '900',
              letterSpacing: '-1.5px',
              marginBottom: '20px',
              lineHeight: '1.15',
              textShadow: '0 4px 30px rgba(0,0,0,0.15)'
            }}>
              Your Health, Our Priority
            </h1>
            <p className="premium-fade-2" style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              maxWidth: '620px',
              margin: '0 auto 36px',
              lineHeight: '1.7',
              fontWeight: '300'
            }}>
              Connect with top doctors, track your health metrics, and manage your wellness journey all in one place.
            </p>
            <div className="premium-fade-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/doctors" style={{
                padding: '16px 36px',
                borderRadius: '14px',
                background: 'white',
                color: '#059669',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}>
                Find a Doctor
              </Link>
              <Link to="/services" style={{
                padding: '16px 36px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(12px)'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '70px 20px' }}>
          <h2 style={{
            fontSize: '2.1rem',
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '44px',
            letterSpacing: '-0.75px'
          }}>
            Why Choose <span style={{ color: emerald }}>WellNest</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <div key={index} className="premium-card" style={{
                background: 'white',
                padding: '36px 30px',
                borderRadius: '20px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
                border: '1px solid #f1f5f9',
                textAlign: 'center',
                cursor: 'default'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '18px',
                  background: emeraldLight,
                  color: emerald,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2.2rem'
                }}>
                  <feature.icon />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.65' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div style={{ background: 'white', padding: '70px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.1rem',
              fontWeight: '800',
              color: '#1e293b',
              textAlign: 'center',
              marginBottom: '44px',
              letterSpacing: '-0.75px'
            }}>
              Our <span style={{ color: emerald }}>Services</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px'
            }}>
              {services.map((service, index) => (
                <Link key={index} to={service.link} className="service-card" style={{
                  textDecoration: 'none',
                  background: '#f8fafc',
                  padding: '36px 30px',
                  borderRadius: '20px',
                  border: '1px solid #f1f5f9',
                  textAlign: 'center',
                  display: 'block'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'white',
                    color: emerald,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '1.8rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}>
                    <service.icon />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>{service.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>{service.desc}</p>
                  <FaArrowRight style={{ color: emerald, fontSize: '0.85rem' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
