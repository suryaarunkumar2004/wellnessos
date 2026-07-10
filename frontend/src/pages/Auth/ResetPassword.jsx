import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegHeart, FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const emerald = '#059669';
  const emeraldGradient = 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)';

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [otpTimer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setSuccess('OTP sent to your email');
      setStep('otp');
      setOtpTimer(300);
      setCanResend(false);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setSuccess('OTP verified!');
      setStep('password');
      setLoading(false);
    }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setSuccess('Password reset successfully!');
      setLoading(false);
      setTimeout(() => navigate('/signup'), 2000);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtpTimer(300);
    setCanResend(false);
    setSuccess('New OTP sent');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
      padding: '20px',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        maxWidth: '420px',
        width: '100%',
        animation: 'fadeInUp 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <FaRegHeart style={{ color: emerald, fontSize: '32px', strokeWidth: '2.5' }} />
          <span style={{ fontSize: '28px', fontWeight: '800', color: emerald, letterSpacing: '-0.5px' }}>WellNest</span>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            border: '1px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaTimesCircle /> {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#f0fdf4',
            color: '#059669',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            border: '1px solid #86efac',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaCheckCircle /> {success}
          </div>
        )}

        {step === 'email' && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: '4px' }}>
              Reset Password
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem' }}>
              Enter your email to receive an OTP
            </p>
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    color: '#1f2937',
                    backgroundColor: '#fafbfc'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = emerald}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: emeraldGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 16px rgba(5,150,105,0.3)'
                }}
              >
                {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Send OTP'}
              </button>
            </form>
            <button
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.85rem',
                marginTop: '12px',
                textDecoration: 'underline'
              }}
            >
              ← Back to Sign In
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: '4px' }}>
              Verify OTP
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem' }}>
              Enter the 6-digit code sent to <strong>{email}</strong>
            </p>
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength="6"
                  placeholder="000000"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    letterSpacing: '8px',
                    outline: 'none',
                    color: '#1f2937',
                    backgroundColor: '#fafbfc'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = emerald}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {otpTimer > 0 ? `⏱️ ${Math.floor(otpTimer / 60)}:${String(otpTimer % 60).padStart(2, '0')}` : '⏱️ OTP expired'}
                </span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: canResend ? emerald : '#9ca3af',
                    cursor: canResend ? 'pointer' : 'not-allowed',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textDecoration: 'underline'
                  }}
                >
                  Resend OTP
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: emeraldGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer',
                  opacity: loading || otp.length !== 6 ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 16px rgba(5,150,105,0.3)'
                }}
              >
                {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Verify OTP'}
              </button>
            </form>
            <button
              onClick={() => setStep('email')}
              style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.85rem',
                marginTop: '12px',
                textDecoration: 'underline'
              }}
            >
              ← Back
            </button>
          </>
        )}

        {step === 'password' && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: '4px' }}>
              Reset Password
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem' }}>
              Enter your new password
            </p>
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: '#1f2937',
                    backgroundColor: '#fafbfc'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = emerald}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: '#1f2937',
                    backgroundColor: '#fafbfc'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = emerald}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: emeraldGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 16px rgba(5,150,105,0.3)'
                }}
              >
                {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Reset Password'}
              </button>
            </form>
            <button
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.85rem',
                marginTop: '12px',
                textDecoration: 'underline'
              }}
            >
              ← Back to Sign In
            </button>
      </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
