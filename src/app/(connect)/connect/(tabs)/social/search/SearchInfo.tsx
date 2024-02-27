"use client";

import { EventType, PostType } from "@/_assets/types";
import { Event } from "@/_components/socialhub/Event";
import Post from "@/_components/socialhub/Post";
import Wim from "@/_components/socialhub/Wim";
import React from "react";

const SearchInfo = ({ data }: { data: PostType[] | EventType[] }) => {
  console.log(data);
  return (
    <div
      className="
    p-5 flex flex-col min-h-full min-w-full overflow-y-scroll"
    >
      <h1>
        {data.length} {data.length > 1 ? "results" : "result"}
      </h1>

      <section className="gap-3 flex flex-col">
        {data.map((e, index) => {
          switch (e.type) {
            case "post":
              return <Post post={e} key={index} />;
            case null:
              return <Post post={e} key={index} />;
            case "wim":
              return <Wim post={e} key={index} />;
          }
          if (e.start) return <Event event={e} key={index} />;
        })}
      </section>
    </div>
  );
};

export default SearchInfo;
