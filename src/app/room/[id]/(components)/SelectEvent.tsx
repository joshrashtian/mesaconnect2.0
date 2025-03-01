"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { EventType } from "@/_assets/types";
import { updateRoom } from "./RoomFunction";
import { useRoomContext } from "../../RoomContext";

const SelectEvent = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<EventType[] | null>(null);
  const { data } = useRoomContext();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("creator", user?.id || "");

      if (error) {
        console.error(error);
      } else {
        //@ts-ignore
        setEvents(events);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex h-96 w-[600px] flex-col gap-2 font-eudoxus">
      <h1 className="text-2xl font-bold">Select Event</h1>
      {events?.map((event) => (
        <button
          onClick={async () => {
            const { data: updateData, error } = await updateRoom(data?.id, {
              event_connection: event.id,
            });

            if (error) {
              console.error(error);
            } else {
              console.log(updateData);
            }
          }}
          className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2"
          key={event.id}
        >
          <h2>{event.name}</h2>
        </button>
      ))}
    </div>
  );
};

export default SelectEvent;
