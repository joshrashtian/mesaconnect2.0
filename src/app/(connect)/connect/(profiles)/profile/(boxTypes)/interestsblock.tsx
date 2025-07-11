"use client";
import React, { useEffect, useState } from "react";
import {
  icons,
  Interest,
} from "@/app/(connect)/connect/(tabs)/social/community/InterestButtons";
import { supabase } from "../../../../../../../config/mesa-config";
import { useInfo } from "../[id]/(infoblockscreator)/InfoContext";

const Interestsblock = ({ data }: { data: any }) => {
  const [interests, setInterests] = useState<Interest[]>();
  const info = useInfo();
  useEffect(() => {
    async function getInterests() {
      const { data: NewData, error } = await supabase
        .from("interests")
        .select()
        .eq("userid", info.userid);
      if (error) {
        console.error(error);
        return;
      } else
        setInterests(
          NewData?.splice(0, data?.data?.length ?? 10) as Interest[],
        );
    }
    getInterests();
  }, [info.userid]);

  return (
    <section className="p flex flex-wrap gap-2">
      {interests?.map((interest, index) => (
        <ul
          key={index}
          className="flex w-[49%] items-center gap-2 rounded-full bg-zinc-50 p-2 px-4 dark:bg-zinc-700"
        >
          {icons.find((e) => interest.fieldtype === e.name)?.icon}
          <h1>{interest.interest}</h1>
        </ul>
      ))}
    </section>
  );
};

export default Interestsblock;
