"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../../config/mesa-config";
import { EventOccurrence } from "@/app/events/page";
import { EventType } from "@/_assets/types";
const EventKioskPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [event, setEvent] = useState<EventType | null>(null);
  const [times, setTimes] = useState<EventOccurrence[]>([]);
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .from("events")
        .select("*")
        .eq("id", eventId!)
        .single();

      const { data: occurences, error: occurencesError } = await supabase
        //@ts-ignore
        .from("event_occurrences")
        .select("*")
        .eq("event_id", eventId!)
        .order("occurrence_time", { ascending: true });

      if (error) {
        console.error(error);
      }

      //@ts-ignore
      setEvent(data as EventType);
      //@ts-ignore
      setTimes(occurences as EventOccurrence[]);
    };
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return (
    <div className="flex h-full w-full flex-col items-end justify-end gap-5 p-10">
      <h1 className="text-4xl font-bold text-white">{event?.name}</h1>
      <p className="text-white">{event?.desc}</p>
      <p className="text-white">{new Date(event?.start!).toLocaleString()}</p>
      <div className="flex flex-col items-end justify-end">
        {times.map((time) => (
          <div key={time.id}>
            {new Date(time.occurrence_time).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventKioskPage;
