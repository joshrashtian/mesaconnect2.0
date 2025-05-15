"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EventType } from "@/_assets/types";
import Image from "next/image";
import EventComponentFront from "./(components)/EventComponentFront";
export type EventOccurrence = {
  id: string;
  event: EventType;
  occurrence_time: string;
};

const EventsPageStandard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: events, error: eventsError } = await supabase
    .from("event_occurrences")
    .select("*, event:events(*)")
    .gte("occurrence_time", new Date().toISOString())
    .order("occurrence_time", { ascending: true });

  if (eventsError) {
    console.error(eventsError);
  }

  return (
    <main className="flex flex-col gap-5 p-5 font-eudoxus lg:p-20">
      <header className="absolute left-0 top-0 flex h-24 w-full items-center justify-between p-6">
        <h1 className="bg-gradient-to-tr from-orange-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
          MESA
          <span className="bg-gradient-to-tr from-slate-500 to-red-500 bg-clip-text text-5xl font-bold text-transparent">
            Events
          </span>
        </h1>
        <Button>Create Event</Button>
      </header>

      <h3 className="text-2xl font-bold">Today</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event: EventOccurrence, index: number) => (
          <EventComponentFront event={event} key={event.id} index={index} />
        ))}
      </div>
    </main>
  );
};

export default EventsPageStandard;
