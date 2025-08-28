"use client";

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import ClassRelations from "./ClassRelations";
import { useToast } from "@/app/(connect)/InfoContext";
import Tiptap from "./TipTap";

interface Section {
  type: string;
  text?: string;
}

const BuildPost = () => {
  useSearchParams();
  const user = useContext(userContext);
  const router = useRouter();

  const [title, setTitle] = useState<string>();
  const [tiptapDoc, setTiptapDoc] = useState<any>();
  const [sections, setSelections] = useState<Section[]>([{ type: "initial" }]);
  const [tags, setTags] = useState<string[]>();
  const [classConnections, setClassConnections] = useState<string[]>();
  const [editorType, setEditorType] = useState<"legacy" | "tiptap">("legacy");

  const [errorMessage, setErrorMessage] = useState<string>();

  const toast = useToast();

  const createPost = async () => {
    const userInfo = user?.userData;

    if (!userInfo) {
      console.error("No User!");
      return;
    }

    const isRich = editorType === "tiptap";
    const contentPayload = isRich
      ? { tiptap: tiptapDoc }
      : {
          data: sections.map((e) => {
            switch (e.type) {
              case "initial":
                return {
                  type: "text",
                  text: e.text,
                };
              case "text":
                return {
                  type: "text",
                  text: e.text,
                };
              case "code":
                return {
                  type: "code",
                  text: e.text,
                };
            }
          }),
        };

    const { error } = await supabase.from("posts").insert({
      // @ts-ignore - typed via config/supabasetypes
      userid: userInfo.id,
      title: title ?? null,
      data: contentPayload,
      type: editorType === "tiptap" ? "post-tiptap" : "post",
      creator: {
        id: userInfo.id,
        realname: userInfo.real_name,
        username: userInfo.username,
      },
      tags: tags ?? null,
      relations: classConnections ?? null,
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
      className="mb-16 flex h-full flex-col overflow-y-scroll"
    >
      <section className="flex h-full flex-col gap-5">
        <h1 className="text-3xl font-bold">Create Post</h1>

        <section className="flex flex-row items-center justify-center gap-3 text-2xl">
          <input
            placeholder="Give your post a wonderful title..."
            className="w-full rounded-full p-1 px-5 duration-500 focus:p-3 focus:shadow-md focus:outline-none"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        {/* Editor type toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Editor:</span>
          <div className="inline-flex overflow-hidden rounded-full border">
            <button
              type="button"
              onClick={() => setEditorType("legacy")}
              aria-pressed={editorType === "legacy"}
              className={`px-4 py-1 text-sm ${
                editorType === "legacy" ? "bg-slate-900 text-white" : "bg-white"
              }`}
            >
              Simple
            </button>
            <button
              type="button"
              onClick={() => setEditorType("tiptap")}
              aria-pressed={editorType === "tiptap"}
              className={`px-4 py-1 text-sm ${
                editorType === "tiptap" ? "bg-slate-900 text-white" : "bg-white"
              }`}
            >
              New Editor (Beta)
            </button>
          </div>
        </div>

        {editorType === "legacy" ? (
          <article className="flex flex-col gap-3">
            {sections.map((e, i) => {
              switch (e.type) {
                case "initial":
                  return (
                    <section key={i} className="h-1/4 resize-y">
                      <textarea
                        maxLength={100}
                        onChange={(e) => {
                          setSelections(
                            sections.map((d, index) => {
                              if (index === i) {
                                return {
                                  ...d,
                                  text: e.target.value,
                                };
                              }
                              return d;
                            }),
                          );
                        }}
                        placeholder="'wonderful post idea about the sky being blue'"
                        className="h-48 w-full resize-none rounded-3xl p-5 duration-300 hover:scale-[1.01] hover:shadow-md focus:shadow-md focus:outline-none"
                      />
                      <AnimatePresence>
                        {sections[0].text && (
                          <motion.h2
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: -50 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="text-center text-slate-400"
                          >
                            {sections[0].text.length} Characters /{" "}
                            {sections[0].text.split(" ").length} Words
                          </motion.h2>
                        )}
                      </AnimatePresence>
                    </section>
                  );
                case "text":
                  return (
                    <section key={i} className="h-1/4">
                      <button
                        onClick={() => {
                          setSelections(
                            sections.filter((_, index) => index !== i),
                          );
                        }}
                        className="z-50 translate-y-10 p-2"
                      >
                        x
                      </button>
                      <textarea
                        onChange={(a) => {
                          e.text = a.target.value;
                        }}
                        placeholder="'wonderful post idea about the sky being blue'"
                        className="z-0 h-48 w-full resize-none rounded-3xl p-8 duration-300 hover:shadow-md focus:shadow-md focus:outline-none"
                      />
                    </section>
                  );
                case "code":
                  return (
                    <section
                      key={i}
                      className="no-scrollbar h-48 overflow-y-scroll rounded-xl border-4 bg-slate-700 px-4"
                    >
                      <ul className="z-50 w-full py-4">
                        <button
                          onClick={() => {
                            setSelections(
                              sections.filter((_, index) => index !== i),
                            );
                          }}
                          className="bg-white p-0.5 px-2 font-mono"
                        >
                          Del Code Block
                        </button>
                      </ul>
                      <textarea
                        onChange={(a) => {
                          e.text = a.target.value;
                        }}
                        autoCorrect="false"
                        placeholder="Paste code / System.out.println('Hello World'); "
                        className="z-0 h-48 w-full resize-y border-slate-200 bg-slate-700 font-mono text-white duration-300 hover:shadow-md focus:shadow-md focus:outline-none"
                      />
                    </section>
                  );
                default:
                  null;
              }
            })}
            <section className="z-50 mt-24 flex h-12 w-full flex-row justify-center rounded-2xl bg-slate-50 font-geist">
              <button
                onClick={() => {
                  setSelections([...sections, { type: "text" }]);
                }}
                className="w-full duration-300 hover:scale-105"
              >
                + Text Component
              </button>
              <button
                onClick={() => {
                  setSelections([...sections, { type: "code" }]);
                }}
                className="w-full duration-300 hover:scale-105"
              >
                + Code Component
              </button>
            </section>
          </article>
        ) : (
          <div className="flex flex-col gap-3">
            <Tiptap json={(j: any) => setTiptapDoc(j)} components={null} />
          </div>
        )}
        <pre>{JSON.stringify(tiptapDoc, null, 2)}</pre>
        <section className="flex flex-col justify-center gap-3 text-2xl">
          <h2 className="font-eudoxus font-bold text-slate-600">Tags:</h2>
          <input
            placeholder="Tags are split up by commas. Input all tags with a comma after each."
            className="w-full rounded-full p-1 px-5 duration-500 focus:p-3 focus:shadow-md focus:outline-none"
            type="text"
            onChange={(e) => setTags(e.target.value.split(","))}
          />
          <AnimatePresence>
            {tags && tags[0].length > 0 && (
              <motion.ul
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: "spring " }}
                className="flex flex-row items-center gap-4 font-mono"
              >
                <h1 className="text-slate-400">Applied Tags</h1>
                <li className="h-full w-0.5 bg-slate-400" />
                {tags.map((e) => {
                  return (
                    <ul key={e} className="rounded-full bg-slate-200 p-2 px-4">
                      <h1>{e}</h1>
                    </ul>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
          <h2 className="font-eudoxus font-bold text-slate-600">Relations:</h2>
          <ClassRelations
            exist={true}
            onChange={(e) => {
              setClassConnections(e);
            }}
          />
        </section>
      </section>
      <AnimatePresence>
        {title &&
          ((editorType === "legacy" &&
            sections[0].text &&
            sections[0].text?.length > 5) ||
            (editorType === "tiptap" &&
              tiptapDoc &&
              (tiptapDoc?.content?.length ?? 0) > 0)) && (
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
