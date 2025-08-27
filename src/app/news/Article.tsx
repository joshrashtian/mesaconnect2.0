import React from "react";
import { months } from "../../../config/calendar";
import { ExpandArticle } from "./ArticleModal";
import Image from "next/image";
import { IoCalendar, IoPerson, IoTime } from "react-icons/io5";

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
              },
            ];
            attrs: {
              src: string;
              alt: string;
            };
          },
        ];
        attrs: {
          src: string;
          alt: string;
        };
      },
    ];
  };
  created_at: Date;
  userid: string;
  tags: string[];
  category: string;
};

const Article = ({
  article,
  image,
}: {
  article: ArticleType;
  image: boolean;
}) => {
  const date = new Date(article.created_at);

  return (
    <main
      key={article.id}
      className="flex h-full flex-col gap-10 rounded-2xl bg-white p-10 shadow-md dark:bg-slate-700"
    >
      <header className="flex w-full flex-col justify-between">
        {image && (
          <ul className="relative mb-7 h-[600px] w-full rounded-[42px] bg-black">
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
          <ExpandArticle
            className="text-3xl duration-300 hover:scale-[1.15] hover:text-orange-600 dark:text-white"
            article={article}
            hasImage={image}
          />
        </ul>
        <ul className="flex flex-row items-center gap-2 p-0.5 font-eudoxus text-lg font-light text-slate-600 dark:text-slate-100">
          <ul className="relative h-6 w-6 rounded-full">
            <Image
              className="rounded-full"
              src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars/${article.userid}`}
              alt={"Profile"}
              loading={"lazy"}
              fill
            />
          </ul>
          <h2> Joshua Rashtian</h2>
          <ul className="h-1 w-1 rounded-sm bg-slate-600" />
          <IoCalendar />
          <h2 className="">
            {`${
              months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}
          </h2>
          <ul className="h-1 w-1 rounded-sm bg-slate-600" />
          <IoTime />
          <h2>
            {`
            ${date.getHours() <= 12 ? date.getHours() : date.getHours() - 12}:${
              date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            } ${date.getHours() < 12 ? "AM" : "PM"}`}
          </h2>
        </ul>
      </header>
      <div className="flex flex-col gap-3 font-eudoxus dark:text-white">
        {article.details.content.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <h1 className="flex-nowrap" key={i}>
                  {block.content?.map((component) => {
                    switch (component.type) {
                      case "text":
                        return <ParagraphBlock component={component} key={i} />;
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
                                <ParagraphBlock component={paragraph} key={i} />
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
    </main>
  );
};

export const ParagraphBlock = ({
  component,
}: {
  component: { marks: any[]; text: string };
}) => {
  return (
    <p
      className={
        component.marks &&
        component.marks
          .map((a) => classNames?.find((b) => b.type === a.type)?.returns)
          .join(" ")
      }
    >
      {component.text}
    </p>
  );
};

export default Article;
