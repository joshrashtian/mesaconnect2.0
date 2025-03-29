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
import JoinMeeting from "./(kioskui)/joinmeeting";
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
      .eq("creator", user?.id ?? "")
      .gte("expiration_date", new Date(Date.now()).toISOString());

    if (roomError) {
      toast.CreateErrorToast(roomError.message);
    } else {
      //@ts-ignore
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
        <button
          onClick={() => {
            const audio = new Audio("/click2.mp3");
            audio.play();
            setIndex(2);
          }}
          className={`${index === 2 ? "bg-zinc-700 fill-white" : "fill-zinc-700"} rounded-md px-4 py-1`}
        >
          <svg
            id="svg835"
            version="1.1"
            height="20.72337"
            viewBox="0 0 1000 224.72337"
            width="100"
          >
            <metadata id="metadata841"></metadata>
            <defs id="defs839" />

            <path
              id="path833"
              d="m 814.1856,67.388717 c 3.82247,6.59494 5.07303,14.0983 5.48595,22.53368 l 0.5427,11.243253 v 78.62013 l 0.55449,11.25504 c 1.10899,18.38088 14.66459,31.97188 33.18704,33.12806 l 11.19606,0.55449 V 101.16565 l 0.55449,-11.243253 c 0.46011,-8.341 1.69888,-15.98593 5.58033,-22.62806 a 44.902197,44.902197 0 0 1 77.74711,0.14157 c 3.82246,6.59494 5.01403,14.23987 5.47415,22.48649 l 0.55449,11.207863 v 78.65552 l 0.55449,11.25504 c 1.15618,18.47526 14.60561,32.06626 33.18705,33.12806 L 1000,224.72337 V 89.922397 A 89.898775,89.898775 0 0 0 910.13662,0.02362708 89.662821,89.662821 0 0 0 842.71254,30.473587 89.780798,89.780798 0 0 0 775.28845,0.01182708 c -18.66402,0 -35.9831,5.66292002 -50.32915,15.44323992 C 716.20538,5.6865371 696.62113,0.01182708 685.37788,0.01182708 V 224.72337 l 11.24325,-0.55449 c 18.80559,-1.23877 32.39659,-14.46403 33.12805,-33.12806 l 0.60168,-11.25504 v -78.62013 l 0.5545,-11.243253 c 0.47191,-8.48257 1.65168,-15.93874 5.48595,-22.58087 a 45.020174,45.020174 0 0 1 38.89714,-22.39211 44.949388,44.949388 0 0 1 38.89715,22.4393 z M 44.93759,224.18067 l 11.243246,0.5427 H 224.71155 l -0.5545,-11.20785 c -1.52191,-18.47526 -14.6056,-31.97188 -33.13985,-33.17525 l -11.24324,-0.55449 H 78.667327 L 213.4683,44.937617 212.91381,33.741567 C 212.04077,15.077537 198.40259,1.5927271 179.77396,0.56631708 l -11.24325,-0.5073 L 0,0.01182708 0.55449376,11.255077 C 2.0292112,29.553367 15.301668,43.333127 33.682546,44.394927 l 11.255044,0.55449 H 146.04422 L 11.243246,179.79758 11.79774,191.04082 c 1.108987,18.52245 14.475826,31.93648 33.13985,33.12806 z M 641.26613,32.903927 a 112.34987,112.34987 0 0 1 0,158.903753 112.43246,112.43246 0 0 1 -158.93914,0 c -43.8758,-43.8758 -43.8758,-115.027963 0,-158.903753 A 112.29089,112.29089 0 0 1 561.72577,2.7082708e-5 112.37347,112.37347 0 0 1 641.26613,32.915727 Z m -31.7949,31.8185 a 67.447677,67.447677 0 0 1 0,95.349333 67.447677,67.447677 0 0 1 -95.34934,0 67.447677,67.447677 0 0 1 0,-95.349333 67.447677,67.447677 0 0 1 95.34934,0 z M 325.91256,2.7082708e-5 A 112.29089,112.29089 0 0 1 405.31134,32.915727 c 43.88759,43.86399 43.88759,115.027953 0,158.891953 a 112.43246,112.43246 0 0 1 -158.93914,0 c -43.8758,-43.8758 -43.8758,-115.027963 0,-158.903753 A 112.29089,112.29089 0 0 1 325.77098,2.7082708e-5 Z M 373.51643,64.698837 a 67.447677,67.447677 0 0 1 0,95.361123 67.447677,67.447677 0 0 1 -95.34933,0 67.447677,67.447677 0 0 1 0,-95.349333 67.447677,67.447677 0 0 1 95.34933,0 z"
            />
          </svg>
        </button>
      </ol>
      <AnimatePresence>
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
              className="flex h-full gap-2"
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
        ) : index === 1 ? (
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
                  <div className="flex h-full w-[2000px] flex-col items-center justify-center">
                    <RoomCreate />
                  </div>,
                );
              }}
              className="flex h-full gap-2"
              onMouseEnter={() => {
                const audio = new Audio("/ui_button.mp3");
                audio.play();
                audio.volume = 0.5;
              }}
            >
              <div className="flex h-60 w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
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
                <div className="flex w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
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
        ) : index === 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-full w-full snap-x snap-always flex-row items-center gap-2 overflow-y-visible overflow-x-scroll scroll-smooth"
          >
            <div
              className="flex h-60 min-w-[500px] snap-start flex-col items-start justify-between rounded-md bg-white shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40"
              onMouseEnter={() => {
                const audio = new Audio("/ui_button.mp3");
                audio.play();
                audio.volume = 1;
              }}
            >
              <div className="flex h-full w-full flex-col items-end justify-between">
                <div className="relative h-52 w-full">
                  <Image
                    src="https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/seo//zoomimage.png"
                    alt="Zoom"
                    fill
                    className="rounded-t-md object-cover drop-shadow-lg"
                  />
                </div>
                <p className="p-3 text-lg">
                  Zoom Integration{" "}
                  <span className="text-xs text-gray-500">beta</span>
                </p>
              </div>
            </div>
            <JoinMeeting />
            <Link
              href="/kioskhandler/settings"
              className="flex h-60 w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40"
              onMouseEnter={() => {
                const audio = new Audio("/ui_button.mp3");
                audio.play();
                audio.volume = 0.5;
              }}
            >
              <IoSettings className="h-10 w-10" />
              <p className="text-lg font-bold">Settings</p>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default KioskMenu;
