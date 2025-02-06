/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import Link from "next/link";
import { IoLink } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteBlock } from "./EditBox";
import DeleteButton from "@/(mesaui)/DeleteButton";
import { useToast } from "@/app/(connect)/InfoContext";
import { useUser } from "@/app/AuthContext";
import { useInfo } from "../[id]/(infoblockscreator)/InfoBlockDashboard";
import Switch from "../[id]/(infoblockscreator)/Switch";

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
        {community.CoverImage && (
          <Image
            src={URL.createObjectURL(community.CoverImage)}
            fill
            className="rounded-t-3xl object-contain"
            alt="CommunityImage"
          />
        )}
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

export const CommunityEdit = () => {
  const [visible, setVisible] = React.useState(false);
  const [exists, setExists] = React.useState(false);
  const { user } = useUser();
  const { CreateErrorToast } = useToast();
  const { data } = useInfo();

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("infoblocks")
        .select("id, visible")
        .match({ userid: user?.id, type: "In Progress Classes" })
        .single();
      if (error) {
        setExists(false);
        return;
      }
      if (!data) {
        setExists(false);
      } else {
        setVisible(data.visible);
        setExists(true);
      }
    }
    get();
  }, []);

  const changeVisibiity = async () => {
    const { data, error } = await supabase
      .from("infoblocks")
      .update({ visible: visible ? "private" : "public" })
      .match({ userid: user?.id, type: "In Progress Classes" })
      .select();

    if (error) CreateErrorToast(error.message);
    else setVisible(!visible);
  };

  if (!exists) return null;
  return (
    <div>
      <h1>Community Showcase</h1>
      <p>Visability For Public</p>
      <Switch click={changeVisibiity} toggled={visible} />
      <DeleteButton
        function={async () => {
          let { error } = await deleteBlock(data.id);
          if (error) CreateErrorToast(error.message);
          else window.location.reload();
        }}
      />
    </div>
  );
};

export function CreateCommunityBlock() {
  const [community, setCommunity] = useState<string>("");
  const [communities, setCommunities] = useState<any>();

  const { user } = useUser();

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("communityrelations")
        .select("id, communityid")
        .eq("userid", user?.id);

      if (error) {
        console.error(error);
        return;
      }
      setCommunities(data);
    }
    get();
  }, []);

  if (!communities) return null;

  return (
    <>
      <h1 className="mb-3 font-eudoxus text-3xl font-bold">
        Add Community Showcase
      </h1>

      <Select onValueChange={(e) => setCommunity(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Community..." />
        </SelectTrigger>
        <SelectContent>
          {communities.map((e: any) => (
            <SelectItem key={e.id} value={e.communityid}>
              {e.communityid}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {
        <button
          className={`mt-4 flex h-12 w-1/3 items-center justify-center rounded-2xl bg-blue-400 font-bold text-white shadow-lg duration-500 hover:scale-105`}
          onClick={async () => {
            const { data, error } = await supabase.from("infoblocks").insert({
              data: {
                communityid: community,
              },
              type: "community",
            });
            if (error) console.error(error);
            else window.location.reload();
          }}
        >
          Create
        </button>
      }
    </>
  );
}

export default CommunityBlock;
