// Core category types used across the dashboard
export type GistCategory =
  | 'Events'
  | 'Food'
  | 'Safety'
  | 'Tips'
  | 'News'
  | 'Transit'
  | 'Markets'
  | 'Other';

export type ScatterCategory = 'Tech' | 'Finance' | 'AI' | 'Web3';

// ── Summary stats (top-of-dashboard KPIs) ────────────────────────────────────

export interface LocationData {
  location: string;
  count: number;
  trend: number[]; // 7-day daily gist counts
}

export interface GistStats {
  totalGists: number;
  todayGists: number;
  activeUsers: number;
  topLocations: LocationData[];
}

// ── User growth (area chart, 90-day window) ───────────────────────────────────

export interface UserGrowthPoint {
  date: string; // display label, e.g. "1 Jan"
  newUsers: number;
  returning: number;
}

export interface UserGrowthData {
  days: UserGrowthPoint[];
}

// ── Category distribution (pie chart) ────────────────────────────────────────

export interface CategoryStat {
  label: GistCategory;
  count: number;
}

export interface CategoryDistribution {
  categories: CategoryStat[];
  total: number;
}

// ── Platform usage (radar chart) ─────────────────────────────────────────────

export interface PlatformMetric {
  label: string;
  thisMonth: number;
  lastMonth: number;
}

export interface PlatformUsage {
  metrics: PlatformMetric[];
}

// ── Scatter data (age vs engagement) ─────────────────────────────────────────

export interface ScatterPoint {
  id: string;
  age: number;        // days since posting
  engagement: number; // interaction count
  category: ScatterCategory;
}

// ── Live activity feed ────────────────────────────────────────────────────────

export interface RecentGistActivity {
  id: string;
  location: string;
  category: GistCategory;
  timestamp: number; // Unix ms
}

// ── API response wrapper ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  ok: true;
}

export interface ApiError {
  ok: false;
  error: string;
  status?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;
