"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PostItem, PostType, UserData } from "@/_assets/types";
import { supabase } from "../../../../../../../../config/mesa-config";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPage from "@/_components/LoadingPage";
import CodeBlock from "../CodeBlock";
import { ContextProps, userContext, useUser } from "@/app/AuthContext";
import { SubmitReply } from "./SubmitReply";
import { MenuContext, useToast } from "@/app/(connect)/InfoContext";
import Replies from "./Replies";
import RelatedTo from "./RelatedTo";
import { IoPaperPlane, IoPerson, IoPersonAdd } from "react-icons/io5";
import Link from "next/link";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType>();
  const [reply, setReply] = useState<string>();
  const [isPrivate, setPrivate] = useState(false);

  const router = useRouter();
  const user = useUser();
  const toast = useToast();

  const AlterReply = useMemo(() => {
    setReply(reply);
  }, [reply]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        return false;
      }
      //@ts-ignore
      setPost(data);
      return true;
    };

    const success = fetchData();
  }, []);

  if (!post || !user) {
    return (
      <AnimatePresence>
        <LoadingPage />
      </AnimatePresence>
    );
  }

  const data = JSON.parse(JSON.stringify(post.data)).data;

  const date = new Date(post.created_at);

  return (
    <motion.main
      className=" p-10 gap-5 flex flex-col "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "circInOut" }}
    >
      <ul
        className="p-3 absolute hover:scale-110 shadow-md duration-500 top-6 left-6 cursor-pointer rounded-full bg-white w-16 h-16 flex justify-center items-center"
        onClick={() => {
          router.back();
        }}
      >
        <h1 className="text-3xl font-mono font-bold">{"<"}</h1>
      </ul>

      <ul className="font-eudoxus">
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl duration-300">
          {post?.title}
        </h1>
        <h2 className=" text-zinc-600 text-2xl">
          by{" "}
          <span
            onClick={() => {}}
            className="group text-blue-500 hover:text-blue-600 inline-block cursor-pointer hover:scale-110 hover:px-2 duration-300"
          >
            {post?.creator?.username}
            <motion.div
              onClick={(e) => e.preventDefault()}
              className="w-64 cursor-default absolute text-lg text-black bg-white drop-shadow-none group-hover:drop-shadow-lg h-28 rounded-xl p-3 duration-500 origin-top group-hover:scale-100 scale-0"
            >
              <h1>{post.creator.realname}</h1>
              <div className="flex flex-row text-sm h-full gap-1">
                <Link
                  href={`/connect/profile/${post.userid}`}
                  className="h-2/3 flex flex-col justify-center p-2 text-white rounded-lg hover:scale-[1.02] duration-200 w-full bg-gradient-to-tr from-blue-500 to-indigo-600"
                >
                  <IoPerson />
                  <p>View Profile</p>
                </Link>
                <button
                  onClick={() =>
                    toast.CreateErrorToast(
                      "This feature is currently not available."
                    )
                  }
                  className="h-2/3 flex flex-col justify-center p-2 text-white rounded-lg hover:scale-[1.02] duration-200 w-full bg-gradient-to-tr from-orange-600 to-red-700"
                >
                  <IoPaperPlane />
                  <p>Message</p>
                </button>
              </div>
            </motion.div>
          </span>{" "}
          - {date?.toDateString()}
        </h2>
      </ul>

      <section className="flex flex-col gap-4 ">
        {data.map((item: PostItem, index: number) => {
          switch (item.type) {
            case "text":
              return (
                <pre className="text-slate-500 font-eudoxus" key={index}>
                  {item.text}
                </pre>
              );
            case "code":
              return <CodeBlock text={item.text} />;
            default:
              return null;
          }
        })}
      </section>
      <section className="flex flex-col gap-3">
        <RelatedTo classes={post.relations} />
        <ul className="flex flex-col gap-3 p-5 bg-zinc-50 duration-300 rounded-xl">
          <div className="flex flex-row items-center gap-2">
            <img
              className="w-6 h-6 rounded-full"
              src={user.userData?.avatar_url}
            />
            <h1 className="text-lg">Add a Comment:</h1>
          </div>
          <input
            onChange={(e) => {
              setReply(e.target.value);
            }}
            className="w-full h-12 p-3 focus:outline-none hover:bg-white hover:shadow-sm hover:scale-[1.01] duration-300  px-5 rounded-xl"
          />
          <AnimatePresence>
            {reply && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ scaleY: 0 }}
                className="flex flex-row gap-4"
              >
                <button
                  className={`w-48 p-2 rounded-xl duration-300  border-2 border-slate-300 ${
                    isPrivate
                      ? "bg-green-500 hover:bg-green-400 text-white"
                      : "hover:bg-slate-100 bg-slate-200"
                  } `}
                  onClick={() => {
                    setPrivate(isPrivate ? false : true);
                  }}
                >
                  Private
                </button>
                <button
                  className={`w-48 p-2 rounded-xl duration-300 bg-blue-500 text-white border-2 border-slate-300`}
                  onClick={async () => {
                    const state = await SubmitReply(
                      user,
                      params.id,
                      reply,
                      isPrivate
                    );
                    if (state.errorMessage)
                      toast.toast(
                        "Error Posting: " + state.errorMessage,
                        "error"
                      );
                    else toast.toast("Successfully Posted!", "success");
                  }}
                >
                  Submit
                </button>
              </motion.section>
            )}
          </AnimatePresence>
        </ul>
        <Replies id={params.id} creator={post.userid} user={user} />
      </section>
    </motion.main>
  );
};

export default PostPage;
