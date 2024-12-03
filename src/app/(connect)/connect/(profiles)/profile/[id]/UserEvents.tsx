"use client";

import { EventType } from "@/_assets/types";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { Event } from "@/_components/socialhub/Event";

const UserEvents = ({ id }: { id: string }) => {
  const [events, setEvents] = useState<EventType[]>();

  useEffect(() => {
    async function getEvents() {
      let { data, error } = await supabase
        .from("events")
        .select()
        .eq("creator", id)
        .order("start")
        .range(0, 4)
        .gte("start", new Date(Date.now()).toISOString());

      if (error) {
        console.error(error);
        return;
      }
      //@ts-ignore
      setEvents(data);
    }
    getEvents();
  }, []);

  return (
    <section className="flex flex-col gap-2">
      {events?.map((event, i) => <Event event={event} key={event.id} />)}
      {events?.length === 0 && (
        <p className="font-eudoxus text-slate-400">
          No Upcoming Events To Show.
        </p>
      )}
    </section>
  );
};

export default UserEvents;
