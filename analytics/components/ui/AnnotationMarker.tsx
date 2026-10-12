'use client';

import { useState } from 'react';
import type { Annotation } from '@/lib/annotations';

interface AnnotationMarkerProps {
  annotation: Annotation;
  /** 0–1 position along the chart width */
  xFraction: number;
  onEdit: (annotation: Annotation) => void;
  onDelete: (id: string) => void;
}

export default function AnnotationMarker({ annotation, xFraction, onEdit, onDelete }: AnnotationMarkerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${xFraction * 100}%`,
        top: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 2,
          background: '#6366f1',
          opacity: 0.7,
        }}
      />

      {/* Dot + tooltip trigger */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: -7,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#6366f1',
          border: '2px solid #ffffff',
          boxShadow: '0 2px 6px rgba(99,102,241,0.4)',
          cursor: 'pointer',
          pointerEvents: 'all',
          zIndex: 11,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1e293b',
              color: '#f8fafc',
              borderRadius: 10,
              padding: '8px 12px',
              fontSize: 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              zIndex: 20,
              minWidth: 160,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{annotation.date}</div>
            <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{annotation.text}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => onEdit(annotation)}
                style={{
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: 6,
                  color: '#fff',
                  padding: '3px 8px',
                  fontSize: 11,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(annotation.id)}
                style={{
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: 6,
                  color: '#fff',
                  padding: '3px 8px',
                  fontSize: 11,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
