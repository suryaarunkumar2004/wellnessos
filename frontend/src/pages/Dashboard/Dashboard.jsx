import React, { useRef, useContext, useEffect } from 'react';
import LineChart from '../../components/Charts/LineChart';
import RadarChart from '../../components/Charts/RadarChart';
import { AreaChart, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Area } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import KPICard from '../../components/KPICard/KPICard';
import BarChart from '../../components/BarChart/BarChart';
import PieChart from '../../components/PieChart/PieChart';
import { SettingsContext } from '../../contexts/SettingsContext';
import { Heart, Activity, Stethoscope } from 'lucide-react';
import html2canvas from 'html2canvas';
import './Dashboard.css';



const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Steps',
      data: [3000, 5000, 4000, 6000, 7000, 8000],
      borderColor: 'var(--primary-500)',
      backgroundColor: 'rgba(79,70,229,0.2)',
      tension: 0.4,
    },
  ],
};

const areaData = [
  { month: 'Jan', heartRate: 70 },
  { month: 'Feb', heartRate: 75 },
  { month: 'Mar', heartRate: 72 },
  { month: 'Apr', heartRate: 78 },
  { month: 'May', heartRate: 80 },
  { month: 'Jun', heartRate: 76 },
];

export default function Dashboard() {
  const chartRef = useRef(null);
  const { highContrast, fontSize, primaryColor } = useContext(SettingsContext);

  // Apply dynamic styles based on settings
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-500', primaryColor);
    root.style.fontSize = fontSize;
    if (highContrast) {
      root.setAttribute('data-contrast', 'high');
    } else {
      root.removeAttribute('data-contrast');
    }
  }, [highContrast, fontSize, primaryColor]);

  const exportChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'dashboard_snapshot.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <section className="dashboard-page" ref={chartRef}>
      <div className="container">
        <h2 className="dashboard-page__title">Health Dashboard</h2>
        <div className="dashboard-kpis">
          <KPICard title="Steps Today" value="8,423" icon={Activity} />
          <KPICard title="Avg Heart Rate" value="76 BPM" icon={Heart} />
          <KPICard title="Appointments" value="2" icon={Stethoscope} />
        </div>
        <div className="dashboard-charts">
          <div className="chart-wrapper">
            <h3>Step Count Over Time</h3>
              <LineChart />
          </div>
          <div className="chart-wrapper">
            <h3>Average Heart Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="heartRate" stroke="var(--primary-500)" fill="var(--primary-100)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
           <div className="chart-wrapper">
             <h3>Health Radar Overview</h3>
             <RadarChart />
           </div>
        <div className="dashboard-map">
          <h3>Clinic Locations</h3>
          <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[37.7749, -122.4194]}>
              <Popup>WellNest Clinic – San Francisco</Popup>
            </Marker>
            <Marker position={[34.0522, -118.2437]}>
              <Popup>WellNest Clinic – Los Angeles</Popup>
            </Marker>
          </MapContainer>
        </div>
        <button className="btn btn-primary" onClick={exportChart}>Export Dashboard as PNG</button>
      </div>
    </section>
  );
}

