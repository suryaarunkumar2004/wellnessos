import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import { 
  FaHeartbeat, FaWalking, FaTint, FaMoon, FaWeight, 
  FaCalendarAlt, FaPlus, FaChartLine, FaClock,
  FaArrowLeft, FaArrowRight, FaSpinner, FaSearch,
  FaFire, FaSmile, FaFrown, FaMeh,
  FaRunning, FaBed, FaChevronDown, FaChevronUp,
  FaChartBar, FaChartPie,
  FaTimes
} from 'react-icons/fa';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const MedicalHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState('30days');
  const [doughnutData, setDoughnutData] = useState(null);

  const emerald = '#059669';
  const emeraldDark = '#047857';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  useEffect(() => {
    if (user?.id) {
      fetchMedicalHistory();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetchMedicalHistory();
    }
  }, [dateRange]);

  useEffect(() => {
    if (stats) {
      updateDoughnutData();
    }
  }, [stats]);

  const fetchMedicalHistory = async () => {
    setLoading(true);
    try {
      let url;
      if (dateRange === '7days') {
        url = `/api/health-metrics/${user.id}/last7days`;
      } else if (dateRange === '15days') {
        const date = new Date();
        date.setDate(date.getDate() - 15);
        const startDate = date.toISOString().split('T')[0];
        const endDate = new Date().toISOString().split('T')[0];
        url = `/api/health-metrics/${user.id}/range?startDate=${startDate}&endDate=${endDate}`;
      } else {
        url = `/api/health-metrics/${user.id}/last30days`;
      }
      
      const response = await fetch(url, { headers: getAuthHeaders() });
      const result = await response.json();
      
      if (result.success) {
        const data = result.data || [];
        const sorted = data.sort((a, b) => new Date(b.metricDate) - new Date(a.metricDate));
        setRecords(sorted);
        if (result.summary) {
          setStats(prev => ({ ...prev, ...result.summary }));
        }
      }
    } catch (error) {
      console.error('Error fetching medical history:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/health-metrics/${user.id}/stats`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateDoughnutData = () => {
    if (!stats) {
      setDoughnutData({
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#e2e8f0'],
          borderColor: ['#e2e8f0'],
          borderWidth: 1,
        }]
      });
      return;
    }

    const metrics = [
      { label: 'Steps', value: stats.avgSteps ? Math.min((stats.avgSteps / 10000) * 100, 100) : 0, color: '#3b82f6' },
      { label: 'Sleep', value: stats.avgSleep ? Math.min((stats.avgSleep / 8) * 100, 100) : 0, color: '#8b5cf6' },
      { label: 'Heart Rate', value: stats.avgHeartRate ? Math.max(0, 100 - ((stats.avgHeartRate - 60) / 40) * 100) : 0, color: '#ef4444' },
      { label: 'Water', value: stats.avgWaterMl ? Math.min((stats.avgWaterMl / 3000) * 100, 100) : 0, color: '#06b6d4' },
      { label: 'Health Score', value: stats.avgHealthScore || 0, color: '#059669' },
    ];

    const filtered = metrics.filter(m => m.value > 0);
    
    if (filtered.length === 0) {
      setDoughnutData({
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#e2e8f0'],
          borderColor: ['#e2e8f0'],
          borderWidth: 1,
        }]
      });
      return;
    }

    setDoughnutData({
      labels: filtered.map(m => `${m.label}: ${m.value.toFixed(0)}%`),
      datasets: [{
        data: filtered.map(m => m.value),
        backgroundColor: filtered.map(m => m.color + '70'),
        borderColor: filtered.map(m => m.color),
        borderWidth: 2,
      }]
    });
  };

  const getMetricDisplay = (key) => {
    const map = {
      steps: { label: 'Steps', unit: '', icon: FaWalking, color: '#3b82f6' },
      heartRate: { label: 'Heart Rate', unit: 'bpm', icon: FaHeartbeat, color: '#ef4444' },
      sleepHours: { label: 'Sleep', unit: 'hrs', icon: FaMoon, color: '#8b5cf6' },
      waterIntakeMl: { label: 'Water', unit: 'L', icon: FaTint, color: '#06b6d4' },
      weightKg: { label: 'Weight', unit: 'kg', icon: FaWeight, color: '#f59e0b' },
      caloriesBurned: { label: 'Calories', unit: 'kcal', icon: FaFire, color: '#f97316' },
      moodScore: { label: 'Mood', unit: '/10', icon: FaSmile, color: '#ec4899' },
      healthScore: { label: 'Health Score', unit: '', icon: FaChartLine, color: '#059669' },
    };
    return map[key] || { label: key, unit: '', icon: FaChartLine, color: '#64748b' };
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (score) => {
    if (score >= 80) return { bg: '#ecfdf5', text: '#059669', label: 'Excellent' };
    if (score >= 60) return { bg: '#fef3c7', text: '#d97706', label: 'Good' };
    if (score >= 40) return { bg: '#fef2f2', text: '#dc2626', label: 'Fair' };
    return { bg: '#fef2f2', text: '#dc2626', label: 'Needs Attention' };
  };

  const getMoodEmoji = (score) => {
    if (score >= 8) return '😊';
    if (score >= 6) return '��';
    if (score >= 4) return '😐';
    return '��';
  };

  const filteredRecords = records.filter(record => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return record.metricDate?.includes(search) ||
           record.notes?.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);

  const chartData = {
    labels: records.slice(0, 30).reverse().map(r => formatDate(r.metricDate)),
    datasets: [{
      label: getMetricDisplay(selectedMetric).label,
      data: records.slice(0, 30).reverse().map(r => {
        const val = r[selectedMetric];
        if (selectedMetric === 'waterIntakeMl' && val) return val / 1000;
        return val || 0;
      }),
      borderColor: getMetricDisplay(selectedMetric).color,
      backgroundColor: getMetricDisplay(selectedMetric).color + '30',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: getMetricDisplay(selectedMetric).color,
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 9 }, maxRotation: 45 }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 10 },
          boxWidth: 10,
          padding: 8,
          color: '#64748b'
        }
      }
    },
    cutout: '60%',
  };

  const summaryStats = [
    { key: 'heartRate', label: 'Heart Rate', value: stats?.avgHeartRate ? `${Math.round(stats.avgHeartRate)} bpm` : '--', icon: FaHeartbeat, color: '#ef4444' },
    { key: 'steps', label: 'Steps', value: stats?.avgSteps ? Math.round(stats.avgSteps).toLocaleString() : '--', icon: FaWalking, color: '#3b82f6' },
    { key: 'water', label: 'Water', value: stats?.avgWaterMl ? `${(stats.avgWaterMl / 1000).toFixed(1)} L` : '0.0 L', icon: FaTint, color: '#06b6d4' },
    { key: 'sleep', label: 'Sleep', value: stats?.avgSleep ? `${stats.avgSleep.toFixed(1)} hrs` : '--', icon: FaMoon, color: '#8b5cf6' },
    { key: 'weight', label: 'Weight', value: stats?.latestWeightKg ? `${stats.latestWeightKg.toFixed(1)} kg` : '--', icon: FaWeight, color: '#f59e0b' },
    { key: 'healthScore', label: 'Health Score', value: stats?.avgHealthScore ? `${Math.round(stats.avgHealthScore)}/100` : '--', icon: FaChartLine, color: '#059669' },
  ];

  const availableMetrics = [
    { key: 'steps', label: 'Steps' },
    { key: 'heartRate', label: 'Heart Rate' },
    { key: 'sleepHours', label: 'Sleep' },
    { key: 'waterIntakeMl', label: 'Water' },
    { key: 'weightKg', label: 'Weight' },
    { key: 'moodScore', label: 'Mood' },
    { key: 'healthScore', label: 'Health Score' },
  ];

  const getChartComponent = () => {
    if (chartType === 'doughnut') {
      if (!doughnutData) {
        return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading chart...</div>;
      }
      return <Doughnut data={doughnutData} options={doughnutOptions} />;
    }
    return chartType === 'bar' ? 
      <Bar data={chartData} options={chartOptions} /> : 
      <Line data={chartData} options={chartOptions} />;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '100px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <FaSpinner className="spin" style={{ fontSize: '2.5rem', color: emerald }} />
            <p style={{ color: '#64748b', marginTop: '12px', fontWeight: '500' }}>Loading your medical history...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div style={{ 
        paddingTop: '90px', 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 50%, #f8fafc 100%)',
        paddingBottom: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          {/* Header - Export PDF button removed */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            padding: '20px 0',
            borderBottom: '2px solid #e2e8f0'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#1e293b',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <FaCalendarAlt style={{ color: emerald, fontSize: '1.4rem' }} />
                Medical History
              </h1>
              <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.85rem' }}>
                {records.length} records • {dateRange === '7days' ? 'Last 7 Days' : dateRange === '15days' ? 'Last 15 Days' : 'Last 30 Days'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/health-tracker')}
                style={{
                  padding: '8px 16px',
                  background: emerald,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = emeraldDark}
                onMouseLeave={e => e.currentTarget.style.background = emerald}
              >
                <FaPlus size={12} /> Log Vitals
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '14px',
            marginBottom: '24px'
          }}>
            {summaryStats.map((stat, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid rgba(5,150,105,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(5,150,105,0.12)';
                e.currentTarget.style.borderColor = stat.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = 'rgba(5,150,105,0.08)';
              }}>
                <div style={{ 
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: stat.color + '10',
                  pointerEvents: 'none'
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: stat.color + '15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icon style={{ color: stat.color, fontSize: '0.7rem' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    {stat.label}
                  </span>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', position: 'relative', zIndex: 1 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(5,150,105,0.08)',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '12px', 
              marginBottom: '16px' 
            }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                  <FaChartLine style={{ color: emerald, marginRight: '8px' }} />
                  Health Trends
                </h3>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 0' }}>
                  {records.length} records • {dateRange}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <CustomDropdown
                  options={['7days', '15days', '30days']}
                  value={dateRange}
                  onChange={setDateRange}
                  labelMap={{
                    '7days': '7 Days',
                    '15days': '15 Days',
                    '30days': '30 Days'
                  }}
                />

                <CustomDropdown
                  options={availableMetrics.map(m => m.key)}
                  value={selectedMetric}
                  onChange={setSelectedMetric}
                  labelMap={availableMetrics.reduce((acc, m) => { acc[m.key] = m.label; return acc; }, {})}
                />

                <CustomDropdown
                  options={['line', 'bar', 'doughnut']}
                  value={chartType}
                  onChange={setChartType}
                  labelMap={{
                    'line': 'Line Chart',
                    'bar': 'Bar Chart',
                    'doughnut': 'Doughnut Chart'
                  }}
                />
              </div>
            </div>

            <div style={{ height: '220px' }}>
              {records.length > 0 ? (
                getChartComponent()
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '0 14px',
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = emerald}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
              <FaSearch style={{ color: '#94a3b8', fontSize: '0.8rem' }} />
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  padding: '10px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: 'transparent',
                  width: '200px'
                }}
              />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>
              {filteredRecords.length} records
            </div>
          </div>

          {/* Timeline Logs */}
          {currentRecords.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid rgba(5,150,105,0.08)'
            }}>
              <FaCalendarAlt style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '16px' }} />
              <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No Records Found</h3>
              <p style={{ color: '#94a3b8' }}>Start tracking your health by logging your first vitals.</p>
              <button
                onClick={() => navigate('/health-tracker')}
                style={{
                  marginTop: '16px',
                  padding: '10px 24px',
                  background: emerald,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Log Vitals Now
              </button>
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(5,150,105,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                  <FaClock style={{ color: emerald, marginRight: '8px' }} />
                  Timeline Logs
                </h3>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {indexOfFirst + 1} - {Math.min(indexOfLast, filteredRecords.length)} of {filteredRecords.length}
                </span>
              </div>

              <div style={{ padding: '16px 20px' }}>
                {currentRecords.map((record, idx) => {
                  const status = getStatusColor(record.healthScore || 0);
                  const moodEmoji = getMoodEmoji(record.moodScore || 0);
                  const isExpanded = expandedRecord === record.id;

                  return (
                    <div key={record.id} style={{
                      borderBottom: idx < currentRecords.length - 1 ? '1px solid #f1f5f9' : 'none',
                      padding: '14px 0',
                      transition: 'all 0.2s'
                    }}>
                      <div 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                        onClick={() => setExpandedRecord(isExpanded ? null : record.id)}
                      >
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: status.bg,
                            border: `2px solid ${status.text}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: status.text }}>
                              {record.healthScore || 0}%
                            </span>
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.9rem' }}>
                                {formatDate(record.metricDate)}
                              </span>
                              <span style={{
                                fontSize: '0.55rem',
                                padding: '2px 10px',
                                borderRadius: '20px',
                                background: status.bg,
                                color: status.text,
                                fontWeight: '700'
                              }}>
                                {status.label}
                              </span>
                              {record.moodScore && (
                                <span style={{ fontSize: '0.75rem' }}>
                                  {moodEmoji}
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
                              {record.steps && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <FaWalking style={{ color: '#3b82f6', fontSize: '0.55rem' }} />
                                  <strong>{record.steps.toLocaleString()}</strong>
                                </span>
                              )}
                              {record.sleepHours && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <FaMoon style={{ color: '#8b5cf6', fontSize: '0.55rem' }} />
                                  <strong>{record.sleepHours}h</strong>
                                </span>
                              )}
                              {record.heartRate && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <FaHeartbeat style={{ color: '#ef4444', fontSize: '0.55rem' }} />
                                  <strong>{record.heartRate}</strong>
                                </span>
                              )}
                              {record.waterIntakeMl && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <FaTint style={{ color: '#06b6d4', fontSize: '0.55rem' }} />
                                  <strong>{(record.waterIntakeMl / 1000).toFixed(1)}L</strong>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                            {formatTime(record.createdAt || record.updatedAt)}
                          </span>
                          <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '4px'
                          }}>
                            {isExpanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div style={{
                          marginTop: '12px',
                          padding: '14px',
                          background: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                            gap: '10px'
                          }}>
                            {Object.entries(record).map(([key, value]) => {
                              if (['id', 'userId', 'createdAt', 'updatedAt', 'metricDate', 'notes'].includes(key)) return null;
                              if (value === null || value === 0) return null;
                              const metric = getMetricDisplay(key);
                              let displayValue = value;
                              if (key === 'waterIntakeMl') displayValue = (value / 1000).toFixed(1);
                              return (
                                <div key={key} style={{
                                  background: 'white',
                                  borderRadius: '8px',
                                  padding: '8px 12px',
                                  border: '1px solid #f1f5f9'
                                }}>
                                  <div style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>
                                    {metric.label}
                                  </div>
                                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
                                    {displayValue} {metric.unit}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {record.notes && (
                            <div style={{ marginTop: '10px', padding: '8px 12px', background: 'white', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                              <div style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Notes</div>
                              <div style={{ fontSize: '0.8rem', color: '#475569' }}>{record.notes}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  background: '#f8fafc'
                }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {indexOfFirst + 1} - {Math.min(indexOfLast, filteredRecords.length)} of {filteredRecords.length}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        color: currentPage === 1 ? '#e2e8f0' : '#64748b',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '0.7rem'
                      }}
                    >
                      <FaArrowLeft size={9} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: currentPage === pageNum ? `2px solid ${emerald}` : '1px solid #e2e8f0',
                            background: currentPage === pageNum ? emerald : 'white',
                            color: currentPage === pageNum ? 'white' : '#64748b',
                            cursor: 'pointer',
                            fontWeight: currentPage === pageNum ? '700' : '500',
                            fontSize: '0.7rem'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        color: currentPage === totalPages ? '#e2e8f0' : '#64748b',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '0.7rem'
                      }}
                    >
                      <FaArrowRight size={9} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default MedicalHistory;
