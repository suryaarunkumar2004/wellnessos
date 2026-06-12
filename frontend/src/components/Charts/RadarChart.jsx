import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const mockData = {
  labels: ['Blood Pressure', 'Cholesterol', 'Blood Sugar', 'BMI', 'Stress Level'],
  datasets: [
    {
      label: 'Health Metrics',
      data: [120, 190, 130, 140, 80],
      backgroundColor: 'rgba(79,70,229,0.2)',
      borderColor: 'var(--primary-500)',
      pointBackgroundColor: 'var(--primary-600)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'var(--primary-500)',
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    r: {
      grid: { color: 'var(--gray-200)' },
      angleLines: { color: 'var(--gray-200)' },
      pointLabels: { color: 'var(--gray-800)' },
      ticks: { backdropColor: 'transparent', color: 'var(--gray-800)' },
    },
  },
  plugins: { legend: { position: 'top' } },
};

export default function RadarChart() {
  return <Radar data={mockData} options={options} />;
}
