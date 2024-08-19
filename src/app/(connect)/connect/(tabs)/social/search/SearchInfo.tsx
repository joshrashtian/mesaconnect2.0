"use client";

import { EventType, PostType } from "@/_assets/types";
import { Event } from "@/_components/socialhub/Event";
import Post from "@/_components/socialhub/Post";
import PostListItem from "@/_components/socialhub/PostListItem";
import Wim from "@/_components/socialhub/Wim";
import WimListItem from "@/_components/socialhub/WimListItem";
import React from "react";

const SearchInfo = ({ data }: { data: PostType[] | EventType[] | any[] }) => {
  return (
    <div
      className="
    p-5 flex flex-col gap-5 min-h-full min-w-full overflow-y-scroll no-scrollbar"
    >
      <ul className="p-4 bg-gray-50 rounded-full">
        <h1 className="font-eudoxus ">
          {data.length !== 0
            ? data.length
            : "There are no search results with this query."}{" "}
          {data.length > 1 ? "results" : data.length === 0 ? "" : "result"}
        </h1>
      </ul>

      <section className="gap-1 flex flex-col">
        {data.map((e, index) => {
          switch (e.type) {
            case "post":
              return <PostListItem index={index} post={e} key={index} />;
            case null:
              return <PostListItem index={index} post={e} key={index} />;
            case "wim":
              return <WimListItem post={e} key={index} />;
          }
          if (e.start) return <Event event={e} key={index} />;
        })}
      </section>
    </div>
  );
};

export default SearchInfo;
