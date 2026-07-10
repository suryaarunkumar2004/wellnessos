import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, registerUser, sendOTP } from '../../services/authService';
import { FaRegHeart, FaSpinner, FaCheckCircle, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Storing OTP as an array of 6 digits for the individual box format
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const email = location.state?.email || '';
  const name = location.state?.name || '';
  const formData = location.state?.formData || {};

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }
    
    setOtpSent(true);
    startTimer();
  }, [email, navigate]);

  const startTimer = () => {
    setResendTimer(30);
    setCanResend(false);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    // Only accept numeric inputs
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    setError('');

    // Auto-advance focus to the next input box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      // Focus the previous input box and clear it
      const newOtp = [...otpArray];
      newOtp[index - 1] = '';
      setOtpArray(newOtp);
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpArray(digits);
      setError('');
      // Focus on the last element after pasting
      document.getElementById('otp-5')?.focus();
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    
    const otpString = otpArray.join('');
    if (otpString.length !== 6) {
      setError('Please enter the full 6-digit verification code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const verifyResponse = await verifyOTP(email, otpString);
      
      if (verifyResponse.success) {
        const registerData = {
          name: name,
          email: email,
          password: formData.password,
          phone: formData.phone,
          dob: formData.dob,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          gender: formData.gender
        };
        
        const registerResponse = await registerUser(registerData);
        
        if (registerResponse.success) {
          login(registerResponse.user, registerResponse.token);
          navigate('/');
        } else {
          setError(registerResponse.error || 'Registration failed');
        }
      } else {
        setError(verifyResponse.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setResendLoading(true);
    setError('');
    
    try {
      const response = await sendOTP(email, true, name);
      if (response.success) {
        setCanResend(false);
        setOtpSent(true);
        setOtpArray(['', '', '', '', '', '']);
        startTimer();
      } else {
        setError(response.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    }
    setResendLoading(false);
  };

  const emerald = '#059669';

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
        borderRadius: '28px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <FaEnvelope style={{ color: emerald, fontSize: '28px' }} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
            Check Your Email
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '8px' }}>
            We sent a verification code to <br />
            <strong style={{ color: emerald }}>{email}</strong>
          </p>
          {otpSent && (
            <div style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: '#f0fdf4',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaCheckCircle style={{ color: '#22c55e', fontSize: '14px' }} />
              <span style={{ fontSize: '0.8rem', color: emerald }}>OTP sent successfully</span>
            </div>
          )}
        </div>

        <form onSubmit={handleVerify}>
          {/* OTP Code Boxes Layout */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '24px' 
          }}>
            {otpArray.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
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
                  e.currentTarget.style.borderColor = emerald;
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
              borderRadius: '12px',
              color: '#dc2626',
              fontSize: '0.85rem',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.3)',
              marginBottom: '16px'
            }}
          >
            {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Verifying...  <Footer />
      </> : 'Verify & Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              style={{
                background: 'none',
                border: 'none',
                color: emerald,
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#047857'}
              onMouseLeave={(e) => e.currentTarget.style.color = emerald}
            >
              {resendLoading ? 'Resending...' : 'Resend Code'}
            </button>
          ) : (
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Resend code in <strong style={{ color: '#475569' }}>{resendTimer}s</strong>
            </span>
          )}
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = emerald}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <FaArrowLeft /> Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
