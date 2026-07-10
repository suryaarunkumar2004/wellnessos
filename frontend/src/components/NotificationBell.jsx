import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotification } from '../contexts/NotificationContext';

const NotificationBell = () => {
  const { isInQuietHours, dndEnabled, notifications } = useNotification();
  const [isQuiet, setIsQuiet] = useState(false);

  useEffect(() => {
    const checkQuiet = () => {
      setIsQuiet(isInQuietHours());
    };
    checkQuiet();
    const interval = setInterval(checkQuiet, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isInQuietHours]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <FaBell 
        style={{ 
          color: isQuiet ? '#94a3b8' : '#059669',
          opacity: isQuiet ? 0.5 : 1,
          cursor: 'pointer'
        }} 
        title={isQuiet ? '🔕 Quiet Hours Active' : 'Notifications Active'}
      />
      {!isQuiet && notifications.length > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          background: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          {notifications.length}
        </span>
      )}
      {isQuiet && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          fontSize: '12px'
        }}>
          🔕
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
