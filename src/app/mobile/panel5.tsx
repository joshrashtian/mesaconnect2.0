"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import Image from "next/image";
const PanelFive = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [2500, 3000], [0, 1]);
  return (
    <motion.section className="flex h-[900px] w-full items-center justify-center">
      <motion.ul
        style={{ opacity }}
        className="flex flex-row items-start px-10"
      >
        <h1 className="absolute left-7 w-2/3 text-left font-eudoxus text-xl font-black text-white xl:text-4xl">
          With bucket loads of features at your fingertips, immerse yourself
          with college like you never have before.
        </h1>
        <ol className="mt-20 flex flex-row justify-center">
          <Image
            src={require("@/_assets/photos/Onboarding3.png")}
            alt="Mobile App Mockup"
            width={900}
            height={500}
            style={{
              rotate: "15deg",
            }}
          />
        </ol>
      </motion.ul>
    </motion.section>
  );
};

export default PanelFive;
