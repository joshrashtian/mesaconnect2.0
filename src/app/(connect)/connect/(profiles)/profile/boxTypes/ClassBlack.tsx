/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import Link from "next/link";
import { IoLink } from "react-icons/io5";

const ClassBox = ({ data }: { data: { data: { userid: string } } }) => {
  const [c, setC] = useState<any>();
  async function get() {
    let { data: transcriData, error } = await supabase
      .from("transcripts")
      .select("*")
      .match({ userid: data.data.userid, grade: "IP" });

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
    <div>
      {c.map((a: any) => (
        <ul key={a.id} className="flex flex-col items-center justify-between">
          <p>{a.name}</p>
        </ul>
      ))}
    </div>
  );
};

export default ClassBox;
