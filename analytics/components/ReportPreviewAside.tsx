'use client';

import type { Frequency } from '@/lib/report-config-types';

interface ReportPreviewAsideProps {
  frequency: Frequency;
  recipients: string[];
  metrics: string[];
}

export default function ReportPreviewAside({ frequency, recipients, metrics }: ReportPreviewAsideProps) {
  const previewTitle = `${frequency} analytics report`;

  return (
    <aside
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 28,
        padding: '28px',
        color: '#e2e8f0',
        boxShadow: '0 24px 50px rgba(15,23,42,0.18)',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#93c5fd',
          marginBottom: 14,
        }}
      >
        Report Preview
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 22,
          padding: '22px',
          border: '1px solid rgba(148,163,184,0.18)',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{previewTitle}</div>
        <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 20 }}>
          Sent to {recipients.length} recipient{recipients.length === 1 ? '' : 's'} every{' '}
          {frequency.toLowerCase()}.
        </div>
        <div
          style={{
            display: 'grid',
            gap: 12,
            padding: '16px',
            borderRadius: 18,
            background: '#ffffff',
            color: '#0f172a',
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Delivery</div>
            <div style={{ marginTop: 4, fontSize: 15 }}>{frequency} cadence</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Recipients</div>
            <div style={{ marginTop: 6, display: 'grid', gap: 6 }}>
              {recipients.map((r) => (
                <div key={r} style={{ fontSize: 14 }}>{r}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Included metrics</div>
            <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
              {metrics.map((m) => (
                <li key={m} style={{ marginBottom: 6, fontSize: 14 }}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
