import { type Category, type LocationTrend, type RadarData } from '@/types';
import { generateGistData } from '@/lib/utils';

export function createUserActivityData(days = 90) {
  const labels: string[] = [];
  const newUsers: number[] = [];
  const returning: number[] = [];

  const base = Date.now() - (days - 1) * 86_400_000;

  for (let index = 0; index < days; index += 1) {
    const date = new Date(base + index * 86_400_000);
    labels.push(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));

    const weekday = date.getDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 18 : 0;

    returning.push(Math.round(118 + index * 0.72 + Math.sin(index / 7) * 14 - weekendDip));
    newUsers.push(Math.round(64 + index * 0.41 + Math.cos(index / 5) * 11 + (index > 40 && index < 52 ? 24 : 0)));
  }

  return { labels, newUsers, returning };
}

export function createRadarData(): { labels: string[]; datasets: RadarData[] } {
  return {
    labels: ['Mobile', 'Desktop', 'API', 'Web', 'New Users', 'Power Users'],
    datasets: [
      { label: 'This Month', values: [80, 60, 70, 90, 50, 40] },
      { label: 'Last Month', values: [60, 50, 60, 70, 40, 30] },
    ],
  };
}

export function createCategoryData(): Array<{
  label: string;
  count: number;
  color: string;
  border: string;
}> {
  return [
    { label: 'Events', count: 312, color: 'rgba(99, 102, 241, 0.85)', border: 'rgba(99, 102, 241, 1)' },
    { label: 'Food', count: 278, color: 'rgba(251, 146, 60, 0.85)', border: 'rgba(251, 146, 60, 1)' },
    { label: 'Safety', count: 195, color: 'rgba(239, 68, 68, 0.85)', border: 'rgba(239, 68, 68, 1)' },
    { label: 'Tips', count: 241, color: 'rgba(34, 197, 94, 0.85)', border: 'rgba(34, 197, 94, 1)' },
    { label: 'News', count: 183, color: 'rgba(59, 130, 246, 0.85)', border: 'rgba(59, 130, 246, 1)' },
    { label: 'Transit', count: 157, color: 'rgba(168, 85, 247, 0.85)', border: 'rgba(168, 85, 247, 1)' },
    { label: 'Markets', count: 134, color: 'rgba(234, 179, 8, 0.85)', border: 'rgba(234, 179, 8, 1)' },
    { label: 'Other', count: 98, color: 'rgba(156, 163, 175, 0.85)', border: 'rgba(156, 163, 175, 1)' },
  ];
}

export function createLocationData(): LocationTrend[] {
  return [
    { location: 'Abuja', values: [10, 20, 30, 25, 40, 50, 60] },
    { location: 'Lagos', values: [60, 50, 40, 35, 30, 20, 10] },
    { location: 'Kano', values: [18, 26, 29, 33, 37, 41, 48] },
    { location: 'Ibadan', values: [42, 40, 38, 41, 39, 36, 31] },
  ];
}

export function createScatterData() {
  return generateGistData(500);
}

export function getScatterCategories(): Category[] {
  return ['Tech', 'Finance', 'AI', 'Web3'];
}
