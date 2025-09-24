"use client";
import React, { useMemo } from "react";
import { EventOccurrence } from "../page";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { IoCalendar, IoTime, IoLocation, IoEarth } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
const backdropColors = [
  "bg-gradient-to-tr from-violet-600 via-purple-600 to-blue-600",
  "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600",
  "bg-gradient-to-bl from-rose-500 via-pink-600 to-fuchsia-600",
  "bg-gradient-to-tl from-amber-500 via-orange-600 to-red-600",
  "bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-600",
  "bg-gradient-to-br from-lime-500 via-green-600 to-emerald-600",
  "bg-gradient-to-bl from-sky-500 via-blue-600 to-indigo-600",
  "bg-gradient-to-tl from-yellow-500 via-amber-600 to-orange-600",
  "bg-gradient-to-tr from-pink-500 via-rose-600 to-red-600",
  "bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600",
  "bg-gradient-to-bl from-purple-500 via-violet-600 to-indigo-600",
  "bg-gradient-to-tl from-green-500 via-emerald-600 to-teal-600",
];

const EventComponentFront = ({
  event,
  index,
}: {
  event: EventOccurrence;
  index: number;
}) => {
  const duration: number[] = useMemo(
    () => event.event.duration.split(":").map((num: string) => parseInt(num)),
    [event.event.duration],
  );

  let end = useMemo(() => {
    const end = new Date(event.occurrence_time);
    end.setMinutes(end.getMinutes() + duration[1]);
    end.setHours(end.getHours() + duration[0]);
    return end;
  }, [event.occurrence_time, duration]);

  return (
    <Link href={`/events/${event.event.id}`}>
      <Tilt
        key={event.id}
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        className="group flex flex-col items-start justify-start rounded-2xl border border-white/20 bg-gradient-to-br from-white via-slate-50 to-zinc-100/80 p-4 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white hover:via-blue-50/30 hover:to-purple-50/30 hover:shadow-2xl hover:shadow-black/10"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
          className={`relative mb-4 h-36 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-xl ${
            backdropColors[index % backdropColors.length]
          } before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-black/20 before:via-transparent before:to-transparent`}
        >
          {event.event.image?.url && (
            <Image
              src={event.event.image?.url}
              alt={event.event.name}
              fill
              className="z-0 object-cover transition-all duration-500 group-hover:scale-110"
            />
          )}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
          className="mb-3 text-xl font-bold leading-tight text-slate-800 transition-colors duration-300 group-hover:text-slate-900"
        >
          {event.event.name}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
          className="mb-3 flex w-full flex-col gap-2"
        >
          <div className="flex flex-row items-center gap-2 rounded-lg bg-slate-100/60 px-3 py-2 text-sm text-slate-600 transition-colors duration-300 group-hover:bg-slate-100/80">
            <IoCalendar className="text-blue-600" />
            <span className="font-medium">
              {new Date(event.occurrence_time).toLocaleString().split(",")[0]}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2 rounded-lg bg-slate-100/60 px-3 py-2 text-sm text-slate-600 transition-colors duration-300 group-hover:bg-slate-100/80">
            <IoTime className="text-emerald-600" />
            <span className="font-medium">
              {new Date(event.occurrence_time)
                .toLocaleString()
                .split(",")[1]
                .split(":")
                .slice(0, 2)
                .join(":")}{" "}
              {new Date(event.occurrence_time).getHours() < 12 ? "AM" : "PM"} -{" "}
              {end.toLocaleString().split(",")[1].split(":")[0]}:
              {end.toLocaleString().split(",")[1].split(":")[1]}{" "}
              {end.getHours() < 12 ? "AM" : "PM"}
            </span>
          </div>
        </motion.div>
        {/*
      <p className="text-sm text-zinc-500">
        {duration[0]
          ? `${duration[0]} hour${duration[0] > 1 ? "s" : ""}`
          : null}
        {duration[0] && duration[1] ? " and " : null}
        {duration[1]
          ? `${duration[1]} minute${duration[1] > 1 ? "s" : ""}`
          : null}
      </p>
      */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index + 0.7 }}
          className="flex w-fit flex-row items-center gap-2 rounded-lg bg-slate-100/60 px-3 py-2 text-sm text-slate-600 transition-colors duration-300 group-hover:bg-slate-100/80"
        >
          <IoEarth className="text-purple-600" />
          <span className="font-medium">{event.event.location}</span>
        </motion.div>
      </Tilt>
    </Link>
  );
};

export default EventComponentFront;
