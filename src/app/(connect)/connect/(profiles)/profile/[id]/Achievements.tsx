"use client";
import React, { useEffect, useState } from "react";
import { useProfile } from "./ProfileContext";
import { useModal } from "../../../Modal";
import { supabase } from "../../../../../../../config/mesa-config";
import { useToast } from "@/app/(connect)/InfoContext";
import { IoTrophy } from "react-icons/io5";

type Achievement = {
  id: string;
  userid: string;
  type: string;
  certification: string;
  desc: string;
  created_at: Date;
};
const Achievements = () => {
  const [data, setData] = useState<Achievement[] | null>(null);
  const profile = useProfile();
  const modal = useModal();
  const toast = useToast();

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("userawards")
        .select()
        .eq("userid", profile?.id);

      if (error) {
        toast.CreateErrorToast(error.message);
        return;
      }

      setData(data);
    }
    get();
  }, [profile?.id]);

  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {data?.map((e) => (
        <ul
          className="group flex h-64 cursor-default flex-col items-center justify-between rounded-3xl bg-white p-3 py-5 dark:bg-zinc-800"
          key={e.id}
        >
          <IoTrophy className="m-3 h-24 w-3/4 rounded-full bg-zinc-50 p-2 text-7xl text-zinc-600 duration-1000 group-hover:text-orange-700 dark:bg-zinc-900 dark:text-slate-200" />
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold duration-500 hover:text-orange-500 group-hover:text-orange-800 dark:text-slate-100 dark:group-hover:text-orange-400">
              {e.certification}
            </p>
            <p className="dark:text-white">{e.desc}</p>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Achievements;
