"use server";
import React from "react";
import { CommunityItemType } from "./CommunityItem";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
type HorizontalCommunityItemProps = {
  community: CommunityItemType;
} & any;

const HorizontalCommunityItem = async ({
  community,
  ...props
}: HorizontalCommunityItemProps) => {
  const supabase = createServerComponentClient({ cookies });

  let { data, error } = await supabase.storage
    .from("communities")
    .download(`${community.id}/cover.png`);

  return (
    <Link
      href={`/connect/community/${community.id}`}
      className={`flex h-full w-fit min-w-72 flex-col items-start justify-end rounded-2xl bg-zinc-100 p-3 duration-300 hover:scale-105 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-800 ${props.className}`}
    >
      {!error && data && (
        <Image
          src={URL.createObjectURL(data)}
          width={56}
          height={56}
          alt={""}
        />
      )}

      <p className="text-nowrap text-lg font-black">{community.name}</p>
      <p className="font-light">{community.id}</p>
    </Link>
  );
};

export default HorizontalCommunityItem;
