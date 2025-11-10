"use client";

import { formatDate } from "../lib/severity";

export default function TicketCard({ ticket, isQueued, onAddToQueue }) {
  return (
    <article className="border border-slate-700 rounded-md p-3 bg-slate-900 flex flex-col gap-1">
      <div className="flex justify-between items-start gap-2">
        <h2 className="font-semibold text-slate-50">{ticket.title}</h2>
        <span className="text-xs px-2 py-1 rounded-full border border-slate-500">
          {ticket.priority}
        </span>
      </div>

      <p className="text-sm text-slate-300">{ticket.description}</p>

      <div className="text-[10px] text-slate-400 flex flex-wrap gap-3">
        <span>Status: {ticket.status}</span>
        <span>Assignee: {ticket.assignee}</span>
        <span>Updated: {formatDate(ticket.updatedAt)}</span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          className="px-3 py-1 text-xs rounded bg-blue-600 text-white disabled:bg-slate-600"
          onClick={() => onAddToQueue(ticket.id)}
          disabled={isQueued}
        >
          {isQueued ? "In My Queue" : "Add to My Queue"}
        </button>
        {isQueued && (
          <span className="text-[10px] text-green-400">
            Already added to your queue.
          </span>
        )}
      </div>
    </article>
  );
}
