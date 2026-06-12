import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPills, FaRobot, FaCalendarAlt, FaHeartbeat, FaChartLine } from 'react-icons/fa';

const More = () => {
  const tools = [
    { name: 'BMI Calculator', desc: 'Compute your Body Mass Index', icon: <FaChartLine />, path: '/bmi' },
    { name: 'Medication Reminder', desc: 'Set daily reminders', icon: <FaPills />, path: '/reminder' },
    { name: 'Wellness Blog', desc: 'Read health articles', icon: <FaBook />, path: '/blog' },
    { name: 'Telehealth', desc: 'Connect with a doctor', icon: <FaRobot />, path: '/telehealth' },
  ];
  return (
    <div style={{ paddingTop: '80px', maxWidth: '1000px', margin: '0 auto', padding: '80px 24px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', marginBottom: '8px' }}>More Tools</h1>
      <p style={{ color: "#059669" }}>Explore additional health resources and utilities.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '24px' }}>
        {tools.map(tool => (
          <Link key={tool.name} to={tool.path} style={{ textDecoration: 'none', background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
            <div style={{ fontSize: '40px', color: '#059669', marginBottom: '12px' }}>{tool.icon}</div>
            <h3 style={{ color: "#059669" }}>{tool.name}</h3>
            <p style={{ color: "#059669" }}>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default More;

