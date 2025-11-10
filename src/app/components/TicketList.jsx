"use client";

import TicketCard from "./TicketCard";

export default function TicketList({ tickets, queue, onAddToQueue }) {
  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          isQueued={!!queue[ticket.id]}
          onAddToQueue={onAddToQueue}
        />
      ))}
    </div>
  );
}
