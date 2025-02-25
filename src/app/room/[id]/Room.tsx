"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import RoomUsers from "./(components)/users";
import { useRoomContext } from "../RoomContext";
import { useUser } from "../../AuthContext";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IoChevronUp,
  IoChevronDown,
  IoArrowUp,
  IoMoon,
  IoPencilOutline,
} from "react-icons/io5";
const Room = () => {
  const { data } = useRoomContext();
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const user = useUser();
  return (
    <motion.div
      className="relative flex max-h-screen min-h-full w-full flex-col justify-end gap-2 py-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute left-0 top-0 flex h-full w-full flex-row justify-between gap-2">
        <h1 className="left-0 top-0 text-4xl font-bold text-white">
          Room {data.id} {data.room.name}{" "}
          {data.isAdmin ? <IoPencilOutline className="text-zinc-100" /> : null}
        </h1>

        <RoomUsers />
      </div>

      <motion.div className="flex flex-col gap-2">
        <motion.section className="flex flex-col gap-2">
          {data.messages.map(({ payload }: { payload: any }) => (
            <motion.div
              className="flex flex-row gap-0.5 rounded-md bg-zinc-200 p-2"
              key={payload.created_at}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars//${payload.user_id}`}
                />
                <AvatarFallback>{payload.user.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold text-zinc-500">
                  {payload.user}
                </p>
                <p className="text-sm">{payload.message}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="z-10 flex flex-col gap-2"
              key="containerBox"
            >
              <form className="group flex w-full flex-row gap-2 rounded-md bg-zinc-300 p-2">
                <input
                  type="text"
                  value={message}
                  required
                  minLength={5}
                  maxLength={100}
                  placeholder="Message..."
                  className="z-30 w-full rounded-md bg-transparent p-2"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (message.length < 5) return;
                    await supabase.channel(data.id).send({
                      type: "broadcast",
                      event: "message",
                      payload: {
                        type: "text",
                        message,
                        user_id: user?.user?.id,
                        user:
                          user?.user?.user_metadata.real_name ??
                          user?.user?.user_metadata.full_name ??
                          user?.user?.user_metadata.name ??
                          "Guest",
                        room_id: data.id,
                        created_at: new Date().toISOString(),
                      },
                    });
                    setMessage("");
                    setOpen(false);
                  }}
                  className={`z-20 flex h-10 w-10 items-center justify-center rounded-full border-none bg-blue-500 text-lg duration-500 hover:cursor-pointer hover:bg-blue-600 focus:outline-none ${
                    message.length < 5 ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <IoArrowUp className="text-zinc-100 duration-300 group-hover:text-zinc-300" />
                </button>
              </form>
            </motion.div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="absolute bottom-0 flex h-10 w-full items-center justify-center rounded-md duration-500 hover:bg-zinc-600/20"
          >
            {!open ? (
              <IoChevronUp className="h-10 w-10 text-zinc-100" />
            ) : (
              <IoChevronDown className="h-10 w-10 text-zinc-100" />
            )}
          </button>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Room;
