"use client";
import { motion } from "framer-motion";
import {
  IoChevronDown,
  IoArrowUp,
  IoChatbubblesOutline,
  IoMusicalNoteOutline,
  IoMusicalNotesOutline,
} from "react-icons/io5";
import { useRoomContext } from "../../RoomContext";
import { useState } from "react";
import { useUser } from "@/app/AuthContext";
import { supabase } from "../../../../../config/mesa-config";
const Menu = () => {
  const { data } = useRoomContext();
  const [message, setMessage] = useState("");
  const user = useUser();
  const [category, setCategory] = useState("message");
  const [color, setColor] = useState(["text-blue-600", "bg-blue-600/10"]);
  return (
    <>
      <ol className="grid h-24 w-3/5 grid-cols-4 gap-2 self-center">
        <button
          onClick={() => setCategory("message")}
          className={`flex flex-col items-center justify-center rounded-md p-2 text-zinc-500 duration-500 ${
            category === "message" && color[1]
          } }`}
        >
          <IoChatbubblesOutline
            className={`${category === "message" ? color[0] : "text-zinc-500"} text-4xl duration-500`}
          />
          Message
        </button>
        <button
          onClick={() => setCategory("music")}
          className={`flex flex-col items-center justify-center rounded-md p-2 text-zinc-500 duration-500 ${
            category === "music" && color[1]
          }`}
        >
          <IoMusicalNotesOutline
            className={`${category === "music" ? color[0] : "text-zinc-500"} text-4xl duration-500`}
          />
          Music
        </button>
      </ol>
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
          }}
          className={`z-20 flex h-10 w-10 items-center justify-center rounded-full border-none bg-blue-500 text-lg duration-500 hover:cursor-pointer hover:bg-blue-600 focus:outline-none ${
            message.length < 5 ? "opacity-50" : "opacity-100"
          }`}
        >
          <IoArrowUp className="text-zinc-100 duration-300 group-hover:text-zinc-300" />
        </button>
      </form>
    </>
  );
};

export default Menu;
