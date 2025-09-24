"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EventType } from "@/_assets/types";
import Image from "next/image";
import EventComponentFront from "./(components)/EventComponentFront";
import CalendarView from "./(components)/CalendarView";
import EventsPageClient from "./(components)/EventsPageClient";
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

  return <EventsPageClient events={events || []} />;
};

export default EventsPageStandard;
