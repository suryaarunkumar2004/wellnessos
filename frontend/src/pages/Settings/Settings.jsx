import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import './Settings.css';

export default function Settings() {
  const {
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    analyticsEnabled,
    setAnalyticsEnabled,
    notificationsEnabled,
    setNotificationsEnabled,
    primaryColor,
    setPrimaryColor,
  } = useContext(SettingsContext);

  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <section className="settings-page">
      <div className="container">
        <h2 className="settings-page__title">Settings</h2>
        <div className="settings-group">
          <label>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={() => setHighContrast(!highContrast)}
            />
            High Contrast Mode
          </label>
        </div>
        <div className="settings-group">
          <label>Font Size:</label>
          <select value={fontSize} onChange={handleFontSizeChange}>
            <option value="0.875rem">Small</option>
            <option value="1rem">Medium</option>
            <option value="1.125rem">Large</option>
            <option value="1.25rem">Extra Large</option>
          </select>
        </div>
        <div className="settings-group">
          <label>
            Primary Color:
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={() => setAnalyticsEnabled(!analyticsEnabled)}
            />
            Enable Analytics (Plausible)
          </label>
        </div>
        <div className="settings-group">
          <label>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            Enable Browser Push Notifications
          </label>
        </div>
      </div>
    </section>
  );
}


