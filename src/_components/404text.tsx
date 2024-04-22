"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Text404 = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <motion.h1
        drag={clicked}
        dragConstraints={{ top: -300, bottom: 100, right: 300 }}
        onClick={() => setClicked(true)}
        whileDrag={{ scale: 1.05, color: "#f00" }}
        className={`text-red-800 text-4xl ${
          clicked
            ? "cursor-pointer tracking-[-.150em] text-6xl "
            : "cursor-text "
        }`}
      >
        404
      </motion.h1>
    </>
  );
};

export default Text404;
