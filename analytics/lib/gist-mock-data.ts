export const LOCATIONS = [
  'Abuja', 'Lagos', 'Kano', 'Ibadan', 'Port Harcourt',
  'Enugu', 'Kaduna',
] as const;

export const CATEGORIES = [
  'Events', 'Food', 'Safety', 'Tips', 'News', 'Transit',
  'Markets', 'Other',
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Events:  '#6366f1',
  Food:    '#fb923c',
  Safety:  '#ef4444',
  Tips:    '#22c55e',
  News:    '#3b82f6',
  Transit: '#a855f7',
  Markets: '#eab308',
  Other:   '#9ca3af',
};

export interface RecentGist {
  id: string;
  location: string;
  category: string;
  timestamp: number;
  isNew: boolean;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function makeGist(): RecentGist {
  return {
    id: Math.random().toString(36).slice(2, 9),
    location: pick(LOCATIONS) as string,
    category: pick(CATEGORIES) as string,
    timestamp: Date.now(),
    isNew: true,
  };
}

export const INITIAL_COUNT = 1_284;
