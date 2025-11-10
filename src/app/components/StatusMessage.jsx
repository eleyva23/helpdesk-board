"use client";

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) {
    return (
      <p className="text-sm text-slate-400" aria-live="polite">
        Loading…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-400" aria-live="assertive">
        Unable to load tickets.
      </p>
    );
  }

  if (isEmpty) {
    return (
      <p className="text-sm text-slate-400" aria-live="polite">
        No tickets match your filters.
      </p>
    );
  }

  return null;
}
