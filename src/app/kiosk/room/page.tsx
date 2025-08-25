"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Room, RoomData } from "@/app/room/RoomContext";
import LoadingObject from "@/(mesaui)/LoadingObject";
import { motion } from "framer-motion";
import { EventType } from "@/_assets/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import {
  IoEarth,
  IoLocate,
  IoReturnDownBack,
  IoReturnDownForward,
} from "react-icons/io5";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";

const RoomKioskPage = () => {
  const supabase = createClientComponentClient();

  const params = useSearchParams();
  const roomId = params.get("roomId");
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventType | null>(null);
  const [classdata, setClass] = useState<ClassType | null>(null);
  useEffect(() => {
    const fetchRoom = async () => {
      const room = await supabase
        .from("room")
        .select("*")
        .eq("id", roomId)
        .single();

      if (room.error) {
        console.error(room.error);
        setLoading(false);
        return;
      }

      if (room.data.event_connection) {
        const eventConnection = await supabase
          .from("events")
          .select("*")
          .eq("id", room.data.event_connection)
          .single();

        if (eventConnection.error) {
          console.error(eventConnection.error);
          setLoading(false);
          return;
        }

        //@ts-ignore
        setEvent(eventConnection.data);
      }

      if (room.data.class_connection) {
        const classConnection = await supabase
          .schema("information")
          .from("classes")
          .select("*")
          .eq("id", room.data.class_connection)
          .single();

        if (classConnection.error) {
          console.error(classConnection.error);
          setLoading(false);
          return;
        }

        //@ts-ignore
        setClass(classConnection.data);
      }

      setRoom(room.data);
      setLoading(false);
    };
    fetchRoom();
  }, [roomId]);

  if (loading) {
    return <LoadingObject size={100} color="white" />;
  }

  if (!room && !loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-start justify-end p-12 font-nenue">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          Error: This Room Does Not Exist.
        </motion.h1>
        <p className="text-white">Please check the room ID and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-end p-12 font-nenue">
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-8xl font-bold text-white"
      >
        {room?.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white"
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-5 w-5 rounded-full ${
              room?.expiration_date
                ? new Date(room?.expiration_date) > new Date()
                  ? "bg-green-500"
                  : "bg-red-500"
                : room?.active
                  ? "bg-green-500"
                  : "bg-red-500"
            }`}
          />
          <p className="text-2xl text-white">
            {room?.expiration_date
              ? new Date(room?.expiration_date) > new Date()
                ? "Active"
                : "Inactive"
              : room?.active
                ? "Active"
                : "Inactive"}
          </p>
        </div>
      </motion.p>
      <motion.div>
        <motion.p className="flex flex-row items-center gap-2 text-lg text-white">
          <IoEarth />
          {room?.location}
        </motion.p>
      </motion.div>
      {(event || classdata) && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="flex w-full flex-row items-center justify-start gap-2 text-lg text-white"
        >
          <IoReturnDownForward />
          <p>
            In Relation To {event?.name}
            {classdata && (
              <>
                {event?.name && ", "}
                {`${classdata?.category}-${classdata?.num}`}
              </>
            )}
          </p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 100 }}
        className="flex w-full flex-col items-center justify-center"
      >
        <Link
          href={`/room/${roomId}?kiosk=true`}
          onMouseEnter={() => {
            const audio = new Audio("/ui_button.mp3");
            audio.play();
          }}
          className="group mt-10 flex h-16 w-full flex-row items-center gap-2 rounded-md border-0 border-orange-500 border-opacity-0 bg-zinc-700 p-2 text-lg font-bold text-white hover:border-2 group-hover:border-opacity-100"
        >
          <p className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-300">
            <IoIosArrowForward />
            Join Room
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default RoomKioskPage;
