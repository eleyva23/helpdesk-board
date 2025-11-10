"use client";

export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search title or description..."
      className="border border-slate-700 bg-slate-900 rounded px-2 py-1 text-sm text-slate-100 min-w-[220px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
