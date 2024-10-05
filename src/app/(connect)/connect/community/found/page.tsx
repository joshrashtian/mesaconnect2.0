"use client";
import { CommunityItemType } from "@/(mesaui)/CommunityItem";
import Input from "@/_components/Input";
import ChooseCampus from "@/app/(auth)/sign-up/choosecampus";
import React, { useState } from "react";
import { IoFlag, IoPencil, IoPersonAdd, IoSchool } from "react-icons/io5";
import Switch from "../../(profiles)/profile/[id]/(infoblockscreator)/Switch";
import { createCommunity } from "./CreateCommunity";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/(connect)/InfoContext";

const FoundAGroup = () => {
  const router = useRouter();
  const toast = useToast();
  const [community, setCommunity] = useState<CommunityItemType | any>({
    id: undefined,
    name: undefined,
    description: undefined,
    primary_campus: undefined,
    private: true,
  });

  function changeCommunity(data: { [key: string]: string | number | boolean }) {
    setCommunity((prev: CommunityItemType) => ({
      ...prev,
      ...data,
    }));
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-eudoxus text-3xl dark:text-slate-200">
        {" "}
        <IoFlag /> Found A Group
      </h1>

      <Input
        icon={<IoPersonAdd />}
        placeholder="Enter a group username. (No Spaces)"
        value={community.id}
        contentEditable
        maxLength={50}
        onChange={(e) => {
          if (e.target.value.includes(" ")) return;
          changeCommunity({ id: e.target.value });
        }}
        type="text"
      />
      <Input
        icon={<IoPersonAdd />}
        placeholder="Enter the name of the group"
        onChange={(e) => {
          changeCommunity({ name: e.target.value });
        }}
        type="text"
      />
      <Input
        icon={<IoPencil />}
        onChange={(e) => changeCommunity({ description: e.target.value })}
        placeholder="Give A Brief Description..."
        type="text"
      />

      <Input
        icon={<IoSchool />}
        onChange={(e) => changeCommunity({ primary_campus: e.target.value })}
        placeholder="Enter primary campus..."
        type="text"
      />
      <p className="font-eudoxus dark:text-slate-200">Private Community</p>
      <Switch
        toggled={community.private}
        click={() => changeCommunity({ private: !community.private })}
      />

      <button
        onClick={async () => {
          let { data, error } = await createCommunity(community);
          if (error) toast.CreateErrorToast(error.message);
          else router.push(`/connect/community/${data.communityid}`);
        }}
        className="rounded-xl bg-theme-blue p-3 text-white"
      >
        Create Group
      </button>
    </div>
  );
};

export default FoundAGroup;
