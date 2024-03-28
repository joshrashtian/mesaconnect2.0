"use client";
import React, { FC, Ref, useContext, useEffect, useRef, useState } from "react";
import { Box } from "@/_assets/types";
import { motion, useScroll } from "framer-motion";
import { Event } from "@/_components/socialhub/Event";
import { EventType } from "@/_assets/types";

import Link from "next/link";
import { supabase } from "../../../../../../../config/mesa-config";
import { userContext, useUser } from "@/app/AuthContext";
import LoadingPage from "@/_components/LoadingPage";
import Scroller from "./scroller";

const InterestedEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>();
  const [count, setCount] = useState<number | null>();
  const activeUser = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!activeUser.userData?.boxlist) return;

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

      const { data, count, error } = await supabase
        .from("events")
        .select("*", { count: "exact" })
        .textSearch("name", finalQuery)
        .gte("start", new Date(Date.now()).toISOString());

      if (error) {
        console.log(error);
        return;
      }
      setData(data);
      setCount(count);
    };

    fetchData();
  }, [activeUser]);

  const scrollRef: any = useRef();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"],
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl p-2 py-10 gap-2 flex"
      ref={scrollRef}
    >
      <section className="w-full h-full rounded-3xl p-2 no-scrollbar overflow-y-scroll gap-2 flex flex-col">
        {data ? (
          <>
            <h1 className="text-lg font-bold">
              Events You May Be Interested In
            </h1>
            {data?.length !== 0 ? (
              data?.map((event, index) => {
                return (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      delay: 0.2 * index,
                    }}
                  >
                    <Event event={event} />
                  </motion.section>
                );
              })
            ) : (
              <h1 className=" font-mono text-slate-500">
                To get events you may be interested in, add some more skills to
                your profile.
              </h1>
            )}
          </>
        ) : (
          <ul className="h-full">
            <LoadingPage />
          </ul>
        )}
      </section>
      {count && <Scroller condition={count > 5} scale={scrollYProgress} />}
    </motion.div>
  );
};

export default InterestedEvents;
