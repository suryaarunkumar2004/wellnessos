import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Shield, Lock, Eye, Database, Users, Bell, Globe, FileText, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const SECTIONS = [
  {
    id: 'collection',
    icon: Database,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: '1. Information We Collect',
    content: [
      {
        heading: 'Personal Identification Data',
        text: 'When you register for a WellNest account, we collect your full name, email address, date of birth, gender, and contact number. This information is used solely to personalise your experience and maintain your account security.'
      },
      {
        heading: 'Health & Medical Data',
        text: 'With your explicit consent, WellNest collects health metrics including heart rate, step counts, sleep patterns, body weight, blood pressure readings, and any health conditions or medications you choose to record. All medical data is end-to-end encrypted and stored in compliance with HIPAA and applicable local health data regulations.'
      },
      {
        heading: 'Usage & Interaction Data',
        text: 'We collect anonymised app interaction data such as feature usage frequency, session duration, and click patterns. This data helps us improve the platform experience and is never linked to your personal identity.'
      },
      {
        heading: 'Device & Technical Data',
        text: 'We may collect your device type, operating system version, browser type, IP address, and time zone for security purposes and to optimise platform performance. This data is retained for a maximum of 90 days.'
      }
    ]
  },
  {
    id: 'use',
    icon: FileText,
    color: '#059669',
    bg: '#ecfdf5',
    title: '2. How We Use Your Information',
    content: [
      {
        heading: 'Providing & Personalising Services',
        text: 'Your data is primarily used to deliver the core WellNest features — health tracking, telehealth consultations, appointment scheduling, medication reminders, and personalised wellness insights. We use your historical health data to surface relevant health tips and contextual recommendations.'
      },
      {
        heading: 'Safety & Emergency Features',
        text: 'Emergency contact information and medical passport data (blood type, allergies, chronic conditions) may be used to surface critical information during medical emergencies via your Emergency Medical ID, accessible only by authorised emergency personnel.'
      },
      {
        heading: 'Research & Improvement (Anonymised Only)',
        text: 'Aggregated, fully anonymised health datasets may be used to improve WellNest algorithms, develop new features, or contribute to population health research. No personally identifiable information is ever included in research datasets without your separate, explicit written consent.'
      },
      {
        heading: 'Communications',
        text: 'We use your email and in-app notification settings to send appointment reminders, medication alerts, account security notices, and (with your opt-in) health tips and WellNest product updates. You may unsubscribe from marketing communications at any time.'
      }
    ]
  },
  {
    id: 'sharing',
    icon: Users,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    title: '3. Data Sharing & Third Parties',
    content: [
      {
        heading: 'We Never Sell Your Data',
        text: 'WellNest has a strict no-sale policy for personal and health data. Your information is never sold, rented, or traded to any third party for commercial purposes — period.'
      },
      {
        heading: 'Healthcare Providers',
        text: 'When you initiate a telehealth consultation or share records with a physician through WellNest, the relevant health data is transmitted to that specific provider only, with your active in-session consent. You can revoke access at any time from your Privacy Controls dashboard.'
      },
      {
        heading: 'Wearable Device Partners',
        text: 'If you connect a third-party wearable (Fitbit, Garmin, Apple Health, Google Fit), data is synced using OAuth 2.0 secure token authentication. WellNest reads only the specific metric types you authorise and does not write data to these platforms without your consent.'
      },
      {
        heading: 'Legal & Compliance Disclosures',
        text: 'In rare circumstances, we may be legally required to disclose certain data in response to a valid court order, regulatory investigation, or to protect the safety of our users. We will notify you of any such request to the fullest extent permitted by law.'
      }
    ]
  },
  {
    id: 'security',
    icon: Lock,
    color: '#ef4444',
    bg: '#fef2f2',
    title: '4. Data Security & Encryption',
    content: [
      {
        heading: 'AES-256 Encryption at Rest',
        text: 'All health records, personal data, and medical passport information stored in WellNest databases are encrypted using AES-256 encryption. Encryption keys are managed via a dedicated Hardware Security Module (HSM) and rotated on a quarterly schedule.'
      },
      {
        heading: 'TLS 1.3 Encryption in Transit',
        text: 'All data transmitted between your device and WellNest servers uses TLS 1.3, the current industry-leading transport encryption standard. Telehealth video sessions are additionally secured with DTLS-SRTP protocols for real-time media encryption.'
      },
      {
        heading: 'Access Control & Auditing',
        text: 'Role-based access controls ensure that WellNest employees can only access the minimum data necessary to perform their duties. All data access events are logged in an immutable audit trail and reviewed by our Security team monthly.'
      },
      {
        heading: 'Breach Response Protocol',
        text: 'In the unlikely event of a data breach affecting your personal information, WellNest will notify you via email within 72 hours of discovery, in accordance with GDPR Article 33 and applicable US state breach notification laws.'
      }
    ]
  },
  {
    id: 'rights',
    icon: Eye,
    color: '#f59e0b',
    bg: '#fffbeb',
    title: '5. Your Rights & Controls',
    content: [
      {
        heading: 'Right to Access',
        text: 'You have the right to request a full export of all personal and health data WellNest holds about you at any time. Data exports are delivered in a machine-readable JSON or PDF format within 30 days of request.'
      },
      {
        heading: 'Right to Rectification',
        text: 'You may update or correct any inaccurate personal information directly from your Profile page. Medical data corrections can be submitted through the Health Vault or by contacting our support team.'
      },
      {
        heading: 'Right to Erasure ("Right to be Forgotten")',
        text: 'You may request the permanent deletion of your WellNest account and all associated data at any time via Settings > Advanced Diagnostics > Delete Account. Deletion is irreversible and processed within 30 days. Some data may be retained for the minimum period required by healthcare regulations.'
      },
      {
        heading: 'Right to Data Portability',
        text: 'You can transfer your health records, reports, and wellness history to another healthcare platform in standard HL7 FHIR format. Portability exports are available from your Health Vault.'
      },
      {
        heading: 'Right to Opt-Out of Analytics',
        text: 'You can disable all analytics tracking at any time from Settings > General Preferences. Disabling analytics will not affect core WellNest functionality.'
      }
    ]
  },
  {
    id: 'cookies',
    icon: Bell,
    color: '#14b8a6',
    bg: '#f0fdfa',
    title: '6. Cookies & Local Storage',
    content: [
      {
        heading: 'Essential Cookies',
        text: 'WellNest uses strictly necessary cookies for authentication (session tokens), security (CSRF protection), and user preference persistence. These cannot be disabled as they are required for the platform to function.'
      },
      {
        heading: 'Analytics Cookies (Optional)',
        text: 'With your consent, we use anonymised first-party analytics cookies to understand how features are used and identify areas for improvement. No third-party advertising or tracking cookies are used on WellNest.'
      },
      {
        heading: 'Local Storage',
        text: 'WellNest uses browser localStorage to cache your health data for offline access and to improve page load performance. Locally stored data is encrypted using AES-128 with a per-session key. You can clear this at any time from Settings > Advanced Diagnostics > Clear Cache.'
      }
    ]
  },
  {
    id: 'international',
    icon: Globe,
    color: '#6366f1',
    bg: '#eef2ff',
    title: '7. International Data Transfers',
    content: [
      {
        heading: 'Data Residency',
        text: 'WellNest\'s primary data centers are located in the United States (AWS us-east-1) with redundant failover in the EU (AWS eu-west-1). Health data for users in the European Economic Area (EEA) is stored in EU-region data centers by default.'
      },
      {
        heading: 'Standard Contractual Clauses',
        text: 'For any international data transfers involving EEA users, WellNest relies on the European Commission\'s Standard Contractual Clauses (SCCs) as the appropriate legal mechanism to ensure adequate data protection levels.'
      }
    ]
  },
  {
    id: 'changes',
    icon: Shield,
    color: '#64748b',
    bg: '#f8fafc',
    title: '8. Changes to This Policy',
    content: [
      {
        heading: 'Policy Update Notifications',
        text: 'When we make material changes to this Privacy Policy, we will notify you via in-app notification and email at least 14 days before the changes take effect. Continued use of WellNest after the effective date constitutes acceptance of the updated policy.'
      },
      {
        heading: 'Version History',
        text: 'Previous versions of this Privacy Policy are archived and available upon request by contacting our Data Protection Officer at privacy@wellnest.health.'
      }
    ]
  }
];

