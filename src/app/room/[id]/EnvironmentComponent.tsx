"use client";
import React from "react";
import { useRoomContext } from "../RoomContext";
import { motion } from "framer-motion";
const EnvironmentComponent = () => {
  const { environment } = useRoomContext();

  switch (environment?.type) {
    case "color":
      return (
        <motion.div
          className={`absolute left-0 top-0 h-full w-full ${environment.content}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      );
    case "image":
      return (
        <motion.div
          className="absolute left-0 top-0 h-full w-full bg-gradient-radial from-transparent via-zinc-700 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img
            className={`h-full w-full object-cover opacity-50`}
            src={environment.content}
          />
        </motion.div>
      );
    case "environment":
      return (
        <motion.div
          className="absolute left-0 top-0 h-full min-h-screen w-full bg-gradient-radial from-transparent via-zinc-700 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <video
            src={environment.content}
            autoPlay
            className={`h-full w-full object-cover opacity-80`}
            muted
            loop
            playsInline
          />
        </motion.div>
      );
  }
};

export default EnvironmentComponent;
