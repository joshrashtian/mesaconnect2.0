"use client";
import { useUser } from "@/app/AuthContext";
import { Progress } from "@/components/ui/progress";
import React from "react";

const ProfileStats = () => {
  const { userData } = useUser();
  if (!userData?.xp) return null;
  return (
    <div className="rounded-3xl bg-zinc-200/40 p-5">
      <h3 className="text-2xl font-black">Statistics</h3>
      <h5 className="font-black">Level {Math.floor(userData.xp / 100) + 1}</h5>
      <Progress value={userData.xp % 100} className="w-[50%]" />
      <p className="mt-2 w-fit rounded-2xl border-2 border-zinc-400/30 bg-zinc-200/60 p-2 px-4 font-bold shadow-sm">
        {userData.xp} XP -{" "}
        <span className="text-zinc-600/40">
          {100 - (userData.xp % 100)} to next level
        </span>
      </p>
    </div>
  );
};

export default ProfileStats;
