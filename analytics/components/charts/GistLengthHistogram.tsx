'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const buckets = [
  { range: '0–50', count: 320 },
  { range: '51–100', count: 580 },
  { range: '101–150', count: 740 },
  { range: '151–200', count: 610 },
  { range: '201–300', count: 490 },
  { range: '301–500', count: 310 },
  { range: '501–1000', count: 180 },
  { range: '1000+', count: 70 },
];

export default function GistLengthHistogram() {
  const data = {
    labels: buckets.map((b) => b.range),
    datasets: [
      {
        label: 'Number of Gists',
        data: buckets.map((b) => b.count),
        backgroundColor: 'rgba(59, 130, 246, 0.75)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 3,
        barPercentage: 0.95,
        categoryPercentage: 0.9,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } },
        border: { color: '#e5e7eb' },
        title: {
          display: true,
          text: 'Character count',
          color: '#6b7280',
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#9ca3af', font: { size: 11 } },
        border: { display: false },
        title: {
          display: true,
          text: 'Gists',
          color: '#6b7280',
          font: { size: 12 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17,24,39,0.9)',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (items: TooltipItem<'bar'>[]) => `Length: ${items[0].label} chars`,
          label: (item: TooltipItem<'bar'>) =>
            `  ${(item.raw as number).toLocaleString()} gists`,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
