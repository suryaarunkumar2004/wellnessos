import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './NotificationCenter.css';

export default function NotificationCenter() {
  const { notifications, markAsRead, clearAll, unreadCount } = useNotification();

  const handleDismiss = (id) => {
    // Remove notification by marking as read and filtering out (optional)
    markAsRead(id);
  };

  return (
    <section className="notification-center">
      <h2>Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</h2>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`}> 
              <div className="notification-message">{n.message}</div>
              <div className="notification-meta">
                <span className="notification-time">{new Date(n.timestamp).toLocaleString()}</span>
                <button className="btn btn-sm btn-outline" onClick={() => handleDismiss(n.id)}>
                  Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {notifications.length > 0 && (
        <button className="btn btn-primary" onClick={clearAll}>Clear All</button>
      )}
    </section>
  );
}

