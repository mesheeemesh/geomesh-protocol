'use client';

import type { GistPoint, LatLng } from '@/lib/geofencing';

export const MOCK_GISTS: GistPoint[] = [
  { id: '1', lat: 37.775, lng: -122.418, text: 'Great coffee here!',       sentiment: 'positive' },
  { id: '2', lat: 37.776, lng: -122.419, text: 'Broken streetlight.',       sentiment: 'negative' },
  { id: '3', lat: 37.774, lng: -122.417, text: 'Farmers market today.',     sentiment: 'neutral'  },
  { id: '4', lat: 37.780, lng: -122.410, text: 'Amazing mural on 5th.',     sentiment: 'positive' },
  { id: '5', lat: 37.770, lng: -122.425, text: 'Road closed ahead.',        sentiment: 'negative' },
  { id: '6', lat: 37.778, lng: -122.415, text: 'New park bench installed.', sentiment: 'neutral'  },
  { id: '7', lat: 37.773, lng: -122.420, text: 'Loud construction noise.',  sentiment: 'negative' },
  { id: '8', lat: 37.777, lng: -122.413, text: 'Free yoga in the park!',    sentiment: 'positive' },
];

export const CANVAS_W = 600;
export const CANVAS_H = 360;
export const LAT_MIN = 37.765;
export const LAT_MAX = 37.785;
export const LNG_MIN = -122.430;
export const LNG_MAX = -122.405;

export const SENTIMENT_COLOR = {
  positive: '#16a34a',
  negative: '#dc2626',
  neutral: '#6b7280',
} as const;

export function toCanvas(p: LatLng): [number, number] {
  const x = ((p.lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * CANVAS_W;
  const y = CANVAS_H - ((p.lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * CANVAS_H;
  return [x, y];
}

export function fromCanvas(x: number, y: number): LatLng {
  return {
    lng: (x / CANVAS_W) * (LNG_MAX - LNG_MIN) + LNG_MIN,
    lat: ((CANVAS_H - y) / CANVAS_H) * (LAT_MAX - LAT_MIN) + LAT_MIN,
  };
}
