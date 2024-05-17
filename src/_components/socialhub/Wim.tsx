"use client";
import { PostType } from "@/_assets/types";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../config/mesa-config";
import { useRouter } from "next/navigation";
import { userContext } from "@/app/AuthContext";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { months } from "../../../config/calendar";

const Wim = ({ post }: { post: PostType }) => {
  const user: any = useContext(userContext);
  const contextMenu = useContext<any>(MenuContext);
  const contextButtons = [
    {
      name: "Delete Post",
      visible:
        user?.userData?.id === post.userid || user?.userData?.role === "admin",
      function: async () => {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", post.id);

        if (error) {
          console.error(error);
        }

        console.log("Post deleted successfully");
      },
    },
  ];

  const created_at = new Date(post.created_at);

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-1/5 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-full bg-gradient-to-tr from-blue-100 to-teal-50 border-2 border-slate-200"
      onContextMenu={(e) => {
        contextMenu.rightClick(e, contextButtons);
      }}
    >
      <h1 className="font-semibold">
        Wim from{" "}
        <span className="font-mono">
          {post.creator.name} /{" "}
          {months[created_at.getMonth()] + " " + created_at.getDate()}
        </span>
      </h1>
      <h1 className="font-light">{post.data.data.text}</h1>
    </motion.ul>
  );
};

export default Wim;
