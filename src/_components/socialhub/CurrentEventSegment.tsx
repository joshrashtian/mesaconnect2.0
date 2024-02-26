"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { Event } from "./Event";
import { motion } from "framer-motion";
import { EventType } from "@/_assets/types";
import { userContext } from "@/app/AuthContext";

const CurrentEventSegment: FC = (): JSX.Element | undefined => {
  const [data, setData] = useState<EventType[]>();

  const user = useContext(userContext);

  useEffect(() => {
    const fetchData = async (newData: any[]) => {
      const fetchInfo = newData.map((e) => `${e.event_id}`);

      const { data, error } = await supabase
        .from("events")
        .select()
        .in("id", fetchInfo)
        .range(0, 4)
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
        .select("event_id")
        .eq("user_id", user.user?.id);

      if (error) {
        console.log(error);
        return;
      }

      fetchData(data);

      //setData(data);
    };

    fetchInterests();
  }, [user.user]);

  if (!data) return;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl border-2 gap-5 flex flex-col items-center p-3"
    >
      <h1 className="font-bold">Your Events</h1>
      {data?.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </motion.div>
  );
};

export default CurrentEventSegment;
