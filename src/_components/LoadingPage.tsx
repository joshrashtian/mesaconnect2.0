"use client";
import React from "react";
import {motion} from "framer-motion";

const LoadingPage = () => {
  return (
    <motion.main className="w-full h-full gap-10 flex flex-col justify-center items-center">
      <motion.div
        animate={{ scaleX: ["0%", "100%"] }}
        exit={{ opacity: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
          duration: 1,
          velocity: 50,
          ease: "backInOut",
        }}
        className="container w-1/3 absolute h-24 origin-left flex justify-center items-center bg-orange-600 rounded-md"
      />
      <h1 className="font-semibold absolute text-2xl text-zinc-100 whitespace-nowrap">
        Loading...
      </h1>
    </motion.main>
  );
};

export default LoadingPage;
