"use client";
import { PostItem, PostType, UserData } from "@/_assets/types";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { MenuContext, useContextMenu } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";
import { supabase } from "../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import {
  IoChatboxEllipsesOutline,
  IoPersonOutline,
  IoTrashBinOutline,
} from "react-icons/io5";

const Post = ({ post }: { post: PostType }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data;
  const router = useRouter();
  const { createContext } = useContextMenu();

  const contextMenu = useContext<any>(MenuContext);
  const user: any = useContext(userContext);

  const contextButtons = [
    {
      name: "View Post",
      visible: true,
      function: () => {
        router.push(`/connect/social/post/${post.id}`);
      },
      icon: <IoChatboxEllipsesOutline />,
    },
    {
      name: "User Profile",
      visible: true,
      function: () => {
        router.push(`/connect/profile/${post.userid}`);
      },
      icon: <IoPersonOutline />,
    },
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

        contextMenu.toast("Deleted Post!", "success");
      },
      icon: <IoTrashBinOutline />,
    },
  ];

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      exit={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-22 -z-0 w-full rounded-3xl bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7] p-5 shadow-sm duration-500 hover:scale-[1.01] dark:from-zinc-700 dark:to-slate-600"
      onContextMenu={(e) => {
        createContext(e, contextButtons);
      }}
    >
      <Link href={`/connect/social/post/${post.id}`}>
        <section className="flex flex-row justify-between">
          <h1 className="font-bold text-slate-700 dark:text-white">
            {post.title}
          </h1>
          <h1 className="font-geist text-slate-700 dark:text-white">
            {post.creator.realname}
          </h1>
        </section>
        <h2 className="text-slate-500 dark:text-slate-100/80">
          {data[0].text}
        </h2>
      </Link>
    </motion.ul>
  );
};

export default Post;
