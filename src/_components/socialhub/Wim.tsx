"use client";
import { PostItem, PostType } from "@/_assets/types";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../config/mesa-config";

const Wim = ({ post }: { post: PostType }) => {

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-1/5 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-full bg-gradient-to-tr from-slate-100 to-zinc-200"
    >
        <h1>{post.creator.name}</h1>
        <h1 className="font-light">{post.data.data.text}</h1>
    </motion.ul>
  );
};

export default Wim;
