"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import Link from "next/link";
import { IoLink } from "react-icons/io5";
import { IconGet } from "../../../learning/(sub-pages)/profile/newclass/CategoryIndex";
import { InProgressClassesData } from "./types";

const ClassBox = ({ data }: { data: InProgressClassesData }) => {
  const [c, setC] = useState<any>();
  async function get() {
    let { data: transcriData, error } = await supabase
      .from("transcripts")
      .select("*")
      .match({ userid: data.userid, grade: "IP" });

    if (error) {
      console.error(error);
    }
    //@ts-ignore
    setC(transcriData);
  }
  useEffect(() => {
    get();
  }, []);

  if (!c) return null;
  return (
    <div className="flex flex-col gap-2">
      {c.map((a: any) => (
        <Link
          href={`/connect/class/${a.id}`}
          key={a.id}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-200/40 p-3"
        >
          <p className="flex flex-row items-center gap-3 font-semibold">
            {IconGet(a.category)}
            {a?.name} | {a?.category} {a.num}
          </p>
          <p className="text-sm">
            {a?.teacher} - {a?.units} {a.units > 1 ? "Units" : "Unit"}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ClassBox;
