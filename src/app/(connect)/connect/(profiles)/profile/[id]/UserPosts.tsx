"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Wim from "@/_components/socialhub/Wim";
import { PostType } from "@/_assets/types";
import PostListItem from "@/_components/socialhub/PostListItem";
import WimListItem from "@/_components/socialhub/WimListItem";

const UserPosts = (id: { id: string }) => {
  const [data, setData] = useState<PostType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error }: { data: any; error: any } = await supabase
        .from("posts")
        .select()
        .eq("userid", id.id);
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <main className="gap-0.5 flex flex-col">
      {data &&
        data?.map((e: PostType, index: number) => {
          switch (e.type) {
            case "wim":
              return <WimListItem post={e} key={index} />;
            case "post":
              return <PostListItem post={e} index={index} key={index} />;
            default:
              return null;
          }
        })}
    </main>
  );
};

export default UserPosts;
