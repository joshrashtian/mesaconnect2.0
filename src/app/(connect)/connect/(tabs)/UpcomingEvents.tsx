"use client";
import React, { FC, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";
import { supabase } from "../../../../../config/mesa-config";

const UpcomingEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("events").select();

      if (error) {
        console.log(error);
        return;
      }

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
      {data?.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </motion.div>
  );
};

export default UpcomingEvents;
