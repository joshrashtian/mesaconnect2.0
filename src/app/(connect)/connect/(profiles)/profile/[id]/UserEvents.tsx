"use client";

import { EventType } from "@/_assets/types";
import React, { useEffect, useState, memo } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { Event } from "@/_components/socialhub/Event";
import { motion } from "framer-motion";

const UserEvents = memo(({ id }: { id: string }) => {
  const [events, setEvents] = useState<EventType[]>();

  useEffect(() => {
    async function getEvents() {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("creator", id)
        .order("start")
        .range(0, 4)
        .gte("start", new Date(Date.now()).toISOString());

      if (error) {
        console.error("Error fetching user events:", error);
        return;
      }

      setEvents(data as unknown as EventType[]);
    }
    getEvents();
  }, [id]);

  return (
    <motion.section
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {events?.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Event event={event} />
        </motion.div>
      ))}
      {events?.length === 0 && (
        <motion.p
          className="font-eudoxus text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No Upcoming Events To Show.
        </motion.p>
      )}
    </motion.section>
  );
});

UserEvents.displayName = "UserEvents";

export default UserEvents;
