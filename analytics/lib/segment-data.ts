'use client';

export type ActivityLevel = 'Low' | 'Medium' | 'High';
export type GistOp = '>' | '<' | '=';

export interface Condition {
  id: string;
  field: 'activity' | 'signupAfter' | 'signupBefore' | 'country' | 'gistCount' | 'lastActiveDays';
  activityLevel?: ActivityLevel;
  dateValue?: string;
  textValue?: string;
  numValue?: number;
  gistOp?: GistOp;
}

export interface Segment {
  id: string;
  name: string;
  conditions: Condition[];
  logic: 'AND' | 'OR';
}

export type MockUser = {
  id: number;
  activity: ActivityLevel;
  signupDate: string;
  country: string;
  gistCount: number;
  lastActiveDays: number;
};

export const MOCK_USERS: MockUser[] = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  activity: (['Low', 'Medium', 'High'] as ActivityLevel[])[i % 3],
  signupDate: new Date(2024, (i * 3) % 12, (i % 28) + 1).toISOString().slice(0, 10),
  country: ['US', 'UK', 'DE', 'FR', 'CA', 'AU'][i % 6],
  gistCount: (i * 7) % 50,
  lastActiveDays: (i * 3) % 60,
}));

export function matchUser(user: MockUser, condition: Condition): boolean {
  switch (condition.field) {
    case 'activity':      return user.activity === condition.activityLevel;
    case 'signupAfter':   return condition.dateValue ? user.signupDate >= condition.dateValue : true;
    case 'signupBefore':  return condition.dateValue ? user.signupDate <= condition.dateValue : true;
    case 'country':       return condition.textValue ? user.country === condition.textValue : true;
    case 'gistCount': {
      const n = condition.numValue ?? 0;
      if (condition.gistOp === '>') return user.gistCount > n;
      if (condition.gistOp === '<') return user.gistCount < n;
      return user.gistCount === n;
    }
    case 'lastActiveDays': return condition.numValue !== undefined ? user.lastActiveDays <= condition.numValue : true;
    default: return true;
  }
}

export function estimateSize(conditions: Condition[], logic: 'AND' | 'OR'): number {
  if (conditions.length === 0) return MOCK_USERS.length;
  return MOCK_USERS.filter((u) =>
    logic === 'AND'
      ? conditions.every((c) => matchUser(u, c))
      : conditions.some((c) => matchUser(u, c)),
  ).length;
}

export function exportSegmentCsv(segment: Segment): void {
  const matched = MOCK_USERS.filter((u) =>
    segment.logic === 'AND'
      ? segment.conditions.every((c) => matchUser(u, c))
      : segment.conditions.some((c) => matchUser(u, c)),
  );
  const header = 'id,activity,signupDate,country,gistCount,lastActiveDays';
  const rows = matched.map((u) =>
    [u.id, u.activity, u.signupDate, u.country, u.gistCount, u.lastActiveDays].join(','),
  );
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${segment.name.replace(/\s+/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function newCondition(): Condition {
  return { id: Math.random().toString(36).slice(2), field: 'activity', activityLevel: 'High' };
}

export const COUNTRIES = ['US', 'UK', 'DE', 'FR', 'CA', 'AU'] as const;
export const ACTIVITY_LEVELS: ActivityLevel[] = ['Low', 'Medium', 'High'];
export const GIST_OPS: GistOp[] = ['>', '<', '='];
