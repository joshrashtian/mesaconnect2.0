"use client";
import React from "react";
import { MotionValue, motion } from "framer-motion";
const Scroller = ({
  scale,
  condition,
}: {
  scale: MotionValue;
  condition?: boolean;
}) => {
  if (!condition) return null;
  return (
    <motion.section
      className="bg-gradient-to-b from-orange-600 to-purple-700 opacity-50 rounded-full w-4 h-full"
      style={{ scaleY: scale }}
    />
  );
};

export default Scroller;
