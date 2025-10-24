"use client";
import React, { useEffect, useState } from "react";
import { useProfile } from "../ProfileContext";
import { supabase } from "../../../../../../../../config/mesa-config";
import { motion } from "framer-motion";
import Link from "next/link";

function getCurrentSemester() {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let season;

  if (currentMonth >= 0 && currentMonth <= 1) {
    season = "Winter";
  } else if (currentMonth >= 2 && currentMonth <= 4) {
    season = "Spring";
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    season = "Summer";
  } else if (currentMonth >= 8 && currentMonth <= 10) {
    season = "Fall";
  }
  return `${season} ${currentYear}`;
}

const Transcript = () => {
  const profile = useProfile();
  const user = profile?.data;

  const [transcript, setTranscript] = useState<any>(null);

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("transcripts")
        .select("*")
        .eq("userid", user?.id ?? "")
        .eq("semester", getCurrentSemester());

      if (error) {
        console.error(error);
      }

      setTranscript(data);
    }

    get();
  }, [user?.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key="transcript"
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-eudoxus text-3xl font-bold dark:text-white/80">
        Transcript
      </h2>
      <div className="flex flex-col gap-2">
        {transcript?.map((t: any) => (
          <Link
            href={`/connect/class/${t.id}`}
            key={t.id}
            className="rounded-2xl bg-zinc-200/40 p-3"
          >
            <p className="text-lg font-bold">{t.name}</p>
            <p className="text-sm text-gray-500">
              {t.grade} - {t.units} Units
            </p>
            <p className="text-sm text-gray-500">
              {t.teacher} - {t.category} {t.num}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Transcript;
