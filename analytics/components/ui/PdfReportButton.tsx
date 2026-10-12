'use client';

import { useState } from 'react';
import { generatePdfReport } from '@/lib/report';

interface PdfReportButtonProps {
  dateRange: string;
}

export default function PdfReportButton({ dateRange }: PdfReportButtonProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-report-section="true"]'),
    ).map((element) => ({
      element,
      title: element.dataset.reportTitle ?? 'Dashboard section',
    }));

    if (sections.length === 0) {
      setError('No dashboard sections were found for this report.');
      return;
    }

    setError(null);
    setProgress(0);

    try {
      await generatePdfReport(sections, dateRange, (value) => setProgress(value));
      setProgress(100);
      window.setTimeout(() => setProgress(null), 900);
    } catch (err) {
      setProgress(null);
      setError(err instanceof Error ? err.message : 'Unable to generate report');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      <button
        onClick={handleDownload}
        disabled={progress !== null}
        style={{
          border: 'none',
          borderRadius: 999,
          background: progress !== null ? '#c7d2fe' : '#312e81',
          color: '#ffffff',
          padding: '12px 18px',
          fontSize: 14,
          fontWeight: 700,
          cursor: progress !== null ? 'wait' : 'pointer',
          boxShadow: '0 12px 30px rgba(49,46,129,0.22)',
        }}
      >
        {progress !== null ? `Generating ${progress}%` : 'Download PDF Report'}
      </button>

      {progress !== null && (
        <span style={{ fontSize: 12, color: '#475569' }}>
          Preparing pages and capturing dashboard sections.
        </span>
      )}

      {error && (
        <span style={{ fontSize: 12, color: '#b91c1c' }}>
          {error}
        </span>
      )}
    </div>
  );
}
