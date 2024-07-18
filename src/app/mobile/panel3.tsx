"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";

const PanelThree = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [1400, 1700], [0, 1]);
  return (
    <motion.section className="h-screen flex justify-center items-center">
      <motion.ul style={{ opacity }}>
        <h1>okay</h1>
      </motion.ul>
    </motion.section>
  );
};

export default PanelThree;
