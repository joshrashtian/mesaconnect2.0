"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { Event } from "./Event";
import { motion } from "framer-motion";
import { EventType } from "@/_assets/types";
import { userContext } from "@/app/AuthContext";
import { useRouter } from "next/navigation";

const CurrentEventSegment: FC = (): JSX.Element | undefined => {
  const [events, setData] = useState<EventType[]>([]);
  const [eventMeta, setEventMeta] = useState<any>();
  const user = useContext(userContext);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (newData: any[]) => {
      const fetchInfo = newData.map((e) => `${e.event_id}`);

      const { data, error } = await supabase
        .from("events")
        .select()
        .in("id", fetchInfo)
        .range(0, 4)
        .gte("start", new Date(Date.now()).toISOString())
        .order("start");

      if (error) {
        console.log(error);
        return;
      }

      setData(data);
    };

    const fetchInterests = async () => {
      if (!user.user) return;
      const { data, error } = await supabase
        .from("eventinterest")
        .select("event_id, id")
        .eq("user_id", user.user?.id);

      if (error) {
        console.log(error);
        return;
      }

      setEventMeta(data);
      fetchData(data);

      //setData(data);
    };

    fetchInterests();
  }, [user.user]);

  useEffect(() => {
    const channel = supabase
      .channel("events channel")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "eventinterest",
        },
        (payload) => {
          location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (!events) return;

  const fetchEvents = () => {
    return events;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl gap-5 flex flex-col p-3"
    >
      <h1 className="font-bold">Your Events</h1>
      {events.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </motion.div>
  );
};

export default CurrentEventSegment;
