import React from 'react';
import './AlertBanner.css';

export default function AlertBanner({ message, type = 'info', onClose }) {
  return (
    <div className={`alert-banner alert-${type}`}> 
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>✕</button>
    </div>
  );
}
