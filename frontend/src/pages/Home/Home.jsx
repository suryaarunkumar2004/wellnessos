import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaUserMd, FaHeartbeat, FaChartLine, FaSmile, FaLaptopMedical, FaCalendarAlt, FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Animated counter effect (simplified)
  const [counters, setCounters] = useState({ patients: 0, doctors: 0, years: 0 });
  useEffect(() => {
    const targets = { patients: 50000, doctors: 100, years: 5 };
    const interval = setInterval(() => {
      setCounters(prev => {
        let newCounters = { ...prev };
        let done = true;
        for (let key in targets) {
          if (prev[key] < targets[key]) {
            newCounters[key] = Math.min(prev[key] + Math.ceil(targets[key] / 50), targets[key]);
            done = false;
          }
        }
        if (done) clearInterval(interval);
        return newCounters;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const healthTips = [
    { title: 'Stay Hydrated', desc: 'Drink 8 glasses of water daily for optimal health.', link: '/blog/hydration' },
    { title: 'Regular Exercise', desc: '30 minutes of activity can boost mood and energy.', link: '/blog/exercise' },
    { title: 'Mindfulness', desc: '5 minutes of meditation reduces stress.', link: '/blog/mindfulness' },
  ];

  return (
    <div style={{ paddingTop: '0px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#064e3b', lineHeight: '1.2', marginBottom: '16px' }}>
            Your Health,<br /><span style={{ color: '#059669' }}>Our Priority</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '600px', margin: '0 auto 32px' }}>
            Book appointments, consult experts, track your health and achieve your wellness goals.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-appointment" style={{ background: '#059669', color: 'white', padding: '12px 28px', borderRadius: '40px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Book Appointment <FaCalendarAlt />
            </Link>
            <Link to="/services" style={{ background: 'white', color: '#059669', border: '1px solid #059669', padding: '12px 28px', borderRadius: '40px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Explore Services <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ background: 'white', padding: '48px 24px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '32px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: '#059669' }}>{counters.patients.toLocaleString()}+</div>
            <div style={{ color: "#059669" }}>Happy Patients</div>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: '#059669' }}>{counters.doctors}+</div>
            <div style={{ color: "#059669" }}>Expert Doctors</div>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: '#059669' }}>{counters.years}+</div>
            <div style={{ color: "#059669" }}>Years of Excellence</div>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <div style={{ padding: '60px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center', marginBottom: '48px' }}>Our Core Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div style={{ background: 'white', padding: '28px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <FaHeadset style={{ fontSize: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>24/7 Support</h3>
              <p style={{ color: '#6b7280' }}>We are here for your care</p>
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <FaUserMd style={{ fontSize: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Expert Doctors</h3>
              <p style={{ color: '#6b7280' }}>100+ certified specialists</p>
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <FaHeartbeat style={{ fontSize: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Health Tracker</h3>
              <p style={{ color: '#6b7280' }}>Track your daily progress</p>
            </div>
            <div style={{ background: 'white', padding: '28px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <FaChartLine style={{ fontSize: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Rx Checker</h3>
              <p style={{ color: '#6b7280' }}>Medication safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Programs */}
      <div style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center', marginBottom: '48px' }}>Featured Wellness Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#059669', padding: '40px 20px', textAlign: 'center', color: 'white' }}>
                <FaSmile style={{ fontSize: '48px' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Stress Management</h3>
                <p style={{ color: "#059669" }}>8-week guided program to reduce stress and improve mental wellbeing.</p>
                <Link to="/services" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Learn More →</Link>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#10b981', padding: '40px 20px', textAlign: 'center', color: 'white' }}>
                <FaLaptopMedical style={{ fontSize: '48px' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Virtual Consultations</h3>
                <p style={{ color: "#059669" }}>Connect with top doctors from the comfort of your home.</p>
                <Link to="/book-appointment" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Book Now →</Link>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#047857', padding: '40px 20px', textAlign: 'center', color: 'white' }}>
                <FaHeartbeat style={{ fontSize: '48px' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Cardio Fitness</h3>
                <p style={{ color: "#059669" }}>Personalized fitness plans for a healthier heart.</p>
                <Link to="/health-tracker" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Get Started →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#ecfdf5', padding: '60px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', marginBottom: '32px' }}>What Our Patients Say</h2>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#1f2937', marginBottom: '24px' }}>“WellnessOS transformed my health. The doctors are top-notch and the tracker helped me stay consistent.”</p>
            <div style={{ fontWeight: '700', color: '#059669' }}>— Sarah Johnson</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Verified Patient</div>
          </div>
        </div>
      </div>

      {/* Health Tips / Blog Preview */}
      <div style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', textAlign: 'center', marginBottom: '48px' }}>Health Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {healthTips.map((tip, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#064e3b', marginBottom: '12px' }}>{tip.title}</h3>
                <p style={{ color: "#059669" }}>{tip.desc}</p>
                <Link to={tip.link} style={{ color: '#059669', fontWeight: '500', textDecoration: 'none' }}>Read more →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div style={{ background: '#f0fdf4', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#064e3b', marginBottom: '16px' }}>Stay Updated</h2>
          <p style={{ color: "#059669" }}>Subscribe to our newsletter for health tips and exclusive offers.</p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '12px 20px', borderRadius: '40px', border: '1px solid #cbd5e1', flex: '1', minWidth: '200px' }} />
            <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}><FaEnvelope /> Subscribe</button>
          </form>
          {subscribed && <div style={{ marginTop: '16px', color: '#059669', fontWeight: '500' }}>Thanks for subscribing!</div>}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Ready to start your wellness journey?</h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>Join thousands of happy patients who trust WellnessOS.</p>
          <Link to="/signup" style={{ background: 'white', color: '#059669', padding: '14px 32px', borderRadius: '40px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>Join Now – It's Free</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

