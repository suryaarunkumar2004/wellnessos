import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { sendOTP, verifyOTP, resetPassword } from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const data = await sendOTP(email);
      if (data.success) {
        setMessage('OTP sent to your email!');
        setStep(2);
        startTimer();
      } else {
        setError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    
    if (value && index < 5) {
      document.getElementById(`fp-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`fp-otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      setError('');
      document.getElementById('fp-otp-5')?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await verifyOTP(email, otpString);
      if (data.success) {
        setMessage('OTP verified! Now set your new password.');
        setStep(3);
      } else {
        setError(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await sendOTP(email);
      if (data.success) {
        setMessage('OTP resent to your email!');
        startTimer();
      } else {
        setError(data.error || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please enter your new password');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await resetPassword(email, newPassword);
      if (data.success) {
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <FaRegHeart style={{ color: '#059669', fontSize: '32px', strokeWidth: '2.5' }} />
            <span style={{ color: '#059669', fontWeight: '800', fontSize: '1.6rem', letterSpacing: '-0.5px' }}>WellNest</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Reset Password'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            {step === 1 && 'Enter your email to receive OTP'}
            {step === 2 && 'Enter the 6-digit OTP sent to your email'}
            {step === 3 && 'Set your new password'}
          </p>
        </div>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#059669'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                placeholder="surya.arun2004@gmail.com"
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                color: '#dc2626',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                color: '#16a34a',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {message}
              </div>
            )}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
                }
              }}
            >
              {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Sending...</> : 'Send OTP'}
            </button>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <FaArrowLeft /> Back to Login
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                OTP sent to <strong>{email}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`fp-otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  style={{
                    width: '52px',
                    height: '60px',
                    textAlign: 'center',
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    border: error ? '2px solid #ef4444' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    background: '#f8fafc',
                    color: '#1e293b',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(5,150,105,0.15)';
                    e.currentTarget.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    if (!error) e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                color: '#dc2626',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                color: '#16a34a',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {message}
              </div>
            )}

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
                }
              }}
            >
              {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Verifying...</> : 'Verify OTP'}
            </button>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#059669',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#047857'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#059669'}
                >
                  Resend OTP
                </button>
              ) : (
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Resend OTP in {timer}s</span>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '4px' }}>
                New Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#059669'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                placeholder="••••••••"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#059669'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                color: '#dc2626',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                color: '#16a34a',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {message}
              </div>
            )}

            <button
              onClick={handleResetPassword}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
                }
              }}
            >
              {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Resetting...</> : 'Reset Password'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
