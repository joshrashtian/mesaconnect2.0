"use client";
import React, { useCallback, useEffect, useState } from "react";
import { PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../config/mesa-config";
import Post from "@/_components/socialhub/Post";
import PostListItem from "@/_components/socialhub/PostListItem";
import { AnimatePresence } from "framer-motion";
import { IoAdd, IoNewspaper, IoPeople, IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";
import { byTag, getFollowed, intfetch } from "./PostsPageQueries";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import InterestButtons from "./InterestButtons";
import LoadingPage from "@/_components/LoadingPage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WimListItem from "@/_components/socialhub/WimListItem";
import AddPost from "./addPost";
import QuickWimModal from "@/_components/socialhub/QuickWimModal";
import Link from "next/link";

const PostsPageHome = () => {
  const [range, setRange] = useState(0);
  const [posts, setPosts] = useState<PostType[]>();
  const [reload, setReload] = useState(true);
  const [globalCount, setCount] = useState<number>(0);
  const { CreateErrorToast } = useToast();

  const params = useSearchParams();
  const tag = params.get("by");
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleParams(term?: string) {
    //@ts-ignore
    const search = new URLSearchParams(params);
    if (term) {
      search.set("by", term);
    } else {
      search.delete("by");
    }
    replace(`${pathname}?${search.toString()}`);
  }

  const fet = async (reload?: boolean) => {
    if (range === 0 || reload) {
      setReload(true);
      //@ts-ignore
      setPosts();
    }
    const { data, count, error } = await intfetch(range, globalCount);
    if (error) {
      console.error(error);
      return;
    }
    //@ts-ignore
    setCount(count);
    //@ts-ignore
    setPosts(!posts ? data : [...posts, ...data]);
    setRange((r) => r + 7);
    setReload(false);
  };

  useEffect(() => {
    const getByTag = async () => {
      if (!tag) return;
      const posts = await byTag(tag);

      if (posts.error) return;
      else if (!posts.data) return;
      else {
        setPosts(posts.data);
        setReload(false);
      }
    };
    if (tag) {
      if (tag === "following") {
      }
      getByTag();
    }
    if (!tag) {
      fet(true);
    }
  }, [tag]);

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
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const menu = useContextMenu();

  const windowDimesions = window.screen.availHeight - 200;

  return (
    <motion.section className=" ">
      <section>
        <h1 className="inline-block bg-gradient-to-br from-orange-600 to-indigo-900 bg-clip-text pb-10 font-eudoxus text-5xl font-bold text-transparent">
          Community
        </h1>
      </section>
      <motion.nav
        //drag="y"
        onContextMenu={(e) => {
          menu.createContext(e, [
            {
              name: "Recent",
              visible: true,
              function: () => {
                setRange(0);
                handleParams();
                fet();
              },
              icon: <IoNewspaper />,
            },
            {
              name: "Following",
              visible: true,
              function: async () => {
                handleParams("following");
                setRange(0);
                setReload(true);
                setPosts([]);
                const { data, error } = await getFollowed();
                if (error) {
                  CreateErrorToast(error.message);
                } else {
                  setReload(false);
                  setPosts(data);
                }
              },
              icon: <IoPeople />,
            },
          ]);
        }}
        //whileDrag={{ backgroundColor: "#eee" }}
        dragConstraints={{ top: 0, bottom: windowDimesions - 80 }}
        className="sticky top-20 z-30 mb-5 flex items-center justify-center gap-0.5 rounded-2xl bg-white p-2 shadow-inner drop-shadow-2xl md:gap-1 md:p-4 dark:bg-zinc-600/50"
      >
        <button
          className="flex flex-col items-center gap-2 rounded-xl p-0.5 px-0.5 font-eudoxus text-xs text-slate-800 duration-300 hover:bg-slate-200 hover:text-black active:scale-95 active:bg-slate-300 md:p-2 md:px-3 md:text-sm lg:flex-row lg:px-6 xl:text-base dark:text-slate-200"
          onClick={() => {
            setRange(0);
            handleParams();
            fet(true);
          }}
        >
          <IoNewspaper />
          <p>Recent</p>
        </button>
        {/* 
        <button
          className=" p-0.5  md:p-2 duration-300 text-xs md:text-sm xl:text-base font-eudoxus flex flex-col lg:flex-row items-center gap-2 rounded-xl px-0.5 md:px-3 lg:px-6 text-slate-800 hover:text-black hover:bg-slate-200 active:scale-95 active:bg-slate-300 "
          onClick={() => {
            setRange(0);
            handleParams();
            fet();
          }}
        >
          <IoSchool />
          <p>My School</p>
        </button>
*/}
        <button
          className="flex flex-col items-center gap-2 rounded-xl p-0.5 px-0.5 font-eudoxus text-xs text-slate-800 duration-300 hover:bg-slate-200 hover:text-black active:scale-95 active:bg-slate-300 md:p-2 md:px-3 md:text-sm lg:flex-row lg:px-6 xl:text-base dark:text-slate-200"
          onClick={async () => {
            handleParams("following");
            setRange(0);
            setReload(true);
            setPosts([]);
            const { data, error } = await getFollowed();
            if (error) {
              CreateErrorToast(error.message);
            } else {
              setReload(false);
              setPosts(data);
            }
          }}
        >
          <IoPeople className="text-[rgb(30 41 59)]" />
          Following
        </button>
        <ul className="mx-4 h-4 w-0.5 bg-slate-300" />
        <InterestButtons
          reload={() => setReload(true)}
          newInfo={(e) => {
            setPosts(e);
            setReload(false);
          }}
        />
        <ul className="mx-4 h-4 w-0.5 bg-slate-300" />
        <Link
          className="flex scale-0 flex-col items-center gap-2 rounded-xl p-0.5 px-0.5 font-eudoxus text-xs text-slate-800 duration-300 hover:bg-slate-200 hover:text-black active:scale-95 active:bg-slate-300 md:p-2 md:px-2 md:text-sm lg:scale-100 lg:flex-row lg:px-4 xl:text-base"
          href="/connect/social/search"
        >
          <IoSearch className="dark:text-slate-200" />
        </Link>
      </motion.nav>
      <motion.article className="flex flex-col pb-10">
        <AnimatePresence>
          {reload ? (
            <LoadingPage key="a" />
          ) : (
            posts?.map((post, index) => {
              switch (post.type) {
                case "wim":
                  return <WimListItem key={post.id} post={post} />;
                case "post":
                  return (
                    <PostListItem key={post.id} index={index} post={post} />
                  );
                default:
                  return <Post key={post.id} post={post} />;
              }
            })
          )}
          {globalCount >= range && (
            <button onClick={() => fet()}>
              <h4 className="mb-20 flex flex-row items-center justify-start gap-3 bg-slate-300 p-4 text-lg font-bold">
                {" "}
                <IoAdd /> Load More
              </h4>
            </button>
          )}
        </AnimatePresence>
      </motion.article>
      <AddPost />
    </motion.section>
  );
};

export default PostsPageHome;
