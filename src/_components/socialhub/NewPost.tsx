"use client";

import React, { createContext } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { motion } from "framer-motion";
import Link from "next/link";

type TipTapDoc = {
  type: "doc";
  content?: any[];
};

const TipTapReadonly = ({ doc }: { doc: TipTapDoc }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: doc,
    editable: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
};

const LegacyViewer = ({
  data,
}: {
  data: { type: string; text?: string }[];
}) => {
  return (
    <div className="space-y-3">
      {data.map((block, idx) => {
        if (block.type === "code") {
          return (
            <pre
              key={idx}
              className="overflow-x-auto rounded-md bg-slate-900 p-3 text-slate-100"
            >
              <code>{block.text}</code>
            </pre>
          );
        }
        return (
          <p key={idx} className="whitespace-pre-wrap leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
};

const NewPost = ({ post }: { post: any }) => {
  const data = post?.data ?? {};
  const isTipTap = !!data?.tiptap;

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      exit={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backInOut", duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-22 -z-0 w-full rounded-3xl bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7] p-5 shadow-sm duration-500 hover:scale-[1.01] dark:from-zinc-700 dark:to-slate-600"
    >
      <Link href={`/connect/social/post/${post.id}`}>
        <section className="flex flex-row justify-between">
          <h1 className="font-bold text-slate-700 dark:text-white">
            {post.title}
          </h1>
          <h1 className="font-geist text-slate-700 dark:text-white">
            {post.creator.realname}
          </h1>
        </section>
        {isTipTap ? (
          <TipTapReadonly doc={data.tiptap as TipTapDoc} />
        ) : Array.isArray(data?.data) ? (
          <LegacyViewer data={data.data as any[]} />
        ) : null}
      </Link>
    </motion.ul>
  );
};

export default NewPost;
