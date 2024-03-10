"use client";
import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ComingUpEvents from "./UpcomingEvents(events)";
import InterestedEvents from "./interested";
import CurrentEventSegment from "@/_components/socialhub/CurrentEventSegment";
import CreatedEvents from "./CreatedEvents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const EventCarousel = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const initial = params.get("carousel");
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const URL = new URLSearchParams(params.toString());
      URL.set(name, value);

      return URL.toString();
    },
    [params]
  );

  const Carousel = [
    { name: "Up and Coming", component: () => <ComingUpEvents /> },
    { name: "For You", component: () => <InterestedEvents /> },
    { name: "Eventlist", component: () => <CurrentEventSegment /> },
    { name: "Your Events", component: () => <CreatedEvents /> },
  ];

  const [Current, setState] = useState(() =>
    initial ? Carousel[Number(initial)] : Carousel[0]
  );

  return (
    <motion.section className="w-full">
      <motion.ul className="flex flex-row gap-2 mb-5 justify-between">
        {Carousel.map((item, index) => {
          return (
            <>
              <button
                className={`${
                  item.name === Current.name
                    ? "from-teal-600 to-slate-500 text-white"
                    : "from-slate-200 to-zinc-100"
                } p-2 w-full bg-gradient-to-tr rounded-full font-bold hover:scale-105 duration-300`}
                key={index}
                onClick={() => {
                  setState(item);
                  router.push(
                    `${pathname}?${createQueryString(
                      "carousel",
                      index.toString()
                    )}`
                  );
                }}
              >
                <h1 className="duration-100">{item.name}</h1>
              </button>
            </>
          );
        })}
      </motion.ul>
      <motion.main className="overflow-y-scroll p-5">
        <Current.component />
      </motion.main>
    </motion.section>
  );
};

export default EventCarousel;
