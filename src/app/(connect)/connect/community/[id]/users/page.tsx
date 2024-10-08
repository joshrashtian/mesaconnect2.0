"use client";
import React, { useEffect, useState } from "react";
import UserItem from "@/(mesaui)/UserItem";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabase } from "../../../../../../../config/mesa-config";
import LoadingObject from "@/(mesaui)/LoadingObject";

const UsersPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any[] | null>(null);
  const [userdata, setUserdata] = useState<any[] | null>(null);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getRole = (userid: string) => {
    return data?.find((d) => d.userid === userid)?.role;
  };

  if (!data) return <LoadingObject size={40} className="text-orange-500" />;
  return (
    <div className="flex h-fit flex-col p-2.5">
      {userdata?.map((e) => (
        <UserItem key={e.id} user={e}>
          <p className="text-slate-200">{e.username}</p>
          <p className="text-sm capitalize text-zinc-500">{getRole(e.id)}</p>
        </UserItem>
      ))}
    </div>
  );
};

export default UsersPage;
