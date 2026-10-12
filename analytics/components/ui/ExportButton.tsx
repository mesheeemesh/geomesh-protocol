'use client';

import { useState } from 'react';

interface ExportButtonProps {
  label?: string;
  onExport: (onProgress: (progress: number) => void) => Promise<void>;
}

export default function ExportButton({
  label = 'Export CSV',
  onExport,
}: ExportButtonProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setError(null);
    setProgress(0);

    try {
      await onExport((value) => setProgress(Math.min(100, Math.max(0, value))));
      setProgress(100);

      window.setTimeout(() => setProgress(null), 900);
    } catch (err) {
      setProgress(null);
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <button
        onClick={handleExport}
        disabled={progress !== null}
        style={{
          border: '1px solid #cbd5e1',
          borderRadius: 999,
          background: progress !== null ? '#e2e8f0' : '#ffffff',
          color: '#0f172a',
          padding: '8px 14px',
          fontSize: 13,
          fontWeight: 600,
          cursor: progress !== null ? 'wait' : 'pointer',
        }}
      >
        {progress !== null ? `Exporting ${progress}%` : label}
      </button>

      {progress !== null && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#475569' }}>
          Preparing CSV and starting download automatically.
        </div>
      )}

      {error && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#b91c1c' }}>
          {error}
        </div>
      )}
    </div>
  );
}
