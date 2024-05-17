"use client";
import React, { FC, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";
import { supabase } from "../../../../../config/mesa-config";
import Link from "next/link";

const UpcomingEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("events")
        .select()
        .gte("start", new Date(Date.now()).toISOString())
        .limit(5)
        .order("start");

      if (error) {
        console.log(error);
        return;
      }

      //@ts-ignore
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Current Events This Week</h1>
      <Link
        href={`/connect/social/events`}
        className="flex flex-col w-full h-12 p-5 bg-gradient-to-r to-blue-600 from-indigo-600 rounded-2xl hover:scale-[1.02] duration-500 drop-shadow-xl hover:shadow-lg justify-center items-center"
      >
        <h1 className="text-white">View All Events</h1>
      </Link>
      {data?.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </motion.div>
  );
};

export default UpcomingEvents;
