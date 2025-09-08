"use client";
import React from "react";
import Loading from "./Loading";
import { useRoomContext } from "../RoomContext";
import { AnimatePresence } from "framer-motion";
import Room from "./Room";
import { IoWarningOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import HeaderMenu from "../../kiosk/header";
const RoomPage = ({ params }: { params: { id: string } }) => {
  const { data } = useRoomContext();
  const searchParams = useSearchParams();

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-end bg-zinc-700 p-24 font-eudoxus">
      <AnimatePresence>
        {!data.room ? (
          data.error ? (
            <div className="flex h-screen w-screen flex-col items-start justify-end">
              <h1 className="flex flex-row items-center gap-2 text-6xl text-red-500">
                <IoWarningOutline className="text-6xl text-red-500" /> Error
              </h1>
              <h2 className="text-2xl font-bold text-white">
                {data.error.message}
              </h2>
            </div>
          ) : (
            <Loading />
          )
        ) : data.error ? (
          <div className="flex h-screen w-screen flex-col items-start justify-end">
            <h1 className="flex flex-row items-center gap-2 text-6xl text-red-500">
              <IoWarningOutline className="text-6xl text-red-500" /> Error
            </h1>
            <h2 className="text-2xl font-bold text-white">{data.error}</h2>
          </div>
        ) : (
          <Room />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;
