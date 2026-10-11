'use client';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

// Activity values [day 0..6][hour 0..23]
const activity: number[][] = DAYS.map((_, d) =>
  HOURS.map((_, h) => {
    const isMorning = h >= 7 && h <= 9;
    const isLunch = h >= 12 && h <= 13;
    const isEvening = h >= 18 && h <= 22;
    const isWeekend = d >= 5;
    const base = isMorning || isLunch || isEvening ? 60 : 10;
    const weekendBoost = isWeekend && isEvening ? 30 : 0;
    return Math.round(base + weekendBoost + Math.random() * 20);
  }),
);

const max = Math.max(...activity.flat());

function colorForValue(value: number): string {
  const intensity = value / max;
  const r = Math.round(99 + (199 - 99) * (1 - intensity));
  const g = Math.round(102 + (210 - 102) * (1 - intensity));
  const b = Math.round(241 + (241 - 241) * (1 - intensity));
  return `rgba(${r}, ${g}, ${b}, ${0.1 + intensity * 0.9})`;
}

export default function PeakHoursHeatmap() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 11, minWidth: 640 }}>
        <thead>
          <tr>
            <th style={{ width: 40 }} />
            {HOURS.map((h) => (
              <th
                key={h}
                style={{
                  padding: '2px 3px',
                  color: '#9ca3af',
                  fontWeight: 400,
                  fontSize: 10,
                  textAlign: 'center',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  height: 48,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, d) => (
            <tr key={day}>
              <td style={{ padding: '2px 6px', color: '#6b7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {day}
              </td>
              {activity[d].map((val, h) => (
                <td
                  key={h}
                  title={`${day} ${HOURS[h]}: ${val} gists`}
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: colorForValue(val),
                    borderRadius: 2,
                    cursor: 'default',
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 11, color: '#9ca3af' }}>
        <span>Low</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
          <span
            key={v}
            style={{
              display: 'inline-block',
              width: 16,
              height: 16,
              borderRadius: 2,
              backgroundColor: colorForValue(Math.round(v * max)),
            }}
          />
        ))}
        <span>High</span>
      </div>
    </div>
  );
}
