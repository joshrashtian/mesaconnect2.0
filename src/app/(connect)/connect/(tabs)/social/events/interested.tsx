"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import { Box } from "@/_assets/types";
import { motion } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";

import Link from "next/link";
import { supabase } from "../../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";

const InterestedEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>();
  const activeUser: any = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeUser.userData) return;

      let query: any = [];

      activeUser.userData.boxlist.map((e: Box) => {
        if (e.type === "skills") {
          query.push(e.skills);
        }
      });

      if (!query[0]) return;
      const finalQuery = query[0]
        .map((e: string) => {
          e.toString().trim();
          return `' ${e} '`;
        })
        .join(" | ");

      const { data, error } = await supabase
        .from("events")
        .select()
        .textSearch("name", finalQuery);

      if (error) {
        console.log(error);
        return;
      }
      setData(data);
    };

    fetchData();
  }, [activeUser]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Events You May Be Interested In</h1>
      {data?.map((event, index) => {
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.3, delay: 0.2 * index }}
          >
            <Event key={index} event={event} />
          </motion.section>
        );
      })}
    </motion.div>
  );
};

export default InterestedEvents;
