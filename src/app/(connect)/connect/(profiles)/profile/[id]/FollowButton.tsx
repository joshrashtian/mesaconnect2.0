"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../../../../../config/mesa-config";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";

const FollowButton = ({ id }: { id: string }) => {
  const [isFollowing, isNotFollowing] = useState();

  useEffect(() => {
    const getStatus = async () => {
      let { data, error } = await supabase.rpc("checkfriendstatus", {
        other_id: id,
      });
      if (error) console.error(error);
      else isNotFollowing(data);
    };
    getStatus();
  }, []);

  return (
    <motion.button
      className={`absolute w-32 active:scale-90 hover:drop-shadow-xl rounded-lg hover:w-40 h-12 gap-4 text-white flex flex-row justify-center items-center group hover:scale-105 duration-500 origin-right font-eudoxus right-16 bg-gradient-to-br ${
        isFollowing
          ? "from-green-800 to-theme-blue-2"
          : "from-theme-blue to-theme-blue-2"
      }  translate-y-16`}
      onClick={async () => {
        let { data, error } = await supabase.rpc("toggle_follow_status", {
          other_id: id,
        });
        if (error) console.error(error);
        else isNotFollowing(data);
      }}
    >
      <div className=" scale-0 text-2xl -rotate-90 group-hover:-rotate-6 group-hover:scale-105 duration-500">
        {isFollowing === true ? (
          <IoPersonRemoveOutline />
        ) : (
          <IoPersonAddOutline />
        )}
      </div>
      <h1 className=" -translate-x-5 group-hover:translate-x-0 duration-300 ">
        {isFollowing === true ? "Unfollow" : "Follow"}
      </h1>
    </motion.button>
  );
};

export default FollowButton;
