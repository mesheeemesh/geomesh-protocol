'use client';

import {
  ACTIVITY_LEVELS,
  COUNTRIES,
  GIST_OPS,
  newCondition,
  type Condition,
} from '@/lib/segment-data';

interface ConditionRowProps {
  condition: Condition;
  onChange: (c: Condition) => void;
  onRemove: () => void;
}

export default function ConditionRow({ condition, onChange, onRemove }: ConditionRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
      <select
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        value={condition.field}
        onChange={(e) => onChange({ ...newCondition(), id: condition.id, field: e.target.value as Condition['field'] })}
      >
        <option value="activity">Activity Level</option>
        <option value="signupAfter">Signup After</option>
        <option value="signupBefore">Signup Before</option>
        <option value="country">Country</option>
        <option value="gistCount">Gist Count</option>
        <option value="lastActiveDays">Last Active (days)</option>
      </select>

      {condition.field === 'activity' && (
        <select
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          value={condition.activityLevel}
          onChange={(e) => onChange({ ...condition, activityLevel: e.target.value as typeof ACTIVITY_LEVELS[number] })}
        >
          {ACTIVITY_LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
      )}

      {(condition.field === 'signupAfter' || condition.field === 'signupBefore') && (
        <input
          type="date"
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          value={condition.dateValue ?? ''}
          onChange={(e) => onChange({ ...condition, dateValue: e.target.value })}
        />
      )}

      {condition.field === 'country' && (
        <select
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          value={condition.textValue ?? 'US'}
          onChange={(e) => onChange({ ...condition, textValue: e.target.value })}
        >
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      )}

      {condition.field === 'gistCount' && (
        <>
          <select
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            value={condition.gistOp ?? '>'}
            onChange={(e) => onChange({ ...condition, gistOp: e.target.value as typeof GIST_OPS[number] })}
          >
            {GIST_OPS.map((op) => <option key={op} value={op}>{op}</option>)}
          </select>
          <input
            type="number"
            min={0}
            className="w-20 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            value={condition.numValue ?? 0}
            onChange={(e) => onChange({ ...condition, numValue: Number(e.target.value) })}
          />
        </>
      )}

      {condition.field === 'lastActiveDays' && (
        <input
          type="number"
          min={1}
          className="w-20 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          value={condition.numValue ?? 30}
          onChange={(e) => onChange({ ...condition, numValue: Number(e.target.value) })}
          placeholder="days"
        />
      )}

      <button
        onClick={onRemove}
        className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove condition"
      >
        ✕
      </button>
    </div>
  );
}
