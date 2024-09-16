"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const JoinNow = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      JoinNow
    </motion.main>
  );
});

JoinNow.displayName = "JoinNow";

export default JoinNow;
