"use client";
import React, { useEffect, useState } from "react";
import { BuilderIndex } from ".";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

const Page = () => {
  const [selected, setSelected] = useState<any>();
  const searchParams = useSearchParams()!;
  const id = searchParams.get("type");

  useEffect(() => {
    const useParams = () => {
      const found = BuilderIndex.find((e) => e.postType.toLowerCase() === id);

      if (!found) {
        setSelected(BuilderIndex[0]);
        return;
      }

      setSelected(found);
    };

    useParams();
  }, []);

  if (!selected) return null;
  return (
    <div className="w-full h-full pb-16 flex gap-4 flex-col">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-teal-200 ">
        MESA Studio
      </h1>
      <section className="flex flex-row gap-3 w-full h-full">
        <div className="w-1/6 flex gap-2 flex-col">
          <h1 className="font-black text-xl">Posts</h1>
          {BuilderIndex.map((e, index) => (
            <ul
              onClick={() => {
                setSelected(e);
              }}
              key={index}
              className={`w-full p-3 flex justify-center ${
                selected.postType === e.postType
                  ? "bg-slate-600 text-white"
                  : ""
              } duration-300 hover:bg-slate-500 hover:text-white cursor-pointer rounded-2xl `}
            >
              <h1 className="font-semibold text-xl">{e.postType}</h1>
            </ul>
          ))}
        </div>
        <AnimatePresence>
        <div className="bg-white rounded-3xl p-10  w-full">
          
            <selected.onSelect />
          
        </div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Page;
