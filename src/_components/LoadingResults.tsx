"use client";
import React from "react";
import { motion } from "framer-motion";
const LoadingResults = ({
  loadingMsg,
  length = 3,
}: {
  loadingMsg: string;
  length?: number;
}) => {
  return (
    <motion.h1
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      key="toptext"
      className="text-4xl dark:text-white text-center p-10 font-eudoxus"
    >
      {loadingMsg}
      {Array.from(Array(length).keys()).map((e, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ y: [10, 0], opacity: [0, 1] }}
          transition={{
            type: "spring",
            delay: 0.2 + i * 0.2,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          .
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default LoadingResults;
