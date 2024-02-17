"use client";
import { PostType } from "@/_assets/types";
import Post from "@/_components/socialhub/Post";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { motion } from "framer-motion";

const RecentPostsHome = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select().order("created_at", { ascending: false }).limit(4);

      if (error) {
        console.log(error);
        return;
      }

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{ ease: 'backInOut' }} className="w-full h-full flex-col flex gap-2">
      <h1 className="text-lg font-bold">Recent Posts</h1>
      
      {posts?.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </motion.div>
  );
};

export default RecentPostsHome;
