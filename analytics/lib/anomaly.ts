export type AnomalySeverity = 'warning' | 'critical';

export interface Anomaly {
  chartId: string;
  label: string;
  current: number;
  average: number;
  pctChange: number;
  severity: AnomalySeverity;
  direction: 'spike' | 'drop';
}

/** Compute rolling average of an array */
export function rollingAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Detect anomalies in a series.
 * ±30% from average = warning, ±50% = critical.
 */
export function detectAnomalies(
  chartId: string,
  labels: string[],
  values: number[],
): Anomaly[] {
  const avg = rollingAverage(values);
  if (avg === 0) return [];

  return values.flatMap((value, i) => {
    const pct = ((value - avg) / avg) * 100;
    const abs = Math.abs(pct);
    if (abs < 30) return [];

    return [
      {
        chartId,
        label: labels[i] ?? `Point ${i}`,
        current: value,
        average: Math.round(avg),
        pctChange: Math.round(pct * 10) / 10,
        severity: abs >= 50 ? 'critical' : 'warning',
        direction: pct > 0 ? 'spike' : 'drop',
      },
    ];
  });
}
