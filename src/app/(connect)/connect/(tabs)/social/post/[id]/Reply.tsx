"use client"
import React, { useContext } from "react";
import { ReplyType } from "./Replies";
import { months } from "../../../../../../../../config/calendar";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { supabase } from "../../../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import { motion } from "framer-motion";

const Reply = ({ contents }: { contents: ReplyType }) => {
  const time = new Date(contents.created_at);
  const context = useContext<any>(MenuContext);
  const user = useContext(userContext);

  const contextButtons = [
    {
      name: "Delete Reply",
      visible:
        user?.userData?.id === contents.user_id ||
        user?.userData?.role === "admin",
      function: async () => {
        const { error } = await supabase
          .from("replies")
          .delete()
          .eq("id", contents.id);

        if (error) {
          console.error(error);
          return;
        }

        context.toast("Deleted Post!", "success");
      },
    },
  ];

  return (
    <motion.main
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -10, opacity: 0}}
      className="flex flex-row shadow-xl rounded-2xl"
      onContextMenu={(e) => context.rightClick(e, contextButtons)}
    >
      <ul
        className={`w-1 p-1 min-h-full ${
          contents.private ? "bg-teal-600 dark:bg-teal-500" : "bg-orange-600 dark:bg-orange-400"
        }  rounded-l-2xl`}
      />
      <ul className="p-3 bg-white dark:bg-zinc-900/50 w-full h-full rounded-r-2xl">
        <section className="flex flex-row justify-between dark:text-white">
          <h1 className="font-bold">{contents.creator.realname}</h1>
          <h2>
            {months[time.getMonth()]} {time.getDate()}, {time.getFullYear()} /{" "}
            {time.getHours()}:{time.getMinutes()}
          </h2>
        </section>
        <p className="text-slate-500 dark:text-slate-200">{contents.reply}</p>
      </ul>
    </motion.main>
  );
};

export default Reply;
