"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../../../../config/mesa-config";
import { userContext } from "@/app/AuthContext";
import { text } from "stream/consumers";

interface Section {
  type: string;
  text?: string;
}

const BuildPost = () => {
  const searchParams = useSearchParams();
  const user = useContext(userContext);
  const router = useRouter();

  const [title, setTitle] = useState<string>();
  const [json, setJson] = useState<object>();
  const [sections, setSelections] = useState<Section[]>([{ type: "initial" }]);
  const [tags, setTags] = useState<string[]>();

  const [errorMessage, setErrorMessage] = useState<string>();

  const memoizeJSON = useMemo(() => {
    setJson({
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
        }
      }),
    });
  }, [title, sections]);

  const createPost = async () => {
    const userInfo = user?.userData;

    if (!userInfo) {
      console.error("No User!");
      return;
    }

    const { error } = await supabase.from("posts").insert({
      userid: userInfo.id,
      title: title,
      data: json,
      type: "post",
      creator: {
        id: userInfo.id,
        realname: userInfo.real_name,
        username: userInfo.username,
      },
      tags: tags,
    });

    if (error) {
      console.error(error);
    }

    console.log("Success!");
    router.push("/connect/social");
  };

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="flex flex-col h-full"
    >
      <section className="h-full gap-5 flex flex-col">
        <h1 className="font-bold text-3xl">Create Post</h1>

        <section className="flex flex-row justify-center text-2xl gap-3 items-center">
          <input
            placeholder="Give your post a wonderful title..."
            className="p-1 rounded-full focus:outline-none focus:shadow-md focus:p-3 px-5 duration-500 w-full"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        <article className="h-full flex flex-col gap-3 ">
          {sections.map((e, i) => {
            switch (e.type) {
              case "initial":
                return (
                  <section key={i} className="h-1/4">
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
                          })
                        );
                      }}
                      placeholder="'wonderful post idea about the sky being blue'"
                      className=" resize-none rounded-3xl w-full p-5 focus:outline-none hover:shadow-md hover:scale-[1.01] h-full focus:shadow-md duration-300"
                    />
                    <AnimatePresence>
                      {sections[0].text && (
                        <motion.h2
                          initial={{ opacity: 0, y: -40 }}
                          animate={{ opacity: 1, y: -50 }}
                          exit={{ opacity: 0, y: -40 }}
                          className=" text-slate-400 text-center "
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
                          sections.filter((_, index) => index !== i)
                        );
                      }}
                      className="p-2 translate-y-10 z-50"
                    >
                      x
                    </button>
                    <textarea
                      onChange={(a) => {
                        e.text = a.target.value;
                      }}
                      placeholder="'wonderful post idea about the sky being blue'"
                      className=" resize-none h-full rounded-3xl w-full p-8 z-0 focus:outline-none hover:shadow-md focus:shadow-md duration-300"
                    />
                  </section>
                );
              default:
                null;
            }
          })}
          <section className="w-full mt-10 font-geist flex flex-row justify-center rounded-2xl h-12 bg-slate-50">
            <button
              onClick={() => {
                setSelections([...sections, { type: "text" }]);
              }}
              className="w-full hover:scale-105 duration-300"
            >
              + Text Component
            </button>
            <button className="w-full">+ Code Component</button>
          </section>
        </article>

        <section className="flex flex-col justify-center text-2xl gap-3">
          <h2 className="font-bold text-slate-600">Tags:</h2>
          <input
            placeholder="Tags are split up by commas. Input all tags with a comma after each."
            className="p-1 rounded-full focus:outline-none focus:shadow-md focus:p-3 px-5 duration-500 w-full"
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
                className="flex flex-row items-center font-mono gap-4"
              >
                <h1 className="text-slate-400">Applied Tags</h1>
                <li className="w-0.5 h-full bg-slate-400" />
                {tags.map((e) => {
                  return (
                    <ul key={e} className="bg-slate-200 p-2 px-4 rounded-full">
                      <h1>{e}</h1>
                    </ul>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </section>
      </section>
      <AnimatePresence>
        {title && sections[0].text?.length > 5 && (
          <motion.section
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring" }}
            className="w-full h-16 bg-orange-500 p-4 rounded-full"
          >
            <button
              onClick={() => {
                createPost();
              }}
              className=" cursor-pointer hover:scale-105 hover:shadow-md duration-500 h-full rounded-full w-32"
            >
              <h2 className="font-bold text-white">Submit</h2>
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default BuildPost;
