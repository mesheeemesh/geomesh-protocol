'use client';

import { useState } from 'react';
import { downloadAnalyticsJson } from '@/lib/json-export';

export default function JsonExportControls() {
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const handleExport = () => {
    downloadAnalyticsJson(prettyPrint);
    setStatus(`JSON export downloaded ${prettyPrint ? 'with' : 'without'} pretty printing.`);
    window.setTimeout(() => setStatus(null), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: '#475569',
        }}
      >
        <input
          type="checkbox"
          checked={prettyPrint}
          onChange={(event) => setPrettyPrint(event.target.checked)}
        />
        Pretty print JSON
      </label>

      <button
        type="button"
        onClick={handleExport}
        style={{
          border: 'none',
          borderRadius: 999,
          background: '#0f766e',
          color: '#ffffff',
          padding: '12px 18px',
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(15,118,110,0.20)',
        }}
      >
        Download JSON Export
      </button>

      {status && (
        <span style={{ fontSize: 12, color: '#0f766e' }}>
          {status}
        </span>
      )}
    </div>
  );
}
