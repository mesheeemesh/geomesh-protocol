'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { analyticsKeys } from '@/lib/analytics-queries';

export default function AnalyticsRefreshBar() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState('Showing cached analytics data when available.');

  async function handleRefresh() {
    setIsRefreshing(true);
    setMessage('Refreshing cached analytics data...');

    await queryClient.invalidateQueries({ queryKey: analyticsKeys.root });

    setIsRefreshing(false);
    setMessage('Data refreshed successfully.');
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: 16,
        marginBottom: 24,
        borderRadius: 12,
        background: '#e0f2fe',
        border: '1px solid #7dd3fc',
      }}
    >
      <div>
        <strong style={{ display: 'block', marginBottom: 4 }}>React Query cache enabled</strong>
        <span style={{ color: '#0f172a', fontSize: 14 }}>{message}</span>
      </div>
      <button
        type="button"
        onClick={handleRefresh}
        disabled={isRefreshing}
        style={{
          border: 0,
          borderRadius: 999,
          padding: '10px 16px',
          background: '#0284c7',
          color: '#fff',
          fontWeight: 600,
          cursor: isRefreshing ? 'wait' : 'pointer',
        }}
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh data'}
      </button>
    </div>
  );
}
