import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  // Extract the last segment as page name
  const path = location.pathname;
  const name = path.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <section className="placeholder-page" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{name || 'Home'}</h1>
      <p>This is a placeholder page for <strong>{path}</strong>. Content will be added later.</p>
    </section>
  );
}

