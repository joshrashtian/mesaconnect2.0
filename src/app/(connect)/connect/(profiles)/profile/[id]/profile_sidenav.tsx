"use client";
import React from "react";
import { IoNavigateCircle } from "react-icons/io5";
import { motion } from "framer-motion";
const SideNavProfile = ({ maps }: { maps: Map<string, () => void> }) => {
  return (
    <motion.ol
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      className="fixed right-3 top-1/2 origin-right scale-0 rounded-2xl bg-zinc-50/60 p-4 font-eudoxus font-light shadow-lg backdrop-blur-xl duration-100 hover:ring-2 hover:ring-orange-400 lg:scale-100 dark:bg-orange-950/40"
    >
      {Array.from(maps).map((value) => (
        <button
          className="flex flex-row items-center gap-1 duration-200 hover:scale-105"
          onClick={value[1]}
          key={value[0]}
        >
          <IoNavigateCircle className="text-orange-400 dark:text-orange-200" />

          <p className="capitalize hover:text-orange-400 dark:text-white dark:hover:text-orange-400">
            {value[0]}
          </p>
        </button>
      ))}
    </motion.ol>
  );
};

export default SideNavProfile;
