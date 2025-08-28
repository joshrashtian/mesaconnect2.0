"use client";

import React, { createContext } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { motion } from "framer-motion";
import Link from "next/link";

type TipTapDoc = {
  type: "doc";
  content?: any[];
};

const TipTapReadonly = ({ doc }: { doc: TipTapDoc }) => {
  // Create a preview version of the document with limited content
  const createPreviewDoc = (originalDoc: TipTapDoc): TipTapDoc => {
    if (!originalDoc.content || originalDoc.content.length === 0) {
      return originalDoc;
    }

    const previewContent = originalDoc.content.slice(0, 2); // Only show first 2 blocks

    // For text blocks, truncate the content
    const truncatedContent = previewContent.map((block: any) => {
      if (block.type === "paragraph" && block.content) {
        // Limit paragraph content to first 150 characters
        const truncatedParagraph = {
          ...block,
          content: block.content.map((node: any) => {
            if (node.type === "text" && node.text) {
              return {
                ...node,
                text:
                  node.text.length > 150
                    ? node.text.substring(0, 150) + "..."
                    : node.text,
              };
            }
            return node;
          }),
        };
        return truncatedParagraph;
      }
      return block;
    });

    return {
      ...originalDoc,
      content: truncatedContent,
    };
  };

  const previewDoc = createPreviewDoc(doc);

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension.configure({ allowBase64: true })],
    content: previewDoc,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;
  return (
    <div className="max-h-32 overflow-hidden">
      <EditorContent editor={editor} />
      <p>...</p>
    </div>
  );
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
