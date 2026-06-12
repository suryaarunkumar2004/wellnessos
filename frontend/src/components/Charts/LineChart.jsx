import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Health Metric',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'var(--primary-500)',
      borderColor: 'var(--primary-600)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Line Chart (Mock Data)' },
  },
};

export default function LineChart() {
  return <Line data={mockData} options={options} />;
}
