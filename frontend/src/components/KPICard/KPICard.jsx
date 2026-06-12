import React from 'react';
import './KPICard.css';
import CountUp from 'react-countup';

export default function KPICard({ title, value, icon: Icon }) {
  return (
    <div className="kpi-card glassmorphism">
      <div className="kpi-card__icon">
        {Icon && <Icon size={24} />}
      </div>
      <div className="kpi-content">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">
          {typeof value === 'number' ? (
            <CountUp end={value} duration={2} separator="," />
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
}
