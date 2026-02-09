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
import { IoChatboxEllipsesOutline, IoPeople, IoArrowForward } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/app/(connect)/connect/Modal";
import PostListItem from "./PostListItem";
import WimListItem from "./WimListItem";
import NewPost from "./NewPost";
import AdmissionListItem from "./AdmissionListItem";

type RecentPostsHomeProps = {
  /** When true, hide Community Home CTA and Post Builder / Create Wim row (e.g. on social hub). */
  compact?: boolean;
};

function PostSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export const RecentPostsHome = ({ compact = false }: RecentPostsHomeProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        return;
      }
      setPosts(data ?? []);

      if (data?.length) {
        const { data: counts } = await supabase
          //@ts-ignore
          .from("post_likes")
          .select("*")
          .in("post_id", data.map((post: any) => post.id));
        if (counts) {
          setLikedPosts(
            new Map(counts?.map((count: any) => [count.post_id, count.likes])),
          );
        }
      }
      setLoading(false);
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
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut" }}
      className="flex h-full w-full flex-col items-center gap-1"
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-bold dark:text-white">
          Recent In The Community
        </h1>
        {compact && (
          <Link
            href="/connect/social/community"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all posts
            <IoArrowForward className="text-base" />
          </Link>
        )}
      </div>

      {!compact && (
        <>
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
        </>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <div key="skeleton" className="flex w-full flex-col gap-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        ) : posts.length === 0 ? (
          <div
            key="empty"
            className="flex w-full flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800/30"
          >
            <p className="text-zinc-600 dark:text-zinc-400">
              No posts yet — be the first to share something.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/connect/social/community"
                className="rounded-full bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
              >
                Go to Community
              </Link>
              <Link
                href="/connect/builder"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Create a post
              </Link>
            </div>
          </div>
        ) : (
          <React.Fragment key="posts">
            {posts?.map((post, index) => {
              switch (post.type) {
                case "wim":
                  return <WimListItem key={post.id ?? index} post={post} />;
                case "post":
                  return (
                    <PostListItem
                      key={post.id ?? index}
                      post={post}
                      index={index}
                    />
                  );
                case "post-tiptap":
                case "announcement":
                  return (
                    <PostListItem
                      key={post.id ?? index}
                      post={post}
                      index={index}
                    />
                  );
                case "admission":
                  return (
                    <AdmissionListItem
                      key={post.id ?? index}
                      post={post}
                      index={index}
                    />
                  );
                default:
                  return (
                    <NewPost key={post.id ?? index} post={post} />
                  );
              }
            })}
          </React.Fragment>
        )}
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
