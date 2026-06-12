import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyResetToken, resetPassword, user } = useAuth();
  const { addToast } = useToast();

  // Attempt verification on mount
  React.useEffect(() => {
    if (!token) return;
    // Here we assume the email is stored in a temporary location; for placeholder we just show token.
    // In a real flow, you would also have the email associated with the token.
    // For demonstration, we just display the token.
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: just show success toast
    addToast('Password reset token verified (placeholder).', 'success');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Password Reset</h1>
      {token ? (
        <form onSubmit={handleSubmit}>
          <p>Reset token: <code>{token}</code></p>
          <button type="submit" className="btn btn-primary">Proceed (placeholder)</button>
        </form>
      ) : (
        <p>No token provided.</p>
      )}
    </div>
  );
}

