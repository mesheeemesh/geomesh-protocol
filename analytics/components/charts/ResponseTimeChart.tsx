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

const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

const p50 = [120, 110, 105, 115, 180, 220, 260, 245, 230, 200, 170, 140];
const p95 = [300, 280, 270, 290, 450, 520, 610, 590, 560, 480, 410, 350];

export default function ResponseTimeChart() {
  const data = {
    labels: hours,
    datasets: [
      {
        label: 'p50 (ms)',
        data: p50,
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'p95 (ms)',
        data: p95,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } },
        border: { color: '#e5e7eb' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          callback: (value: number | string) => `${value}ms`,
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16 },
      },
      tooltip: {
        backgroundColor: 'rgba(17,24,39,0.9)',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (item: TooltipItem<'bar'>) =>
            `  ${item.dataset.label}: ${(item.raw as number).toLocaleString()}ms`,
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
