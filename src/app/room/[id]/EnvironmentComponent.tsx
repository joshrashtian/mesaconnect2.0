"use client";
import React, { useEffect, useState } from "react";
import { useRoomContext } from "../RoomContext";
import { AnimatePresence, motion } from "framer-motion";
import { IoPause, IoPlay, IoStop } from "react-icons/io5";
const EnvironmentComponent = () => {
  const { environment } = useRoomContext();

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  useEffect(() => {
    if (environment?.audio) {
      const audio = new Audio(environment.audio);
      setAudio(audio);
      setPlaying(true);
    } else {
      audio?.pause();
      setPlaying(false);
      setAudio(null);
    }
  }, [environment]);

  useEffect(() => {
    if (audio) {
      audio.play();
      audio.volume = 0.5;
      audio.loop = true;
    } else {
      setPlaying(false);
      setAudio(null);
    }
  }, [audio]);

  switch (environment?.type) {
    case "color":
      return (
        <motion.div
          className={`absolute left-0 top-0 h-full w-full ${environment.content}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      );
    case "image":
      return (
        <motion.div
          className="absolute left-0 top-0 h-full w-full bg-gradient-radial from-transparent via-zinc-700 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img
            className={`h-full w-full object-cover opacity-50`}
            src={environment.content}
          />
        </motion.div>
      );
    case "environment":
      return (
        <motion.div
          className="absolute left-0 top-0 h-full min-h-screen w-full bg-gradient-radial from-transparent via-zinc-700 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <video
            src={environment.content}
            autoPlay
            className={`h-full w-full object-cover opacity-80`}
            muted
            loop
            playsInline
          />
          <AnimatePresence>
            {audio && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-0 left-0 z-10 flex h-16 w-full flex-row items-center justify-center gap-3"
              >
                {!playing ? (
                  <IoPlay
                    onClick={() => {
                      audio?.play();
                      setPlaying(true);
                    }}
                    className="text-4xl text-white duration-300 hover:text-zinc-300"
                  />
                ) : (
                  <IoPause
                    onClick={() => {
                      audio?.pause();
                      setPlaying(false);
                    }}
                    className="text-4xl text-white duration-300 hover:text-zinc-300"
                  />
                )}
                <IoStop
                  onClick={() => {
                    audio?.pause();
                    setAudio(null);
                    setPlaying(false);
                  }}
                  className="text-4xl text-white duration-300 hover:text-zinc-300"
                />
                <ul className="flex flex-col">
                  <p className="font-nenue font-bold text-white">
                    Ambient Noise
                  </p>
                  <p className="font-nenue text-white">{environment?.name}</p>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
  }
};

export default EnvironmentComponent;
