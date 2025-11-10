"use client";

const STATUS_OPTIONS = ["All", "Open", "In Progress", "On Hold", "Resolved"];

export default function StatusFilter({ value, onChange }) {
  return (
    <label className="text-sm flex items-center gap-1 text-slate-200">
      <span>Status:</span>
      <select
        className="border border-slate-700 bg-slate-900 rounded px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}
