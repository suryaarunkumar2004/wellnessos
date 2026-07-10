import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import {
  FaChartLine, FaFileAlt, FaDownload, FaPrint, FaShare,
  FaClock, FaSpinner, FaArrowRight,
  FaFire, FaHeartbeat, FaRunning, FaTint, FaMoon,
  FaSmile
} from 'react-icons/fa';

export default function Reports() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('weekly');
  const [exportLoading, setExportLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const getReportData = (type) => {
    const data = {
      weekly: {
        steps: '8,247',
        sleep: '7.2',
        water: '2,450',
        calories: '2,180',
        mood: '7.8/10',
        healthScore: '84%',
        insight: 'Your health score improved by 8% this month. Keep up the excellent work!',
        color: emerald
      },
      monthly: {
        steps: '9,124',
        sleep: '7.8',
        water: '2,800',
        calories: '2,450',
        mood: '8.2/10',
        healthScore: '88%',
        insight: 'Excellent monthly progress! Your consistency is paying off. Maintain this momentum!',
        color: '#3b82f6'
      },
      quarterly: {
        steps: '8,650',
        sleep: '7.5',
        water: '2,600',
        calories: '2,300',
        mood: '7.9/10',
        healthScore: '86%',
        insight: 'Strong quarterly performance! Your health metrics show consistent improvement over 3 months.',
        color: '#8b5cf6'
      },
      yearly: {
        steps: '7,980',
        sleep: '7.3',
        water: '2,350',
        calories: '2,100',
        mood: '7.5/10',
        healthScore: '82%',
        insight: 'Amazing year! You\'ve transformed your health. Your overall health score improved by 15% year over year!',
        color: '#f59e0b'
      }
    };
    return data[type] || data.weekly;
  };

  const reportData = getReportData(selectedReport);

  const handleExport = () => {
    setExportLoading(true);
    setTimeout(() => {
      alert('📊 Report exported as PDF successfully!');
      setExportLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    setPrintLoading(true);
    setTimeout(() => {
      window.print();
      setPrintLoading(false);
    }, 500);
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>

          <div style={{
            background: `linear-gradient(135deg, ${emerald} 0%, ${emeraldDark} 50%, #065f46 100%)`,
            borderRadius: '24px', padding: '40px 36px', marginBottom: '32px',
            position: 'relative', overflow: 'hidden', color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaChartLine style={{ fontSize: '2rem' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                    Health Reports
                  </h2>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>
                    Analytics & Insights • Track Your Progress
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Reports Generated', value: '42', icon: FaFileAlt },
                  { label: 'Data Points', value: '1,847', icon: FaChartLine },
                  { label: 'Export Formats', value: '5', icon: FaDownload },
                  { label: 'AI Insights', value: '23', icon: FaHeartbeat },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <s.icon style={{ fontSize: '1rem', opacity: 0.8 }} />
                      <div>
                        <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>{s.value}</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{s.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['weekly', 'monthly', 'quarterly', 'yearly'].map(type => (
              <button key={type} onClick={() => setSelectedReport(type)}
                style={{
                  padding: '10px 20px', borderRadius: '12px',
                  background: selectedReport === type ? emerald : 'white',
                  color: selectedReport === type ? 'white' : '#475569',
                  border: `1px solid ${selectedReport === type ? emerald : '#e2e8f0'}`,
                  fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}>
                {type} Report
              </button>
            ))}
          </div>

          <div style={{
            background: 'white', borderRadius: '20px', padding: '32px',
            border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                  {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Health Report
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0' }}>Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleExport} disabled={exportLoading}
                  style={{
                    padding: '8px 16px',
                    background: exportLoading ? '#e2e8f0' : '#f1f5f9',
                    border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.8rem',
                    cursor: exportLoading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                  {exportLoading ? <FaSpinner className="spin" /> : <FaDownload size={12} />}
                  {exportLoading ? 'Exporting...' : 'Export'}
                </button>
                <button onClick={handlePrint} disabled={printLoading}
                  style={{
                    padding: '8px 16px',
                    background: printLoading ? '#e2e8f0' : '#f1f5f9',
                    border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.8rem',
                    cursor: printLoading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                  {printLoading ? <FaSpinner className="spin" /> : <FaPrint size={12} />}
                  {printLoading ? 'Printing...' : 'Print'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Average Steps', value: reportData.steps, icon: FaRunning, color: '#059669' },
                { label: 'Avg Sleep (hrs)', value: reportData.sleep, icon: FaMoon, color: '#8b5cf6' },
                { label: 'Water Intake (ml)', value: reportData.water, icon: FaTint, color: '#3b82f6' },
                { label: 'Calories Burned', value: reportData.calories, icon: FaFire, color: '#ef4444' },
                { label: 'Mood Score', value: reportData.mood, icon: FaSmile, color: '#ec4899' },
                { label: 'Health Score', value: reportData.healthScore, icon: FaHeartbeat, color: '#10b981' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#f8fafc', borderRadius: '12px', padding: '16px',
                  border: '1px solid #f1f5f9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <item.icon style={{ color: item.color, fontSize: '1rem' }} />
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: emeraldLight, borderRadius: '12px', border: `1px solid #a7f3d0` }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: emeraldDark }}>
                💡 Insight: {reportData.insight}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <Footer />
      </>
  );
}
