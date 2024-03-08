import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SocialPreview = () => {
  const scrollRef = useRef<any>();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"],
  });

  const opacity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.section
      ref={scrollRef}
      style={{ opacity: opacity, scale: opacity }}
      className="flex flex-col w-screen h-[80vh] p-16"
    >
      <section className="w-full flex flex-col gap-3">
        <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-l from-teal-600 to-slate-500">
          Express Yourself.
        </h1>
        <p className="font-geist">
          Show off all of you talents, skills and projects within a safe,
          polished and creative environment.
        </p>
        <video
          className="min-w-full outline-none"
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          disablePictureInPicture
        >
          <source src={"ShowcasePolls.webm"} />
          Oops! The video sadly does not work on this browser :(
        </video>
      </section>
      <section className="w-full flex flex-col gap-3">
        <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-l from-teal-600 to-slate-500">
          Teach / Inspire Others.
        </h1>
      </section>
    </motion.section>
  );
};

export default SocialPreview;
