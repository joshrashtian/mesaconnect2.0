"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";

const PanelThree = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [1400, 1700], [0, 1]);
  return (
    <motion.section className="h-screen flex justify-center items-center">
      <motion.ul
        style={{ opacity }}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="font-eudoxus text-4xl font-black text-white">
          Arriving in 2024.
        </h1>
        <p className="font-eudoxus text-slate-200">for iOS / Android.</p>
      </motion.ul>
    </motion.section>
  );
};

export default PanelThree;
