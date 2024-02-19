"use client";
import { PostType } from "@/_assets/types";
import Post from "@/_components/socialhub/Post";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { AnimatePresence, motion } from "framer-motion";
import QuickWimModal from "./QuickWimModal";
import Wim from "./Wim";
import Link from "next/link";

export const RecentPostsHome = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.log(error);
        return;
      }

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut" }}
      className="w-full h-full flex-col flex gap-2"
    >
      <h1 className="text-lg font-bold">Recent Posts</h1>

      <section className="flex flex-row justify-center items-center gap-2">
        <Link href='/connect/builder' className="h-12 p-5 shadow-md cursor-pointer hover:scale-[1.01] flex justify-center items-center duration-500 rounded-3xl w-full bg-gradient-to-br from-orange-600 to-amber-400">
          <h1 className="text-white font-bold">Post Builder</h1>
        </Link>
        <ul onClick={() => { setModal(true); }} className="h-12 p-5 shadow-md cursor-pointer hover:scale-[1.01] flex justify-center items-center duration-500 rounded-3xl w-full bg-gradient-to-br from-slate-600 to-blue-400">
          <h1 className="text-white font-bold">Create Wim</h1>
        </ul>
      </section>
      {posts?.map((post, index) => {
        switch (post.type){
        case "wim":
          return <Wim key={index} post={post} />;
        case null:
          return <Post key={index} post={post} />;
        default:
          return <Post key={index} post={post} />;
        }
        
      })}
      <AnimatePresence>
      {modal && (
        <QuickWimModal disengageModal={() => {setModal(false)}}/>
      )}
      </AnimatePresence>
    </motion.div>
  );
};