const PrivacyPolicy = () => {
  const [expanded, setExpanded] = useState({ collection: true });

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

          {/* Hero Header */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '28px',
            padding: '48px 48px',
            marginBottom: '36px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <Shield size={28} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Privacy Policy</h1>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', opacity: 0.85 }}>WellNest Health Platform — Comprehensive Data Protection Statement</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                {[
                  { label: 'HIPAA Compliant', icon: CheckCircle },
                  { label: 'GDPR Compliant', icon: CheckCircle },
                  { label: 'SOC 2 Type II', icon: CheckCircle },
                  { label: 'ISO 27001', icon: CheckCircle },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <b.icon size={13} />
                    {b.label}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', fontSize: '0.82rem', opacity: 0.75 }}>
                Last updated: <strong>July 8, 2026</strong> &nbsp;•&nbsp; Effective: <strong>July 8, 2026</strong> &nbsp;•&nbsp; Version: <strong>3.2</strong>
              </div>
            </div>
          </div>

          {/* Intro Card */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px 32px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', lineHeight: '1.7' }}>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>
              At <strong style={{ color: '#059669' }}>WellNest</strong>, your health data is among the most sensitive information you can entrust to a digital platform. We take this responsibility with the utmost seriousness. This Privacy Policy explains in clear, transparent terms exactly what data we collect, why we collect it, how we protect it, and what rights you have over it. We believe in radical transparency — no hidden data practices, no vague language. If you have any questions, our Data Protection Officer is available at <strong>privacy@wellnest.health</strong>.
            </p>
          </div>

          {/* Accordion Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SECTIONS.map(section => {
              const isOpen = expanded[section.id];
              const Icon = section.icon;
              return (
                <div key={section.id} style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: `1px solid ${isOpen ? section.color + '30' : '#e2e8f0'}`,
                  boxShadow: isOpen ? `0 4px 20px ${section.color}10` : '0 2px 8px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}>
                  {/* Section Header */}
                  <button
                    onClick={() => toggle(section.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: section.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} style={{ color: section.color }} />
                      </div>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>{section.title}</span>
                    </div>
                    <div style={{ color: isOpen ? section.color : '#94a3b8', transition: 'color 0.2s', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Section Content */}
                  {isOpen && (
                    <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {section.content.map((item, i) => (
                        <div key={i} style={{ paddingLeft: '54px' }}>
                          <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.92rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: section.color, display: 'inline-block', flexShrink: 0 }} />
                            {item.heading}
                          </div>
                          <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem', lineHeight: '1.7' }}>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Footer */}
          <div style={{ marginTop: '28px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '20px', padding: '32px 36px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '6px' }}>Questions about your privacy?</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
                Contact our Data Protection Officer:<br />
                <span style={{ color: '#10b981', fontWeight: '700' }}>privacy@wellnest.health</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href="mailto:privacy@wellnest.health" style={{ padding: '10px 20px', background: '#059669', color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block' }}>
                Contact DPO
              </a>
              <a href="#" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>
                Download PDF
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      </>
  );
};

export default PrivacyPolicy;
