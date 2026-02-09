"use client";

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import ClassRelations from "./ClassRelations";
import { useToast } from "@/app/(connect)/InfoContext";
import Tiptap from "./TipTap";

const BuildPost = () => {
  useSearchParams();
  const user = useContext(userContext);
  const router = useRouter();

  const [title, setTitle] = useState<string>();
  const [tiptapDoc, setTiptapDoc] = useState<any>();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [classConnections, setClassConnections] = useState<string[]>([]);
  const [editorType, setEditorType] = useState<"tiptap" | "announcement">("tiptap");
  const role = user?.userData?.role?.toLowerCase();
  const canPostAnnouncement = role === "tutor" || role === "admin";

  const [errorMessage, setErrorMessage] = useState<string>();

  const toast = useToast();

  const createPost = async () => {
    const userInfo = user?.userData;

    if (!userInfo) {
      console.error("No User!");
      return;
    }

    const isAnnouncement = editorType === "announcement";
    if (isAnnouncement && !canPostAnnouncement) {
      setErrorMessage("Only tutors and admins can post announcements.");
      return;
    }

    const { error } = await supabase.from("posts").insert({
      // @ts-ignore - typed via config/supabasetypes
      userid: userInfo.id,
      title: title ?? null,
      data: { tiptap: tiptapDoc },
      type: isAnnouncement ? "announcement" : "post-tiptap",
      creator: {
        id: userInfo.id,
        realname: userInfo.real_name,
        username: userInfo.username,
      },
      tags: tags.length > 0 ? tags : null,
      relations: classConnections.length > 0 ? classConnections : null,
    });

    if (error) {
      console.error(error);
    }

    toast.toast("Successfully Posted!", "success");
    router.push("/connect/social");
  };

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="mb-24 flex min-h-full flex-col overflow-y-auto pb-8"
    >
      <div className="mx-auto w-full max-w-2xl space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Create Post
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Share an update, question, or announcement with the community.
          </p>
        </header>

        {/* Title */}
        <section className="space-y-2">
          <label htmlFor="post-title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Title
          </label>
          <input
            id="post-title"
            placeholder="Give your post a clear title..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
            type="text"
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        {/* Post type / Editor */}
        <section className="space-y-3">
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Post type
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setEditorType("tiptap");
                setErrorMessage(undefined);
              }}
              aria-pressed={editorType === "tiptap"}
              className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                editorType === "tiptap"
                  ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              Post
            </button>
            {canPostAnnouncement && (
              <button
                type="button"
                onClick={() => {
                  setEditorType("announcement");
                  setErrorMessage(undefined);
                }}
                aria-pressed={editorType === "announcement"}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  editorType === "announcement"
                    ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                Announcement
              </button>
            )}
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
        </section>

        {/* Content */}
        <section className="space-y-3">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Content
          </label>
          {editorType === "announcement" && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Post as an announcement (visible to all). Only tutors and admins can create announcements.
            </p>
          )}
          <Tiptap json={(j: any) => setTiptapDoc(j)} components={null} />
        </section>

{/* Optional: Tags & Relations */}
        <section className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-600 dark:bg-zinc-800/30">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Optional
          </p>

          <div className="space-y-2">
            <label htmlFor="post-tags" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tags
            </label>
            <input
              id="post-tags"
              placeholder="Add tags (e.g. homework, exam, chapter 3)"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = tagInput.trim();
                  if (value && !tags.includes(value)) {
                    setTags([...tags, value]);
                    setTagInput("");
                  }
                }
                if (e.key === ",") {
                  e.preventDefault();
                  const value = tagInput.split(",")[0].trim();
                  if (value && !tags.includes(value)) {
                    setTags([...tags, value]);
                    setTagInput(tagInput.slice(tagInput.indexOf(",") + 1).trimStart());
                  }
                }
              }}
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Press Enter or comma to add a tag.
            </p>
            <AnimatePresence>
              {tags.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {tags.map((t) => (
                    <motion.li
                      key={t}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((x) => x !== t))}
                        className="rounded-full p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-500"
                        aria-label={`Remove tag ${t}`}
                      >
                        <span className="sr-only">Remove</span>
                        <span aria-hidden>×</span>
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Relations
            </label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Link this post to courses (e.g. for homework or exam prep).
            </p>
            <ClassRelations
              exist={true}
              onChange={(e) => {
                setClassConnections(e);
              }}
            />
          </div>
        </section>
      </div>
      <AnimatePresence>
        {title &&
          tiptapDoc &&
          (tiptapDoc?.content?.length ?? 0) > 0 && (
            <motion.section
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring" }}
              className="fixed bottom-24 left-1/4 right-1/4 h-16 w-1/2 rounded-full bg-orange-500 p-4"
            >
              <button
                onClick={() => {
                  createPost();
                }}
                className="h-full w-32 cursor-pointer rounded-full duration-500 hover:scale-105 hover:shadow-md"
              >
                <h2 className="font-eudoxus font-bold text-white">Submit</h2>
              </button>
            </motion.section>
          )}
      </AnimatePresence>
    </motion.main>
  );
};

export default BuildPost;
