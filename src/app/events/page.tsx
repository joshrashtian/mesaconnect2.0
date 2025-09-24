"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EventType } from "@/_assets/types";
import Image from "next/image";
import EventComponentFront from "./(components)/EventComponentFront";
import { IoAdd } from "react-icons/io5";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 font-eudoxus">
      <header className="relative flex h-32 w-full items-center justify-between border-b border-white/20 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-purple-600/10 p-6 backdrop-blur-sm lg:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent">
            MESA
          </h1>
          <span className="-mt-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent">
            Events
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-8 p-6 pt-8 lg:p-12">
        <div className="flex items-center gap-4">
          <h3 className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-3xl font-bold text-transparent">
            Upcoming Events
          </h3>
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-purple-600/20"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events?.map((event: EventOccurrence, index: number) => (
            <EventComponentFront event={event} key={event.id} index={index} />
          ))}
        </div>
      </div>
      <Button className="fixed bottom-12 right-12 h-16 w-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl">
        <IoAdd />
      </Button>
    </main>
  );
};

export default EventsPageStandard;
