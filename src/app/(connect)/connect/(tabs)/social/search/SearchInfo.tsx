"use client";

import CommunityItem from "@/(mesaui)/CommunityItem";
import UserItem from "@/(mesaui)/UserItem";
import { EventType, PostType } from "@/_assets/types";
import { Event } from "@/_components/socialhub/Event";
import Post from "@/_components/socialhub/Post";
import PostListItem from "@/_components/socialhub/PostListItem";
import Wim from "@/_components/socialhub/Wim";
import WimListItem from "@/_components/socialhub/WimListItem";
import React from "react";

const SearchInfo = ({ data }: { data: PostType[] | EventType[] | any[] }) => {
  return (
    <div className="no-scrollbar mb-40 flex min-h-full min-w-full flex-col gap-5 overflow-y-scroll p-5">
      <ul className="rounded-full bg-gray-50 p-4">
        <h1 className="font-eudoxus">
          {data.length !== 0
            ? data.length
            : "There are no search results with this query."}{" "}
          {data.length > 1 ? "results" : data.length === 0 ? "" : "result"}
        </h1>
      </ul>

      <section className="flex flex-col gap-1">
        {data.map((e, index) => {
          if (e.major)
            return (
              <UserItem user={e} key={index}>
                <p>{e.real_name}</p>
              </UserItem>
            );

          if (e.primary_campus)
            return <CommunityItem community={e} key={index} />;
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
