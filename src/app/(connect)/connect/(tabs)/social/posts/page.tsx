"use client";
import React, { useEffect, useState } from "react";
import { PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../config/mesa-config";
import Wim from "@/_components/socialhub/Wim";
import Post from "@/_components/socialhub/Post";
import PostListItem from "@/_components/socialhub/PostListItem";
import { AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFollowed, intfetch } from "./PostsPageQueries";
import { useToast } from "@/app/(connect)/InfoContext";

const PostsPageHome = () => {
  const [range, setRange] = useState(0);
  const [posts, setPosts] = useState<PostType[]>();

  const { CreateErrorToast } = useToast();

  async function fet() {
    const { data, error } = await intfetch(0);
    if (error) {
      console.error(error);
      return;
    }
    //@ts-ignore
    setPosts(data);
    setRange((r) => r + 10);
  }

  useEffect(() => {
    fet();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("posts channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          //filter: `userid=eq.${user.user?.id}`
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            console.log(payload.old.id);
            setPosts((posts) => posts?.filter((e) => e.id !== payload.old.id));
          }
          if (payload.eventType === "INSERT") {
            setPosts((posts: any) => [payload.new, ...posts]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <motion.section className="  ">
      <section>
        <h1 className="text-transparent pb-10 bg-clip-text font-bold font-eudoxus text-5xl bg-gradient-to-br from-orange-600 to-indigo-900 ">
          Community Posts
        </h1>
      </section>
      <motion.nav className="p-4 top-20 sticky rounded-2xl z-50 mb-5 bg-zinc-200">
        <button onClick={() => fet()}>Recent Posts</button>
        <button
          onClick={async () => {
            setRange(0);
            setPosts([]);
            const { data, error } = await getFollowed();
            if (error) {
              CreateErrorToast(error.message);
            } else setPosts(data);
          }}
        >
          Followed
        </button>
      </motion.nav>
      <motion.article className="flex flex-col pb-10">
        <AnimatePresence>
          {posts?.map((post, index) => {
            switch (post.type) {
              case "wim":
                return <Wim key={index} post={post} />;
              case "post":
                return <PostListItem key={index} index={index} post={post} />;
              default:
                return <Post key={index} post={post} />;
            }
          })}
        </AnimatePresence>
      </motion.article>
      <motion.ul
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className=" fixed z-50  cursor-pointer  text-2xl text-white bottom-8 rounded-[30px] hover:rounded-3xl hover:scale-105 right-6 w-16 h-16 bg-red-600 hover:bg-red-400 duration-300"
      >
        <Link
          className="w-full flex justify-center items-center h-full"
          href="/connect/builder?type=post"
        >
          <IoAdd />
        </Link>
      </motion.ul>
    </motion.section>
  );
};

export default PostsPageHome;
