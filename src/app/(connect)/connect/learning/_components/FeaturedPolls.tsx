"use client";
import React, { useEffect, useState } from "react";
import PollCard, { PollType } from "./PollCard";
import { supabase } from "../../../../../../config/mesa-config";
import Link from "next/link";

const FeaturedPolls = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select()
        .limit(8);
      if (error) {
        console.error(error);
        return;
      }
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <ul className="flex flex-row items-center justify-between">
        <h2 className="font-eudoxus text-3xl font-semibold text-zinc-700 dark:text-zinc-200/70">
          Featured Polls
        </h2>
        <Link
          href="/connect/learning/creator"
          className="rounded-2xl border-2 border-dashed border-slate-600 border-opacity-50 p-2 px-4 duration-300 hover:scale-105 hover:border-opacity-100"
        >
          <h1 className="font-eudoxus text-slate-600">Create Question</h1>
        </Link>
      </ul>
      <div className="no-scrollbar flex w-full flex-col gap-2 pb-4 md:flex-wrap lg:flex-row lg:overflow-x-scroll">
        {data.map((poll: PollType, index: number) => (
          <PollCard key={index} index={index} data={poll} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPolls;
