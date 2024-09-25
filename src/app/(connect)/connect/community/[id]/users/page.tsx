"use server";
import React from "react";
import { serverside } from "../../../../../../../config/serverside";
import UserItem from "@/(mesaui)/UserItem";

const UsersPage = async ({ params }: { params: { id: string } }) => {
  const { data, error } = await serverside
    .from("communityrelations")
    .select("id, role, userid, joined")
    .eq("state", "joined")
    .eq("communityid", params.id)
    .order("joined", { ascending: false });

  const { data: userdata, error: userdataerror } = await serverside
    .from("profiles")
    .select("id, username, real_name, avatar_url")
    .in("id", data?.map((e) => e.userid) || []);

  if (error || userdataerror) {
    return <div>Error: {error?.message || userdataerror?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {userdata?.map((e) => (
        <UserItem key={e.id} user={e}>
          <p>{e.username}</p>
        </UserItem>
      ))}
    </div>
  );
};

export default UsersPage;
