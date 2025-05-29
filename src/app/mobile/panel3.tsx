"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import Image from "next/image";
const PanelThree = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [1400, 1700], [0, 1]);
  return (
    <motion.section className="mt-24 flex h-screen items-center justify-center p-10">
      <motion.ul style={{ opacity }} className="flex flex-col items-center">
        <h1 className="font-eudoxus text-4xl font-black text-white">
          Track your progress on the go.
        </h1>
        <ol className="flex flex-row justify-center">
          <Image
            src={require("@/_assets/photos/Onboarding2.png")}
            alt="Mobile App Mockup"
            width={700}
            height={500}
            className="rotate-30"
          />
        </ol>
      </motion.ul>
    </motion.section>
  );
};

export default PanelThree;
