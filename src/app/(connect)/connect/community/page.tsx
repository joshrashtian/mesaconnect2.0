"use server";
import TitleComponent from "@/(mesaui)/title";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import HorizontalCommunityItem from "@/(mesaui)/HorizontalCommunityItem";
import CommunityItem, { CommunityItemType } from "@/(mesaui)/CommunityItem";
import StandardButton from "@/(mesaui)/StandardButton";
const CommunityPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: Communities, error } = await supabase.rpc("get_communities");

  const { data: RecommendedCommunities, error: RecommendedError } =
    await supabase.from("communities").select().limit(5);

  return (
    <div className="flex flex-col gap-7 font-eudoxus">
      <TitleComponent size="medium">Communities</TitleComponent>
      <section className="flex flex-col gap-3 font-eudoxus">
        <ul className="flex flex-col rounded-3xl bg-white p-6 dark:bg-zinc-700 dark:text-zinc-200">
          <div className="no-scrollbar flex flex-row items-center gap-2 overflow-x-scroll px-5">
            {Communities?.map((community: CommunityItemType) => (
              <HorizontalCommunityItem
                key={community.id}
                community={community}
              />
            ))}
          </div>
          <h1 className="ml-5 mt-3">Your Communities</h1>
          <StandardButton href={"/connect/community/found"} buttonType="link">
            Found A Community
          </StandardButton>
        </ul>
        <TitleComponent size="small">Communities</TitleComponent>
        {RecommendedCommunities && (
          <div className="flex flex-col items-center gap-2">
            {RecommendedCommunities.map((community: CommunityItemType) => (
              <CommunityItem key={community.id} community={community} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CommunityPage;
