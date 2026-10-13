'use client';

import { useState, useEffect } from 'react';

/** Returns a human-readable elapsed string, updates every second. */
export function useElapsed(timestamp: number): string {
  const [, tick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.floor((Date.now() - timestamp) / 1000);
  if (elapsed < 5) return 'Just now';
  if (elapsed < 60) return `${elapsed}s ago`;
  return `${Math.floor(elapsed / 60)}m ago`;
}
