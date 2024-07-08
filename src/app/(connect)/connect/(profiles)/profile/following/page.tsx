"use client";
import { gradientTextDefault } from "@/colors";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { UserData } from "@/_assets/types";
import Image from "next/image";
import PersonComponent from "./PersonComponent";

const FollowingPage = () => {
  const { user } = useUser();
  const [following, setFollowing] = useState<UserData[] | undefined>();
  const [refreshing, setRefreshing] = useState(true);

  async function get() {
    //@ts-ignore
    const { data, error } = await supabase.rpc("get_followers_by_user", {
      userid: user?.id,
    });

    if (error) {
      alert(error.message);
      return;
    }
    setRefreshing(false);
    //@ts-ignore
    setFollowing(data);
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
      <ul className="p-3 flex flex-col gap-1.5">
        <h2 className="font-eudoxus text-2xl font-semibold">Followers</h2>
        {following &&
          following.map((e, i) => {
            return <PersonComponent user={e} key={e.id} />;
          })}
      </ul>
    </main>
  );
};

export default FollowingPage;
