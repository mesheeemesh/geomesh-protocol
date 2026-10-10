'use client';

import { useRef, useState } from 'react';
import { TEMPLATES, METRICS } from '@/lib/social-card-templates';
import { drawCard } from '@/lib/draw-social-card';

export default function SocialCardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [templateId, setTemplateId] = useState('twitter');
  const [metricIdx, setMetricIdx] = useState(0);
  const [rendered, setRendered] = useState(false);

  const template = TEMPLATES.find((t) => t.id === templateId)!;
  const metric   = METRICS[metricIdx];

  function handleGenerate() {
    if (!canvasRef.current) return;
    drawCard(canvasRef.current, template, metric);
    setRendered(true);
  }

  function handleDownload() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `geomesh-protocol-${templateId}-card.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  // Preview scale so the canvas fits the UI
  const previewScale = Math.min(1, 560 / template.width);

  return (
    <div style={{ width: '100%' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 600, color: '#374151' }}>
          Platform template
          <select
            value={templateId}
            onChange={(e) => { setTemplateId(e.target.value); setRendered(false); }}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label} ({t.width}×{t.height})</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 600, color: '#374151' }}>
          Key metric
          <select
            value={metricIdx}
            onChange={(e) => { setMetricIdx(Number(e.target.value)); setRendered(false); }}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
          >
            {METRICS.map((m, i) => (
              <option key={m.label} value={i}>{m.label}</option>
            ))}
          </select>
        </label>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <button
            onClick={handleGenerate}
            style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
          >
            Generate Card
          </button>
          {rendered && (
            <button
              onClick={handleDownload}
              style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
            >
              Download PNG
            </button>
          )}
        </div>
      </div>

      {/* Canvas preview */}
      <div style={{ overflowX: 'auto' }}>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: template.width * previewScale,
            height: template.height * previewScale,
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: rendered ? undefined : '#f1f5f9',
          }}
        />
        {!rendered && (
          <p style={{ marginTop: 8, fontSize: 12, color: '#9ca3af' }}>
            Select a template and metric, then click &quot;Generate Card&quot; to preview.
          </p>
        )}
      </div>
    </div>
  );
}
