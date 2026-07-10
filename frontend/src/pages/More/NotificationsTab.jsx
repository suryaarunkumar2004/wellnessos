import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../contexts/ToastContext';
import {
  FaBell, FaCheckCircle, FaClock, FaFilter, FaSearch,
  FaTrash, FaExclamationTriangle, FaHeartbeat, FaSpinner,
  FaCalendarCheck, FaRegBell, FaHistory, FaVolumeMute,
  FaEnvelope, FaMobileAlt, FaDesktop, FaPills, FaFlask,
  FaCreditCard, FaUserMd, FaShieldAlt, FaSlidersH,
  FaBellSlash, FaTimesCircle, FaCircle, FaCheckDouble,
  FaStar, FaBolt, FaArchive, FaEllipsisV, FaTimes
} from 'react-icons/fa';

const CATEGORY_META = {
  Medication:   { icon: FaPills,            color: '#8b5cf6', bg: '#f5f3ff', label: 'Medication' },
  Vital:        { icon: FaHeartbeat,        color: '#ef4444', bg: '#fef2f2', label: 'Vital Alert' },
  Appointment:  { icon: FaCalendarCheck,   color: '#059669', bg: '#ecfdf5', label: 'Appointment' },
  Lab:          { icon: FaFlask,            color: '#3b82f6', bg: '#eff6ff', label: 'Lab Result' },
  Billing:      { icon: FaCreditCard,       color: '#f59e0b', bg: '#fffbeb', label: 'Billing' },
  System:       { icon: FaShieldAlt,        color: '#64748b', bg: '#f8fafc', label: 'System' },
  Doctor:       { icon: FaUserMd,           color: '#0ea5e9', bg: '#f0f9ff', label: 'Doctor' },
};

const PRIORITY_META = {
  high:   { color: '#ef4444', bg: '#fef2f2', label: 'High',   dot: '🔴' },
  medium: { color: '#f59e0b', bg: '#fffbeb', label: 'Medium', dot: '🟡' },
  low:    { color: '#3b82f6', bg: '#eff6ff', label: 'Low',    dot: '🔵' },
};

const DEFAULT_NOTIFICATIONS = [
  { id: 1,  title: '💊 Metformin 500mg Refill Due',                description: 'Your prescription has 3 days remaining. Initiate dispatch via Health Vault or visit CVS Pharmacy.',         category: 'Medication',  priority: 'high',   time: new Date(Date.now() - 3_600_000).toISOString(),   read: false, pinned: true,  snoozedUntil: null },
  { id: 2,  title: '🚨 Blood Pressure Threshold Exceeded',          description: 'Biometric BP reading registered 142/91 mmHg. This exceeds safe limits. Rest and monitor vitals closely.',   category: 'Vital',       priority: 'high',   time: new Date(Date.now() - 7_200_000).toISOString(),   read: false, pinned: true,  snoozedUntil: null },
  { id: 3,  title: '🏥 Cardiology Appointment Tomorrow — 10:00 AM', description: 'Video consult with Dr. Emily Carter confirmed. Run hardware diagnostics. Prepare ECG and latest labs.',      category: 'Appointment', priority: 'medium', time: new Date(Date.now() - 14_400_000).toISOString(),  read: false, pinned: false, snoozedUntil: null },
  { id: 4,  title: '🧪 Thyroid Panel Results Ready',                description: 'TSH: 2.1 mIU/L (Normal). T4: 1.2 ng/dL. Results securely archived in your Document Vault.',              category: 'Lab',         priority: 'medium', time: new Date(Date.now() - 86_400_000).toISOString(),  read: true,  pinned: false, snoozedUntil: null },
  { id: 5,  title: '💳 Invoice #WN-99827 — $15.00',                 description: 'Co-pay receipt generated for video consultation on 05 Jul 2026. Download from Billing › Receipts.',         category: 'Billing',     priority: 'low',    time: new Date(Date.now() - 172_800_000).toISOString(), read: true,  pinned: false, snoozedUntil: null },
  { id: 6,  title: '📩 New Message from Dr. Rachel Adams',          description: '"Hi, please ensure you take Lisinopril at the same time each day. Follow-up in 2 weeks. — Dr. Adams"',     category: 'Doctor',      priority: 'medium', time: new Date(Date.now() - 43_200_000).toISOString(),  read: false, pinned: false, snoozedUntil: null },
  { id: 7,  title: '💉 Annual Flu Vaccine Reminder',                description: 'Influenza season approaching. Book your flu vaccine at Walgreens or WellNest Immunization Center now.',    category: 'Appointment', priority: 'low',    time: new Date(Date.now() - 259_200_000).toISOString(), read: true,  pinned: false, snoozedUntil: null },
  { id: 8,  title: '🔒 Login from New Device Detected',             description: 'A login was detected from Chrome on MacOS (IP: 192.168.1.22). If this wasn\'t you, secure your account.',   category: 'System',      priority: 'high',   time: new Date(Date.now() - 1_800_000).toISOString(),   read: false, pinned: false, snoozedUntil: null },
  { id: 9,  title: '🩺 Lisinopril 10mg Weekly Check-In',           description: 'Weekly adherence check. You have taken 5 of 7 scheduled doses. Tap to log today\'s dose.',                  category: 'Medication',  priority: 'medium', time: new Date(Date.now() - 21_600_000).toISOString(),  read: true,  pinned: false, snoozedUntil: null },
  { id: 10, title: '🧠 Stress Level Alert — High Reading',          description: 'Your biometric stress score registered 78/100 this morning. Recommended: 10-min breathing exercise.',       category: 'Vital',       priority: 'medium', time: new Date(Date.now() - 10_800_000).toISOString(),  read: false, pinned: false, snoozedUntil: null },
];

