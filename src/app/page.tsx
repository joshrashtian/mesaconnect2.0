"use client";

import Benefits from "@/_components/home/benefits";
import Header from "@/_components/home/header";
import MajorsText from "@/_components/home/majorsText";

import { motion, useScroll, useSpring } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useContext, useRef } from "react";
import { supabase } from "../../config/mesa-config";
import { userContext } from "./AuthContext";
import SocialPreview from "@/_components/home/SocialPreview";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry, DirectionalLight } from "three";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const meshRef = useRef();
  const firstRef = useRef(null);
  const mainRef = useRef(null);

  const { scrollYProgress: FirstScroll } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  const scrollBar = useSpring(FirstScroll, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const { scrollYProgress } = useScroll({
    target: firstRef,
    offset: ["0 1.3", "0.5 0.67"],
  });

  const user = useContext(userContext);

  return (
    <motion.main
      className="no-scrollbar flex h-full flex-col items-center gap-y-24"
      ref={mainRef}
    >
      <Header scrollRefrence={firstRef} />
      <motion.nav
        className="w-4 fixed right-2 origin-top top-[10%] h-[80%] rounded-full bg-gradient-to-b from-slate-500 to-slate-600"
        style={{ scaleY: scrollBar }}
      />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen rounded-b-[100px] bg-gradient-to-br from-indigo-500 to-orange-300 h-[105vh] shadow-lg items-center justify-between flex flex-col-reverse 2xl:flex-row gap-10 text-sm"
      >
        <ul className="w-full h-full 2xl:w-3/4 flex flex-col justify-center px-28 gap-10 ">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "just" }}
            className="text-xl cursor-default font-eudoxus text-left font-bold md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white dark:text-white duration-300 ease-in-out"
          >
            The new way to{" "}
            <span className=" bg-gradient-to-br from-red-500 to-orange-600 bg-clip-text text-transparent">
              MESA
            </span>
            , a place to help{" "}
            <span className="hover:text-green-500 duration-500">connect</span>{" "}
            the{" "}
            <span className=" bg-gradient-to-r hover:text-green-500 from-indigo-700 to-blue-500 dark:from-indigo-400 dark:to-pink-500 bg-clip-text hover:scale-105 text-transparent duration-500 ease-in-out">
              next generation.
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "just" }}
            className="text-2xl font-eudoxus text-white dark:text-slate-50"
          >
            A community for the students, by the students.
          </motion.h2>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="w-full flex flex-row mt-6 justify-center gap-4"
          >
            {!user.user ? (
              <>
                <Link
                  href="/sign-in"
                  className=" shadow-lg cursor-pointer rounded-3xl hover:rounded-2xl hover:scale-105 bg-gradient-to-tr from-amber-400 to-orange-600 w-1/4 h-12 lg:h-16 flex justify-center items-center duration-500 transition-all ease-in-out"
                >
                  <h2 className=" text-white text-md lg:text-lg 2xl:text-xl font-eudoxus duration-300">
                    Sign In
                  </h2>
                </Link>
                <Link
                  href={"/sign-up"}
                  className=" shadow-lg cursor-pointer rounded-3xl hover:rounded-2xl hover:scale-105 bg-gradient-to-tl from-slate-400 to-slate-600 w-1/4 h-12 lg:h-16 flex justify-center items-center duration-500 transition-all ease-in-out"
                >
                  <h2 className=" text-white text-md lg:text-lg 2xl:text-xl font-eudoxus duration-300">
                    Jump In For Free
                  </h2>
                </Link>
              </>
            ) : (
              <Link
                href="/connect"
                className=" shadow-lg cursor-pointer rounded-3xl hover:rounded-2xl hover:scale-105 bg-gradient-to-tr from-red-400 to-orange-600 w-2/3 h-12 lg:h-16 flex justify-center items-center duration-500 transition-all ease-in-out"
              >
                <h2 className=" text-white text-md lg:text-lg 2xl:text-xl font-eudoxus duration-300">
                  Enter Connect
                </h2>
              </Link>
            )}
          </motion.section>
        </ul>
      </motion.section>

      <motion.section
        style={{ scale: scrollYProgress, opacity: scrollYProgress }}
        className={`max-w-[90%]  border-b-2 border-slate-300 mt-16 gap-10 text-slate-400  rounded-2xl w-full h-screen items-center justify-center p-10 flex flex-col text-sm`}
        ref={firstRef}
      >
        <section className="w-full gap-12 flex flex-col bg-zinc-50 shadow-md p-10 rounded-3xl">
          <MajorsText />
          <section className="flex flex-row justify-between ">
            <ul className="w-3/5 flex flex-col gap-5 font-eudoxus font-light md:text-lg lg:text-2xl 2xl:text-3xl">
              <h1 className="  ">
                As a community, MESA is here to push and motivate our best
                selves. Leveraging modern technologies, we can help you
                exprience your major and see your ideas come to life.
              </h1>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-500">
                MESA is here to allow students to experiment, socialize, and
                inspire. Connect takes it to the next level by bringing MESA a
                new dimesion of community.
              </h1>
            </ul>
            <Canvas style={{ maxWidth: "40%" }}>
              <directionalLight position={[2, 2, 1]} />
              <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[0.5, 3, 4]} />
                <meshStandardMaterial color={"orange"} />
              </mesh>
            </Canvas>
          </section>
        </section>
        <section className="w-full gap-12 flex flex-row rounded-3xl">
          <section className="w-1/2 gap-12 flex flex-col bg-zinc-50 shadow-md p-10 rounded-3xl">
            <h2 className="text-4xl font-eudoxus text-slate-500 font-semibold">
              A Million Reasons To Join.
            </h2>
            <Benefits />
          </section>
        </section>
      </motion.section>
      <SocialPreview />
    </motion.main>
  );
}
