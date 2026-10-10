'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import { makeGist, INITIAL_COUNT, type RecentGist } from '@/lib/gist-mock-data';
import GistRow from '@/components/GistRow';

export default function LiveGistCounter() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [gists, setGists] = useState<RecentGist[]>([]);
  const [flash, setFlash] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const displayCount = useCountAnimation(count);

  /** Fire 1–5 gists at a random interval (12 s – 60 s). */
  const scheduleNext = useCallback(() => {
    // 12 000 ms = 5/min, 60 000 ms = 1/min
    const delay = Math.floor(Math.random() * (60_000 - 12_000) + 12_000);

    const id = setTimeout(() => {
      const batch = Math.floor(Math.random() * 5) + 1;
      const newGists = Array.from({ length: batch }, makeGist);

      setCount((c) => c + batch);
      setGists((prev) => {
        const next = [...newGists, ...prev].slice(0, 5);
        return next;
      });

      // Flash the counter
      setFlash(true);
      setTimeout(() => setFlash(false), 600);

      // Pulse the live indicator
      setPulsing(true);
      setTimeout(() => setPulsing(false), 800);

      // Clear isNew flag after animation
      setTimeout(() => {
        setGists((prev) =>
          prev.map((g) => ({ ...g, isNew: false }))
        );
      }, 700);

      scheduleNext();
    }, delay);

    return id;
  }, []);

  useEffect(() => {
    // Seed with a couple of old gists so the list isn't empty on load
    const seed: RecentGist[] = [
      { ...makeGist(), timestamp: Date.now() - 43_000, isNew: false },
      { ...makeGist(), timestamp: Date.now() - 91_000, isNew: false },
    ];
    setGists(seed);

    const id = scheduleNext();
    return () => clearTimeout(id);
  }, [scheduleNext]);

  return (
    <>
      {/* Keyframe definitions */}
      <style>{`
        @keyframes flashBg {
          0%   { background: rgba(99,102,241,0.25); }
          100% { background: rgba(99,102,241,0.06); }
        }
        @keyframes dotPulse {
          0%   { transform: scale(1);   opacity: 1; }
          50%  { transform: scale(2.2); opacity: 0.6; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes gistSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }
        @keyframes countFlash {
          0%   { color: #6366f1; }
          100% { color: #111827; }
        }
      `}</style>

      <div
        style={{
          maxWidth: 420,
          margin: '0 auto',
          fontFamily: 'inherit',
        }}
      >
        {/* Counter card */}
        <div
          style={{
            borderRadius: 16,
            padding: '28px 32px',
            background: flash ? undefined : 'rgba(99,102,241,0.06)',
            animation: flash ? 'flashBg 0.6s ease forwards' : undefined,
            border: '1px solid rgba(99,102,241,0.18)',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {/* Live indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                animation: pulsing ? 'livePulse 0.8s ease' : 'livePulse 2s ease infinite',
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Live
            </span>
          </div>

          {/* The big number */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1,
              color: flash ? undefined : '#111827',
              animation: flash ? 'countFlash 0.6s ease forwards' : undefined,
              letterSpacing: '-0.03em',
              marginBottom: 6,
            }}
          >
            {displayCount.toLocaleString()}
          </div>

          <div style={{ fontSize: 14, color: '#6b7280' }}>
            total gists created
          </div>
        </div>

        {/* Recent gists list */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#9ca3af',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: 8,
              paddingLeft: 12,
            }}
          >
            Recent activity
          </div>
          <ul style={{ margin: 0, padding: 0 }}>
            {gists.map((g) => (
              <GistRow key={g.id} gist={g} />
            ))}
            {gists.length === 0 && (
              <li
                style={{
                  textAlign: 'center',
                  color: '#d1d5db',
                  fontSize: 13,
                  padding: 16,
                  listStyle: 'none',
                }}
              >
                Waiting for gists…
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
