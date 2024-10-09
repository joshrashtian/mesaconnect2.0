"use server";
import UserItem from "@/(mesaui)/UserItem";
import { UserData } from "@/_assets/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const CollegeSame = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.rpc("same_college");

  if (error || data.length < 4) return null;
  return (
    <div className="h-84 snap-point no-scrollbar relative flex snap-x flex-row gap-2 overflow-x-scroll scroll-smooth whitespace-nowrap">
      {data.map((user: UserData) => {
        if (!user.real_name || !user.username) return null;
        return (
          <UserItem size="compact" user={user} key={user.id}>
            <p>{user.college}</p>
          </UserItem>
        );
      })}
    </div>
  );
};

export default CollegeSame;
