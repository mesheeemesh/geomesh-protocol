export const STORAGE_KEY = 'geomesh-protocol-report-config';

export const METRICS = [
  'Live gists',
  'New vs returning users',
  'Scatter engagement trends',
  'Radar channel activity',
  'Category distribution',
  'Location trends',
] as const;

export const FREQUENCIES = ['Daily', 'Weekly', 'Monthly'] as const;

export type Frequency = (typeof FREQUENCIES)[number];

export interface ReportConfigData {
  frequency: Frequency;
  recipients: string[];
  metrics: string[];
}

export const defaultConfig: ReportConfigData = {
  frequency: 'Weekly',
  recipients: ['ops@geomesh-protocol.app', 'founders@geomesh-protocol.app'],
  metrics: ['Live gists', 'New vs returning users', 'Category distribution'],
};

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function loadConfig(): ReportConfigData | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as ReportConfigData;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveConfig(data: ReportConfigData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
