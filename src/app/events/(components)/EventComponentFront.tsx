"use client";
import React, { useMemo } from "react";
import { EventOccurrence } from "../page";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { IoCalendar, IoTime, IoLocation, IoEarth } from "react-icons/io5";
import { motion } from "framer-motion";
const backdropColors = [
  "bg-gradient-to-tr from-orange-500 to-purple-500",
  "bg-gradient-to-tr from-blue-500 to-purple-500",
  "bg-gradient-to-tr from-red-500 to-orange-500",
  "bg-gradient-to-tr from-purple-500 to-blue-500",
  "bg-gradient-to-tr from-green-500 to-orange-500",
  "bg-gradient-to-tr from-yellow-500 to-purple-500",
  "bg-gradient-to-tr from-pink-500 to-orange-500",
  "bg-gradient-to-tr from-purple-500 to-blue-500",
  "bg-gradient-to-tr from-orange-500 to-purple-500",
  "bg-gradient-to-tr from-blue-500 to-purple-500",
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
    <Tilt
      key={event.id}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      className="flex flex-col items-start justify-start rounded-2xl bg-white p-3 shadow-md duration-300 hover:bg-zinc-50/70"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
        className={`relative mb-3 h-32 w-full overflow-hidden rounded-lg ${
          index
            ? backdropColors[index % backdropColors.length]
            : "bg-gradient-to-tr from-orange-500 to-purple-500"
        }`}
      >
        {event.event.image?.url && (
          <Image
            src={event.event.image?.url}
            alt={event.event.name}
            fill
            className="object-cover"
          />
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
        className="text-lg font-bold"
      >
        {event.event.name}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
        className="flex w-full flex-row flex-wrap items-center gap-5"
      >
        <p className="flex flex-row items-center gap-1 text-sm text-zinc-500">
          <IoCalendar />
          {new Date(event.occurrence_time).toLocaleString().split(",")[0]}{" "}
        </p>
        <p className="flex flex-row items-center gap-1 text-sm text-zinc-500">
          <IoTime />
          {new Date(event.occurrence_time)
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .slice(0, 2)
            .join(":")}{" "}
          {new Date(event.occurrence_time).getHours() < 12 ? "AM" : "PM"} -{" "}
          {end.toLocaleString().split(",")[1].split(":")[0]}:
          {end.toLocaleString().split(",")[1].split(":")[1]}
          {new Date(event.occurrence_time).getHours() < 12 ? "AM" : "PM"}
        </p>
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
        className="flex flex-row items-center gap-1 text-sm text-zinc-500"
      >
        <IoEarth />
        {event.event.location}
      </motion.div>
    </Tilt>
  );
};

export default EventComponentFront;
