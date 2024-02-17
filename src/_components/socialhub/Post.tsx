"use client";
import { PostItem, PostType } from "@/_assets/types";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const Post = ({ post }: { post: PostType }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data;

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-1/5 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-full bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7]"
    >
      <Link href={`/connect/social/post/${post.id}`}>
        <h1 className="font-bold text-slate-700">{post.title}</h1>
        {data.map((item: PostItem, index: number) => {
          switch (item.type) {
            case "text":
              return (
                <h2 className="text-slate-500" key={index}>
                  {item.text}
                </h2>
              );
            default:
              return null;
          }
        })}
      </Link>
    </motion.ul>
  );
};

export default Post;
