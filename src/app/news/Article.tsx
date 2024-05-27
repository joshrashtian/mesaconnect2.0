import React from "react";
import {months} from "../../../config/calendar";
import {ExpandArticle} from "./ArticleModal";
import Image from "next/image";
import {IoCalendar, IoPerson, IoTime} from "react-icons/io5";

export const classNames = [
  {
    type: "bold",
    returns: "font-bold",
  },
  {
    type: "italic",
    returns: "italic",
  },
];

export type ArticleType = {
  id: string;
  title: string;
  details: {
    type: string;
    content: [
      {
        type: string;
        content: [
          {
            content: any;
            type: string;
            text: string;
            marks: [
              {
                type: string;
              }
            ];
          }
        ];
      }
    ];
  };
  created_at: Date;
  userid: string;
  tags: string[];
  category: string;
};

const Article = ({ article, image }: { article: ArticleType, image: boolean }) => {
  const date = new Date(article.created_at);

  return (
    <main
      key={article.id}
      className="bg-white p-10 rounded-2xl shadow-md h-full flex flex-col gap-10"
    >
      <header className="w-full flex flex-col justify-between">
        {image &&
          <ul className="relative w-full h-[600px] rounded-[42px] mb-7 bg-black">
            <Image className="rounded-[42px] hover:shadow-2xl shadow-lg hover:scale-[1.02] duration-500"
                   src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/NewsPictures/${article.id}/context.png`}
                   alt={"Context"} fill objectFit={"cover"}/>
          </ul>
        }
        <p className="font-eudoxus font-bold text-slate-400 text-xl">ARTICLE</p>
        <ul className="flex justify-between items-center">
          <h1
            className="font-eudoxus font-black bg-gradient-to-tr dark:from-orange-400 dark:to-pink-500 from-red-800 to-orange-600 inline-block bg-clip-text text-transparent text-5xl">
            {article.title}
          </h1>
          <ExpandArticle
            className="text-3xl duration-300 hover:scale-[1.15] hover:text-orange-600"
            article={article}
          />
        </ul>
        <ul
          className="flex flex-row font-eudoxus text-slate-600 dark:text-slate-100 text-lg font-light gap-2 p-0.5 items-center">
          <IoPerson/>
          <h2> Joshua Rashtian</h2>
          <ul className="w-1 h-1 rounded-sm bg-slate-600"/>
          <IoCalendar/>
          <h2 className="">
            {`${
              months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}
          </h2>
          <ul className="w-1 h-1 rounded-sm bg-slate-600"/>
          <IoTime/>
          <h2>
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
                <div className="flex gap-1" key={i}>
                  {block.content?.map((component) => {
                    switch (component.type) {
                      case "text":
                        return (
                            <ParagraphBlock component={component} key={i} />
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
                            f.content?.map((paragraph, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                  <ParagraphBlock component={paragraph} key={i} />
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
  );
};

export const ParagraphBlock = ({component} : {component: { marks: any[]; text: string }}) => {
 return (
     <p
      className={
          component.marks &&
          component.marks
              .map(
                  (a) =>
                      classNames?.find((b) => b.type === a.type)
                          ?.returns
              )
              .join(" ")
      }
  >
    {component.text}
  </p>
 )
}

export default Article;
