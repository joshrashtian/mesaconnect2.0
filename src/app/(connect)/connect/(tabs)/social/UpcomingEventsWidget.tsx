"use client";

import React, { useEffect, useState } from "react";
import { EventType } from "@/_assets/types";
import { supabase } from "../../../../../../config/mesa-config";
import Link from "next/link";
import { EventModalContext } from "@/app/EventModal";
import { useContext } from "react";
import { IoCalendarOutline } from "react-icons/io5";

const formatEventDate = (start: string) => {
  const d = new Date(start);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const isTomorrow =
    d.toDateString() === new Date(now.getTime() + 864e5).toDateString();
  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export function UpcomingEventsWidget() {
  const [events, setEvents] = useState<EventType[]>([]);
  const modal = useContext(EventModalContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("events")
        .select()
        .gte("start", new Date().toISOString())
        .limit(3)
        .order("start", { ascending: true });
      setEvents((data as unknown as EventType[]) ?? []);
    };
    fetchData();
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="rounded-2xl bg-zinc-100/80 p-4 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          Upcoming Events
        </h2>
        <Link
          href="/connect/social/events"
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          See all
        </Link>
      </div>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id}>
            <button
              type="button"
              onClick={() => (modal as any)?.createModal?.(event)}
              className="flex w-full gap-3 rounded-xl p-2.5 text-left transition hover:bg-zinc-200/80 dark:hover:bg-zinc-700/50"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {event.name}
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                  {formatEventDate(event.start)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
