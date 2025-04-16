"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PollBuilder from "./PollBuilder";
import PollDashboard from "./PollDashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoClose, IoHome, IoMenu, IoPencil } from "react-icons/io5";

const options = [
  //{ name: "Lesson", type: 0, comp: () => {} },
  { name: "Poll", type: 0, comp: () => <PollBuilder />, icon: <IoPencil /> },
  {
    name: "Edit Polls",
    type: 1,
    comp: () => <PollDashboard />,
    icon: <IoMenu />,
  },
  /*{
    name: "Create Study Set",
    type: 2,
    comp: () => <div>Create Study Set</div>,
    icon: <IoHome />, 
  },*/
];

const Page: FC = () => {
  const [selected, setSelected] = useState<any>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initial = searchParams.get("curr");
  const router = useRouter();

  useEffect(() => {
    if (initial) {
      options.map((e: any) => {
        if (e.name.toLowerCase() === initial.toLowerCase()) {
          setSelected(e);
          return;
        }
      });
    }
  }, [initial, searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <main className="flex flex-col gap-10">
      <ul className="flex flex-row justify-between">
        <h1 className="font-eudoxus text-4xl font-black">Lesson Builder</h1>
        <AnimatePresence>
          {selected && (
            <motion.button
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              onClick={() => {
                setSelected(undefined);
                router.replace("/connect/learning/creator");
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl"
            >
              <IoHome />
            </motion.button>
          )}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        {!selected && (
          <motion.section
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="flex flex-row flex-wrap gap-3 font-eudoxus"
          >
            {options.map((option, index) => {
              return (
                <button
                  onClick={() => {
                    router.replace(
                      pathname + "?" + createQueryString("curr", option.name),
                    );
                  }}
                  key={index}
                  className="hover:bg-zinc-white/20 flex w-96 flex-col gap-2 rounded-3xl bg-white p-10 duration-300 hover:scale-[1.03] active:scale-[0.99]"
                >
                  <ul className="text-xl">{option.icon}</ul>
                  <h2 className="text-2xl">{option.name}</h2>
                </button>
              );
            })}
          </motion.section>
        )}
      </AnimatePresence>
      {selected && (
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          exit={{ y: -10, opacity: 0 }}
          className="flex flex-row gap-3"
        >
          <selected.comp />
        </motion.section>
      )}
    </main>
  );
};

export default Page;
