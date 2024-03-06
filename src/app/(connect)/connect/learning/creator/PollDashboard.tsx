"use client";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import { PollType } from "../_components/PollCard";

const PollDashboard = () => {
  const user = useContext(userContext);
  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState<PollType[]>([]);

  if (!user) return;
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select()
        .eq("creatorid", user.user?.id);

      if (error) {
        console.error(error);
        return;
      }

      setData(data);
    };

    fetchData();
  }, []);

  if (!data) return;

  const deletePoll = async (id: PollType) => {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    const { error } = await supabase.from("questions").delete().eq("id", id.id);

    if (id.context) {
      console.log(id.id);
      const { error: QuestionError } = await supabase.storage
        .from("questionContexts")
        .remove([`${id.id}.${id?.contextType}`]);

      if (QuestionError) {
        console.error(error);
        return;
      }
    }

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <main className="w-full min-h-full ">
      <h1 className="font-bold text-3xl text-slate-700">Your Polls</h1>
      <section className="w-full flex flex-col gap-3 mt-5">
        {data.map((item, index) => {
          return (
            <ul className="w-full bg-white group flex flex-row hover:scale-[1.01] items-center justify-between hover:bg-zinc-50 border-2 cursor-pointer hover:border-amber-500 duration-300 p-6 rounded-md">
              <h1 className="font-semibold text-xl">{item.question}</h1>
              <nav className="scale-0 group-hover:scale-100 duration-300">
                <button
                  onClick={() => {
                    deletePoll(item);
                  }}
                  className="p-1 px-4 duration-300 ease-in-out rounded-lg bg-red-200 hover:bg-red-500 hover:text-white"
                >
                  <h2>{confirm ? "Are You Sure?" : "Delete"}</h2>
                </button>
              </nav>
            </ul>
          );
        })}
      </section>
    </main>
  );
};

export default PollDashboard;
