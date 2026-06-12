import React from 'react';
import { useParams } from 'react-router-dom';

export default function EmailVerification() {
  const { token } = useParams();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Email Verification</h1>
      {token ? (
        <p>Verifying token: <code>{token}</code></p>
      ) : (
        <p>No verification token provided.</p>
      )}
    </div>
  );
}

