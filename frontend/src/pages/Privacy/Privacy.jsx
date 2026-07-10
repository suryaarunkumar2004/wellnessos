import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useToast } from '../../contexts/ToastContext';
import { 
  FaShieldAlt, FaLock, FaKey, FaHistory, FaDownload, 
  FaUserSlash, FaCheckCircle, FaExclamationTriangle,
  FaFileInvoice, FaEye, FaChevronRight, FaHeartbeat
} from 'react-icons/fa';

const Privacy = () => {
  const { showToast } = useToast();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  // State
  const [activeSec, setActiveSec] = useState('hipaa');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // Toggles for granular consent
  const [consents, setConsents] = useState({
    researchShare: false,
    insuranceSync: true,
    aggregateMarketing: false,
    publicAnonymizedIndex: false,
    wearablesAgg: true,
    telehealthLogs: true
  });

  // Security Access Logs
  const [accessLogs] = useState([
    { id: 1, action: 'Biometrics Sync Fetch', time: 'Today, 2:32 PM', ip: '192.168.1.45 (Local)', status: 'Authorized (AES-256)' },
    { id: 2, action: 'Lab Results Export', time: 'Yesterday, 10:14 AM', ip: '198.51.100.12 (Quest Diagnostics)', status: 'Authorized (TLS 1.3)' },
    { id: 3, action: 'e-Prescription Dispatch', time: 'July 2, 2:40 PM', ip: '203.0.113.88 (Walgreens API)', status: 'Authorized (AES-256)' },
    { id: 4, action: 'Account Login Attempt', time: 'July 1, 9:02 AM', ip: '172.56.21.90 (Mobile App)', status: 'Authorized (2FA Pass)' }
  ]);

  const handleToggleConsent = (key) => {
    const updated = { ...consents, [key]: !consents[key] };
    setConsents(updated);
    showToast(`Consent setting updated.`, 'info');
  };

  const handleSaveConsents = () => {
    showToast('HIPAA sharing consent configurations saved.', 'success');
  };

  // Mock DSAR JSON Data Exporter
  const handleExportJSON = () => {
    const userObj = localStorage.getItem('user');
    const parsedUser = userObj ? JSON.parse(userObj) : { name: 'WellNest Patient', email: 'patient@wellnest.com' };
    
    const exportData = {
      subject: 'Data Subject Access Request (DSAR)',
      exportedAt: new Date().toISOString(),
      complianceIdentifier: 'HIPAA-GDPR-DSAR-9982A',
      profileDetails: parsedUser,
      linkedDependents: JSON.parse(localStorage.getItem('med_family') || '[]'),
      biometricsMetrics: JSON.parse(localStorage.getItem('wellnest_dashboard_metrics') || '[]'),
      scheduledEvents: JSON.parse(localStorage.getItem('wellnest_events') || '[]'),
      consentsProfile: consents
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wellnest_personal_data_record.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('DSAR personal data record JSON exported.', 'success');
  };

  const handleDeleteRequest = (e) => {
    e.preventDefault();
    if (deleteConfirmationText.toLowerCase() === 'delete') {
      showToast('Account erasure request submitted. Deletion scheduled in 30 days.', 'success');
      setShowDeleteConfirm(false);
      setDeleteConfirmationText('');
    } else {
      showToast('Please type "DELETE" to confirm account deletion.', 'warning');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', sans-serif", paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          
          {/* Header Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            padding: '20px 0',
            borderBottom: '2px solid #cbd5e1'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '800', 
                color: '#1e293b',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <FaShieldAlt style={{ color: emerald, fontSize: '1.5rem' }} />
                Privacy & Consent Center
              </h1>
              <p style={{ color: '#64748b', margin: '6px 0 0', fontSize: '0.88rem' }}>
                Manage HIPAA constraints, access histories and clinical data portability exports
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'flex-start' }}>
            
            {/* Left Nav menu */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1e293b', fontWeight: '800' }}>Privacy Tabs</h3>
              {[
                { id: 'hipaa', label: 'HIPAA & Compliance', icon: FaShieldAlt },
                { id: 'consent', label: 'Sharing Consents', icon: FaLock },
                { id: 'dsar', label: 'Data Portability', icon: FaDownload },
                { id: 'security', label: 'Access Audit Logs', icon: FaHistory }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => { setActiveSec(sec.id); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeSec === sec.id ? '#ecfdf5' : 'transparent',
                    color: activeSec === sec.id ? '#059669' : '#475569',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={e => { if (activeSec !== sec.id) e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseLeave={e => { if (activeSec !== sec.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <sec.icon size={14} style={{ color: activeSec === sec.id ? '#059669' : '#64748b' }} />
                    <span>{sec.label}</span>
                  </div>
                  <FaChevronRight size={10} style={{ opacity: activeSec === sec.id ? 1 : 0.3 }} />
                </button>
              ))}
            </div>

            {/* Right main panel */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '32px', minHeight: '450px' }}>
              
              {/* HIPAA COMPLIANCE */}
              {activeSec === 'hipaa' && (
                <>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', margin: '0 0 20px 0' }}>HIPAA Statement & Patient Rights</h2>
                  
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ color: '#059669', paddingTop: '2px' }}>
                      <FaCheckCircle size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1e293b', fontWeight: '700' }}>HIPAA Health Data Compliance Verified</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>
                        WellNest services fully align with the Health Insurance Portability and Accountability Act (HIPAA) rules. Your Protected Health Information (PHI) is encrypted at rest and in transit.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                    <div>
                      <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>1. The Right to Inspect and Copy Your Records</strong>
                      <span>You have the legal right to inspect and download copies of your medical diaries, diagnostics files, and prescriptions archived in your Health Vault.</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>2. The Right to Amend Health Data</strong>
                      <span>If you identify discrepancies in logged vitals, history files, or settings parameters, you can issue corrections or modify biometrics logs directly on your Dashboard.</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>3. The Right to Restrict Data Sharing</strong>
                      <span>You hold absolute discretion to control which clinics, pharmacists, or insurance syndicates gain authorization to synchronize with your physical biometric indexes.</span>
                    </div>
                  </div>
                </>
              )}

              {/* CONSENTS CONFIG */}
              {activeSec === 'consent' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>Granular Data Sharing Consents</h2>
                    <button onClick={handleSaveConsents} className="settings-btn" style={{ padding: '8px 16px', fontSize: '0.8rem', background: emerald }}>
                      Save Consents
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { key: 'researchShare', title: 'Clinical Research Aggregation', desc: 'Allow sharing of anonymized vitals trends with academic health research projects.' },
                      { key: 'insuranceSync', title: 'Insurance Provider Direct Sync', desc: 'Sync wellness scores and active diagnostics summaries to claim premium reductions.' },
                      { key: 'aggregateMarketing', title: 'Marketing Analytics Opt-In', desc: 'Share aggregate demographic profile structures with wellness partners.' },
                      { key: 'publicAnonymizedIndex', title: 'Public Medical Index Tracking', desc: 'Contribute anonymized symptom tracker statistics to CDC health tracking indices.' },
                      { key: 'wearablesAgg', title: 'Biometrics Device Synchronization', desc: 'Permit Google Fit and Fitbit integrations to continuously inject raw telemetry.' },
                      { key: 'telehealthLogs', title: 'Telehealth Video Transcripts Cache', desc: 'Keep transcript dialog logs in local vault for medical diary review.' }
                    ].map(item => (
                      <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                        <div style={{ paddingRight: '20px' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1e293b', fontWeight: '700' }}>{item.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: '1.3' }}>{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consents[item.key]}
                          onChange={() => handleToggleConsent(item.key)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: emerald }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* DATA PORTABILITY (DSAR) */}
              {activeSec === 'dsar' && (
                <>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', margin: '0 0 20px 0' }}>Data Portability & Port Management</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '28px' }}>
                    As part of GDPR Subject Access Rights (DSAR) and HIPAA data portability clauses, you can download a complete backup of your data dossier, or submit an erasure directive.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                    
                    {/* JSON Export card */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', background: '#f8fafc' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: '#1e293b', fontWeight: '700' }}>Export Personal Dossier</h4>
                      <p style={{ margin: '0 0 16px 0', fontSize: '0.78rem', color: '#64748b', lineHeight: '1.4' }}>
                        Download profile parameters, biometric history curves, dependents list, and scheduled medical events in structured JSON format.
                      </p>
                      <button onClick={handleExportJSON} className="settings-btn" style={{ padding: '8px 16px', fontSize: '0.8rem', background: '#3b82f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaDownload /> Download JSON Dossier
                      </button>
                    </div>

                    {/* Account Erasure card */}
                    <div style={{ border: '1px solid #fecaca', borderRadius: '18px', padding: '20px', background: '#fff5f5' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: '#991b1b', fontWeight: '700' }}>Request Account Erasure</h4>
                      <p style={{ margin: '0 0 16px 0', fontSize: '0.78rem', color: '#b91c1c', lineHeight: '1.4' }}>
                        Irrevocably purge health records, vault files, dependents profiles, and credentials. Submitting will queue deletion within 30 days.
                      </p>
                      <button onClick={() => setShowDeleteConfirm(true)} className="settings-btn" style={{ padding: '8px 16px', fontSize: '0.8rem', background: '#dc2626' }}>
                        Initiate Purge Request
                      </button>
                    </div>

                  </div>

                  {/* Purge Request Modal dialog */}
                  {showDeleteConfirm && (
                    <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', padding: '20px', borderRadius: '16px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                        <FaExclamationTriangle /> CRITICAL WARNING: Account Deletion
                      </h4>
                      <p style={{ margin: '0 0 14px 0', fontSize: '0.78rem', color: '#7f1d1d', lineHeight: '1.4' }}>
                        This action will terminate active appointments, invalidate prescription delivery routes, and wipe your Document Vault. To confirm, type **"DELETE"** in the input below.
                      </p>
                      <form onSubmit={handleDeleteRequest} style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          placeholder='Type "DELETE" here' 
                          value={deleteConfirmationText}
                          onChange={e => setDeleteConfirmationText(e.target.value)}
                          className="settings-input"
                          style={{ flex: 1, borderColor: '#f87171', background: 'white' }}
                        />
                        <button type="submit" className="settings-btn" style={{ background: '#dc2626', padding: '0 20px' }}>Confirm Purge</button>
                        <button type="button" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmationText(''); }} className="settings-btn-outline" style={{ borderColor: '#cbd5e1' }}>Cancel</button>
                      </form>
                    </div>
                  )}
                </>
              )}

              {/* SECURITY AUDIT LOGS */}
              {activeSec === 'security' && (
                <>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', margin: '0 0 20px 0' }}>Data Access Audit Trail</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '700' }}>ENCRYPTION PROTOCOL</div>
                      <div style={{ fontSize: '1.15rem', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <FaLock /> AES-256 E2E KEY ACTIVE
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '700' }}>CLIENT CONNECTION STATE</div>
                      <div style={{ fontSize: '1.15rem', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <FaKey /> TLS 1.3 SECURED
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {accessLogs.map(log => (
                      <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#1e293b' }}>{log.action}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>IP: {log.ip} • Timestamp: {log.time}</div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: emerald }}>{log.status}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>

          </div>

        </div>
      </div>
      <Footer />
      </>
  );
};

export default Privacy;
