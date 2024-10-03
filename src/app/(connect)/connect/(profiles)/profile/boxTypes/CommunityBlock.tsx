"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import Link from "next/link";
import { IoLink } from "react-icons/io5";

const CommunityBlock = ({
  data,
}: {
  data: { data: { communityid: string } };
}) => {
  const [community, setCommunity] = useState<{
    id: string;
    name: string;
    primary_campus: string;
    members: number;
    description: string;
    CoverImage: Blob;
  }>();
  async function get() {
    let { data: newcommunity, error } = await supabase
      .from("communities")
      .select("id, name, primary_campus, members, description")
      .eq("id", data.data.communityid)
      .single();

    let { data: CoverImage, error: error2 } = await supabase.storage
      .from("communities")
      .download(`${data.data.communityid}/cover.png`);

    if (error) {
      console.error(error, error2);
    }
    //@ts-ignore
    setCommunity({ ...newcommunity, CoverImage });
  }
  useEffect(() => {
    get();
  }, []);

  if (!community) return null;
  return (
    <div>
      <ul className="relative left-0 top-0 h-40 w-full">
        <Image
          src={URL.createObjectURL(community.CoverImage)}
          fill
          className="rounded-t-3xl object-contain"
          alt="CommunityImage"
        />
      </ul>
      <h1>{community.name}</h1>
      <p>
        {community.description} - {community.members} Members
      </p>
      <Link
        className="flex flex-row items-center gap-2 rounded-xl bg-theme-blue p-2 px-6 text-white"
        href={`/connect/community/${community.id}`}
      >
        <IoLink />
        Visit
      </Link>
    </div>
  );
};

export default CommunityBlock;
