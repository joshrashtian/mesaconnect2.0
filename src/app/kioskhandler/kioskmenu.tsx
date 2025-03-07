"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useUser } from "../AuthContext";
import LoadingObject from "@/(mesaui)/LoadingObject";
import { AnimatePresence, motion } from "framer-motion";
import { EventType } from "@/_assets/types";
import { supabase } from "../../../config/mesa-config";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { IoAdd } from "react-icons/io5";

const KioskMenu = () => {
  const { user, signOut } = useUser();
  const [events, setEvents] = useState<EventType[] | null>(null);

  const sampleColors = [
    "bg-gradient-to-tr from-blue-500 to-purple-500",
    "bg-gradient-to-tr from-red-500 to-orange-500",
    "bg-gradient-to-tr from-green-500 to-lime-500",
    "bg-gradient-to-tr from-yellow-500 to-amber-500",
    "bg-gradient-to-tr from-pink-500 to-rose-500",
    "bg-gradient-to-tr from-indigo-500 to-purple-500",
    "bg-gradient-to-tr from-cyan-500 to-blue-500",
    "bg-gradient-to-tr from-fuchsia-500 to-purple-500",
    "bg-gradient-to-tr from-violet-500 to-purple-500",
    "bg-gradient-to-tr from-teal-500 to-cyan-500",
    "bg-gradient-to-tr from-orange-500 to-red-500",
    "bg-gradient-to-tr from-purple-500 to-indigo-500",
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("creator", user?.id ?? "");
    if (error) {
      console.log(error);
    } else {
      //@ts-ignore
      setEvents(data);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full min-w-full max-w-full flex-col items-center justify-center gap-4"
    >
      <AnimatePresence>
        {loading ? (
          <LoadingObject className="my-7 h-10 w-10" color="white" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="snap-point no-scrollbar relative flex w-full snap-x snap-always flex-row gap-2 space-x-3 overflow-y-visible overflow-x-scroll scroll-smooth whitespace-nowrap px-3 py-3"
          >
            {events?.map((event, index) => (
              <motion.div
                className="group flex h-60 min-w-[400px] snap-start rounded-md bg-white shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40"
                key={event.id}
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  delay: index * 0.1 + 0.4,
                }}
              >
                <Link
                  href={`/kioskhandler/event/${event.id}`}
                  className="flex h-full w-full flex-col items-start justify-between gap-2"
                >
                  <div
                    className={`relative h-96 w-full rounded-t-md duration-500 group-hover:h-64 ${!event.image && "backdrop-blur-md"} ${sampleColors[Math.floor(Math.random() * sampleColors.length)]}`}
                  >
                    {event.image && (
                      <Image
                        src={event.image.url}
                        alt={event.name}
                        fill
                        className={`rounded-t-md object-cover`}
                      />
                    )}
                  </div>
                  <div className="flex h-10 w-full flex-col items-start justify-center duration-500 ease-in-out group-hover:h-32">
                    <h1 className="translate-y-4 p-2 text-lg font-bold duration-300 group-hover:translate-y-4">
                      {event.name}
                    </h1>
                    <p className="p-2 text-sm opacity-0 duration-300 group-hover:opacity-100">
                      {new Date(event.start).toLocaleString()} /{" "}
                      {event.start < new Date(Date.now())
                        ? "Started"
                        : event.endtime < new Date(Date.now()) || !event.endtime
                          ? "Has Ended"
                          : "Ends in " +
                            Math.floor(
                              (new Date(event.endtime).getTime() -
                                new Date().getTime()) /
                                1000 /
                                60,
                            )}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
            <button
              className="flex h-full w-full gap-2"
              onClick={() => fetchEvents()}
            >
              <div className="flex h-60 min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                <RefreshCcw className="h-10 w-10" />
                <p className="text-lg font-bold">Refresh</p>
              </div>
            </button>
            <Link
              href="/kioskhandler/event_create"
              className="flex h-full w-full gap-2"
            >
              <div className="flex h-60 min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                <IoAdd className="h-10 w-10" />
                <p className="text-lg font-bold">Create New Event</p>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default KioskMenu;
