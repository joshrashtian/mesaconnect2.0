"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import BlockCommunityItemProvider from "../BlockIndex";
import { type CommunityBlockIndex } from "../BlockIndex";
import TextBlockComponent from "./(components)/TextBlock";
import { IoLockClosed } from "react-icons/io5";
import CanvasButton from "./(components)/CanvasButton";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("communities")
    .select("blocks, private")
    .eq("id", params.id)
    .single();

  if (data?.private) {
    const { data: Check, error: CheckError } = await supabase
      .from("communityrelations")
      .select("state")
      .eq(
        "userid",
        await supabase.auth.getUser().then((user) => user?.data.user?.id),
      )
      .eq("communityid", params.id)
      .single();

    if (!Check || Check.state !== "joined" || CheckError)
      return (
        <div className="flex h-full w-full flex-col items-center justify-start gap-2 py-10 text-3xl">
          <IoLockClosed className="text-5xl" />{" "}
          <h1>
            {Check?.state === "requested"
              ? "You sent a request to join this community."
              : "This Community Is Private."}
          </h1>
        </div>
      );
  }

  if (!data || error) return null;
  return (
    <section className="flex flex-row flex-wrap gap-2 p-4">
      {data?.blocks?.map((block: CommunityBlockIndex) => {
        switch (block.type) {
          case "text":
            return (
              <BlockCommunityItemProvider
                type={block.type}
                data={block.data}
                size={block.size ?? "large"}
                className={block.className}
              >
                <TextBlockComponent />
              </BlockCommunityItemProvider>
            );
          case "html":
            return (
              <BlockCommunityItemProvider
                type={block.type}
                data={block.data}
                size="small"
                className={block.className}
              >
                <div dangerouslySetInnerHTML={{ __html: block.data }} />
              </BlockCommunityItemProvider>
            );
          case "canvas":
            return (
              <BlockCommunityItemProvider
                type={block.type}
                data={block.data}
                size="small"
                className={block.className ?? "bg-white/30"}
              >
                <CanvasButton />
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
