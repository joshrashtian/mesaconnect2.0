"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../config/mesa-config";
import { Room, RoomData } from "@/app/room/RoomContext";
import LoadingObject from "@/(mesaui)/LoadingObject";
import { motion } from "framer-motion";
import { EventType } from "@/_assets/types";

const RoomKioskPage = () => {
  const params = useSearchParams();
  const roomId = params.get("roomId");
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventType | null>(null);
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
            className={`h-5 w-5 rounded-full ${room?.active ? "bg-green-500" : "bg-red-500"}`}
          />
          <p className="text-2xl text-white">
            {room?.active ? "Active" : "Inactive"}
          </p>
        </div>
      </motion.p>
    </div>
  );
};

export default RoomKioskPage;
