import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('wellnessUser');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const newUser = { id: Date.now(), email, name };
    users.push({ ...newUser, password });
    localStorage.setItem('wellnessUsers', JSON.stringify(users));
    localStorage.setItem('wellnessUser', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...userWithoutPassword } = found;
    localStorage.setItem('wellnessUser', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const logout = () => {
    localStorage.removeItem('wellnessUser');
    setUser(null);
  };

  const forgotPassword = async (email) => {
    const users = JSON.parse(localStorage.getItem('wellnessUsers') || '[]');
    const found = users.find(u => u.email === email);
    if (!found) throw new Error('Email not found');
    return { message: 'Password reset link sent to your email (demo).' };
  };

  const value = { user, loading, signup, login, logout, forgotPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
