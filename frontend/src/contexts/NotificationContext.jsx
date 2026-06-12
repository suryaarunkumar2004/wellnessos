import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast, ToastContainer as ReactToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

// Audio for critical alerts (placeholder)
const criticalAudio = new Audio('/assets/sounds/critical.mp3');

export const NotificationContext = createContext({
  showSnackbar: null,
  setShowSnackbar: () => {}
});

function SnackbarBridge() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setShowSnackbar } = useContext(NotificationContext);

  useEffect(() => {
    setShowSnackbar(() => (msg, opts = {}) => {
      const { actionLabel, onAction, persist, variant } = opts;
      enqueueSnackbar(msg, {
        variant: variant || 'default',
        persist: persist ?? false,
        action: (key) => (
          <button
            onClick={() => { onAction && onAction(); closeSnackbar(key); }}
            style={{ color: 'inherit', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {actionLabel || 'Dismiss'}
          </button>
        ),
      });
    });
  }, [enqueueSnackbar, closeSnackbar, setShowSnackbar]);

  return null;
}

export function NotificationProvider({ children }) {
  const [showSnackbar, setShowSnackbar] = useState(null);
  const [notifications, setNotifications] = useState([]); // stored in localStorage for persistence

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((message, type = 'info', options = {}) => {
    const id = uuidv4();
    const newNotif = { id, message, type, read: false, timestamp: Date.now() };
    setNotifications(prev => [...prev, newNotif]);
    // Toast (auto‑dismiss)
    toast(message, {
       type,
       className: `toast-${type}`,
       autoClose: options.autoClose ?? 4000,
       onClose: () => {},
     });
    // Snackbar with optional action
    if (options.snackbar) {
      // The SnackbarProvider is accessed via hook inside a child component; we expose a helper below.
    }
    // Sound for critical
    if (type === 'error' || type === 'warning') {
      criticalAudio.play().catch(() => {});
    }
    return id;
  }, []);

  const markAsRead = useCallback(id => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearAll, unreadCount, showSnackbar, setShowSnackbar }}>
      {/* Toast UI */}
      <ReactToastifyContainer position="top-right" hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover limit={3} />
      {/* Snackbar UI – wraps children with provider */}
       <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
         {children}
         {/* Bridge to expose snackbar functions */}
          <SnackbarBridge />
       </SnackbarProvider>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}
