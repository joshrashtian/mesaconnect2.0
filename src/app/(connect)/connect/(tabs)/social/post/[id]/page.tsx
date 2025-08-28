"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostItem, PostType } from "@/_assets/types";
import { supabase } from "../../../../../../../../config/mesa-config";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPage from "@/_components/LoadingPage";
import CodeBlock from "../CodeBlock";
import { useUser } from "@/app/AuthContext";
import { SubmitReply } from "./SubmitReply";
import { useToast } from "@/app/(connect)/InfoContext";
import Replies from "./Replies";
import RelatedTo from "./RelatedTo";
import { IoPaperPlane, IoPerson } from "react-icons/io5";
import Link from "next/link";
import { FileObject } from "@supabase/storage-js";
import Image from "next/image";
import { TipTapDoc } from "@/lib/posts";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";

const TipTapReadonly = ({ doc }: { doc: TipTapDoc }) => {
  const editor = useEditor({
    extensions: [StarterKit, ImageExtension.configure({ allowBase64: true })],
    content: doc,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
};

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType>();
  const [reply, setReply] = useState<string>();
  const [isPrivate, setPrivate] = useState(false);
  const [images, setImages] = useState<FileObject[]>([]);
  const router = useRouter();
  const user = useUser();
  const toast = useToast();

  const getImages = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from("postPictures")
      .list(params.id);

    if (error) {
      toast.CreateErrorToast(error.message);
    } else {
      console.log(data);
      setImages(data);
    }
  }, [params.id]);

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

      // @ts-ignore
      if (data?.images) {
        await getImages();
      }
      return true;
    };
    fetchData();
  }, [getImages, params.id]);

  if (!post || !user) {
    return (
      <AnimatePresence>
        <LoadingPage />
      </AnimatePresence>
    );
  }

  const date = new Date(post.created_at);

  return (
    <motion.main
      className="flex flex-col gap-5 p-2 font-eudoxus"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "circInOut" }}
    >
      <ul
        className="absolute left-6 top-6 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-3 shadow-md duration-500 hover:scale-110 dark:invert"
        onClick={() => {
          router.back();
        }}
      >
        <h1 className="font-mono text-3xl font-bold">{"<"}</h1>
      </ul>

      <ul>
        <h1 className="text-3xl font-bold text-slate-600 duration-300 dark:text-slate-200 lg:text-6xl">
          {post?.title}
        </h1>
        <h2 className="z-50 text-2xl text-zinc-600 dark:text-slate-300/70">
          by{" "}
          <span
            onClick={() => {}}
            className="group inline-block cursor-pointer text-blue-500 duration-300 hover:scale-110 hover:px-2 hover:text-blue-600"
          >
            {post?.creator?.username}
            <motion.div
              onClick={(e) => e.preventDefault()}
              className="absolute h-28 w-64 origin-top scale-0 cursor-default rounded-xl bg-white p-3 text-lg text-black drop-shadow-none duration-500 group-hover:scale-100 group-hover:drop-shadow-lg dark:bg-zinc-600"
            >
              <h1 className="dark:text-white">{post.creator.realname}</h1>
              <div className="flex h-full flex-row gap-1 text-sm">
                <Link
                  href={`/connect/profile/${post.userid}`}
                  className="flex h-2/3 w-full flex-col justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 p-2 text-white duration-200 hover:scale-[1.02]"
                >
                  <IoPerson />
                  <p>View Profile</p>
                </Link>
                <button
                  onClick={() =>
                    toast.CreateInfoToast(
                      "This feature is currently a Work In Progress. Oopsies!",
                    )
                  }
                  className="flex h-2/3 w-full flex-col justify-center rounded-lg bg-gradient-to-tr from-orange-600 to-red-700 p-2 text-white duration-200 hover:scale-[1.02]"
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
      {
        //TODO Fix this horrible 47 score please
      }
      {images && (
        <div>
          {images?.map((image) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <motion.div className="relative -z-10 h-72 w-72 rounded-3xl shadow-lg duration-500 hover:scale-105">
                <Image
                  style={{ borderRadius: 20 }}
                  className="z-10"
                  src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/postPictures/${params.id}/${image.name}`}
                  alt={image.name}
                  fill
                  objectFit={"cover"}
                  sizes="(max-width: 128px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            );
          })}{" "}
        </div>
      )}
      {post.type === "post-tiptap" ? (
        <section className="flex flex-col gap-4 rounded-xl bg-white p-4">
          <TipTapReadonly doc={post.data.tiptap as unknown as TipTapDoc} />
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          {post.data.map((item: PostItem, index: number) => {
            switch (item.type) {
              case "text":
                return (
                  <pre className="font-eudoxus text-slate-500" key={index}>
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
      )}
      <section className="flex flex-col gap-3">
        <RelatedTo classes={post.relations} />
        <ul className="flex flex-col gap-3 rounded-xl bg-zinc-50 p-5 duration-300 dark:bg-zinc-700/50">
          <div className="flex flex-row items-center gap-2">
            {/* eslint-disable-next-line jsx-a11y/alt-text,@next/next/no-img-element */}
            <img
              className="h-6 w-6 rounded-full"
              src={user.userData?.avatar_url}
              alt={user.userData?.username}
            />
            <h1 className="text-lg dark:text-slate-200">Add a Comment:</h1>
          </div>
          <input
            onChange={(e) => {
              setReply(e.target.value);
            }}
            className="h-12 w-full rounded-xl p-3 px-5 duration-300 hover:scale-[1.01] hover:bg-white hover:shadow-sm focus:outline-none dark:invert"
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
                  className={`w-48 rounded-xl border-2 border-slate-300 p-2 duration-300 ${
                    isPrivate
                      ? "bg-green-500 text-white hover:bg-green-400"
                      : "bg-slate-200 hover:bg-slate-100"
                  } `}
                  onClick={() => {
                    setPrivate(!isPrivate);
                  }}
                >
                  Private
                </button>
                <button
                  className={`w-48 rounded-xl border-2 border-slate-300 bg-blue-500 p-2 text-white duration-300`}
                  onClick={async () => {
                    const state = await SubmitReply(
                      user,
                      params.id,
                      reply,
                      isPrivate,
                    );
                    if (state.errorMessage)
                      toast.toast(
                        "Error Posting: " + state.errorMessage,
                        "error",
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
