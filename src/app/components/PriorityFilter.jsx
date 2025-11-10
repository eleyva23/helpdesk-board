"use client";

const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High", "Critical"];

export default function PriorityFilter({ value, onChange }) {
  return (
    <label className="text-sm flex items-center gap-1 text-slate-200">
      <span>Priority:</span>
      <select
        className="border border-slate-700 bg-slate-900 rounded px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </label>
  );
}
