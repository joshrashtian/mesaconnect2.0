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
import { IoAdd, IoFlag, IoSettings } from "react-icons/io5";
import { RoomData } from "../room/RoomContext";
import { useToast } from "../(connect)/InfoContext";
import { useDeviceContext } from "./DeviceContext";
import { useModal } from "../(connect)/connect/Modal";
import RoomCreate from "./RoomCreate";
const KioskMenu = () => {
  const { user, signOut } = useUser();
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [rooms, setRooms] = useState<RoomData[] | null>(null);
  const [index, setIndex] = useState(0);

  const { device } = useDeviceContext();
  const toast = useToast();
  const modal = useModal();

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

    const { data: roomData, error: roomError } = await supabase
      .from("room")
      .select("*")
      .eq("creator", user?.id ?? "");

    if (roomError) {
      toast.CreateErrorToast(roomError.message);
    } else {
      setRooms(roomData);
    }

    if (error) {
      toast.CreateErrorToast(error.message);
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
      <ol className="flex w-full flex-row gap-2 text-2xl font-bold">
        <button
          onClick={() => {
            const audio = new Audio("/click2.mp3");
            audio.play();
            setIndex(0);
          }}
          className={`${index === 0 ? "bg-zinc-700 text-white" : "text-zinc-700"} rounded-md px-4 py-1`}
        >
          Events
        </button>
        <button
          onClick={() => {
            const audio = new Audio("/click2.mp3");
            audio.play();
            setIndex(1);
          }}
          className={`${index === 1 ? "bg-zinc-700 text-white" : "text-zinc-700"} rounded-md px-4 py-1`}
        >
          Rooms
        </button>
      </ol>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingObject className="my-7 h-10 w-10" color="white" />
        ) : index === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -100 }}
            className="snap-point no-scrollbar relative flex w-full snap-x snap-always flex-row space-x-3 overflow-y-visible overflow-x-scroll scroll-smooth whitespace-nowrap px-3 py-3"
          >
            {events?.map((event, index) => (
              <motion.div
                className="group flex h-60 min-w-[400px] snap-start rounded-md bg-white shadow-sm ring-2 ring-transparent transition-all duration-300 hover:bg-gray-100 hover:ring-white/40"
                key={event.id}
                initial={{ opacity: 0, y: -200, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -200, scale: 0.9 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  delay: index * 0.1 + 0.4,
                }}
              >
                <Link
                  href={`/kioskhandler/event?eventId=${event.id}`}
                  onMouseEnter={() => {
                    const audio = new Audio("/ui_button.mp3");
                    audio.play();
                    audio.volume = 1;
                  }}
                  onClick={() => {
                    const audio = new Audio("/click2.mp3");
                    audio.play();
                    audio.volume = 1;
                  }}
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

            <Link
              href="/kioskhandler/event_create"
              className="flex h-full w-full gap-2"
              onMouseEnter={() => {
                const audio = new Audio("/ui_button.mp3");
                audio.play();
                audio.volume = 1;
              }}
            >
              <div className="flex h-60 min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                <IoAdd className="h-10 w-10" />
                <p className="text-lg font-bold">Create New Event</p>
              </div>
            </Link>
            <div className="flex h-full w-full flex-col gap-2">
              <Link
                href="/kioskhandler/settings"
                className="flex w-full gap-2"
                onMouseEnter={() => {
                  const audio = new Audio("/ui_button.mp3");
                  audio.play();
                  audio.volume = 1;
                }}
              >
                <div className="flex min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                  <IoSettings className="h-10 w-10" />
                  <p className="text-lg font-bold">Settings</p>
                </div>
              </Link>
              <button
                className="flex h-full w-full gap-2"
                onClick={() => fetchEvents()}
                onMouseEnter={() => {
                  const audio = new Audio("/ui_button.mp3");
                  audio.play();
                  audio.volume = 0.5;
                }}
              >
                <div className="flex min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                  <RefreshCcw className="h-10 w-10" />
                  <p className="text-lg font-bold">Refresh</p>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="snap-point no-scrollbar relative flex w-full snap-x snap-always flex-row space-x-3 overflow-y-visible overflow-x-scroll scroll-smooth whitespace-nowrap px-3 py-3"
          >
            {rooms?.map((room, index) => (
              <motion.div
                className="group flex h-60 min-w-[400px] snap-start rounded-md bg-white shadow-sm ring-2 ring-transparent transition-all duration-300 hover:bg-gray-100 hover:ring-white/40"
                key={room.id}
                initial={{ opacity: 0, y: -200, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -200, scale: 0.9 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  delay: index * 0.1 + 0.4,
                }}
              >
                <Link
                  href={`/kioskhandler/room?roomId=${room?.id}`}
                  onMouseEnter={() => {
                    const audio = new Audio("/ui_button.mp3");
                    audio.play();
                    audio.volume = 1;
                  }}
                  onClick={() => {
                    const audio = new Audio("/click2.mp3");
                    audio.play();
                    audio.volume = 1;
                  }}
                  className="flex h-full w-full flex-col items-start justify-between gap-2"
                >
                  <div
                    className={`relative h-96 w-full rounded-t-md duration-500 group-hover:h-64 ${sampleColors[Math.floor(Math.random() * sampleColors.length)]}`}
                  >
                    <h3 className="p-4 text-7xl font-bold text-gray-100/30">
                      {room?.id}
                    </h3>
                  </div>
                  <div className="flex h-10 w-full flex-col items-start justify-center duration-500 ease-in-out group-hover:h-32">
                    <h1 className="p-2 text-lg font-bold duration-300 group-hover:translate-y-4">
                      {room?.name}
                    </h1>
                    <p className="p-2 text-sm opacity-0 duration-300 group-hover:opacity-100"></p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <button
              onClick={() => {
                const audio = new Audio("/click2.mp3");
                audio.play();
                audio.volume = 1;

                modal.CreateModal(
                  <div className="flex h-full w-[1000px] flex-col items-center justify-center">
                    <RoomCreate />
                  </div>,
                );
              }}
              className="flex h-full w-full gap-2"
              onMouseEnter={() => {
                const audio = new Audio("/ui_button.mp3");
                audio.play();
                audio.volume = 0.5;
              }}
            >
              <div className="flex h-60 min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                <IoFlag className="h-10 w-10" />
                <p className="text-lg font-bold">Create New Room</p>
              </div>
            </button>
            <div className="flex h-full w-full flex-col gap-2">
              <Link
                href="/kioskhandler/settings"
                className="flex w-full gap-2"
                onMouseEnter={() => {
                  const audio = new Audio("/ui_button.mp3");
                  audio.play();
                  audio.volume = 0.5;
                }}
              >
                <div className="flex min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                  <IoSettings className="h-10 w-10" />
                  <p className="text-lg font-bold">Settings</p>
                </div>
              </Link>
              <button
                className="flex h-full w-full gap-2"
                onClick={() => fetchEvents()}
                onMouseEnter={() => {
                  const audio = new Audio("/ui_button.mp3");
                  audio.play();
                  audio.volume = 0.5;
                }}
              >
                <div className="flex min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
                  <RefreshCcw className="h-10 w-10" />
                  <p className="text-lg font-bold">Refresh</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default KioskMenu;
