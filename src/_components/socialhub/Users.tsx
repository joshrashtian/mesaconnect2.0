"use server";
import React from "react";
import { serverside } from "../../../config/serverside";
import UserItem from "@/(mesaui)/UserItem";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import TitleComponent from "@/(mesaui)/title";

const MeetUsers = async () => {
  const user = await serverside.auth.getUser();

  const { data: following, error: followingError } = await serverside.rpc(
    "get_followers_by_user",
    {
      userid: user?.data.user?.id,
    },
  );

  const { data, error } = await serverside
    .from("profiles")
    .select("id, username, major, real_name, avatar_url, college")
    .order("created_at", { ascending: false })
    .not("real_name", "is", null)
    .not("id", "in", `(${following?.map((user: any) => user.id).join(",")})`)
    .neq("id", user.data?.user?.id)
    .limit(5);

  return (
    <main className="flex w-full flex-col gap-3">
      <TitleComponent size="small">Connect With Other Users</TitleComponent>
      <div className="flex w-full flex-col gap-2">
        {data?.map((user) => (
          <UserItem key={user.id} user={user}>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 dark:text-zinc-300">
                {user.major} - {user.college}
              </p>
            </div>
          </UserItem>
        ))}
      </div>
    </main>
  );
};

export default MeetUsers;
