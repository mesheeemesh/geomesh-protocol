'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  deleteAnnotation,
  getAnnotations,
  saveAnnotation,
  updateAnnotation,
  type Annotation,
} from '@/lib/annotations';
import AnnotationMarker from '@/components/ui/AnnotationMarker';
import AnnotationModal from '@/components/ui/AnnotationModal';

interface AnnotatedChartProps {
  chartId: string;
  /** The x-axis labels (used to position markers) */
  labels: string[];
  children: React.ReactNode;
}

/**
 * Wraps a chart with annotation support.
 * Click anywhere on the chart area to add an annotation.
 */
export default function AnnotatedChart({ chartId, labels, children }: AnnotatedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [modal, setModal] = useState<{ editing?: Annotation; clickX?: number } | null>(null);

  const refresh = useCallback(() => setAnnotations(getAnnotations(chartId)), [chartId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleChartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xFraction = (e.clientX - rect.left) / rect.width;
    setModal({ clickX: xFraction });
  };

  const handleSave = (text: string, date: string) => {
    if (modal?.editing) {
      updateAnnotation(modal.editing.id, { text, date });
    } else {
      saveAnnotation({ chartId, date, text });
    }
    refresh();
    setModal(null);
  };

  const handleDelete = (id: string) => {
    deleteAnnotation(id);
    refresh();
  };

  // Map annotation date to x-fraction based on label index
  const getXFraction = (annotation: Annotation): number => {
    const idx = labels.findIndex((l) => l.includes(annotation.date) || annotation.date.includes(l));
    if (idx === -1) return 0.5;
    return idx / Math.max(labels.length - 1, 1);
  };

  // Derive a default date from click position
  const getDefaultDate = (xFraction?: number): string => {
    if (xFraction === undefined || labels.length === 0) return '';
    const idx = Math.round(xFraction * (labels.length - 1));
    return labels[idx] ?? '';
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* Clickable overlay */}
        <div
          ref={containerRef}
          style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'crosshair' }}
          onClick={handleChartClick}
          title="Click to add annotation"
          aria-label="Click to add annotation"
        />

        {/* Annotation markers */}
        {annotations.map((annotation) => (
          <AnnotationMarker
            key={annotation.id}
            annotation={annotation}
            xFraction={getXFraction(annotation)}
            onEdit={(a) => setModal({ editing: a })}
            onDelete={handleDelete}
          />
        ))}

        {children}
      </div>

      {modal && (
        <AnnotationModal
          initial={modal.editing}
          defaultDate={getDefaultDate(modal.clickX)}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
