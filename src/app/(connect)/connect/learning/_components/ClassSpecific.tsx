"use client";
import React, { useContext, useEffect, useState } from "react";
import PollCard, { PollType } from "./PollCard";
import { supabase } from "../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import Link from "next/link";

const ClassPollList = ({
  title,
  classlist,
}: {
  title: string;
  classlist: string[];
}) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .in("relations", ["707914dc-c067-4a59-b0cb-5a8261fca8bc"]);

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
      <ul className="flex flex-row justify-between items-center">
        <h2 className="font-semibold text-zinc-700 text-3xl font-eudoxus">
          {title}
        </h2>
      </ul>
      <div className="w-full flex flex-col md:flex-wrap lg:flex-row gap-2">
        {data.map((poll: PollType, index: number) => (
          <PollCard key={index} index={index} data={poll} />
        ))}
      </div>
    </section>
  );
};

export default ClassPollList;
