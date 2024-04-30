"use client";
import React, { useContext, useEffect, useState } from "react";
import PollCard, { PollType } from "./PollCard";
import { supabase } from "../../../../../../config/mesa-config";

const ClassPollList = ({ classid }: { classid: string }) => {
  const [data, setData] = useState<any>([]);
  const [name, setName] = useState<string>();

  useEffect(() => {
    const getName = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .schema("information")
        .from("classes")
        .select("name")
        .eq("id", classid)
        .single();

      if (error) {
        console.error(error);
        return null;
      }

      setName(`For ${data.name} `);
    };
    const fetchData = async () => {
      let { data, error } = await supabase.rpc("get_questions_by_class", {
        class: classid,
      });
      if (error) return;
      setData(data);
    };
    getName();
    fetchData();
  }, []);

  if (data?.length == 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <ul className="flex flex-row justify-between items-center">
        {name && (
          <h2 className="font-semibold text-zinc-700 text-3xl font-eudoxus">
            {name}{" "}
            <span className="text-xl text-zinc-500">
              in which you are currently studying.
            </span>
          </h2>
        )}
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
