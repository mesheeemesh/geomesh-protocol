import { FileText, Users, BarChart2, Activity, type LucideIcon } from 'lucide-react';

export interface KPICardProps {
  title: string;
  value: number;
  change: number;
  format?: (n: number) => string;
  icon: LucideIcon;
  accentColor?: string;
}

export const KPI_DATA: KPICardProps[] = [
  {
    title: 'Total Gists',
    value: 1_284,
    change: 12.5,
    icon: FileText,
    accentColor: '#6366f1',
  },
  {
    title: 'Active Users',
    value: 847,
    change: 8.3,
    icon: Users,
    accentColor: '#3b82f6',
  },
  {
    title: 'Growth Rate',
    value: 23,
    change: 5.1,
    format: (n: number) => `${n}%`,
    icon: BarChart2,
    accentColor: '#22c55e',
  },
  {
    title: 'Engagement',
    value: 3_291,
    change: -2.8,
    icon: Activity,
    accentColor: '#f59e0b',
  },
];
