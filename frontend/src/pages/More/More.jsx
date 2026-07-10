import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardTab from './DashboardTab';
import CalendarTab from './CalendarTab';
import NotificationsTab from './NotificationsTab';
import HealthToolsTab from './HealthToolsTab';

const More = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'calendar':
        return <CalendarTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'tools':
        return <HealthToolsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 24px'
        }}>
          {renderContent()}
        </div>
      </div>

      <Footer />
      </>
  );
};

export default More;
