"use client";

import React from "react";
import { motion } from "framer-motion";

function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default Template;
