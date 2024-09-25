"use client";
import React, { useEffect, useState } from "react";
import UserItem from "@/(mesaui)/UserItem";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabase } from "../../../../../../../config/mesa-config";

const UsersPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any[] | null>(null);
  const [userdata, setUserdata] = useState<any[] | null>(null);

  useEffect(() => {
    getUsers();
  });
  async function getUsers() {
    const { data: newData, error } = await supabase
      .from("communityrelations")
      .select("id, role, userid, joined")
      .eq("state", "joined")
      .eq("communityid", params.id)
      .order("joined", { ascending: false });

    const { data: userdata, error: userdataerror } = await supabase
      .from("profiles")
      .select("id, username, real_name, avatar_url")
      .in("id", newData?.map((e) => e.userid) || []);

    setData(newData);
    setUserdata(userdata);
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
