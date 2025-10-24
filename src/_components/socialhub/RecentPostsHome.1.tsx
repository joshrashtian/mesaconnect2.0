"use client";
import { PostType } from "@/_assets/types";
import Post from "@/_components/socialhub/Post";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { AnimatePresence, motion } from "framer-motion";
import QuickWimModal from "./QuickWimModal";
import Wim from "./Wim";
import Link from "next/link";
import { userContext } from "@/app/AuthContext";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { BsPostcard } from "react-icons/bs";
import { IoChatboxEllipsesOutline, IoPeople } from "react-icons/io5";
import { useModal } from "@/app/(connect)/connect/Modal";
import PostListItem from "./PostListItem";
import WimListItem from "./WimListItem";
import NewPost from "./NewPost";

export const RecentPostsHome = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const user = useContext(userContext);
  const [likedPosts, setLikedPosts] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.log(error);
        return;
      }
      setPosts(data);

      const { data: counts } = await supabase
        //@ts-ignore
        .from("post_likes")
        .select("*")
        .in(
          "post_id",
          data.map((post: any) => post.id),
        );
      if (error) console.error(error);
      setLikedPosts(
        new Map(counts?.map((count: any) => [count.post_id, count.likes])),
      );
    };
    fetchData();
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
            setPosts((posts) => posts.filter((e) => e.id !== payload.old.id));
          }
          if (payload.eventType === "INSERT") {
            setPosts((posts: any) => [payload.new, ...posts]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut" }}
      className="flex h-full w-full flex-col items-center gap-1"
    >
      <h1 className="text-lg font-bold dark:text-white">
        Recent In The Community
      </h1>

      <Link
        href={`/connect/social/community`}
        className="flex h-24 w-full flex-col justify-end rounded-2xl bg-gradient-to-tr from-red-600 to-indigo-600 p-5 text-xl text-white ring-0 ring-purple-700/45 ring-offset-0 drop-shadow-xl duration-500 hover:scale-[1.03] hover:shadow-2xl hover:ring-2 hover:ring-opacity-70 hover:ring-offset-1"
      >
        <IoPeople className="text-3xl" />
        <h1 className="">Community Home</h1>
      </Link>
      <section className="flex w-4/5 flex-row items-center justify-start">
        <Link
          href="/connect/builder"
          className="flex h-12 w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-bl-xl bg-gradient-to-br from-red-600 to-amber-600 p-5 text-white shadow-md ring-0 ring-orange-400/45 ring-offset-0 duration-500 hover:scale-[1.02] hover:rounded-md hover:ring-2 hover:ring-opacity-70 hover:ring-offset-1"
        >
          <BsPostcard size={22} />
          <h1>Post Builder</h1>
        </Link>
        <ul
          onClick={() => {
            setModal(true);
          }}
          className="flex h-12 w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-br-xl bg-gradient-to-br from-indigo-600 to-blue-400 p-5 text-white shadow-md ring-0 ring-blue-700/45 ring-offset-0 duration-500 hover:scale-[1.02] hover:rounded-md hover:ring-2 hover:ring-opacity-70 hover:ring-offset-1"
        >
          <IoChatboxEllipsesOutline size={22} />
          <h1>Create Wim</h1>
        </ul>
      </section>

      <AnimatePresence>
        {posts?.map((post, index) => {
          switch (post.type) {
            case "wim":
              return <WimListItem key={index} post={post} />;
            case "post":
              return <PostListItem key={index} post={post} index={index} />;
            case "post-tiptap":
              return <PostListItem key={index} post={post} index={index} />;
            default:
              return <NewPost key={index} post={post} />;
          }
        })}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <QuickWimModal
            disengageModal={() => {
              setModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
