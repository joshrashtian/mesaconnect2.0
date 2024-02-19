"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Post from "@/_components/socialhub/Post";
import Wim from "@/_components/socialhub/Wim";
import { PostType } from "@/_assets/types";

const UserPosts = (id: {id: string}) => {
  const [data, setData] = useState<PostType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("userId", id.id);
      setData(data);
    };
    fetchData()
  }, []);

  return (
    <main className="gap-2 flex flex-col">
      {data &&
        data?.map((e: PostType, index: number) => {
          switch (e.type) {
            case "wim":
              return <Wim post={e} key={index} />;
            case "post":
              return <Post post={e} key={index} />;
            default:
              return null;
          }
        })}
    </main>
  );
};

export default UserPosts;
