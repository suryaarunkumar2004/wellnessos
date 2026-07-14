import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeartbeat, FaWeight, FaRulerVertical, FaTemperatureHigh,
  FaClock, FaPlus, FaTrash, FaChartLine, FaUserMd, FaBell, FaSpinner,
  FaBed, FaWalking, FaTint, FaFire, FaBrain, FaCalendarAlt,
  FaChevronRight, FaChevronLeft, FaArrowRight, FaArrowLeft,
  FaSearch, FaFilter, FaDownload, FaChartBar, FaChartPie
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
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import EmeraldDatePicker from '../../components/EmeraldDatePicker';
import { useAuth } from '../../contexts/AuthContext';

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

const HealthTracker = () => {
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState(1);
  const [chartMetric, setChartMetric] = useState('steps');
  const [chartDays, setChartDays] = useState(30);
  const [chartType, setChartType] = useState('line');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [stats, setStats] = useState(null);
  
  // ⭐ Separate state for Doughnut chart data
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user.id || 1);
      }
    } catch (e) {
      setUserId(1);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHealthData();
      fetchStats();
    }
  }, [userId]);

  // ⭐ Update Doughnut chart whenever healthData or stats changes
  useEffect(() => {
    if (healthData.length > 0 && stats) {
      updateDoughnutData();
    }
  }, [healthData, stats]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/health-metrics/${userId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const formattedData = result.data.map(record => ({
            id: record.id,
            date: record.metricDate || new Date().toISOString().split('T')[0],
            notes: record.notes || '',
            steps: record.steps || 0,
            sleepHours: record.sleepHours || 0,
            waterIntakeMl: record.waterIntakeMl || 0,
            heartRate: record.heartRate || 0,
            weightKg: record.weightKg || 0,
            caloriesBurned: record.caloriesBurned || 0,
            moodScore: record.moodScore || 0,
            stressLevel: record.stressLevel || 0,
            healthScore: record.healthScore || 0,
            workoutType: record.workoutType || '',
            workoutDuration: record.workoutDuration || 0,
            distanceKm: record.distanceKm || 0,
            activeMinutes: record.activeMinutes || 0,
            systolic: record.systolic || 0,
            diastolic: record.diastolic || 0,
            bloodGlucose: record.bloodGlucose || 0,
            oxygenSat: record.oxygenSat || 0,
            bodyFat: record.bodyFat || 0,
            temperatureC: record.temperatureC || 0,
            sleepQuality: record.sleepQuality || 0
          }));
          setHealthData(formattedData);
        } else {
          setHealthData([]);
        }
      } else {
        setHealthData([]);
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
      setHealthData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/health-metrics/${userId}/stats`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setStats(result.stats);
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // ⭐ DYNAMIC DOUGHNUT DATA - Uses averages from stats
  const updateDoughnutData = () => {
    if (!stats || healthData.length === 0) {
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

    // Use average values from stats
    const metrics = [
      { key: 'steps', label: 'Steps', value: stats.avgSteps || 0, color: '#3b82f6', max: 10000 },
      { key: 'heartRate', label: 'Heart Rate', value: stats.avgHeartRate || 0, color: '#ef4444', max: 100 },
      { key: 'sleepHours', label: 'Sleep', value: stats.avgSleep || 0, color: '#8b5cf6', max: 10 },
      { key: 'waterIntakeMl', label: 'Water', value: stats.avgWaterMl ? stats.avgWaterMl / 1000 : 0, color: '#06b6d4', max: 5 },
      { key: 'healthScore', label: 'Health Score', value: stats.avgHealthScore || 0, color: '#059669', max: 100 },
    ];

    // Filter out zero values
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
      labels: filtered.map(m => `${m.label}: ${m.value.toFixed(1)}`),
      datasets: [{
        data: filtered.map(m => m.value),
        backgroundColor: filtered.map(m => m.color + '80'),
        borderColor: filtered.map(m => m.color),
        borderWidth: 2,
      }]
    });
  };

  const addHealthRecord = async () => {
    if (!value) return;
    
    try {
      const token = localStorage.getItem('token');
      const payload = {
        [selectedMetric]: parseFloat(value),
        notes: notes
      };

      if (date) {
        payload.metricDate = date;
      }

      const response = await fetch(`/api/health-metrics/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          await fetchHealthData();
          await fetchStats();
          setValue('');
          setNotes('');
          setShowAddModal(false);
        }
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const deleteHealthRecord = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/health-metrics/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        await fetchHealthData();
        await fetchStats();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const getLatestMetricValue = (metricKey) => {
    if (healthData.length === 0) return null;
    const sorted = [...healthData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sorted[0];
    const value = latest[metricKey];
    return value !== undefined && value !== null && value !== 0 ? value : null;
  };

  const getMetricDisplay = (key) => {
    const map = {
      steps: { label: 'Steps', unit: '', icon: FaWalking, color: '#3b82f6' },
      heartRate: { label: 'Heart Rate', unit: 'bpm', icon: FaHeartbeat, color: '#ef4444' },
      weightKg: { label: 'Weight', unit: 'kg', icon: FaWeight, color: '#8b5cf6' },
      sleepHours: { label: 'Sleep', unit: 'hrs', icon: FaBed, color: '#8b5cf6' },
      waterIntakeMl: { label: 'Water', unit: 'L', icon: FaTint, color: '#06b6d4' },
      caloriesBurned: { label: 'Calories', unit: 'cal', icon: FaFire, color: '#f59e0b' },
      moodScore: { label: 'Mood', unit: '/10', icon: FaBrain, color: '#ec4899' },
      healthScore: { label: 'Health Score', unit: '', icon: FaChartLine, color: '#059669' }
    };
    return map[key] || { label: key, unit: '', icon: FaChartLine, color: '#64748b' };
  };

  const metrics = [
    { key: 'healthScore', label: 'Health Score', icon: FaChartLine, color: '#059669' },
    { key: 'heartRate', label: 'Heart Rate', icon: FaHeartbeat, color: '#ef4444' },
    { key: 'weightKg', label: 'Weight', icon: FaWeight, color: '#8b5cf6' },
    { key: 'steps', label: 'Steps', icon: FaWalking, color: '#3b82f6' },
    { key: 'sleepHours', label: 'Sleep', icon: FaBed, color: '#8b5cf6' },
    { key: 'waterIntakeMl', label: 'Water', icon: FaTint, color: '#06b6d4' },
    { key: 'caloriesBurned', label: 'Calories', icon: FaFire, color: '#f59e0b' },
    { key: 'moodScore', label: 'Mood', icon: FaBrain, color: '#ec4899' },
  ];

  const chartMetrics = [
    { key: 'steps', label: 'Steps', color: '#3b82f6' },
    { key: 'heartRate', label: 'Heart Rate', color: '#ef4444' },
    { key: 'weightKg', label: 'Weight (kg)', color: '#059669' },
    { key: 'sleepHours', label: 'Sleep Hours', color: '#8b5cf6' },
    { key: 'waterIntakeMl', label: 'Water (L)', color: '#06b6d4' },
    { key: 'caloriesBurned', label: 'Calories Burned', color: '#f59e0b' },
    { key: 'moodScore', label: 'Mood Score', color: '#ec4899' },
    { key: 'healthScore', label: 'Health Score', color: '#059669' },
  ];

  // Main Chart Data
  const getChartData = () => {
    const sortedData = [...healthData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const recentData = sortedData.slice(-chartDays);
    
    const labels = recentData.map(d => new Date(d.date).toLocaleDateString());
    const data = recentData.map(d => {
      const val = d[chartMetric];
      if (chartMetric === 'waterIntakeMl') return val ? val / 1000 : 0;
      return val || 0;
    });

    const color = chartMetrics.find(m => m.key === chartMetric)?.color || '#3b82f6';

    return {
      labels,
      datasets: [
        {
          label: chartMetrics.find(m => m.key === chartMetric)?.label || 'Value',
          data: data,
          borderColor: color,
          backgroundColor: chartType === 'bar' ? color + '60' : color + '20',
          fill: chartType === 'line' ? true : false,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: chartType === 'line' ? 4 : 0,
          borderWidth: chartType === 'line' ? 2 : 0,
        }
      ]
    };
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
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 }, maxRotation: 45, autoSkip: true, maxTicksLimit: 15 }
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
    cutout: '65%',
  };

  // Filter and paginate records
  const filteredRecords = healthData.filter(record => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    const metricKeys = ['heartRate', 'weightKg', 'steps', 'sleepHours', 'waterIntakeMl', 'caloriesBurned', 'moodScore', 'healthScore'];
    let metricLabel = '';
    for (const key of metricKeys) {
      if (record[key] && record[key] !== 0) {
        metricLabel = getMetricDisplay(key).label;
        break;
      }
    }
    return new Date(record.date).toLocaleDateString().includes(search) ||
           metricLabel.toLowerCase().includes(search) ||
           (record.notes && record.notes.toLowerCase().includes(search));
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const getMetricWithValue = (record) => {
    const metricKeys = ['heartRate', 'weightKg', 'steps', 'sleepHours', 'waterIntakeMl', 'caloriesBurned', 'moodScore', 'healthScore'];
    for (const key of metricKeys) {
      if (record[key] && record[key] !== 0) {
        return { key, value: record[key] };
      }
    }
    return { key: 'heartRate', value: record.heartRate || 0 };
  };

  const getStatusColor = (score) => {
    if (score >= 80) return { bg: '#ecfdf5', text: '#059669', label: 'Excellent' };
    if (score >= 60) return { bg: '#fef3c7', text: '#d97706', label: 'Good' };
    if (score >= 40) return { bg: '#fef2f2', text: '#dc2626', label: 'Needs Attention' };
    return { bg: '#fef2f2', text: '#dc2626', label: 'Critical' };
  };

  const handleAddRecord = () => {
    addHealthRecord();
  };

  const getChartComponent = () => {
    if (chartType === 'doughnut') {
      if (!doughnutData) {
        return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading chart...</div>;
      }
      return <Doughnut data={doughnutData} options={doughnutOptions} />;
    }
    return chartType === 'bar' ? 
      <Bar data={getChartData()} options={chartOptions} /> : 
      <Line data={getChartData()} options={chartOptions} />;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <FaSpinner style={{ fontSize: '3rem', color: emerald, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', marginTop: '16px' }}>Loading health data...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <style>{`
        @media (max-width: 768px) {
          .chart-btn-text {
            display: none !important;
          }
          .chart-btn-icon {
            font-size: 1.1rem !important;
            margin: 0 !important;
          }
          .chart-btn-container {
            padding: 8px 12px !important;
          }
        }
      `}</style>
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-150px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaHeartbeat style={{ fontSize: '2rem', opacity: 0.9 }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                    Health Tracker
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, margin: '2px 0 0 0', fontWeight: '300' }}>
                    {stats ? `${stats.totalRecords || 0} records tracked` : 'Track your health metrics'}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginTop: '16px'
              }}>
                {[
                  { label: 'Total Records', value: stats?.totalRecords || healthData.length || 0, icon: FaChartLine },
                  { label: 'Streak', value: stats?.streak || 0, icon: FaFire },
                  { label: 'Health Score', value: stats?.avgHealthScore || 0, icon: FaHeartbeat },
                  { label: 'Avg Steps', value: stats?.avgSteps || 0, icon: FaWalking },
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '8px' }}>
                      <stat.icon style={{ fontSize: '1rem', color: 'white' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.2' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {metrics.map((metric) => {
              const value = getLatestMetricValue(metric.key);
              const display = getMetricDisplay(metric.key);
              return (
                <div key={metric.key} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '18px 16px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = metric.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      background: `${metric.color}15`,
                      padding: '8px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <metric.icon style={{ color: metric.color, fontSize: '1rem' }} />
                    </div>
                    <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {metric.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b' }}>
                    {value !== null && value !== 0 ? value : '--'}
                    {value !== null && value !== 0 && display.unit && (
                      <span style={{ fontSize: '0.7rem', fontWeight: '400', color: '#94a3b8', marginLeft: '4px' }}>
                        {display.unit}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Health Trends
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0 0' }}>
                  Track your health metrics over time
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Chart Type Selector */}
                <div style={{
                  display: 'flex',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  background: 'white'
                }}>
                  {['line', 'bar', 'doughnut'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className="chart-btn-container"
                      style={{
                        padding: '6px 14px',
                        background: chartType === type ? emerald : 'white',
                        color: chartType === type ? 'white' : '#64748b',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => {
                        if (chartType !== type) {
                          e.currentTarget.style.background = '#f1f5f9';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (chartType !== type) {
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      {type === 'line' && <FaChartLine size={14} className="chart-btn-icon" />}
                      {type === 'bar' && <FaChartBar size={14} className="chart-btn-icon" />}
                      {type === 'doughnut' && <FaChartPie size={14} className="chart-btn-icon" />}
                      <span className="chart-btn-text">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </button>
                  ))}
                </div>

                <CustomDropdown
                  options={chartMetrics.map(m => m.key)}
                  value={chartMetric}
                  onChange={setChartMetric}
                  labelMap={chartMetrics.reduce((acc, m) => { acc[m.key] = m.label; return acc; }, {})}
                />
                <CustomDropdown
                  options={[7, 14, 30]}
                  value={chartDays}
                  onChange={(val) => setChartDays(parseInt(val))}
                  labelMap={{
                    7: 'Last 7 days',
                    14: 'Last 14 days',
                    30: 'Last 30 days'
                  }}
                />
              </div>
            </div>
            <div style={{ height: chartType === 'doughnut' ? '250px' : '280px' }}>
              {healthData.length > 0 ? (
                getChartComponent()
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  No data available for chart
                </div>
              )}
            </div>
          </div>

          {/* Add Record Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = emerald; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
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
                    width: '180px'
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
              }}
            >
              <FaPlus /> Add Record
            </button>
          </div>

          {/* Premium Health Records Table */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(to right, #fafafa, #ffffff)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: emeraldLight,
                  padding: '10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaCalendarAlt style={{ color: emerald, fontSize: '1.1rem' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                    Health Records
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                    {filteredRecords.length} records found
                  </p>
                </div>
              </div>
            </div>

            {currentRecords.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <FaHeartbeat style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '16px' }} />
                <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No Records Found</h3>
                <p style={{ color: '#94a3b8' }}>Start tracking your health by adding your first record.</p>
              </div>
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{
                        background: '#f8fafc',
                        borderBottom: '2px solid #e2e8f0'
                      }}>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'left',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Date</th>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'left',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Metric</th>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'left',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Value</th>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'left',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Status</th>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'left',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Notes</th>
                        <th style={{
                          padding: '14px 20px',
                          textAlign: 'right',
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record) => {
                        const { key, value } = getMetricWithValue(record);
                        const display = getMetricDisplay(key);
                        const Icon = display.icon;
                        const status = getStatusColor(record.healthScore || 0);
                        
                        return (
                          <tr key={record.id} style={{
                            borderBottom: '1px solid #f1f5f9',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                            <td style={{
                              padding: '14px 20px',
                              fontSize: '0.8rem',
                              color: '#1e293b',
                              fontWeight: '500'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  background: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.7rem',
                                  fontWeight: '700',
                                  color: '#64748b'
                                }}>
                                  {new Date(record.date).getDate()}
                                </span>
                                <div>
                                  <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                                    {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </div>
                                  <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                                    {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric' })}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                background: `${display.color}12`,
                                color: display.color,
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                <Icon style={{ fontSize: '0.6rem' }} />
                                {display.label}
                              </span>
                            </td>
                            <td style={{
                              padding: '14px 20px',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              color: '#1e293b'
                            }}>
                              {value} {display.unit}
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '2px 10px',
                                borderRadius: '12px',
                                background: status.bg,
                                color: status.text,
                                fontSize: '0.65rem',
                                fontWeight: '600'
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: status.text,
                                  display: 'inline-block'
                                }} />
                                {record.healthScore || 0}%
                              </span>
                            </td>
                            <td style={{
                              padding: '14px 20px',
                              fontSize: '0.75rem',
                              color: '#94a3b8',
                              maxWidth: '120px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {record.notes || <span style={{ color: '#e2e8f0' }}>—</span>}
                            </td>
                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                              <button
                                onClick={() => deleteHealthRecord(record.id)}
                                style={{
                                  padding: '6px 14px',
                                  borderRadius: '8px',
                                  border: '1px solid #f1f5f9',
                                  background: 'white',
                                  color: '#94a3b8',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#fef2f2';
                                  e.currentTarget.style.borderColor = '#fecaca';
                                  e.currentTarget.style.color = '#ef4444';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'white';
                                  e.currentTarget.style.borderColor = '#f1f5f9';
                                  e.currentTarget.style.color = '#94a3b8';
                                }}
                              >
                                <FaTrash style={{ fontSize: '0.6rem' }} />
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    background: '#fafafa'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Showing {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: 'white',
                          color: currentPage === 1 ? '#e2e8f0' : '#64748b',
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaArrowLeft style={{ fontSize: '0.6rem' }} />
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
                              padding: '8px 14px',
                              borderRadius: '8px',
                              border: currentPage === pageNum ? `2px solid ${emerald}` : '1px solid #e2e8f0',
                              background: currentPage === pageNum ? emerald : 'white',
                              color: currentPage === pageNum ? 'white' : '#64748b',
                              cursor: 'pointer',
                              fontWeight: currentPage === pageNum ? '700' : '500',
                              transition: 'all 0.2s ease',
                              fontSize: '0.8rem'
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
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: 'white',
                          color: currentPage === totalPages ? '#e2e8f0' : '#64748b',
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaArrowRight style={{ fontSize: '0.6rem' }} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'visible',
            animation: 'modalSlideIn 0.3s ease'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
              Add Health Record
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Metric
              </label>
              <CustomDropdown
                options={metrics.map(m => m.key)}
                value={selectedMetric}
                onChange={setSelectedMetric}
                labelMap={metrics.reduce((acc, m) => { acc[m.key] = m.label; return acc; }, {})}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Value
              </label>
              <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = emerald; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Date
              </label>
              <EmeraldDatePicker value={date} onChange={setDate} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = emerald; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#64748b',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddRecord}
                style={{
                  flex: 2,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default HealthTracker;
