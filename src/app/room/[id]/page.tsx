"use client";
import React from "react";
import Loading from "./Loading";
import { useRoomContext } from "../RoomContext";
import { AnimatePresence } from "framer-motion";
import Room from "./Room";

const RoomPage = ({ params }: { params: { id: string } }) => {
  const { data } = useRoomContext();

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-end bg-zinc-700 p-24 font-eudoxus">
      <AnimatePresence>
        {data.users.length === 0 ? <Loading /> : <Room />}
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;
