"use client";
import { gradientTextDefault } from "@/colors";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { UserData } from "@/_assets/types";
import Image from "next/image";
import PersonComponent from "./PersonComponent";
import { AnimatePresence, motion } from "framer-motion";
import LoadingResults from "@/_components/LoadingResults";
const FollowingPage = () => {
  const { user } = useUser();
  const [following, setFollowing] = useState<UserData[] | undefined>();
  const [followers, setFollowers] = useState<UserData[] | undefined>();
  const [refreshing, setRefreshing] = useState(true);

  async function get() {
    //@ts-ignore
    const { data, error } = await supabase.rpc("get_followers_by_user", {
      userid: user?.id,
    });

    const { data: followers, error: seconderror } = await supabase.rpc(
      //@ts-ignore
      "get_followers",
      {
        userid: user?.id,
      }
    );

    if (error || seconderror) {
      alert(error?.message);
      alert(seconderror?.message);
      return;
    }
    setRefreshing(false);
    //@ts-ignore
    setFollowing(data);
    //@ts-ignore
    setFollowers(followers);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <main>
      <h1
        className={`${gradientTextDefault} font-black font-eudoxus text-5xl p-2`}
      >
        Relations
      </h1>
      <AnimatePresence mode="wait">
        {!refreshing ? (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-row gap-2"
          >
            <ul className="p-3 flex flex-col gap-1.5 w-full">
              <h2 className="font-eudoxus text-2xl font-semibold">Following</h2>
              {following &&
                following.map((e, i) => {
                  return <PersonComponent user={e} key={e.id} />;
                })}
            </ul>
            <ul className="p-3 flex flex-col gap-1.5 w-full">
              <h2 className="font-eudoxus text-2xl font-semibold">Followers</h2>
              {followers &&
                followers.map((e, i) => {
                  return <PersonComponent user={e} key={e.id} />;
                })}
            </ul>
          </motion.section>
        ) : (
          <LoadingResults loadingMsg="Loading Your Relations" length={10} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default FollowingPage;
