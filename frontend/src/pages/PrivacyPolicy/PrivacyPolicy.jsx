import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ paddingTop: '80px', maxWidth: '900px', margin: '0 auto', padding: '80px 24px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', marginBottom: '16px' }}>Privacy Policy</h1>
      <p style={{ color: "#059669" }}>Last updated: June 11, 2026</p>
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', lineHeight: '1.6' }}>
        <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use WellnessOS.</p>
        <h3>Information Collection</h3>
        <p>We collect data you provide (name, email, health metrics) and usage data (app interactions). All health data is stored locally on your device by default; no data is shared without your explicit consent.</p>
        <h3>Data Security</h3>
        <p>We use industry-standard encryption and secure protocols. You can delete all your data at any time using the “Reset Data” buttons in the app.</p>
        <h3>Third Parties</h3>
        <p>We do not sell your data. We may use analytics to improve the app, but all data is anonymized.</p>
        <h3>Changes</h3>
        <p>This policy may be updated. Significant changes will be notified within the app.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

