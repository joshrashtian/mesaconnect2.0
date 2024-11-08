"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { get } from "http";

const navitems = [
  {
    name: "Home",
    href: `/`,
  },
  {
    name: "Members",
    href: `/users`,
  },
  {
    name: "Files",
    href: `/files`,
    permission: ["founder", "admin"],
  },
  {
    name: "Editor",
    href: `/editor`,
    permission: ["founder", "admin"],
  },
];

const CommunityHeader = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const [selected, setSelected] = useState(navitems[0].name);
  const [role, setRole] = useState<string>("member");
  const user = useUser();

  async function getPermission() {
    const { data, error } = await supabase
      .from("communityrelations")
      .select("role")
      .eq("userid", user.user?.id)
      .eq("communityid", id)
      .single();

    setRole(data?.role);
  }

  useEffect(() => {
    setSelected(pathname.split("/")[4] ?? "");
  }, [pathname]);

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <nav className="m-3 flex flex-row items-center gap-2 rounded-xl bg-zinc-100 p-2 px-7 dark:bg-zinc-800/50 dark:text-gray-300">
      {navitems.map((item) => {
        if (item.permission)
          if (role === "member" || !item.permission.includes(role)) return null;
        return (
          <Link
            key={item.name}
            href={`/connect/community/${id}/${item.href}`}
            className={`group rounded-full p-1 px-4 duration-500 hover:bg-orange-200/50 hover:text-zinc-900 dark:hover:text-zinc-100`}
          >
            <p
              className={`flex flex-row items-center gap-2 text-xl font-bold duration-500 ${
                `/${selected.toLowerCase()}` === item.href.toLowerCase()
                  ? "text-orange-600"
                  : "text-zinc-500 group-hover:text-orange-800/70"
              }`}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default CommunityHeader;
