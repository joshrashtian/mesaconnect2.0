import Link from "next/link";
import React from "react";

interface CommunityItem {
  community: CommunityItemType;
}

export type CommunityItemType = {
  id: string;
  name: string;
  primary_campus: string;
  members: string[];
  description: string;
};

const CommunityItem: React.FC<CommunityItem> = ({ community }) => {
  return (
    <Link
      href={`/connect/community/${community.id}`}
      className="flex w-full flex-col rounded-xl border-2 border-gray-200 bg-white p-3 font-eudoxus duration-500 hover:scale-[1.02] hover:border-orange-500 dark:border-zinc-800 dark:bg-zinc-700"
    >
      <p className="text-xl font-bold dark:text-slate-200">{community.name}</p>
      <p className="text-sm text-gray-500 dark:text-white">
        {community.description.slice(0, 100)} - {community.members} Member
      </p>
    </Link>
  );
};

export default CommunityItem;
