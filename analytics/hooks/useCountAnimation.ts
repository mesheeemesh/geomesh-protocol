'use client';

import { useState, useEffect, useRef } from 'react';

/** Animates `display` toward `target` over the given duration using ease-out cubic. */
export function useCountAnimation(target: number, duration = 500): number {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const start = initialized.current ? display : 0;
    initialized.current = true;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}
