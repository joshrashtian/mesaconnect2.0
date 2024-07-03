"use client";
import React, { FC, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";
import { supabase } from "../../../../../config/mesa-config";
import Link from "next/link";
import { IoCalendar, IoPencil } from "react-icons/io5";

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
      className="w-full h-full flex-col items-center flex gap-1"
    >
      <h1 className="text-lg font-bold dark:text-white">
        Current Events This Week
      </h1>
      <Link
        href={`/connect/social/events`}
        className="flex flex-col hover:ring-2 hover:ring-offset-1 hover:ring-opacity-70 ring-0 ring-offset-0 ring-purple-700/45 justify-end text-white text-xl w-full h-24 p-5 bg-gradient-to-tl from-teal-600 to-indigo-600 rounded-2xl hover:scale-[1.03] duration-500 drop-shadow-xl hover:shadow-2xl "
      >
        <IoCalendar className="text-3xl" />
        <h1 className="">Community Home</h1>
      </Link>
      <section className="flex flex-row w-full mr-10 justify-end items-center">
        <Link
          href="/connect/builder?type=event"
          className="h-12 p-5 hover:ring-2 hover:ring-offset-1 hover:ring-opacity-70 ring-0 ring-offset-0 ring-teal-400/45 gap-2 shadow-md text-white cursor-pointer hover:scale-[1.02] flex flex-row justify-center items-center duration-500 rounded-b-xl hover:rounded-md w-3/5 bg-gradient-to-br from-teal-600 to-blue-800/50"
        >
          <IoPencil size={22} />
          <h1>Event Builder</h1>
        </Link>
      </section>
      {data?.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </motion.div>
  );
};

export default UpcomingEvents;
