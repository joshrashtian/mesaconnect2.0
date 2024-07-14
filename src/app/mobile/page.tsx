"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import OnboardingImage from "../../_assets/photos/Onboarding1.png";

const MobileOnboarding = () => {
  const ScrollRef = useRef<any>();
  const { scrollY } = useScroll();

  const phoneheight = useTransform(scrollY, [0, 700], [0, -1000]);
  const phoneOpacity = useTransform(scrollY, [0, 700], [1, 0.5]);
  const middleOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const middleHeight = useTransform(scrollY, [300, 500], [0, -100]);

  return (
    <main className="flex flex-col justify-center items-center inline-block p-20">
      <header ref={ScrollRef} className="h-screen flex flex-col  items-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
          className="font-eudoxus font-black  inline-block text-white drop-shadow-xl text-5xl"
        >
          Let's Start <span>Here.</span>
        </motion.h1>
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
        style={{ opacity: middleOpacity, translateY: middleHeight }}
      >
        <h1 className="font-eudoxus font-bold text-white text-5xl drop-shadow-xl ">
          Connect to STEM students on the go.
        </h1>
      </motion.section>
    </main>
  );
};

export default MobileOnboarding;
