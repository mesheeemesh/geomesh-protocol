import type { SearchResultType } from '@/lib/search';

interface TypeIconProps {
  type: SearchResultType;
}

const TYPE_COLORS: Record<SearchResultType, string> = {
  page: '#6366f1',
  metric: '#0ea5e9',
  location: '#22c55e',
  category: '#f59e0b',
};

export default function TypeIcon({ type }: TypeIconProps) {
  const color = TYPE_COLORS[type];
  const size = 28;

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: `${color}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {type === 'page' && (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </>
        )}
        {type === 'metric' && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
        {type === 'location' && (
          <>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </>
        )}
        {type === 'category' && (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </>
        )}
      </svg>
    </span>
  );
}
