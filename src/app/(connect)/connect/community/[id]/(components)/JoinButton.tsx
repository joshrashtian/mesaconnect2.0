"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../../../../../config/mesa-config";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";

const JoinButton = ({ id }: { id: string }) => {
  const [isFollowing, setFollowing] = useState<"joined" | "requested" | null>();

  useEffect(() => {
    const getStatus = async () => {
      const { data: Check, error: CheckError } = await supabase
        .from("communityrelations")
        .select("state")
        .eq(
          "userid",
          await supabase.auth.getUser().then((user) => user?.data.user?.id),
        )
        .eq("communityid", id)
        .single();

      if (!Check || CheckError) setFollowing(null);
      if (Check?.state === "requested") setFollowing("requested");
      if (Check?.state === "joined") setFollowing("joined");
    };
    getStatus();
  }, [id]);

  return (
    <motion.button
      className={`group flex h-12 w-40 origin-right flex-row items-center justify-center gap-4 rounded-lg bg-gradient-to-br font-eudoxus text-white duration-500 hover:w-40 hover:scale-105 hover:drop-shadow-xl active:scale-90 ${
        isFollowing
          ? isFollowing === "requested"
            ? "from-slate-300 to-slate-400"
            : "from-green-800 to-green-500"
          : "from-orange-500 to-orange-700"
      } origin-bottom-right text-base`}
      onClick={async () => {
        //@ts-ignore
        let { data, error } = await supabase.rpc("toggle_community_follow", {
          other_id: id,
        });
        if (error) console.error(error);
        else {
          if (data === "unfollowed") setFollowing(null);
          // @ts-ignore
          else setFollowing(data);
        }
      }}
    >
      <div className="-rotate-90 scale-0 text-2xl duration-500 group-hover:-rotate-6 group-hover:scale-105">
        {isFollowing ? <IoPersonRemoveOutline /> : <IoPersonAddOutline />}
      </div>
      <h1 className="-translate-x-5 capitalize duration-300 group-hover:translate-x-0">
        {isFollowing === "joined" ? "Leave Group" : (isFollowing ?? "Join")}
      </h1>
    </motion.button>
  );
};

export default JoinButton;
