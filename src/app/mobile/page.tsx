"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import OnboardingImage from "../../_assets/photos/Onboarding1.png";
import PanelThree from "./panel3";

const MobileOnboarding = () => {
  const ScrollRef = useRef<any>();
  const { scrollY } = useScroll();

  const phoneheight = useTransform(scrollY, [0, 700], [0, -1000]);
  const phoneOpacity = useTransform(scrollY, [0, 700], [1, 0.5]);
  const middleOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const middleHeight = useTransform(
    scrollY,
    [300, 500, 550, 1200],
    [0, -100, -50, 600]
  );

  const springedScale = useSpring(scrollY);
  const barScale = useTransform(springedScale, [500, 1100], [0, 1]);

  return (
    <main className="flex flex-col justify-center items-center p-20">
      <header ref={ScrollRef} className="h-screen flex flex-col  items-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
          className="font-eudoxus font-black  inline-block text-white drop-shadow-xl text-5xl"
        >
          Let's Start <span>Here.</span>
        </motion.h1>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 1.5, type: "spring" }}
          className="font-eudoxus text-white text-3xl"
        >
          <span className="text-orange-500">MESA</span>Mobile.
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          style={{
            translateY: phoneheight,

            scale: phoneOpacity,
          }}
          className="z-20"
        >
          <Image
            src={OnboardingImage}
            alt="iphone screen"
            width={700}
            height={600}
          />
        </motion.ul>
      </header>
      <motion.section
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-screen z-0"
        style={{
          opacity: middleOpacity,
          translateY: middleHeight,
        }}
      >
        <h1 className="font-eudoxus font-bold text-white text-5xl drop-shadow-xl ">
          Connect to STEM students on the go.
        </h1>
        <motion.ul
          className="h-1 mt-10 origin-left w-full drop-shadow-xl rounded-sm shadow-2xl shadow-red-500 bg-white"
          style={{ scaleX: barScale }}
        />
      </motion.section>
      <PanelThree posY={scrollY} />
    </main>
  );
};

export default MobileOnboarding;
