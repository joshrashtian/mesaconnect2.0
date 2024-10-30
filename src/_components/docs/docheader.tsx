"use client";
import React from "react";
import { motion } from "framer-motion";
const DocsHeader = () => {
  return (
    <header className="fixed left-0 top-0 flex h-16 w-screen flex-row items-center bg-zinc-800 p-3 dark:bg-orange-800/40">
      <motion.h2 className="font-eudoxus text-sm text-slate-300 shadow-black lg:text-xl">
        MESA
        <motion.span className="text text-white drop-shadow-xl">
          Docs
        </motion.span>
        <motion.span className="mx-2 rounded-full bg-red-400 px-2 text-xs text-black dark:bg-black dark:text-white">
          beta
        </motion.span>
      </motion.h2>
    </header>
  );
};

export default DocsHeader;
