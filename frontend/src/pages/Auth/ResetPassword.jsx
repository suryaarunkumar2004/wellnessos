import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import SaveCredentialsPrompt from '../../components/SaveCredentialsPrompt';
import './Auth.css';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resetPassword, requestPasswordReset, saveCredentials } = useAuth();
  const { addToast } = useToast();

  // Email passed via navigation state or query param
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [timeLeft, setTimeLeft] = useState(5 * 60); // seconds
  const [timerActive, setTimerActive] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  // Start timer when email is available (OTP assumed sent)
  useEffect(() => {
    if (email) setTimerActive(true);
  }, [email]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    const res = await verifyOtp(email, otp);
    setOtpLoading(false);
    if (res.success) {
      setOtpVerified(true);
      addToast('OTP verified. You may now set a new password.', 'success');
    } else {
      addToast(res.error || 'Invalid OTP', 'error');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    setResetLoading(true);
    const res = await resetPassword(email, newPassword);
    setResetLoading(false);
    if (res.success) {
      setShowSavePrompt(true);
    } else {
      addToast(res.error || 'Password reset failed', 'error');
    }
  };

  const handleResend = async () => {
    const res = await requestPasswordReset(email);
    if (res.success) {
      addToast('OTP resent', 'success');
      setTimeLeft(5 * 60);
      setTimerActive(true);
    } else {
      addToast(res.error || 'Failed to resend OTP', 'error');
    }
  };

  const confirmSave = async () => {
    await saveCredentials(email, newPassword);
    setShowSavePrompt(false);
    addToast('Credentials saved securely.', 'success');
    navigate('/login');
  };

  const cancelSave = () => {
    setShowSavePrompt(false);
    navigate('/login');
  };

  return (
    <section className="auth-page" id="reset-password-page">
      <div className="container">
        <div className="auth-card">
          <h2 className="auth-card__title">Reset Password</h2>
          <p className="auth-card__subtitle">
            Enter the OTP sent to <strong>{email}</strong>
          </p>
          {!otpVerified ? (
            <form onSubmit={handleOtpSubmit} className="auth-form" aria-label="OTP verification form">
              <label className="auth-label">
                OTP Code
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="auth-input"
                  placeholder="123456"
                  maxLength={6}
                />
              </label>
              <button type="submit" className="btn btn-primary btn-block" disabled={otpLoading}>
                {otpLoading ? <Loader2 className="animate-spin" size={20} /> : 'Verify OTP'}
              </button>
              {timerActive && timeLeft > 0 && (
                <p className="auth-note">
                  OTP expires in {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </p>
              )}
              {timeLeft === 0 && (
                <button type="button" className="btn btn-secondary btn-block" onClick={handleResend}>
                  Resend OTP
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="auth-form" aria-label="Reset password form">
              <label className="auth-label">
                New Password
                <div className="auth-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="auth-input"
                    placeholder="******"
                  />
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>
              <label className="auth-label">
                Confirm Password
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                  placeholder="******"
                />
              </label>
              <button type="submit" className="btn btn-primary btn-block" disabled={resetLoading}>
                {resetLoading ? <Loader2 className="animate-spin" size={20} /> : 'Set New Password'}
              </button>
            </form>
          )}
          <p className="auth-switch">
            Remembered your password? <Link to="/login" className="auth-link">Log In</Link>
          </p>
        </div>
      </div>
      {showSavePrompt && (
        <SaveCredentialsPrompt onConfirm={confirmSave} onCancel={cancelSave} />
      )}
    </section>
  );
}

