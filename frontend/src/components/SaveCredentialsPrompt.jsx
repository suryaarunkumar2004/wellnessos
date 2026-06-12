import React from 'react';
import './SaveCredentialsPrompt.css'; // optional styling

export default function SaveCredentialsPrompt({ onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Save Credentials</h2>
        <p>Would you like to save your email and password for future logins?</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onConfirm}>Yes</button>
          <button className="btn btn-secondary" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
