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
import { IoExpandOutline } from "react-icons/io5";
import { months } from "../../../config/calendar";

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
    createModal: (article: ArticleType) => {
      setArticle(article);
      handleParams(article.id);
    },
    disarmModal: () => {},
  };

  return (
    //@ts-ignore
    <ArticleModal.Provider value={value}>
      {children}
      {article && (
        <ExpandedArticle
          disengage={() => {
            setArticle(undefined);
            console.log("click");
            handleParams();
          }}
          article={article}
        />
      )}
    </ArticleModal.Provider>
  );
};


export const ExpandedArticle = ({
  article,
  disengage,
}: {
  article: ArticleType;
  disengage: any;
}) => {
  const date = new Date(article.created_at);

  return (
    <ul className="absolute flex justify-center overflow-y-scroll min-h-screen w-screen top-0 px-32 pt-32 left-0">
      <main
          onClick={() => {
          }}
          key={article.id}
          className="bg-white z-50 p-10 rounded-t-2xl overflow-y-scroll no-scrollbar shadow-md min-h-full w-3/4 flex flex-col gap-10"
      >
        <header className="w-full flex flex-col justify-between">
          <h1 className="font-bold font-eudoxus bg-gradient-to-tr dark:from-orange-400 dark:to-pink-500 from-red-800 to-purple-500 inline-block bg-clip-text text-transparent text-5xl">
            {article.title}
          </h1>

          <ul className="flex flex-row gap-2 p-0.5 items-center">
            { /*<ul className="w-6 h-6 z-0 relative">

              <Image
                  fill={true}
                  style={{objectFit: "cover", borderRadius: "100%"}}
                  alt="Profile Picture"
                  src={article.userid}
              />

            </ul>*/}
            <h1 className=" dark:text-slate-200 text-xl">
              Joshua Rashtian / @jrdev
            </h1>
          </ul>
          <h2 className="font-eudoxus">
            {`${
                months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()} | ${date.getHours()}:${
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
            } ${date.getHours() < 12 ? "AM" : "PM"}`}
          </h2>
        </header>
        <div className="flex flex-col font-eudoxus gap-3">
          {article.details.content.map((block, i) => {
            switch (block.type) {
              case "paragraph":
                return (
                    <div className="flex gap-1" key={i}>
                      {block.content?.map((component) => {
                        switch (component.type) {
                          case "text":
                            return (
                                <ParagraphBlock component={component} key={i}/>
                            );
                        }
                      })}
                    </div>
                );
              case "bulletList":
                return (
                    <div className="flex flex-col font-eudoxus gap-3" key={i}>
                      {block.content?.map((item, i) => (
                          <ul key={i}>
                            {item.content?.map((f: { content: any[]; }, i: React.Key | null | undefined) => (
                                <ul key={i}>
                                  {
                                    f.content.map((paragraph, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                          <div className="w-1.5 h-1.5 rounded-full bg-black"/>
                                          <ParagraphBlock component={paragraph} key={i}/>
                                        </li>
                                    ))
                                  }
                                </ul>
                            ))}
                          </ul>
                      ))}
                    </div>
                );
            }
          })}
        </div>
      </main>
      <ul
          className="fixed inset-0 z-20
         bg-gray-500 opacity-50"
          onClick={() => {
            disengage();
          }}
      />
    </ul>
  );
};

export const ExpandArticle = (params: any) => {
  const modal = useContext(ArticleModal);
  return (
      <button
          {...params}
          onClick={() => {
            // @ts-ignore
            modal.createModal();
          }}
      >
        <IoExpandOutline/>
      </button>
  );
};
