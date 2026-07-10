import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(localStorage.getItem('highContrast') === 'true');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '1rem');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(localStorage.getItem('analyticsEnabled') !== 'false');
  const [notificationsEnabled, setNotificationsEnabled] = useState(localStorage.getItem('notificationsEnabled') === 'true');
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#059669');

  // Persist settings
  useEffect(() => {
    localStorage.setItem('highContrast', highContrast);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('analyticsEnabled', analyticsEnabled);
    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    localStorage.setItem('primaryColor', primaryColor);
    
    // Apply CSS vars
    const root = document.documentElement;
    root.style.setProperty('--font-size', fontSize);
    root.style.setProperty('--primary-color', primaryColor);
    if (highContrast) {
      root.setAttribute('data-contrast', 'high');
    } else {
      root.removeAttribute('data-contrast');
    }
  }, [highContrast, fontSize, analyticsEnabled, notificationsEnabled, primaryColor]);

  return (
    <SettingsContext.Provider
      value={{
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        analyticsEnabled,
        setAnalyticsEnabled,
        notificationsEnabled,
        setNotificationsEnabled,
        primaryColor,
        setPrimaryColor
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
