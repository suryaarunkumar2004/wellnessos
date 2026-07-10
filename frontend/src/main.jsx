import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './utils/interceptor.js'

// Log startup info
console.log('🚀 WellnessOS App Starting...');
console.log('📦 LocalStorage token:', localStorage.getItem('token') ? 'Found' : 'Not found');
console.log('📦 LocalStorage user:', localStorage.getItem('user') ? 'Found' : 'Not found');

// Remove any service worker registrations
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('🔴 Service Worker unregistered');
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
