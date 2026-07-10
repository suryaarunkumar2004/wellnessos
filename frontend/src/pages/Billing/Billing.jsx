import React from 'react';
import Footer from '../../components/Footer/Footer';
import { FaWallet, FaReceipt, FaCreditCard, FaCheckCircle, FaFileInvoiceDollar } from 'react-icons/fa';

const sampleInvoices = [
  { id: 'INV-0912', date: 'June 18, 2026', description: 'Monthly Premium Plan Subscription', amount: '$29.00', status: 'Paid' },
  { id: 'INV-0841', date: 'June 02, 2026', description: 'Telehealth Consultation Fee (Dr. Emily Carter)', amount: '$75.00', status: 'Paid' },
  { id: 'INV-0711', date: 'May 18, 2026', description: 'Monthly Premium Plan Subscription', amount: '$29.00', status: 'Paid' },
  { id: 'INV-0610', date: 'April 18, 2026', description: 'Monthly Premium Plan Subscription', amount: '$29.00', status: 'Paid' },
];

const Billing = () => {
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#059669', fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>Billing & Subscriptions</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Manage your payment settings, subscriptions, and download invoices</p>
        </div>

        {/* Subscription Plan Card */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          borderRadius: '24px',
          padding: '32px',
          color: 'white',
          boxShadow: '0 8px 30px rgba(5,150,105,0.15)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', opacity: 0.8 }}>Current Plan</span>
            <h2 style={{ fontSize: '2rem', margin: '4px 0 12px 0', fontWeight: '800' }}>WellNest Premium</h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.95rem' }}>
              <FaCheckCircle /> Next renewal date: July 18, 2026 ($29.00/mo)
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Plan Benefits</div>
          </div>
        </div>

        {/* Invoices List */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '30px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaReceipt style={{ color: emerald }} /> Invoice History
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {sampleInvoices.map((inv) => (
              <div key={inv.id} style={{
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ color: emerald, fontSize: '1.4rem' }}>
                    <FaFileInvoiceDollar />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{inv.description}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      {inv.date} • {inv.id}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{inv.amount}</span>
                  <span style={{
                    background: emeraldLight,
                    color: emerald,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </div>
  );
};

export default Billing;
