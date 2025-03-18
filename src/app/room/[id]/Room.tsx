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
  IoCloseOutline,
  IoArrowDown,
  IoExpand,
} from "react-icons/io5";
import Menu from "./(components)/Menu";
import Image from "next/image";
const Room = () => {
  const { data, open, setOpen, expanded, setExpanded } = useRoomContext();
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState("");

  const user = useUser();
  return (
    <motion.div
      className="relative flex max-h-screen min-h-full w-full flex-col justify-end gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute left-0 top-0 flex h-full w-full flex-row justify-between gap-2">
        <h1 className="left-0 top-0 text-4xl font-bold text-white">
          Room {data.id} {data?.room?.name}{" "}
          {data.isAdmin ? <IoPencilOutline className="text-zinc-100" /> : null}
        </h1>

        <RoomUsers />
      </div>

      <motion.div className="flex flex-col gap-2">
        <motion.section className="flex flex-col gap-2 pb-10">
          {data.messages.map(({ payload }: { payload: any }) => {
            switch (payload.type) {
              case "text":
                return (
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
                      <AvatarFallback>
                        {payload.user.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-bold text-zinc-500">
                        {payload.user}
                      </p>
                      <p className="text-sm">{payload.message}</p>
                    </div>
                  </motion.div>
                );
              case "image":
                return (
                  <motion.div
                    className="flex flex-row gap-0.5 rounded-md bg-zinc-200 p-2"
                    key={payload.created_at}
                  >
                    <Image
                      src={payload.image}
                      alt={payload.image}
                      width={40}
                      height={40}
                    />
                  </motion.div>
                );
              default:
                return null;
            }
          })}
        </motion.section>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 500 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className={`absolute bottom-0 z-10 flex w-full flex-col gap-2 rounded-3xl bg-white p-4 duration-300 ${
                expanded ? "h-full" : "h-3/4"
              }`}
              key="containerBox"
            >
              <ol className="flex flex-row gap-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex h-10 w-4/5 items-center justify-center rounded-md duration-500 hover:bg-zinc-600/20"
                >
                  <IoChevronDown className="h-10 w-10 text-zinc-800" />
                </button>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex h-10 w-1/5 items-center justify-center rounded-md duration-500 hover:bg-zinc-600/20"
                >
                  <IoExpand className="h-10 w-10 text-zinc-800" />
                </button>
              </ol>
              <Menu />
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
