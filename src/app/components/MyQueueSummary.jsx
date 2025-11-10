"use client";

export default function MyQueueSummary({
  tickets,
  queue,
  onRemove,
  onClear,
}) {
  const queuedIds = Object.keys(queue);

  if (!queuedIds.length) {
    return (
      <div className="text-xs text-slate-400">
        My Queue: <span className="italic">No tickets selected.</span>
      </div>
    );
  }

  const queuedTickets = tickets.filter((t) => queue[t.id]);

  return (
    <div className="border border-slate-700 bg-slate-900 rounded-md p-2 text-xs space-y-1">
      <div className="flex justify-between items-center">
        <span>
          My Queue: <strong>{queuedIds.length}</strong>{" "}
          {queuedIds.length === 1 ? "ticket" : "tickets"}
        </span>
        <button
          className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px]"
          onClick={onClear}
        >
          Clear Queue
        </button>
      </div>

      <ul className="space-y-1">
        {queuedTickets.map((t) => (
          <li key={t.id} className="flex justify-between gap-2">
            <span className="truncate">{t.title}</span>
            <button
              className="text-[10px] text-red-400 underline"
              onClick={() => onRemove(t.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


