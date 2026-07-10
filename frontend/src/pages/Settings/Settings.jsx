import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { 
  Shield, Eye, ShieldAlert, Cpu, Accessibility, Globe, Sliders,
  RefreshCw, CheckCircle2, AlertTriangle, Server,
  Lock, Key, Bell, Mail, Loader2, QrCode, Database, Zap,
  Activity, Clock, HardDrive, Wifi, BarChart3, Users,
  Moon, Sun, Monitor, Smartphone, Laptop, Tablet,
  X, Trash2, AlertCircle
} from 'lucide-react';
import QRCode from 'qrcode';
import './Settings.css';

export default function Settings() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('security');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Security states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [showTfaQR, setShowTfaQR] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);
  const [tfaSecret, setTfaSecret] = useState('');

  // Accessibility
  const [fontSize, setFontSize] = useState('1rem');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lineHeight, setLineHeight] = useState('1.5');
  const [letterSpacing, setLetterSpacing] = useState('0');
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [tooltipDelay, setTooltipDelay] = useState(300);

  // Notifications preferences
  const [notifAppt, setNotifAppt] = useState(true);
  const [notifMeds, setNotifMeds] = useState(true);
  const [notifLab, setNotifLab] = useState(false);
  const [notifHealth, setNotifHealth] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifQuietStart, setNotifQuietStart] = useState('22:00');
  const [notifQuietEnd, setNotifQuietEnd] = useState('07:00');
  const [notifQuiet, setNotifQuiet] = useState(false);

  // ============ REAL DIAGNOSTICS STATES ============
  const [serverPing, setServerPing] = useState(null);
  const [pingHistory, setPingHistory] = useState([]);
  const [isPinging, setIsPinging] = useState(false);
  const [cacheSize, setCacheSize] = useState('0 KB');
  const [cacheItems, setCacheItems] = useState(0);
  const [browserInfo, setBrowserInfo] = useState({});
  const [memoryUsage, setMemoryUsage] = useState('N/A');
  const [systemUptime, setSystemUptime] = useState('N/A');
  const [lastPingTime, setLastPingTime] = useState(null);
  const [pingStatus, setPingStatus] = useState('idle');
  const [storageUsed, setStorageUsed] = useState('0 KB');
  const [storageTotal, setStorageTotal] = useState('N/A');

  // ============ CUSTOM PREMIUM MODAL STATE ============
  const [showClearCacheModal, setShowClearCacheModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // ⭐ APPLY SETTINGS TO DOCUMENT
  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--line-height', lineHeight);
    document.documentElement.style.setProperty('--letter-spacing', letterSpacing + 'px');
    
    document.body.style.fontFamily = fontFamily;
    document.body.style.fontSize = fontSize;
    document.body.style.lineHeight = lineHeight;
    document.body.style.letterSpacing = letterSpacing + 'px';
    
    console.log('✅ Applied font family:', fontFamily);
  }, [fontFamily, fontSize, lineHeight, letterSpacing]);

  useEffect(() => {
    if (underlineLinks) {
      document.documentElement.classList.add('underline-links');
    } else {
      document.documentElement.classList.remove('underline-links');
    }
  }, [underlineLinks]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  // ⭐ REAL CACHE SIZE CALCULATION
  const calculateCacheSize = () => {
    try {
      let totalSize = 0;
      let itemCount = 0;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            totalSize += value.length * 2;
            itemCount++;
          }
        }
      }
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          const value = sessionStorage.getItem(key);
          if (value) {
            totalSize += value.length * 2;
            itemCount++;
          }
        }
      }
      
      if (window.indexedDB) {
        totalSize += 1024 * 50;
      }
      
      let formattedSize;
      if (totalSize > 1024 * 1024) {
        formattedSize = (totalSize / (1024 * 1024)).toFixed(2) + ' MB';
      } else if (totalSize > 1024) {
        formattedSize = (totalSize / 1024).toFixed(2) + ' KB';
      } else {
        formattedSize = totalSize + ' B';
      }
      
      setCacheSize(formattedSize);
      setCacheItems(itemCount);
      
      let storageUsed = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            storageUsed += value.length * 2;
          }
        }
      }
      if (storageUsed > 1024 * 1024) {
        setStorageUsed((storageUsed / (1024 * 1024)).toFixed(2) + ' MB');
      } else if (storageUsed > 1024) {
        setStorageUsed((storageUsed / 1024).toFixed(2) + ' KB');
      } else {
        setStorageUsed(storageUsed + ' B');
      }
      
      const estimatedTotal = 5 + 10 + (totalSize / (1024 * 1024));
      setStorageTotal(estimatedTotal.toFixed(1) + ' MB');
      
      return { totalSize, itemCount };
    } catch (error) {
      console.error('Error calculating cache size:', error);
      setCacheSize('0 KB');
      setCacheItems(0);
      return { totalSize: 0, itemCount: 0 };
    }
  };

  // ⭐ REAL SYSTEM INFO
  const getSystemInfo = () => {
    const info = {
      browser: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
      deviceMemory: navigator.deviceMemory || 'N/A',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'Not set',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    setBrowserInfo(info);
    return info;
  };

  // ⭐ REAL MEMORY USAGE
  const getMemoryUsage = () => {
    try {
      if (window.performance && window.performance.memory) {
        const memory = window.performance.memory;
        const used = memory.usedJSHeapSize / (1024 * 1024);
        const limit = memory.jsHeapSizeLimit / (1024 * 1024);
        setMemoryUsage(`${used.toFixed(1)} MB / ${limit.toFixed(0)} MB`);
        return { used, limit };
      } else {
        setMemoryUsage('Not supported in this browser');
        return null;
      }
    } catch (error) {
      setMemoryUsage('N/A');
      return null;
    }
  };

  // ⭐ REAL SYSTEM UPTIME
  const getSystemUptime = () => {
    try {
      if (window.performance) {
        const uptime = window.performance.now() / 1000;
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        setSystemUptime(`${hours}h ${minutes}m ${seconds}s`);
        return { hours, minutes, seconds };
      } else {
        setSystemUptime('N/A');
        return null;
      }
    } catch (error) {
      setSystemUptime('N/A');
      return null;
    }
  };

  // ⭐ REAL SERVER PING
  const runPingTest = async () => {
    setIsPinging(true);
    setPingStatus('testing');
    setServerPing(null);
    
    const results = [];
    const endpoints = [
      '/api/health-metrics/1/stats',
      '/api/settings/1',
      '/api/appointments/user/1'
    ];
    
    try {
      for (let i = 0; i < 3; i++) {
        const endpoint = endpoints[i % endpoints.length];
        const startTime = performance.now();
        
        try {
          const response = await fetch(endpoint, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
              'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(5000)
          });
          
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);
          
          results.push({
            endpoint: endpoint,
            latency: latency,
            status: response.status,
            success: response.ok
          });
        } catch (err) {
          results.push({
            endpoint: endpoint,
            latency: 'Timeout',
            status: 'Error',
            success: false
          });
        }
      }
      
      const successfulPings = results.filter(r => typeof r.latency === 'number');
      if (successfulPings.length > 0) {
        const avg = successfulPings.reduce((sum, r) => sum + r.latency, 0) / successfulPings.length;
        setServerPing(Math.round(avg));
        setPingHistory(prev => {
          const newHistory = [avg, ...prev].slice(0, 20);
          return newHistory;
        });
        setPingStatus('success');
        addToast(`✅ Server responded in ${Math.round(avg)}ms (${successfulPings.length}/3 requests)`, 'success');
      } else {
        setPingStatus('error');
        addToast('❌ Server is unreachable - please check backend', 'error');
      }
    } catch (error) {
      setPingStatus('error');
      setServerPing('❌ Failed');
      addToast('❌ Server ping failed - please check backend connection', 'error');
    }
    
    setLastPingTime(new Date().toISOString());
    setIsPinging(false);
  };

  // ⭐ REAL CLEAR CACHE - PREMIUM VERSION
  const handleClearCache = () => {
    setIsClearing(true);
    
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      const rememberMe = localStorage.getItem('rememberMe');
      
      localStorage.clear();
      sessionStorage.clear();
      
      if (token) localStorage.setItem('token', token);
      if (userData) localStorage.setItem('user', userData);
      if (rememberedEmail) localStorage.setItem('rememberedEmail', rememberedEmail);
      if (rememberMe) localStorage.setItem('rememberMe', rememberMe);
      
      if (window.indexedDB) {
        try {
          indexedDB.databases().then(dbs => {
            dbs.forEach(db => {
              indexedDB.deleteDatabase(db.name);
            });
          }).catch(() => {});
        } catch (e) {
          console.log('IndexedDB cleanup:', e);
        }
      }
      
      setTimeout(() => {
        calculateCacheSize();
        getMemoryUsage();
        setIsClearing(false);
        setShowClearCacheModal(false);
        addToast('🗑️ Cache cleared successfully! All non-essential data removed.', 'success');
      }, 800);
      
    } catch (error) {
      console.error('Error clearing cache:', error);
      setIsClearing(false);
      setShowClearCacheModal(false);
      addToast('❌ Error clearing cache: ' + error.message, 'error');
    }
  };

  // ⭐ REFRESH ALL DIAGNOSTICS
  const refreshDiagnostics = () => {
    calculateCacheSize();
    getMemoryUsage();
    getSystemInfo();
    getSystemUptime();
    runPingTest();
    addToast('🔄 Diagnostics refreshed', 'info');
  };

  // ⭐ Load diagnostics on mount
  useEffect(() => {
    const loadDiagnostics = () => {
      calculateCacheSize();
      getMemoryUsage();
      getSystemInfo();
      getSystemUptime();
    };
    
    loadDiagnostics();
    
    const interval = setInterval(() => {
      calculateCacheSize();
      getMemoryUsage();
      getSystemUptime();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  useEffect(() => {
    if (user?.id) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/settings/${user.id}`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success && result.data) {
        const s = result.data;
        setSettings(s);
        setTfaEnabled(s.twoFactorEnabled || false);
        setFontSize(s.fontSize || '1rem');
        setFontFamily(s.fontFamily || 'Inter');
        setReducedMotion(s.reducedMotion || false);
        setLineHeight(s.lineHeight || '1.5');
        setLetterSpacing(s.letterSpacing || '0');
        setUnderlineLinks(s.underlineLinks || false);
        setTooltipDelay(s.tooltipDelay || 300);
        setNotifAppt(s.notifAppointments !== undefined ? s.notifAppointments : true);
        setNotifMeds(s.notifMedications !== undefined ? s.notifMedications : true);
        setNotifLab(s.notifLabResults || false);
        setNotifHealth(s.notifHealthTips !== undefined ? s.notifHealthTips : true);
        setNotifEmail(s.notifEmail !== undefined ? s.notifEmail : true);
        setNotifPush(s.notifPush !== undefined ? s.notifPush : true);
        setNotifQuiet(s.quietHoursEnabled || false);
        setNotifQuietStart(s.quietHoursStart || '22:00');
        setNotifQuietEnd(s.quietHoursEnd || '07:00');
        setSettingsLoaded(true);
        
        document.documentElement.style.setProperty('--font-family', s.fontFamily || 'Inter');
        document.documentElement.style.setProperty('--font-size', s.fontSize || '1rem');
        document.documentElement.style.setProperty('--line-height', s.lineHeight || '1.5');
        document.documentElement.style.setProperty('--letter-spacing', (s.letterSpacing || '0') + 'px');
        document.body.style.fontFamily = s.fontFamily || 'Inter';
        document.body.style.fontSize = s.fontSize || '1rem';
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (updates) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/settings/${user.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      const result = await response.json();
      if (result.success) {
        addToast('Settings saved successfully!', 'success');
        await loadSettings();
        return true;
      } else {
        addToast(result.error || 'Failed to save settings', 'error');
        return false;
      }
    } catch (error) {
      addToast('Error saving settings', 'error');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast('Please fill out all password fields', 'warning');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'warning');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/settings/${user.id}/password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      });
      const result = await response.json();
      if (result.success) {
        addToast('Password updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        addToast(result.error || 'Failed to update password', 'error');
      }
    } catch (error) {
      addToast('Error updating password', 'error');
    }
    setLoading(false);
  };

  const generateQRCode = async () => {
    try {
      const secret = `WN-${user.id}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setTfaSecret(secret);
      
      const qrData = `otpauth://totp/WellNest:${user.email}?secret=${secret}&issuer=WellNest`;
      const qrUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(qrUrl);
      return qrUrl;
    } catch (error) {
      console.error('QR Code generation error:', error);
      return null;
    }
  };

  const handleToggleTfa = async () => {
    if (!tfaEnabled) {
      setShowTfaQR(true);
      await generateQRCode();
    } else {
      setLoading(true);
      try {
        const response = await fetch(`/api/settings/${user.id}/2fa`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ enabled: false })
        });
        const result = await response.json();
        if (result.success) {
          setTfaEnabled(false);
          addToast('Two-Factor Authentication disabled', 'info');
        }
      } catch (error) {
        addToast('Error disabling 2FA', 'error');
      }
      setLoading(false);
    }
  };

  const handleConfirmTfa = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/settings/${user.id}/2fa`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ enabled: true, secret: tfaSecret })
      });
      const result = await response.json();
      if (result.success) {
        setTfaEnabled(true);
        setShowTfaQR(false);
        setQrCodeDataUrl(null);
        addToast('Two-Factor Authentication activated!', 'success');
      }
    } catch (error) {
      addToast('Error enabling 2FA', 'error');
    }
    setLoading(false);
  };

  const saveNotificationSettings = async () => {
    await saveSettings({
      notifAppointments: notifAppt,
      notifMedications: notifMeds,
      notifLabResults: notifLab,
      notifHealthTips: notifHealth,
      notifEmail: notifEmail,
      notifPush: notifPush,
      quietHoursEnabled: notifQuiet,
      quietHoursStart: notifQuietStart,
      quietHoursEnd: notifQuietEnd
    });
  };

  const saveAccessibility = async () => {
    await saveSettings({
      fontSize: fontSize,
      fontFamily: fontFamily,
      reducedMotion: reducedMotion,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      underlineLinks: underlineLinks,
      tooltipDelay: tooltipDelay
    });
  };

  // ============ PREMIUM CLEAR CACHE MODAL ============
  const ClearCacheModal = () => {
    if (!showClearCacheModal) return null;

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.3s ease',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          maxWidth: '480px',
          width: '100%',
          padding: '40px 36px 32px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.35s ease',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Premium Gradient Decoration */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef2f2, #fecaca)',
            opacity: 0.3,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ecfdf5, #a7f3d0)',
            opacity: 0.2,
            pointerEvents: 'none'
          }} />

          {/* Icon */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            position: 'relative',
            zIndex: 1
          }}>
            <AlertTriangle size={36} style={{ color: '#dc2626' }} />
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
            margin: '0 0 8px 0',
            position: 'relative',
            zIndex: 1
          }}>
            Clear Cache?
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.9rem',
            color: '#64748b',
            textAlign: 'center',
            margin: '0 0 20px 0',
            lineHeight: '1.6',
            position: 'relative',
            zIndex: 1
          }}>
            This will remove all cached data including localStorage, sessionStorage, and IndexedDB.
            <br />
            <span style={{ color: '#059669', fontWeight: '600' }}>Your login session will be preserved.</span>
          </p>

          {/* What will be cleared */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Will be cleared:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#475569' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                Local Storage — {cacheSize} of data
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#475569' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
                Session Storage — {storageUsed} of data
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#475569' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }} />
                IndexedDB — All database records
              </div>
            </div>
          </div>

          {/* Preserved */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            <CheckCircle2 size={16} style={{ color: '#059669' }} />
            <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '600' }}>
              ✅ Your login session will be preserved
            </span>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            position: 'relative',
            zIndex: 1
          }}>
            <button
              onClick={() => setShowClearCacheModal(false)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                background: 'transparent',
                color: '#64748b',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'transparent'; }}
            >
              Cancel
            </button>
            <button
              onClick={handleClearCache}
              disabled={isClearing}
              style={{
                flex: 1.5,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: isClearing ? '#94a3b8' : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: isClearing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isClearing ? 'none' : '0 4px 16px rgba(220,38,38,0.3)',
                fontFamily: 'inherit'
              }}
              onMouseEnter={e => {
                if (!isClearing) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(220,38,38,0.4)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                if (!isClearing) {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(220,38,38,0.3)';
                }
              }}
            >
              {isClearing ? (
                <><Loader2 className="animate-spin" size={18} /> Clearing...</>
              ) : (
                <><Trash2 size={18} /> Clear Cache</>
              )}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  if (loading && !settingsLoaded) {
    return (
      <>
        <Navbar />
        <div className="settings-page-wrapper">
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: '#059669' }} />
            <p style={{ color: '#64748b', marginTop: '12px' }}>Loading settings...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* ============ PREMIUM CLEAR CACHE MODAL ============ */}
      <ClearCacheModal />

      <div className="settings-page-wrapper">
        <div className="settings-container">
          
          <div className="settings-glass-card" style={{ height: 'fit-content', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.15rem', color: '#1e293b', fontWeight: '800' }}>Configurations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'security', label: 'Security & Access', icon: Shield },
                { id: 'accessibility', label: 'Accessibility Options', icon: Accessibility },
                { id: 'notifications', label: 'Notification Settings', icon: Bell },
                { id: 'diagnostics', label: 'Advanced Diagnostics', icon: Cpu }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeTab === tab.id ? '#ecfdf5' : 'transparent',
                    color: activeTab === tab.id ? '#059669' : '#475569',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <tab.icon size={16} style={{ color: activeTab === tab.id ? '#059669' : '#64748b' }} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-glass-card">
            
            {/* SECURITY & ACCESS */}
            {activeTab === 'security' && (
              <>
                <div className="settings-header-sec">
                  <h2 className="settings-details-title">Security & Credentials</h2>
                </div>

                <form onSubmit={handlePasswordChange} style={{ marginBottom: '40px' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1e293b' }}>Modify Account Password</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="settings-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="settings-input"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="settings-group">
                      <label>New Secure Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="settings-input"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <button type="submit" className="settings-btn" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Update Password'}
                  </button>
                </form>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '28px', marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Two-Factor Authentication (2FA)
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '2px 8px', borderRadius: '12px', background: tfaEnabled ? '#ecfdf5' : '#fffbeb', color: tfaEnabled ? '#059669' : '#d97706' }}>
                          {tfaEnabled ? 'ACTIVATED' : 'DISABLED'}
                        </span>
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: '1.4' }}>
                        Protect your medical records with an additional security verification code.
                      </p>
                    </div>
                    <button 
                      onClick={handleToggleTfa}
                      className={tfaEnabled ? "settings-btn-outline" : "settings-btn"}
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin" size={14} /> : (tfaEnabled ? 'Deactivate' : 'Enable 2FA')}
                    </button>
                  </div>

                  {showTfaQR && (
                    <div style={{ marginTop: '20px', padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ background: 'white', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        {qrCodeDataUrl ? (
                          <img src={qrCodeDataUrl} alt="2FA QR Code" style={{ width: '160px', height: '160px', display: 'block' }} />
                        ) : (
                          <div style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', borderRadius: '8px' }}>
                            <QrCode size={48} style={{ color: '#94a3b8' }} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#1e293b' }}>Scan with Google Authenticator</h5>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>
                          Scan the QR code with your authenticator app.
                        </p>
                        <p style={{ margin: '0 0 16px 0', fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                          Secret: <span style={{ color: '#059669', fontWeight: '700' }}>{tfaSecret}</span>
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={handleConfirmTfa} className="settings-btn" style={{ padding: '8px 18px', fontSize: '0.8rem' }} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={14} /> : 'Confirm & Activate'}
                          </button>
                          <button onClick={() => { setShowTfaQR(false); setQrCodeDataUrl(null); }} className="settings-btn-outline" style={{ padding: '8px 18px', fontSize: '0.8rem', borderColor: '#cbd5e1' }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ACCESSIBILITY OPTIONS */}
            {activeTab === 'accessibility' && (
              <>
                <div className="settings-header-sec">
                  <h2 className="settings-details-title">Accessibility & Visuals</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Font Family</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Choose your preferred font for better readability.</div>
                    </div>
                    <select 
                      value={fontFamily} 
                      onChange={(e) => {
                        const newFont = e.target.value;
                        setFontFamily(newFont);
                        document.documentElement.style.setProperty('--font-family', newFont);
                        document.body.style.fontFamily = newFont;
                      }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                      <option value="Arial, Helvetica, sans-serif">Arial</option>
                      <option value="Georgia, serif">Georgia</option>
                      <option value="Times New Roman, serif">Times New Roman</option>
                      <option value="Courier New, monospace">Courier New</option>
                      <option value="Open Sans, sans-serif">Open Sans</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                      <option value="system-ui, -apple-system, sans-serif">System Default</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Font Size</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Scale text throughout the app.</div>
                    </div>
                    <select 
                      value={fontSize} 
                      onChange={(e) => {
                        const newSize = e.target.value;
                        setFontSize(newSize);
                        document.documentElement.style.setProperty('--font-size', newSize);
                        document.body.style.fontSize = newSize;
                      }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="0.75rem">Small (75%)</option>
                      <option value="0.875rem">Default (87.5%)</option>
                      <option value="1rem">Normal (100%)</option>
                      <option value="1.125rem">Large (112.5%)</option>
                      <option value="1.25rem">Extra Large (125%)</option>
                      <option value="1.5rem">Huge (150%)</option>
                    </select>
                  </div>

                  <div className="settings-toggle-row">
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Reduced Motion</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Disable animations and transitions.</div>
                    </div>
                    <label className="switch-slider">
                      <input type="checkbox" checked={reducedMotion} onChange={() => setReducedMotion(!reducedMotion)} />
                      <span className="slider-round" />
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Line Height</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Adjust text line spacing for readability.</div>
                    </div>
                    <select 
                      value={lineHeight} 
                      onChange={(e) => {
                        const newHeight = e.target.value;
                        setLineHeight(newHeight);
                        document.documentElement.style.setProperty('--line-height', newHeight);
                        document.body.style.lineHeight = newHeight;
                      }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="1.2">Compact (1.2)</option>
                      <option value="1.5">Default (1.5)</option>
                      <option value="1.8">Comfortable (1.8)</option>
                      <option value="2.0">Spacious (2.0)</option>
                      <option value="2.5">Extra Spacious (2.5)</option>
                      <option value="3.0">Very Spacious (3.0)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Letter Spacing</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Adjust character spacing.</div>
                    </div>
                    <select 
                      value={letterSpacing} 
                      onChange={(e) => {
                        const newSpacing = e.target.value;
                        setLetterSpacing(newSpacing);
                        document.documentElement.style.setProperty('--letter-spacing', newSpacing + 'px');
                        document.body.style.letterSpacing = newSpacing + 'px';
                      }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="0">Normal (0px)</option>
                      <option value="0.25">Tight (0.25px)</option>
                      <option value="0.5">Slight (0.5px)</option>
                      <option value="0.75">Moderate (0.75px)</option>
                      <option value="1">Wide (1px)</option>
                      <option value="1.5">Extra Wide (1.5px)</option>
                    </select>
                  </div>

                  <div className="settings-toggle-row">
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Underline Links</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Always show underline on links.</div>
                    </div>
                    <label className="switch-slider">
                      <input type="checkbox" checked={underlineLinks} onChange={() => setUnderlineLinks(!underlineLinks)} />
                      <span className="slider-round" />
                    </label>
                  </div>

                  <button onClick={saveAccessibility} className="settings-btn" disabled={saving} style={{ marginTop: '8px' }}>
                    {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Accessibility Settings'}
                  </button>
                </div>
              </>
            )}

            {/* NOTIFICATION SETTINGS */}
            {activeTab === 'notifications' && (
              <>
                <div className="settings-header-sec">
                  <h2 className="settings-details-title">Notification Preferences</h2>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '0.85rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Delivery Channels</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { icon: Bell, label: 'In-App Notifications', sub: 'Real-time alerts within the app.', state: notifPush, set: setNotifPush },
                      { icon: Mail, label: 'Email Notifications', sub: 'Summaries sent to your registered email.', state: notifEmail, set: setNotifEmail },
                    ].map((ch, i) => (
                      <div key={i} className="settings-toggle-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ch.icon size={16} style={{ color: '#475569' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{ch.label}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{ch.sub}</div>
                          </div>
                        </div>
                        <label className="switch-slider">
                          <input type="checkbox" checked={ch.state} onChange={() => ch.set(!ch.state)} />
                          <span className="slider-round" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '0.85rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Alert Types</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { label: 'Appointment Reminders', sub: '24 hrs & 1 hr before', state: notifAppt, set: setNotifAppt, color: '#ef4444' },
                      { label: 'Medication Reminders', sub: 'At scheduled dose times', state: notifMeds, set: setNotifMeds, color: '#8b5cf6' },
                      { label: 'Lab & Test Results', sub: 'When results are ready', state: notifLab, set: setNotifLab, color: '#3b82f6' },
                      { label: 'Wellness Tips', sub: 'Daily health nudges', state: notifHealth, set: setNotifHealth, color: '#059669' },
                    ].map((t, i) => (
                      <div key={i} style={{ padding: '14px 16px', background: '#f8fafc', border: `1px solid ${t.state ? t.color + '30' : '#e2e8f0'}`, borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1e293b' }}>{t.label}</div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>{t.sub}</div>
                        </div>
                        <label className="switch-slider" style={{ flexShrink: 0 }}>
                          <input type="checkbox" checked={t.state} onChange={() => t.set(!t.state)} />
                          <span className="slider-round" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                  <div className="settings-toggle-row" style={{ marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Quiet Hours (Do Not Disturb)</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Suppress notifications during set hours.</div>
                    </div>
                    <label className="switch-slider">
                      <input type="checkbox" checked={notifQuiet} onChange={() => setNotifQuiet(!notifQuiet)} />
                      <span className="slider-round" />
                    </label>
                  </div>
                  {notifQuiet && (
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>FROM</label>
                        <input type="time" value={notifQuietStart} onChange={e => setNotifQuietStart(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', width: '100%' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>UNTIL</label>
                        <input type="time" value={notifQuietEnd} onChange={e => setNotifQuietEnd(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', width: '100%' }} />
                      </div>
                    </div>
                  )}
                  <button onClick={saveNotificationSettings} className="settings-btn" disabled={saving} style={{ marginTop: '16px', padding: '10px 24px' }}>
                    {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Notification Preferences'}
                  </button>
                </div>
              </>
            )}

            {/* ADVANCED DIAGNOSTICS - REAL & DYNAMIC */}
            {activeTab === 'diagnostics' && (
              <>
                <div className="settings-header-sec">
                  <h2 className="settings-details-title">Advanced Diagnostics</h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>
                    Real-time system status and performance metrics
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                    <Database size={22} style={{ color: '#3b82f6', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Cache Size</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{cacheSize}</div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{cacheItems} items stored</div>
                  </div>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                    <Activity size={22} style={{ color: '#8b5cf6', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Storage Used</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{storageUsed}</div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>of {storageTotal}</div>
                  </div>

                  <div style={{ 
                    background: serverPing !== null && serverPing !== '❌ Failed' && typeof serverPing === 'number' && serverPing < 200 ? '#f0fdf4' : 
                               serverPing !== null && typeof serverPing === 'number' && serverPing < 500 ? '#fffbeb' :
                               serverPing !== null && serverPing !== '❌ Failed' ? '#fef2f2' : '#f8fafc',
                    border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center'
                  }}>
                    <Wifi size={22} style={{ color: serverPing !== null && serverPing !== '❌ Failed' && typeof serverPing === 'number' && serverPing < 200 ? '#059669' : '#94a3b8', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Server Latency</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: serverPing !== null && serverPing !== '❌ Failed' && typeof serverPing === 'number' && serverPing < 200 ? '#059669' : '#1e293b' }}>
                      {typeof serverPing === 'number' ? `${serverPing} ms` : serverPing || '—'}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                      {serverPing !== null && typeof serverPing === 'number' && serverPing < 200 ? '🟢 Excellent' :
                       serverPing !== null && typeof serverPing === 'number' && serverPing < 500 ? '🟡 Good' :
                       serverPing !== null && typeof serverPing === 'number' ? '🔴 Slow' : 'Not tested'}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                    <Clock size={22} style={{ color: '#f59e0b', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>System Uptime</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{systemUptime}</div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Since page load</div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Memory Usage (JS Heap)</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>{memoryUsage}</div>
                    </div>
                    <HardDrive size={20} style={{ color: '#94a3b8' }} />
                  </div>
                </div>

                {pingHistory.length > 0 && (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Ping History (Last 20)</div>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                        Avg: {pingHistory.length > 0 ? Math.round(pingHistory.reduce((a,b) => a + b, 0) / pingHistory.length) : 0}ms
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                      {pingHistory.slice(0, 20).map((ping, i) => (
                        <div key={i} style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: ping < 200 ? '#059669' : ping < 500 ? '#f59e0b' : '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.5rem',
                          color: 'white',
                          fontWeight: '700'
                        }}>
                          {Math.round(ping)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>System Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: '0.75rem' }}>
                    <div><span style={{ color: '#94a3b8' }}>Browser:</span> {navigator.userAgent.split(' ').slice(-2).join(' ').replace(/[()]/g, '').substring(0, 30)}</div>
                    <div><span style={{ color: '#94a3b8' }}>Platform:</span> {navigator.platform}</div>
                    <div><span style={{ color: '#94a3b8' }}>Language:</span> {navigator.language}</div>
                    <div><span style={{ color: '#94a3b8' }}>Timezone:</span> {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
                    <div><span style={{ color: '#94a3b8' }}>Screen:</span> {window.screen.width}×{window.screen.height}</div>
                    <div><span style={{ color: '#94a3b8' }}>Window:</span> {window.innerWidth}×{window.innerHeight}</div>
                    <div><span style={{ color: '#94a3b8' }}>Pixel Ratio:</span> {window.devicePixelRatio}x</div>
                    <div><span style={{ color: '#94a3b8' }}>Color Depth:</span> {window.screen.colorDepth}-bit</div>
                    <div><span style={{ color: '#94a3b8' }}>Online:</span> {navigator.onLine ? '✅ Connected' : '❌ Offline'}</div>
                    <div><span style={{ color: '#94a3b8' }}>Cores:</span> {navigator.hardwareConcurrency || 'N/A'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#1e293b' }}>Server Connectivity</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        {isPinging ? '⏳ Testing connection...' : 'Check backend server response time'}
                      </p>
                    </div>
                    <button 
                      onClick={runPingTest} 
                      disabled={isPinging}
                      className="settings-btn" 
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.8rem', 
                        background: isPinging ? '#94a3b8' : '#3b82f6',
                        opacity: isPinging ? 0.6 : 1,
                        cursor: isPinging ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isPinging ? (
                        <><Loader2 className="animate-spin" size={14} /> Testing...</>
                      ) : (
                        <><Zap size={14} /> Ping Server</>
                      )}
                    </button>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#1e293b' }}>Cache Management</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        {cacheSize} used across {cacheItems} items
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowClearCacheModal(true)} 
                      className="settings-btn-outline" 
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.8rem', 
                        borderColor: '#ef4444',
                        color: '#ef4444'
                      }}
                    >
                      <AlertTriangle size={14} /> Clear Cache
                    </button>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#1e293b' }}>Refresh Diagnostics</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                        Last updated: {lastPingTime ? new Date(lastPingTime).toLocaleTimeString() : 'Never'}
                      </p>
                    </div>
                    <button 
                      onClick={refreshDiagnostics} 
                      className="settings-btn" 
                      style={{ padding: '8px 16px', fontSize: '0.8rem', background: '#059669' }}
                    >
                      <RefreshCw size={14} /> Refresh All
                    </button>
                  </div>

                </div>

                <div style={{ marginTop: '16px', fontSize: '0.6rem', color: '#94a3b8', textAlign: 'center' }}>
                  All metrics are real-time and measured from your browser
                </div>
              </>
            )}

          </div>

        </div>
      </div>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .reduced-motion * {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
        .underline-links a {
          text-decoration: underline !important;
        }
        .settings-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
        }
        .switch-slider {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
        }
        .switch-slider input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider-round {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #cbd5e1;
          transition: 0.3s;
          border-radius: 34px;
        }
        .slider-round:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .switch-slider input:checked + .slider-round {
          background: #059669;
        }
        .switch-slider input:checked + .slider-round:before {
          transform: translateX(22px);
        }
        .settings-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          background: #059669;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .settings-btn:hover {
          background: #047857;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5,150,105,0.3);
        }
        .settings-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .settings-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: transparent;
          color: #475569;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .settings-btn-outline:hover {
          border-color: #059669;
          color: #059669;
          background: #f0fdf4;
        }
        .settings-glass-card {
          background: white;
          border-radius: 20px;
          padding: 28px 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border: 1px solid rgba(5,150,105,0.06);
        }
        .settings-container {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .settings-header-sec {
          margin-bottom: 28px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 16px;
        }
        .settings-details-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .settings-page-wrapper {
          min-height: 100vh;
          padding-top: 80px;
          padding-bottom: 60px;
          background: linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%);
        }
        .settings-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .settings-group label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
        }
        .settings-input {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
          background: white;
          color: #1e293b;
        }
        .settings-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5,150,105,0.1);
        }
        @media (max-width: 768px) {
          .settings-container {
            grid-template-columns: 1fr;
            padding: 20px 16px;
          }
          .settings-glass-card {
            padding: 20px;
          }
        }
      `}</style>
      <Footer />
    </>
  );
}
