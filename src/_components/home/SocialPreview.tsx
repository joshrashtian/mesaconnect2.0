"use client"
import React, {useRef} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {IoChatbox, IoPrism} from "react-icons/io5";
import {AiFillBook} from "react-icons/ai";

const SocialPreview = () => {
  const scrollRef = useRef<any>();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"],
  });

  const opacity = useSpring(scrollYProgress, {
    stiffness: 100,
  });

  const position = useTransform(opacity, [0, 1], [30, 0]);

  const ExpressYourself = [
    {
      name: "Recieve feedback, test your collagues, or study for your next big test.",
      icon: <IoChatbox />
    },
    {
      name: "Showcase your projects and skills.",
      icon: < AiFillBook />
    },
    {
      name: "Customize your portfolio to your heart's content.",
      icon: < IoPrism />
    },
  ];
  return (
    <motion.section
      ref={scrollRef}
      style={{ opacity: opacity, y: position }}
      className="flex flex-col font-eudoxus w-screen h-[80vh] p-16"
    >
      <section className="w-full flex flex-row items-center justify-between gap-3">
        <ul>
          <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-l from-teal-600 to-slate-500">
            Express Yourself.
          </h1>
          <p className="text-lg">
            Show off all of you talents, skills and projects within a safe,
            polished and creative environment.
          </p>
          {ExpressYourself.map((e, index) => (
            <motion.li
                whileHover={{ rotateZ: 1, scale: 1.05}}
              key={index}
              className={`bg-zinc-200 hover:scale-[1.02] items-center gap-4 cursor-pointer hover:ring-offset-2 hover:ring-2 ring-teal-400 duration-500 my-2 flex flex-row p-5 rounded-2xl`}
            >
              <ul className="text-teal-600 rounded-full text-2xl">
                {e.icon}
              </ul>

              <p>{e.name}</p>
            </motion.li>
          ))}
        </ul>
        <video
          className="w-[50%] h-full outline-none"
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
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
