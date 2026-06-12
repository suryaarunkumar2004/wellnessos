import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Steps',
      data: [4000, 5000, 3000, 7000, 6500, 8000, 7500],
      backgroundColor: 'var(--primary-500)',
    },
  ],
};

export default function BarChart() {
  return <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />;
}
