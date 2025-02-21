"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import RoomUsers from "./(components)/users";
import { useRoomContext } from "../RoomContext";
import { useUser } from "../../AuthContext";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Room = () => {
  const { data } = useRoomContext();
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState("");
  const user = useUser();
  return (
    <div className="relative flex max-h-screen min-h-full w-full flex-col justify-end gap-2 py-10">
      <h1 className="absolute left-0 top-0 text-4xl font-bold text-white">
        Room {data.id}
      </h1>
      <div className="absolute right-0 top-0 flex h-full w-fit flex-col gap-2">
        <RoomUsers />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Chat</h2>
        <section className="flex flex-col gap-2">
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
                  src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars//${user.user_id}`}
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
        </section>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={async () => {
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
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
