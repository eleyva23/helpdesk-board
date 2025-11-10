// src/app/api/tickets/route.js
// src/app/api/tickets/route.js

"use client";

import { useEffect, useMemo, useState } from "react";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SearchBox from "./SearchBox";
import TicketList from "./TicketList";
import MyQueueSummary from "./MyQueueSummary";
import StatusMessage from "./StatusMessage";

const initialFilters = {
  status: "All",
  priority: "All",
};

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState("");
  const [queue, setQueue] = useState({}); // { [ticketId]: true }

  // Fetch tickets on mount
  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        const res = await fetch("/api/tickets");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setTickets(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load tickets.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!tickets.length) return;

    let cancelled = false;
    let timeoutId;

    function scheduleUpdate() {
      const delay = 6000 + Math.random() * 4000; // 6–10 sec
      timeoutId = setTimeout(() => {
        if (cancelled) return;

        setTickets((current) => {
          if (!current.length) return current;

          const index = Math.floor(Math.random() * current.length);
          const ticket = current[index];
          if (!ticket) return current;

          const updated = { ...ticket };

          if (Math.random() < 0.5) {
            // status progression
            const flow = ["Open", "In Progress", "On Hold", "Resolved"];
            const pos = flow.indexOf(ticket.status);
            if (pos >= 0 && pos < flow.length - 1) {
              updated.status = flow[pos + 1];
            }
          } else {
            // possible priority escalation
            const levels = ["Low", "Medium", "High", "Critical"];
            const pos = levels.indexOf(ticket.priority);
            if (pos >= 0 && pos < levels.length - 1 && Math.random() < 0.5) {
              updated.priority = levels[pos + 1];
            }
          }

          updated.updatedAt = new Date().toISOString();

          const clone = [...current];
          clone[index] = updated;
          return clone;
        });

        scheduleUpdate();
      }, delay);
    }

    scheduleUpdate();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [tickets.length]);

  // Handlers
  function handleStatusChange(status) {
    setFilters((prev) => ({ ...prev, status }));
  }

  function handlePriorityChange(priority) {
    setFilters((prev) => ({ ...prev, priority }));
  }

  function handleAddToQueue(ticketId) {
    setQueue((prev) => {
      if (prev[ticketId]) return prev;
      return { ...prev, [ticketId]: true };
    });
  }

  function handleRemoveFromQueue(ticketId) {
    setQueue((prev) => {
      const copy = { ...prev };
      delete copy[ticketId];
      return copy;
    });
  }

  function handleClearQueue() {
    setQueue({});
  }

  // Derived visible tickets
  const visibleTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (filters.status !== "All" && t.status !== filters.status) return false;
      if (filters.priority !== "All" && t.priority !== filters.priority)
        return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !t.title.toLowerCase().includes(q) &&
          !t.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [tickets, filters, search]);

  const isEmpty = !loading && !error && visibleTickets.length === 0;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <StatusFilter value={filters.status} onChange={handleStatusChange} />
        <PriorityFilter
          value={filters.priority}
          onChange={handlePriorityChange}
        />
        <SearchBox value={search} onChange={setSearch} />
      </div>

      <MyQueueSummary
        tickets={tickets}
        queue={queue}
        onRemove={handleRemoveFromQueue}
        onClear={handleClearQueue}
      />

      <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

      <TicketList
        tickets={visibleTickets}
        queue={queue}
        onAddToQueue={handleAddToQueue}
      />
    </section>
  );
}
