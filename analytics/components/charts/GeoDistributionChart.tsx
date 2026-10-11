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

const countryData = [
  { country: 'Nigeria', gists: 3540, color: 'rgba(99, 102, 241, 0.8)' },
  { country: 'Kenya', gists: 1870, color: 'rgba(34, 197, 94, 0.8)' },
  { country: 'Ghana', gists: 1420, color: 'rgba(251, 146, 60, 0.8)' },
  { country: 'South Africa', gists: 1210, color: 'rgba(59, 130, 246, 0.8)' },
  { country: 'Tanzania', gists: 980, color: 'rgba(168, 85, 247, 0.8)' },
  { country: 'Ethiopia', gists: 760, color: 'rgba(234, 179, 8, 0.8)' },
  { country: 'Uganda', gists: 630, color: 'rgba(239, 68, 68, 0.8)' },
  { country: 'Senegal', gists: 410, color: 'rgba(156, 163, 175, 0.8)' },
];

export default function GeoDistributionChart() {
  const data = {
    labels: countryData.map((d) => d.country),
    datasets: [
      {
        label: 'Gists by Country',
        data: countryData.map((d) => d.gists),
        backgroundColor: countryData.map((d) => d.color),
        borderColor: countryData.map((d) => d.color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#9ca3af', font: { size: 12 } },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#374151', font: { size: 13 } },
        border: { color: '#e5e7eb' },
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