const AUDIT_LOGS = [
  { id: 1, event: 'Telehealth Link Shared',          time: 'Today, 2:30 PM',       severity: 'Info',    status: 'Delivered (Push + Email)' },
  { id: 2, event: 'Blood Pressure Threshold Alert',  time: 'Yesterday, 10:15 AM',  severity: 'Warning', status: 'Delivered (SMS + Push)' },
  { id: 3, event: 'Metformin Refill Alert Sent',     time: '2 days ago, 9:00 AM',  severity: 'Medium',  status: 'Delivered (Email)' },
  { id: 4, event: 'Payment Success — Inv #9982',     time: '3 days ago, 4:10 PM',  severity: 'Low',     status: 'Snoozed (Quiet Hours)' },
  { id: 5, event: 'New Device Login Detected',       time: '4 days ago, 11:20 AM', severity: 'High',    status: 'Delivered (Push + Email + SMS)' },
];

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000)    return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function NotificationsTab() {
  const { showToast } = useToast();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const [notifications, setNotifications] = useState(() => {
    const local = localStorage.getItem('wellnest_notifications');
    return local ? JSON.parse(local) : DEFAULT_NOTIFICATIONS;
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');       // All / Unread / Read / Pinned
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showPrefs, setShowPrefs] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);        // notification id with open kebab menu

  /* ── Preferences ── */
  const [quietHours, setQuietHours] = useState({ active: false, start: '22:00', end: '07:00' });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [channels, setChannels] = useState({ push: true, email: true, sms: false });
  const [prefs, setPrefs] = useState({
    telehealth: true, labResults: true, medicationRefills: true,
    vitalThresholds: true, emergencyAlerts: true, doctorMessages: true,
    billingUpdates: false, systemNews: false,
  });

  /* ── Load ── */
  useEffect(() => {
    const load = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      try {
        const res = await fetch('http://localhost:8080/api/notifications?userId=1', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          const updated = data.length ? data : DEFAULT_NOTIFICATIONS;
          setNotifications(updated);
          localStorage.setItem('wellnest_notifications', JSON.stringify(updated));
        }
      } catch {
        // use local cache / defaults already set in useState
      }
    };
    load();
  }, []);

  const sync = useCallback(updated => {
    setNotifications(updated);
    localStorage.setItem('wellnest_notifications', JSON.stringify(updated));
  }, []);

  const markRead = id => sync(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markUnread = id => sync(notifications.map(n => n.id === id ? { ...n, read: false } : n));
  const markAllRead = () => { sync(notifications.map(n => ({ ...n, read: true }))); showToast('✅ All notifications marked as read', 'success'); };
  const deleteOne = id => { sync(notifications.filter(n => n.id !== id)); showToast('🗑 Notification dismissed', 'info'); };
  const deleteRead = () => { sync(notifications.filter(n => !n.read)); showToast('🗑 Read notifications cleared', 'info'); };
  const togglePin = id => sync(notifications.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  const snooze = (id, mins) => {
    const until = Date.now() + mins * 60_000;
    sync(notifications.map(n => n.id === id ? { ...n, snoozedUntil: until } : n));
    showToast(`⏰ Notification snoozed for ${mins < 60 ? mins + ' minutes' : (mins / 60) + ' hour(s)'}`, 'info');
    setActiveMenu(null);
  };

  /* ── Filtered ── */
  const filtered = notifications.filter(n => {
    const q = searchTerm.toLowerCase();
    const matchQ = (n.title || '').toLowerCase().includes(q) || (n.description || '').toLowerCase().includes(q);
    const matchType =
      filterType === 'All' ? true :
      filterType === 'Unread' ? !n.read :
      filterType === 'Read' ? n.read :
      filterType === 'Pinned' ? n.pinned : true;
    const matchCat = filterCategory === 'All' || n.category === filterCategory;
    const matchPri = filterPriority === 'All' || n.priority === filterPriority;
    return matchQ && matchType && matchCat && matchPri;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highCount   = notifications.filter(n => n.priority === 'high').length;
  const pinnedCount = notifications.filter(n => n.pinned).length;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} onClick={() => setActiveMenu(null)}>

      {/* ── HERO HEADER ── */}
      <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
              <FaBell style={{ fontSize: '2rem' }} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.65rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #047857' }}>{unreadCount}</span>
              )}
            </div>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Notifications</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>Health alerts, reminders and system updates</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Total Alerts', value: notifications.length },
              { label: 'Unread', value: unreadCount },
              { label: 'High Priority', value: highCount },
              { label: 'Pinned', value: pinnedCount },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTION BAR ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={markAllRead} style={actionBtn('#059669', 'white')}><FaCheckDouble size={12} /> Mark All Read</button>
          <button onClick={deleteRead} style={actionBtn('#fef2f2', '#ef4444')}><FaTrash size={12} /> Clear Read</button>
          <button onClick={() => { setShowPrefs(!showPrefs); setShowAudit(false); }} style={actionBtn(showPrefs ? '#ecfdf5' : '#f8fafc', showPrefs ? '#059669' : '#475569')}><FaSlidersH size={12} /> Preferences</button>
          <button onClick={() => { setShowAudit(!showAudit); setShowPrefs(false); }} style={actionBtn(showAudit ? '#ecfdf5' : '#f8fafc', showAudit ? '#059669' : '#475569')}><FaHistory size={12} /> Audit Log</button>
        </div>
        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
          <span style={{ color: emerald, fontWeight: '800' }}>{filtered.length}</span> notifications
        </span>
      </div>

      {/* ── PREFERENCES PANEL ── */}
      {showPrefs && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}><FaSlidersH style={{ color: emerald }} /> Notification Preferences</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Delivery Channels */}
            <div>
              <p style={sectionLabel}>Delivery Channels</p>
              {[['push', 'Push Notifications', FaDesktop], ['email', 'Email Alerts', FaEnvelope], ['sms', 'SMS Alerts', FaMobileAlt]].map(([key, label, Icon]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon style={{ color: emerald, fontSize: '0.9rem' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b' }}>{label}</span>
                  </div>
                  <div onClick={() => setChannels(p => ({ ...p, [key]: !p[key] }))}
                    style={{ width: '40px', height: '22px', borderRadius: '11px', background: channels[key] ? emerald : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                    <div style={{ position: 'absolute', top: '3px', left: channels[key] ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Alert Categories */}
            <div>
              <p style={sectionLabel}>Alert Categories</p>
              {Object.entries({
                telehealth: 'Telehealth Reminders', labResults: 'Lab & Test Results',
                medicationRefills: 'Medication Refill Alerts', vitalThresholds: 'Vital Sign Thresholds',
                emergencyAlerts: 'Emergency Alerts', doctorMessages: 'Doctor Messages',
                billingUpdates: 'Billing Updates', systemNews: 'System News',
              }).map(([key, label]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#475569' }}>{label}</span>
                  <div onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}
                    style={{ width: '36px', height: '20px', borderRadius: '10px', background: prefs[key] ? emerald : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                    <div style={{ position: 'absolute', top: '2px', left: prefs[key] ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quiet Hours + Sound */}
            <div>
              <p style={sectionLabel}>Advanced Settings</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaBellSlash style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b' }}>Quiet Hours</span>
                </div>
                <div onClick={() => setQuietHours(p => ({ ...p, active: !p.active }))}
                  style={{ width: '40px', height: '22px', borderRadius: '11px', background: quietHours.active ? emerald : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '3px', left: quietHours.active ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                </div>
              </div>
              {quietHours.active && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {[['start', 'From'], ['end', 'Until']].map(([key, label]) => (
                    <div key={key}>
                      <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                      <input type="time" value={quietHours[key]} onChange={e => setQuietHours(p => ({ ...p, [key]: e.target.value }))}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.82rem', outline: 'none' }} />
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaVolumeMute style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b' }}>Sound Alerts</span>
                </div>
                <div onClick={() => setSoundEnabled(p => !p)}
                  style={{ width: '40px', height: '22px', borderRadius: '11px', background: soundEnabled ? emerald : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '3px', left: soundEnabled ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AUDIT LOG ── */}
      {showAudit && (
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}><FaHistory style={{ color: emerald }} /> Delivery Audit Log</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {AUDIT_LOGS.map(log => {
              const sevColor = log.severity === 'High' ? '#ef4444' : log.severity === 'Warning' ? '#f59e0b' : log.severity === 'Info' ? '#3b82f6' : '#64748b';
              return (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{log.event}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>{log.time}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', background: sevColor + '20', color: sevColor, padding: '2px 8px', borderRadius: '20px' }}>{log.severity}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{log.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── SEARCH + FILTER ── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: '12px', padding: '0 14px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <FaSearch style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
          <input type="text" placeholder="Search notifications..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', padding: '10px 0', width: '100%', fontSize: '0.88rem', background: 'transparent' }} />
        </div>
        {[
          { value: filterType,     set: setFilterType,     options: ['All','Unread','Read','Pinned'], label: 'Type' },
          { value: filterCategory, set: setFilterCategory, options: ['All', ...Object.keys(CATEGORY_META)], label: 'Category' },
          { value: filterPriority, set: setFilterPriority, options: ['All','high','medium','low'], label: 'Priority' },
        ].map((f, i) => (
          <select key={i} value={f.value} onChange={e => f.set(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: 'white', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
            {f.options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${f.label}` : o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
          </select>
        ))}
      </div>

      {/* ── NOTIFICATION CARDS ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <div style={{ width: '40px', height: '40px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          Loading notifications...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
              <FaRegBell size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
              <p style={{ fontWeight: '600', fontSize: '1rem' }}>No notifications found.</p>
            </div>
          )}
          {filtered.map(n => {
            const cm = CATEGORY_META[n.category] || { icon: FaBell, color: '#64748b', bg: '#f8fafc', label: n.category };
            const pm = PRIORITY_META[n.priority] || { color: '#64748b', bg: '#f1f5f9', label: n.priority, dot: '⚪' };
            const CategoryIcon = cm.icon;
            const isMenuOpen = activeMenu === n.id;

            return (
              <div key={n.id} style={{
                display: 'flex', gap: '16px', background: n.read ? 'white' : '#f0fdf4',
                borderRadius: '16px', padding: '18px 20px', border: `1px solid ${n.read ? '#e2e8f0' : '#a7f3d0'}`,
                borderLeft: `4px solid ${cm.color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.03)', transition: 'all 0.2s', position: 'relative'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)'; }}
              >
                {/* Category icon */}
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: cm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CategoryIcon style={{ color: cm.color, fontSize: '1.1rem' }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: emerald, flexShrink: 0, marginTop: '2px' }} />}
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '800', color: '#0f172a' }}>{n.title}</h4>
                      {n.pinned && <FaStar size={10} style={{ color: '#f59e0b' }} />}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>{relativeTime(n.time)}</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{n.description}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', background: cm.bg, color: cm.color, padding: '2px 8px', borderRadius: '20px' }}>{cm.label}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', background: pm.bg, color: pm.color, padding: '2px 8px', borderRadius: '20px' }}>{pm.dot} {pm.label}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', flexShrink: 0 }}>
                  {!n.read
                    ? <button onClick={() => markRead(n.id)} title="Mark read" style={iconBtnStyle(emerald)}><FaCheckCircle size={12} /></button>
                    : <button onClick={() => markUnread(n.id)} title="Mark unread" style={iconBtnStyle('#94a3b8')}><FaCircle size={12} /></button>
                  }
                  <button onClick={() => togglePin(n.id)} title={n.pinned ? 'Unpin' : 'Pin'} style={iconBtnStyle(n.pinned ? '#f59e0b' : '#94a3b8')}><FaStar size={12} /></button>
                  <div style={{ position: 'relative' }}>
                    <button onClick={e => { e.stopPropagation(); setActiveMenu(isMenuOpen ? null : n.id); }} style={iconBtnStyle('#94a3b8')}><FaEllipsisV size={12} /></button>
                    {isMenuOpen && (
                      <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 100, minWidth: '160px', padding: '6px' }}
                        onClick={e => e.stopPropagation()}>
                        {[['15 minutes', 15], ['1 hour', 60], ['Tomorrow (8h)', 480]].map(([label, mins]) => (
                          <button key={label} onClick={() => snooze(n.id, mins)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: '600', color: '#475569', cursor: 'pointer', borderRadius: '8px' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                            ⏰ Snooze {label}
                          </button>
                        ))}
                        <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
                        <button onClick={() => deleteOne(n.id)}
                          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: '600', color: '#ef4444', cursor: 'pointer', borderRadius: '8px' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
  );
}

const actionBtn = (bg, color) => ({
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '8px 14px', borderRadius: '10px',
  border: `1px solid ${bg === '#f8fafc' || bg === '#ecfdf5' || bg === '#fef2f2' ? '#e2e8f0' : bg}`,
  background: bg, color, cursor: 'pointer', fontWeight: '700', fontSize: '0.78rem', transition: 'all 0.15s'
});

const iconBtnStyle = (color) => ({
  background: color + '15', border: 'none', borderRadius: '8px', padding: '6px 8px',
  cursor: 'pointer', color, transition: 'all 0.15s'
});

const sectionLabel = {
  fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8',
  textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px'
};
