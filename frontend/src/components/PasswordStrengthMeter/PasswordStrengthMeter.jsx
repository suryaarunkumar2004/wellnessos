import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrengthMeter.css';

export default function PasswordStrengthMeter({ password }) {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setScore(result.score);
      setFeedback(result.feedback.warning || result.feedback.suggestions.join(' '));
    } else {
      setScore(0);
      setFeedback('');
    }
  }, [password]);

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

  return (
    <div className="password-strength-meter">
      <div className="strength-bar" style={{ backgroundColor: strengthColors[score], width: `${(score + 1) * 20}%` }} />
      <p className="strength-label">{strengthLabels[score]}</p>
      {feedback && <p className="strength-feedback">{feedback}</p>}
    </div>
  );
}
