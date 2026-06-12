import React from 'react';
import { PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Walking', value: 400 },
  { name: 'Running', value: 300 },
  { name: 'Cycling', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['var(--primary-500)', '#82ca9d', '#8884d8', '#ffc658'];

export default function PieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="var(--primary-500)">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ReTooltip />
      </RePieChart>
    </ResponsiveContainer>
  );
}
