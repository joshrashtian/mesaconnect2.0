"use client";
import { PostType } from "@/_assets/types";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../config/mesa-config";
import { useRouter } from "next/navigation";
import { userContext } from "@/app/AuthContext";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { months } from "../../../config/calendar";
import { IoIosChatbubbles } from "react-icons/io";

const WimListItem = ({ post }: { post: PostType }) => {
  const router = useRouter();
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

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="p-5 min-h-24 flex flex-col justify-between hover:shadow-lg rounded-sm hover:rounded-xl last:border-b-0 border-b-2 font-eudoxus hover:scale-[1.005] hover:bg-slate-200 duration-300 w-full bg-zinc-50"
      onContextMenu={(e) => {
        contextMenu.rightClick(e, contextButtons);
      }}
    >
      <ul className="flex justify-between">
        <h1 className="font-bold">
          <IoIosChatbubbles /> {post.creator.name}
        </h1>
        <time className="font-bold text-slate-400">
          {new Date(post.created_at).toLocaleDateString()}
        </time>
      </ul>
      <p className="font-light">{post.data.data.text}</p>
    </motion.ul>
  );
};

export default WimListItem;
