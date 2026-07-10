import React, { createContext, useState, useContext } from 'react';
import { useNotification } from './NotificationContext';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const { addNotification, dndEnabled, checkQuietHours } = useNotification();

  const addToast = (message, type = 'info', duration = 4000) => {
    // 🔥 CRITICAL: Only check DND if it's ENABLED
    if (dndEnabled && checkQuietHours()) {
      console.log('🔕 DND active - toast suppressed:', message);
      return;
    }

    const id = Date.now();
    const toast = { id, message, type, duration };
    setToasts(prev => [...prev, toast]);
    
    // Also add to notification center
    addNotification(message, type, duration);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      showToast: addToast,
      removeToast,
      clearToasts
    }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
