export interface Template {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const TEMPLATES: Template[] = [
  { id: 'twitter',   label: 'Twitter / X',  width: 1200, height: 630  },
  { id: 'instagram', label: 'Instagram',     width: 1080, height: 1080 },
  { id: 'linkedin',  label: 'LinkedIn',      width: 1200, height: 627  },
];

export interface Metric {
  label: string;
  value: string;
}

export const METRICS: Metric[] = [
  { label: 'Daily Active Users', value: '4,200' },
  { label: 'Gists Created Today', value: '1,847' },
  { label: 'Engagement Rate', value: '38%' },
  { label: 'Retention Rate', value: '62%' },
];
