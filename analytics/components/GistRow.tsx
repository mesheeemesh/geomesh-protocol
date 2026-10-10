'use client';

import { useElapsed } from '@/hooks/useElapsed';
import { CATEGORY_COLORS, type RecentGist } from '@/lib/gist-mock-data';

interface GistRowProps {
  gist: RecentGist;
}

export default function GistRow({ gist }: GistRowProps) {
  const elapsed = useElapsed(gist.timestamp);
  const color = CATEGORY_COLORS[gist.category] ?? '#9ca3af';

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        marginBottom: 6,
        background: gist.isNew ? 'rgba(99,102,241,0.08)' : 'transparent',
        animation: gist.isNew ? 'gistSlideIn 0.35s ease' : undefined,
        transition: 'background 0.6s ease',
        listStyle: 'none',
      }}
    >
      {/* Colored category dot */}
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          animation: gist.isNew ? 'dotPulse 0.8s ease' : undefined,
        }}
      />

      {/* Category badge */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color,
          minWidth: 56,
        }}
      >
        {gist.category}
      </span>

      {/* Location */}
      <span style={{ fontSize: 13, flex: 1, color: '#374151' }}>
        {gist.location}
      </span>

      {/* Timestamp */}
      <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>
        {elapsed}
      </span>
    </li>
  );
}
