'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function generateLast14Days() {
  const labels: string[] = [];
  const dau: number[] = [];
  const newUsers: number[] = [];
  const now = Date.now();

  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000);
    labels.push(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
    dau.push(Math.round(800 + Math.sin(i / 3) * 80 + (13 - i) * 5));
    newUsers.push(Math.round(120 + Math.cos(i / 4) * 20 + (13 - i) * 2));
  }

  return { labels, dau, newUsers };
}

const { labels, dau, newUsers } = generateLast14Days();

export default function DailyActiveVsNewUsersChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Active Users',
        data: dau,
        borderColor: 'rgba(99, 102, 241, 0.9)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'New Users',
        data: newUsers,
        borderColor: 'rgba(34, 197, 94, 0.9)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
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
        beginAtZero: false,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#9ca3af', font: { size: 11 } },
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
          label: (item: TooltipItem<'line'>) =>
            `  ${item.dataset.label}: ${(item.raw as number).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
}
