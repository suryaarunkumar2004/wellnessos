import React, { createContext, useEffect, useState } from 'react';

// Create a context for theme management (dark/light mode and primary color)
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Retrieve persisted preferences from localStorage or set defaults
  const storedTheme = localStorage.getItem('theme') || 'light';
  const storedColor = localStorage.getItem('primaryColor') || '#4f46e5'; // Indigo-600 by default

  const [theme, setTheme] = useState(storedTheme);
  const [primaryColor, setPrimaryColor] = useState(storedColor);

  // Apply CSS variables to the document root whenever preferences change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--primary-color', primaryColor);
    // Persist preferences
    localStorage.setItem('theme', theme);
    localStorage.setItem('primaryColor', primaryColor);
  }, [theme, primaryColor]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, primaryColor, changePrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
