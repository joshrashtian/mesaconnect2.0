import Image from "next/image";
import React from "react";
import { months } from "../../../config/calendar";

export type ArticleType = {
  id: string;
  title: string;
  post_data: [
    {
      text?: string;
      style?: string;
    }
  ];
  created_at: Date;
  author: {
    id: string;
    username: string;
    realname: string;
    avatar_url: string;
  };
  tags: string[];
  category: string;
};

const Article = ({ article }: { article: ArticleType }) => {
  const date = new Date(article.created_at);

  return (
    <main key={article.id} className="h-full flex flex-col gap-10">
      <header className="w-full flex flex-col justify-between">
        <h1 className="font-bold bg-gradient-to-tr dark:from-orange-400 dark:to-pink-500 from-red-800 to-purple-500 inline-block bg-clip-text text-transparent text-5xl">
          {article.title}
        </h1>
        <ul className="flex flex-row gap-2 p-0.5 items-center">
          <ul className="w-6 h-6 z-0 relative">
            <Image
              fill={true}
              style={{ objectFit: "cover", borderRadius: "100%" }}
              alt="Profile Picture"
              src={article.author.avatar_url}
            />
          </ul>
          <h1 className=" dark:text-slate-200 text-xl">
            {article.author.realname} / @{article.author.username} /{" "}
          </h1>
        </ul>
        <h2 className="font-eudoxus">
          {`${
            months[date.getMonth()]
          } ${date.getDate()}, ${date.getFullYear()} | ${date.getHours()}:${
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
          } ${date.getHours() < 12 ? "AM" : "PM"}`}
        </h2>
      </header>
      <section>
        {article.post_data.map((e: any, i: number) => {
          switch (e.type) {
            case "h1":
              return <h1 key={i}>{e.text}</h1>;
            case "h2":
              return <h2 key={i}>{e.text}</h2>;
            case "text":
              return (
                <p key={i} className={e.style}>
                  {e.text}
                </p>
              );
            case "image":
              return (
                <ul className="w-full h-64" key={i}>
                  <Image
                    src={e.image}
                    style={{ objectFit: "contain" }}
                    fill={true}
                    alt={e.alt}
                    width={128}
                  />
                </ul>
              );
          }
        })}
      </section>
    </main>
  );
};

export default Article;
