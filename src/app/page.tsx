"use client";

import Benefits from "@/_components/home/benefits";
import Header from "@/_components/home/header";
import MajorsText from "@/_components/home/majorsText";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useContext, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { userContext } from "./AuthContext";
import SocialPreview from "@/_components/home/SocialPreview";
import { IoArrowForward, IoGlobe, IoPerson } from "react-icons/io5";
import { Canvas } from "@react-three/fiber";
import { Center, PresentationControls, useGLTF } from "@react-three/drei";
import JoinNow from "@/_components/home/JoinNow";
import OpenSource from "@/_components/home/OpenSource";
import { Outfit } from "next/font/google";
import ClassShowcase from "@/_components/home/ClassShowcase";
import MobilePreview from "@/_components/home/mobilepreview";
import Unify from "@/_components/home/Unify";

const font = Outfit({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const firstRef = useRef(null);
  const mainRef = useRef(null);
  const openSourceRef = useRef(null);
  const joinNowRef = useRef(null);
  const majorsRef = useRef(null);
  const { scrollYProgress: FirstScroll } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });
  useSpring(FirstScroll, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });
  const { scrollYProgress } = useScroll({
    target: firstRef,
    offset: ["0 1.3", "0.5 0.67"],
  });

  function Room(props: any) {
    const { scene } = useGLTF("/mesaconnect.glb");

    scene.rotation.y = Math.PI / -1.6;
    return <primitive object={scene} {...props} />;
  }

  const { scrollYProgress: joinScroll } = useScroll({
    target: joinNowRef,
    offset: ["start start", "end end"],
  });
  const JoinNowScroll = useSpring(joinScroll, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const { scrollYProgress: openSourceScroll } = useScroll({
    target: openSourceRef,
    offset: ["start end", "end start"],
  });

  const user = useContext(userContext);

  return (
    <motion.main className="no-scrollbar" ref={mainRef}>
      <Header />
      <motion.div className="fixed bottom-12 left-0 z-50 flex h-24 w-full flex-row items-center justify-center">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="absolute z-50 mt-6 flex w-64 flex-wrap justify-center gap-2 font-eudoxus md:flex-row md:flex-nowrap"
        >
          {!user.user ? (
            <Link
              href="/sign-in"
              className="text-md group flex h-12 w-64 cursor-pointer items-center justify-between gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 text-white shadow-lg ring-blue-400 ring-offset-transparent transition-all duration-500 ease-in-out hover:rounded-2xl hover:bg-blue-700/60 hover:ring-2 lg:h-16 lg:w-full lg:text-lg 2xl:text-xl"
            >
              <div className="flex flex-row items-center justify-center">
                <IoPerson className="text-2xl" />
                <IoPerson className="-translate-x-6 translate-y-0 text-2xl opacity-50 duration-500 group-hover:-translate-x-7 group-hover:translate-y-1" />
              </div>
              <h2 className="text-xl duration-300">Sign In</h2>
            </Link>
          ) : (
            <Link
              href="/connect"
              className="text-md ring-offset-3 group flex h-10 w-32 cursor-pointer items-center justify-between gap-3 rounded-3xl bg-[#297373] px-8 text-white shadow-2xl ring-orange-400 ring-offset-transparent drop-shadow-lg transition-all duration-500 ease-in-out hover:rounded-2xl hover:bg-[#2D9191] lg:h-12 lg:w-52"
            >
              <h2 className="text-md duration-300">Enter Connect</h2>

              <IoArrowForward className="duration-300 ease-in-out group-hover:translate-x-4" />
            </Link>
          )}
        </motion.section>
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-[100vh] w-screen flex-col items-center justify-between bg-[#39393A] text-sm shadow-2xl shadow-slate-500/30"
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center sm:gap-6 sm:px-10 md:gap-2 md:px-16">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "just" }}
            className={`cursor-default text-left font-nenue font-medium text-[#E6E6E6] drop-shadow-lg duration-300 ease-in-out dark:text-white sm:text-xl md:text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl`}
          >
            It&apos;s Time To Connect Together In A{" "}
            <span className="bg-gradient-to-br from-purple-600 to-blue-400 bg-clip-text text-transparent duration-500 hover:text-black/20">
              New World.
            </span>{" "}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "just" }}
            className="flex flex-row items-center justify-center gap-2 font-nenue text-2xl text-[#E6E6E6] dark:text-slate-50"
          >
            <IoGlobe className="text-2xl" />A community and platform for the
            students, by the students.
          </motion.h2>
          {/*<Canvas className="absolute z-40 min-h-[50vh] w-screen scale-75 md:min-h-[35vh] lg:min-h-[70vh] lg:scale-100">
            <PresentationControls
              config={{ mass: 2, tension: 100, friction: 10 }}
              snap={{ mass: 2, tension: 100, friction: 10 }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 5, 10]} intensity={0.8} />
              <Center position={[0, 0.3, -6]} rotation={[0, 0.4, 0]}>
                <Room />
              </Center>
            </PresentationControls>
          </Canvas>*/}
          {/*
          <button
            onClick={() =>
              // @ts-ignore
              majorsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-2 text-white shadow-lg ring-blue-400 ring-offset-transparent transition-all duration-500 ease-in-out hover:rounded-2xl hover:bg-blue-700/60 hover:ring-2"
          >
            Learn More
          </button>
          */}
          <p className="text-sm text-white/60">
            models by goldenspino, sellpet. all rights belong to them.
          </p>
        </ul>
      </motion.section>

      <motion.section
        style={{ scale: scrollYProgress, opacity: scrollYProgress }}
        className={`mt-16 flex h-screen w-full flex-col items-center justify-center gap-10 rounded-2xl border-slate-300 p-5 text-sm text-slate-400 lg:p-10`}
        ref={firstRef}
      >
        <section className="flex w-full flex-col gap-12 rounded-3xl bg-white p-5 shadow-md dark:bg-zinc-700/30 lg:p-10">
          <MajorsText />
          <section ref={majorsRef} className="flex flex-row justify-between">
            <ul className="flex w-full flex-col gap-5 font-eudoxus font-light md:text-lg lg:w-3/5 lg:text-2xl 2xl:text-3xl">
              <h1 className="text-center lg:text-left">
                As a community, MESA is here to push and motivate our best
                selves. Leveraging modern technologies, we can help you
                exprience your major and see your ideas come to life.
              </h1>
              <h1 className="bg-gradient-to-br from-slate-400 to-slate-500 bg-clip-text text-transparent">
                MESA is here to allow students to experiment, socialize, and
                inspire. Connect takes it to the next level by bringing MESA a
                new dimesion of community.
              </h1>
            </ul>
          </section>
        </section>
        <section className="flex w-full flex-row gap-12 rounded-3xl">
          <section className="flex w-full flex-col gap-12 rounded-3xl bg-zinc-50 p-5 shadow-md dark:bg-zinc-700/30 lg:p-10">
            <h2 className="font-eudoxus text-4xl font-semibold text-slate-500 dark:text-slate-100/80">
              A Million Reasons To Join.
            </h2>
            <Benefits />
          </section>
        </section>
      </motion.section>
      <SocialPreview />
      <ClassShowcase />
      <OpenSource />
      <MobilePreview />
      {/* TODO: Add the study room preview */}
      {/* <StudyRoomPreview /> */}
      <Unify />
      <JoinNow ref={joinNowRef} scrolledValue={JoinNowScroll} />
    </motion.main>
  );
}
