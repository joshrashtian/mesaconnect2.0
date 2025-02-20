"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useRoomContext } from "../RoomContext";

const Loading = () => {
  const pathname = usePathname();
  const { data } = useRoomContext();

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-end bg-zinc-700 p-24 font-eudoxus">
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white"
      >
        Loading
        {[".", ".", "."].map((dot, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 * index, delay: 0.5 * index }}
          >
            {dot}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white"
      >
        Room ID: {pathname.split("/").pop()}
      </motion.p>
    </div>
  );
};

export default Loading;
