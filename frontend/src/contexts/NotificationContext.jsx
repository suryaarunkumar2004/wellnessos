import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [dndStart, setDndStart] = useState('22:00');
  const [dndEnd, setDndEnd] = useState('07:00');
  const [isQuiet, setIsQuiet] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);

  // Load DND settings from backend
  const loadDNDSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      if (!user?.id) return;

      const response = await fetch(`/api/settings/${user.id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success && result.data) {
        const s = result.data;
        setDndEnabled(s.quietHoursEnabled || false);
        setDndStart(s.quietHoursStart || '22:00');
        setDndEnd(s.quietHoursEnd || '07:00');
        setEmailEnabled(s.notifEmail !== undefined ? s.notifEmail : true);
        setPushEnabled(s.notifPush !== undefined ? s.notifPush : true);
      }
    } catch (error) {
      console.error('Error loading DND settings:', error);
    }
  };

  // ⭐ Check if currently in quiet hours - ONLY when DND is ENABLED
  const checkQuietHours = () => {
    if (!dndEnabled) {
      setIsQuiet(false);
      return false;
    }
    
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = dndStart.split(':').map(Number);
    const [endHour, endMin] = dndEnd.split(':').map(Number);
    
    const startTotal = startHour * 60 + startMin;
    const endTotal = endHour * 60 + endMin;
    
    let quiet = false;
    if (startTotal < endTotal) {
      quiet = currentMinutes >= startTotal && currentMinutes < endTotal;
    } else {
      quiet = currentMinutes >= startTotal || currentMinutes < endTotal;
    }
    
    setIsQuiet(quiet);
    return quiet;
  };

  // Load settings on mount
  useEffect(() => {
    loadDNDSettings();
  }, []);

  // Check quiet hours every minute - ONLY if DND is enabled
  useEffect(() => {
    if (dndEnabled) {
      checkQuietHours();
      const interval = setInterval(checkQuietHours, 60000);
      return () => clearInterval(interval);
    } else {
      setIsQuiet(false);
    }
  }, [dndEnabled, dndStart, dndEnd]);

  // ⭐ Add notification with DND check and push toggle
  const addNotification = (message, type = 'info', duration = 5000) => {
    // Check if push notifications are enabled
    if (!pushEnabled) {
      console.log('🔕 Push notifications disabled - notification suppressed:', message);
      return false;
    }

    // Check quiet hours if DND is enabled
    if (dndEnabled && checkQuietHours()) {
      console.log('🔕 DND active - notification suppressed:', message);
      return false;
    }

    const id = Date.now();
    const notification = { 
      id, 
      message, 
      type, 
      duration, 
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
    
    // Auto dismiss
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
    
    return true;
  };

  // ⭐ Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    // Remove after marking read (optional - clean up)
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  };

  // ⭐ Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // ⭐ Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const refreshDNDSettings = async () => {
    await loadDNDSettings();
    if (dndEnabled) {
      checkQuietHours();
    } else {
      setIsQuiet(false);
    }
  };

  // ⭐ Check if email notifications are enabled AND not in quiet hours
  const canSendEmail = () => {
    if (!emailEnabled) {
      console.log('📧 Email notifications disabled');
      return false;
    }
    if (dndEnabled && checkQuietHours()) {
      console.log('🔕 DND active - email suppressed');
      return false;
    }
    return true;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearNotifications,
      markAsRead,
      markAllAsRead,
      unreadCount,
      isQuiet,
      dndEnabled,
      dndStart,
      dndEnd,
      emailEnabled,
      pushEnabled,
      refreshDNDSettings,
      checkQuietHours,
      canSendEmail,
      loadDNDSettings
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
