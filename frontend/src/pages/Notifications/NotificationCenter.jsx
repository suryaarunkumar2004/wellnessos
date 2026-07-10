import React from 'react';
import Footer from '../../components/Footer/Footer';
import { useNotification } from '../../contexts/NotificationContext';
import './NotificationCenter.css';

export default function NotificationCenter() {
  const { 
    notifications, 
    markAsRead, 
    clearNotifications, 
    unreadCount,
    markAllAsRead
  } = useNotification();

  const handleDismiss = (id) => {
    markAsRead(id);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      clearNotifications();
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <section className="notification-center" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 24px',
      minHeight: '60vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '16px'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          🔔 Notifications
          {unreadCount > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              padding: '2px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              {unreadCount} unread
            </span>
          )}
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {notifications.length > 0 && unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                padding: '6px 14px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#475569'
              }}
            >
              Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                padding: '6px 14px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#dc2626'
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#94a3b8'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔕</div>
          <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No Notifications</h3>
          <p style={{ fontSize: '0.9rem' }}>You're all caught up! Check back later for updates.</p>
        </div>
      ) : (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {notifications.map((n) => (
            <li key={n.id} style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: n.read ? 'white' : '#f0fdf4',
              borderLeft: n.read ? '4px solid #e2e8f0' : '4px solid #059669',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s'
            }}>
              <div>
                <div style={{
                  fontWeight: n.read ? '500' : '700',
                  color: '#1e293b',
                  fontSize: '0.9rem'
                }}>
                  {n.message}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  marginTop: '4px'
                }}>
                  {n.timestamp ? new Date(n.timestamp).toLocaleString() : 'Just now'}
                </div>
              </div>
              <button
                onClick={() => handleDismiss(n.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  fontSize: '0.8rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}

      {notifications.length > 0 && (
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#94a3b8'
        }}>
          {notifications.length} notification{notifications.length > 1 ? 's' : ''} total
        </div>
      )}

      <style>{`
        .notification-center {
          font-family: 'Inter', system-ui, sans-serif;
        }
      `}</style>
    </section>
  );
}
