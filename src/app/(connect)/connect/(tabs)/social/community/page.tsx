"use client";
import React, {useCallback, useEffect, useState} from "react";
import { PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../config/mesa-config";
import Post from "@/_components/socialhub/Post";
import PostListItem from "@/_components/socialhub/PostListItem";
import { AnimatePresence } from "framer-motion";
import { IoNewspaper, IoPeople } from "react-icons/io5";
import { motion } from "framer-motion";
import { byTag, getFollowed, intfetch } from "./PostsPageQueries";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import InterestButtons from "./InterestButtons";
import LoadingPage from "@/_components/LoadingPage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WimListItem from "@/_components/socialhub/WimListItem";
import AddPost from "./addPost";

const PostsPageHome = () => {
  const [range, setRange] = useState(0);
  const [posts, setPosts] = useState<PostType[]>();
  const [reload, setReload] = useState(true);

  const { CreateErrorToast } = useToast();

  const params = useSearchParams();
  const tag = params.get("by");
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleParams(term?: string) {
    const search = new URLSearchParams(params);
    if (term) {
      search.set("by", term);
    } else {
      search.delete("by");
    }
    replace(`${pathname}?${search.toString()}`);
  }

  const fet = useCallback(async() => {
    setReload(true);
    const { data, error } = await intfetch(range);
    if (error) {
      console.error(error);
      return;
    }
    //@ts-ignore
    setPosts(data);
    setRange((r) => r + 10);
    setReload(false);
  }, [])

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
      fet();
    }
  }, [fet, tag]);

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

  const menu = useContextMenu();

  const windowDimesions = window.screen.availHeight - 200;

  return (
    <motion.section className="  ">
      <section>
        <h1 className="text-transparent pb-10 bg-clip-text font-bold font-eudoxus inline-block text-5xl bg-gradient-to-br from-orange-600 to-indigo-900 ">
          Community
        </h1>
      </section>
      <motion.nav
        drag="y"
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
        whileDrag={{ backgroundColor: "#eee" }}
        dragConstraints={{ top: 0, bottom: windowDimesions - 80 }}
        className=" p-2 md:p-4 top-20 sticky shadow-inner rounded-2xl flex gap-0.5 md:gap-1  justify-center items-center z-30 mb-5 bg-white drop-shadow-2xl "
      >
        <button
          className=" p-0.5  md:p-2 duration-300 text-xs md:text-sm xl:text-base font-eudoxus flex flex-col lg:flex-row items-center gap-2 rounded-xl px-0.5 md:px-3 lg:px-6 text-slate-800 hover:text-black hover:bg-slate-200 active:scale-95 active:bg-slate-300 "
          onClick={() => {
            setRange(0);
            handleParams();
            fet();
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
          className=" p-0.5 md:p-2 duration-300 text-xs md:text-sm xl:text-base font-eudoxus flex flex-col lg:flex-row items-center  gap-2 rounded-xl px-0.5 md:px-3 lg:px-6 text-slate-800 hover:text-black hover:bg-slate-200 active:scale-95 active:bg-slate-300 "
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
          <IoPeople color="rgb(30 41 59)" />
          Following
        </button>
        <ul className="w-0.5 h-4 bg-slate-300 mx-4" />
        <InterestButtons
          reload={() => setReload(true)}
          newInfo={(e) => {
            setPosts(e);
            setReload(false);
          }}
        />
      </motion.nav>
      <motion.article className="flex flex-col pb-10">
        <AnimatePresence>
          {reload ? (
            <LoadingPage />
          ) : (
            posts?.map((post, index) => {
              switch (post.type) {
                case "wim":
                  return <WimListItem key={index} post={post} />;
                case "post":
                  return <PostListItem key={index} index={index} post={post} />;
                default:
                  return <Post key={index} post={post} />;
              }
            })
          )}
        </AnimatePresence>
      </motion.article>
      <AddPost />
    </motion.section>
  );
};

export default PostsPageHome;
