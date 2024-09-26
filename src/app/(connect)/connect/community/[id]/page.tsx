"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import BlockCommunityItemProvider from "../BlockIndex";
import { type CommunityBlockIndex } from "../BlockIndex";
import TextBlockComponent from "./(components)/TextBlock";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("communities")
    .select("blocks")
    .eq("id", params.id)
    .single();

  if (!data || error) return null;
  return (
    <section className="flex flex-row flex-wrap p-4">
      {data.blocks.map((block: CommunityBlockIndex) => {
        switch (block.type) {
          case "text":
            return (
              <BlockCommunityItemProvider
                type={block.type}
                data={block.data}
                size="medium"
              >
                <TextBlockComponent />
              </BlockCommunityItemProvider>
            );
          default:
            return null;
        }
      })}
    </section>
  );
};

export default CommunityPage;
