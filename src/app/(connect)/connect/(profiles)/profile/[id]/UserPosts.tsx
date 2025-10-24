"use client";

import React, { useEffect, useState, memo } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Wim from "@/_components/socialhub/Wim";
import { PostType } from "@/_assets/types";
import PostListItem from "@/_components/socialhub/PostListItem";
import WimListItem from "@/_components/socialhub/WimListItem";
import { motion } from "framer-motion";

const UserPosts = memo(({ id }: { id: string }) => {
  const [data, setData] = useState<PostType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("userid", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user posts:", error);
        return;
      }

      setData(data as unknown as PostType[]);
    };
    fetchData();
  }, [id]);

  return (
    <motion.section
      className="flex flex-col gap-0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05 }}
    >
      {data &&
        data?.map((e: PostType, index: number) => {
          const PostComponent = () => {
            switch (e.type) {
              case "wim":
                return <WimListItem post={e} />;
              case "post":
                return <PostListItem post={e} index={index} />;
              default:
                return null;
            }
          };

          return (
            <motion.div
              key={e.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PostComponent />
            </motion.div>
          );
        })}
    </motion.section>
  );
});

UserPosts.displayName = "UserPosts";

export default UserPosts;
