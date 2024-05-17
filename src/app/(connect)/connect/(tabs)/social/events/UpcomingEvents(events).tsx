"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";

import { supabase } from "../../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";

const ComingUpEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>();
  const activeUser: any = useContext(userContext);
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data,
        count: newCount,
        error,
      } = await supabase
        .from("events")
        .select("*", { count: "exact" })
        .gte("start", new Date(Date.now()).toISOString())
        .order("start")
        .range(index, index + 3);

      if (error) {
        console.log(error.message);
        return;
      }

      // @ts-ignore
      setData(data);
      setCount(newCount);
    };
    fetchData();
  }, [index]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Events Coming Up Soon</h1>
      {data?.map((event, index) => {
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.3, delay: 0.2 * index }}
            key={index}
          >
            <Event event={event} />
          </motion.section>
        );
      })}
      <section>
        {count && index >= 4 && (
          <button
            onClick={() => {
              setIndex((prev) => prev - 4);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold duration-300 w-16 py-2 px-4 rounded"
          >
            {"<"}
          </button>
        )}
        {count && index < count - 4 && (
          <button
            onClick={() => {
              setIndex((prev) => prev + 4);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold duration-300 w-16 py-2 px-4 rounded"
          >
            {">"}
          </button>
        )}
      </section>
    </motion.div>
  );
};

export default ComingUpEvents;
