"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ArticleType, ParagraphBlock } from "./Article";
import { supabase } from "../../../config/mesa-config";
import { IoCalendar, IoExpandOutline, IoTime } from "react-icons/io5";
import { months } from "../../../config/calendar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type ArtModal = {
  createModal: (article: ArticleType) => void;
  disarmModal: () => void;
};

export const ArticleModal = createContext<ArtModal>({
  createModal: (component: any) => {},
  disarmModal: () => {},
});

export const ArticleModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [article, setArticle] = useState<ArticleType>();
  const [image, hasImage] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      const { data, error } = await supabase
        .from("newsposts")
        .select("*")
        // @ts-ignore
        .eq("id", searchParams.get("arid"))
        .single();
      if (error) {
        console.log(error);
      } else {
        // @ts-ignore
        setArticle(data);
      }
    };

    if (searchParams.get("arid")) {
      getArticle();
    }
  }, [searchParams]);

  function handleParams(term?: string) {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set("arid", term);
    } else {
      params.delete("arid");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const value = {
    createModal: (article: ArticleType, asImage: boolean) => {
      setArticle(article);
      handleParams(article.id);
      hasImage(asImage);
    },
    disarmModal: () => {},
  };

  return (
    //@ts-ignore
    <ArticleModal.Provider value={value}>
      {children}
      <AnimatePresence>
        {article && (
          <ExpandedArticle
            disengage={() => {
              setArticle(undefined);
              console.log("click");
              handleParams();
            }}
            hasImage={image}
            article={article}
          />
        )}
      </AnimatePresence>
    </ArticleModal.Provider>
  );
};

export const ExpandedArticle = ({
  article,
  disengage,
  hasImage,
}: {
  article: ArticleType;
  disengage: any;
  hasImage: boolean;
}) => {
  const date = new Date(article.created_at);

  return (
    <motion.ul className="fixed left-0 top-0 flex h-full w-screen justify-center overflow-y-scroll px-2 pt-32 duration-300 lg:px-32">
      <motion.main
        initial={{ y: 800, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        exit={{ y: 800, opacity: 0 }}
        key={article.id}
        className="z-40 flex h-fit min-h-full flex-col gap-10 rounded-t-[50px] bg-white p-10 shadow-md dark:bg-zinc-700 dark:text-white"
      >
        <header className="flex w-full flex-col justify-between">
          {hasImage && (
            <ul className="relative mb-7 h-48 w-full rounded-[42px] bg-black xl:h-[600px]">
              <Image
                className="rounded-[42px] shadow-lg duration-500 hover:scale-[1.02] hover:shadow-2xl"
                src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/NewsPictures/${article.id}/context.png`}
                alt={"Context"}
                fill
                objectFit={"cover"}
              />
            </ul>
          )}
          <p className="font-eudoxus text-xl font-bold text-slate-400">
            {article?.category.toUpperCase()}
          </p>
          <ul className="flex items-center justify-between">
            <h1 className="inline-block bg-gradient-to-tr from-red-800 to-orange-600 bg-clip-text font-eudoxus text-5xl font-black text-transparent dark:from-orange-400 dark:to-pink-500">
              {article.title}
            </h1>
          </ul>
          <ul className="mt-4 flex flex-col gap-2 p-0.5 font-eudoxus text-lg font-light text-slate-600 dark:text-slate-100">
            <h2 className="flex w-fit items-center gap-1.5 rounded-lg border-2 bg-slate-50 p-1 px-2 shadow-md dark:bg-zinc-700">
              Author:
              <ul className="relative h-6 w-6 rounded-full">
                <Image
                  className="rounded-full"
                  src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars/${article.userid}`}
                  alt={"Profile"}
                  loading={"lazy"}
                  fill
                />
              </ul>
              Joshua Rashtian
            </h2>

            <h2 className="flex w-fit items-center gap-1.5 rounded-lg border-2 bg-slate-50 p-1 px-2 shadow-md dark:bg-zinc-700">
              <IoCalendar />
              {`${
                months[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()}`}
              <IoTime />
              {`
            ${date.getHours() <= 12 ? date.getHours() : date.getHours() - 12}:${
              date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            } ${date.getHours() < 12 ? "AM" : "PM"}`}
            </h2>
          </ul>
        </header>
        <div className="flex flex-col gap-3 font-eudoxus">
          {article.details.content.map((block, i) => {
            switch (block.type) {
              case "heading":
                if ((block as any).attrs?.level === 1) {
                  return (
                    <h1
                      key={i}
                      className="font-eudoxus text-3xl font-extrabold"
                    >
                      {block.content?.map((t: any) => t.text).join(" ")}
                    </h1>
                  );
                }
                return null;
              case "paragraph":
                return (
                  <h1 className="flex-nowrap" key={i}>
                    {block.content?.map((component) => {
                      switch (component.type) {
                        case "text":
                          return (
                            <ParagraphBlock component={component} key={i} />
                          );
                        case "image":
                          return (
                            <ul
                              key={i}
                              className="relative my-2 h-[400px] w-full"
                            >
                              <Image
                                src={component.attrs?.src}
                                alt={component.attrs?.alt || "Image"}
                                fill
                                className="rounded-xl object-contain"
                              />
                            </ul>
                          );
                      }
                    })}
                  </h1>
                );
              case "codeBlock":
                return (
                  <pre
                    key={i}
                    className="overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm text-zinc-900 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <code>
                      {block.content?.map((c: any) => c.text).join("\n")}
                    </code>
                  </pre>
                );
              case "bulletList":
                return (
                  <div className="flex flex-col gap-3 font-eudoxus" key={i}>
                    {block.content?.map((item, i) => (
                      <ul key={i}>
                        {item.content?.map(
                          (
                            f: { content: any[] },
                            i: React.Key | null | undefined,
                          ) => (
                            <ul key={i}>
                              {f.content?.map((paragraph, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                  <ParagraphBlock
                                    component={paragraph}
                                    key={i}
                                  />
                                </li>
                              ))}
                            </ul>
                          ),
                        )}
                      </ul>
                    ))}
                  </div>
                );
              case "image":
                return (
                  <ul key={i} className="relative my-2 h-[400px] w-full">
                    <Image
                      src={block.attrs?.src}
                      alt={block.attrs?.alt || "Image"}
                      fill
                      className="rounded-xl object-contain"
                    />
                  </ul>
                );
            }
          })}
        </div>
      </motion.main>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-20 bg-gray-500 opacity-50"
        onClick={() => {
          disengage();
        }}
      />
    </motion.ul>
  );
};

export const ExpandArticle = (params: any) => {
  const modal = useContext(ArticleModal);
  return (
    <button
      {...params}
      onClick={() => {
        // @ts-ignore
        modal.createModal(params.article, params.hasImage);
      }}
    >
      <IoExpandOutline />
    </button>
  );
};
