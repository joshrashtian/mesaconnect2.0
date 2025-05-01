"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import Image from "next/image";
const PanelFive = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [2500, 3000], [0, 1]);
  return (
    <motion.section className="mt-24 flex h-screen w-full items-center justify-center">
      <motion.ul style={{ opacity }} className="flex flex-col items-center">
        <h1 className="text-center font-eudoxus text-xl font-black text-white xl:text-4xl">
          Track your progress on the go.
        </h1>
        <ol className="mt-5 flex w-full flex-row justify-center overflow-x-hidden">
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

export default PanelFive;
