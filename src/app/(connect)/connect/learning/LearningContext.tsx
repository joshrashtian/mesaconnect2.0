"use client";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { motion } from "framer-motion";
import { PollType } from "./_components/PollCard";

export type LearningContextType = {
  PollModal: (e: PollType) => void;
};

export const LearningContext = createContext<LearningContextType>({
  PollModal: (e) => <div>Error</div>,
});

const LearningContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modal, setModal] = useState<any>();
  const value = {
    PollModal: (e: PollType) =>
      setModal(<PollModal data={e} disarm={() => disarmModal()} />),
  };

  const disarmModal = () => {
    setModal(undefined);
  };
  return (
    <LearningContext.Provider value={value}>
      {children}{" "}
      <AnimatePresence>
        {modal && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 flex justify-center items-center overflow-y-auto"
          >
            <AnimatePresence>
              <motion.section
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="bg-white shadow-lg flex flex-col justify-between w-3/4 h-3/4 p-5 px-10 z-50 rounded-3xl"
              >
                {modal}
              </motion.section>
            </AnimatePresence>
            <ul
              onClick={() => {
                disarmModal();
              }}
              className="absolute inset-0 bg-gray-500 opacity-50 "
            />
          </motion.main>
        )}
      </AnimatePresence>
    </LearningContext.Provider>
  );
};

export default LearningContextProvider;

const PollModal = ({
  data,
  disarm,
}: {
  data: PollType;
  disarm: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [context, setContext] = useState<string>();
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    setSelected(undefined);
    if (data.context) {
      setContext(
        `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/questionContexts/${data.id}.${data.contextType}`
      );
      setLoaded(true);
    } else setLoaded(true);
  }, []);

  return (
    <main
      className={`p-12  flex flex-col ${
        context ? "justify-between" : "justify-center"
      } h-full`}
    >
      <section
        onClick={(e) => {
          e.preventDefault();
        }}
        className={`${context ? "h-1/2" : "h-24"} flex flex-col gap-2`}
      >
        <h2 className="font-semibold text-3xl text-slate-700">
          {data.correct ? "QUESTION" : "POLL"}
        </h2>
        <h1 className="font-bold text-5xl">{data.question}</h1>
        {context && (
          <img
            src={context}
            onClick={() => {}}
            className="w-full h-full mt-4 object-contain"
          />
        )}
      </section>
      <section className="flex flex-row gap-1 flex-wrap">
        {data.options.map((option: string, index: number) => (
          <button
            className={`w-[49%] p-5 rounded-2xl ${
              selected !== undefined && selected === index && data.correct
                ? index === data.correct
                  ? "bg-green-500 text-white animate-bounce"
                  : "bg-red-500 text-white"
                : selected === index
                ? "bg-orange-200"
                : "bg-slate-100"
            } duration-300`}
            key={index}
            onClick={() => {
              setSelected(index);
            }}
          >
            <h1 className="font-mono">{option}</h1>
          </button>
        ))}
      </section>
    </main>
  );
};
