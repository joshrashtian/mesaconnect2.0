"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import OnboardingImage from "../../_assets/photos/Onboarding1.png";
import PanelThree from "./panel3";
import PanelTwo from "./PanelTwo";
import PanelFour from "./panel4";
import PanelFive from "./panel5";
const MobileOnboarding = () => {
  const ScrollRef = useRef<any>();
  const { scrollY } = useScroll();

  const phoneheight = useTransform(scrollY, [0, 700], [0, -1000]);
  const phoneOpacity = useTransform(scrollY, [0, 700], [1, 0.5]);
  const middleOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const middleHeight = useTransform(
    scrollY,
    [300, 500, 550, 1200],
    [0, -100, -50, 600],
  );

  const springedScale = useSpring(scrollY);
  const barScale = useTransform(springedScale, [500, 1100], [0, 1]);

  return (
    <main className="flex flex-col items-center justify-center py-32">
      <header ref={ScrollRef} className="flex h-screen flex-col items-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
          className="inline-block text-center font-eudoxus text-5xl font-black text-white drop-shadow-xl"
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's Start <span>Here.</span>
        </motion.h1>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 1.5, type: "spring" }}
          className="text-center font-eudoxus text-3xl text-white"
        >
          <span className="text-orange-500">MESA</span>Mobile. Spring 2025.
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
        className="z-0 h-screen"
        style={{
          opacity: middleOpacity,
          translateY: middleHeight,
        }}
      >
        <h1 className="font-eudoxus text-2xl font-bold text-white drop-shadow-xl lg:text-5xl">
          Connect to STEM students on the go.
        </h1>
        <motion.ul
          className="mt-10 h-1 w-full origin-left rounded-sm bg-white shadow-2xl shadow-red-500 drop-shadow-xl"
          style={{ scaleX: barScale }}
        />
        <PanelTwo posY={scrollY} />
      </motion.section>
      <PanelThree posY={scrollY} />
      <PanelFour posY={scrollY} />
      <PanelFive posY={scrollY} />
    </main>
  );
};

export default MobileOnboarding;
