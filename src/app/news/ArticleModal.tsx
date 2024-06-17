"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {ArticleType, ParagraphBlock} from "./Article";
import { supabase } from "../../../config/mesa-config";
import {IoCalendar, IoExpandOutline, IoTime} from "react-icons/io5";
import { months } from "../../../config/calendar";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";

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
  const [image, hasImage] = useState(false)

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
    const params = new URLSearchParams(searchParams);
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
      hasImage(asImage)
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
    hasImage
}: {
  article: ArticleType;
  disengage: any;
  hasImage: boolean
}) => {
  const date = new Date(article.created_at);

  return (
      <motion.ul className="fixed flex justify-center overflow-y-scroll h-full w-screen top-0 duration-300 px-2 lg:px-32 pt-32 left-0">
        <motion.main
            initial={{ y: 800, opacity: 0}} animate={{ y: 0, opacity: 1}} transition={{ duration: 0.7, type: 'spring'}}
            exit={{ y: 800, opacity: 0}}
            key={article.id}
            className="bg-white dark:bg-zinc-700 min-h-full h-fit z-40 p-10 dark:text-white rounded-t-[50px] shadow-md flex flex-col gap-10"
        >
          <header className="w-full flex flex-col justify-between">
            {hasImage &&
                <ul className="relative w-full h-48 xl:h-[600px] rounded-[42px] mb-7 bg-black">
                  <Image className="rounded-[42px] hover:shadow-2xl shadow-lg hover:scale-[1.02] duration-500"
                         src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/NewsPictures/${article.id}/context.png`}
                         alt={"Context"} fill objectFit={"cover"}/>
                </ul>
            }
            <p className="font-eudoxus font-bold text-slate-400 text-xl">{article?.category.toUpperCase()}</p>
            <ul className="flex justify-between items-center">
              <h1
                  className="font-eudoxus font-black bg-gradient-to-tr dark:from-orange-400 dark:to-pink-500 from-red-800 to-orange-600 inline-block bg-clip-text text-transparent text-5xl">
                {article.title}
              </h1>
            </ul>
            <ul
                className="flex flex-col font-eudoxus text-slate-600 dark:text-slate-100 text-lg font-light mt-4 gap-2 p-0.5 ">

              <h2 className="flex gap-1.5 items-center border-2 w-fit p-1 px-2 bg-slate-50 dark:bg-zinc-700 shadow-md rounded-lg">
                Author:
                <ul className="relative w-6 h-6 rounded-full">
                  <Image className="rounded-full"
                         src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars/${article.userid}`}
                         alt={"Profile"} loading={"lazy"} fill/>
                </ul>
                Joshua Rashtian
              </h2>

              <h2 className="flex gap-1.5 items-center border-2 w-fit p-1 px-2 bg-slate-50 dark:bg-zinc-700 shadow-md rounded-lg">
                <IoCalendar/>
                {`${
                    months[date.getMonth()]
                } ${date.getDate()}, ${date.getFullYear()}`}
                <IoTime/>
                {`
            ${date.getHours() <= 12 ? date.getHours() : date.getHours() - 12}:${
                    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
                } ${date.getHours() < 12 ? "AM" : "PM"}`}
              </h2>
            </ul>
          </header>
          <div className="flex flex-col font-eudoxus gap-3">
            {article.details.content.map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                      <h1 className=" flex-nowrap" key={i}>
                        {block.content?.map((component) => {
                          switch (component.type) {
                            case "text":
                              return <ParagraphBlock component={component} key={i}/>;
                          }
                        })}
                      </h1>
                  );
                case "bulletList":
                  return (
                      <div className="flex flex-col font-eudoxus gap-3" key={i}>
                        {block.content?.map((item, i) => (
                            <ul key={i}>
                              {item.content?.map(
                                  (
                                      f: { content: any[] },
                                      i: React.Key | null | undefined
                                  ) => (
                                      <ul key={i}>
                                        {f.content?.map((paragraph, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/>
                                              <ParagraphBlock component={paragraph} key={i}/>
                                            </li>
                                        ))}
                                      </ul>
                                  )
                              )}
                            </ul>
                        ))}
                      </div>
                  );
              }
            })}
          </div>
        </motion.main>
        <motion.ul
            initial={{ opacity: 0}}
            animate={{ opacity: 0.5}}
            exit={{ opacity: 0}}
            className="fixed inset-0 z-20
         bg-gray-500 opacity-50"
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
        <IoExpandOutline/>
      </button>
  );
};
