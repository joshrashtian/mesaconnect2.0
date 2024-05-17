"use client";
import React, {FC, useCallback, useEffect, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import PollBuilder from "./PollBuilder";
import PollDashboard from "./PollDashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  //{ name: "Lesson", type: 0, comp: () => {} },
  { name: "Poll", type: 0, comp: () => <PollBuilder /> },
  { name: "Edit Polls", type: 1, comp: () => <PollDashboard /> },
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
    [searchParams]
  );

  return (
    <main className="flex flex-col gap-10">
      <ul className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold">Lesson Builder</h1>
        <button
          onClick={() => {
            setSelected(undefined);
            router.replace("/connect/learning/creator");
          }}
        >
          <h2>x</h2>
        </button>
      </ul>
      <AnimatePresence>
        {!selected && (
          <motion.section
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="flex flex-row flex-wrap font-eudoxus justify-center gap-3"
          >
            {options.map((option, index) => {
              switch (option.type) {
                case 0:
                  return (
                    <button
                      onClick={() => {
                        router.replace(
                          pathname +
                            "?" +
                            createQueryString("curr", option.name)
                        );
                      }}
                      key={index}
                      className="w-[32.84%] h-36  border-2 border-slate-500 border-dashed text-slate-800 font-bold rounded-3xl"
                    >
                      <h2 className=" text-2xl">{option.name}</h2>
                    </button>
                  );
                case 1:
                  return (
                    <button
                      onClick={() => {
                        router.replace(
                          pathname +
                            "?" +
                            createQueryString("curr", option.name)
                        );
                      }}
                      key={index}
                      className="w-1/2 h-24  border-2 border-slate-500 text-slate-800 font-bold rounded-3xl"
                    >
                      <h2 className=" text-2xl">{option.name}</h2>
                    </button>
                  );
              }
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
