"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Image from "next/image";

const Users = async ({ id }: { id: string }) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: users, error }: any = await supabase
    .from("userclasses")
    .select("userid, semester, grade, profiles(id, real_name, avatar_url)")
    .eq("classid", id);

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-4">
      <h3 className="text-2xl font-bold">Students</h3>
      {users?.map((user: any) => (
        <div
          key={user.userid}
          className="flex flex-row items-center justify-start gap-3 rounded-lg bg-white p-4 shadow-lg"
        >
          <Image
            src={user.profiles.avatar_url}
            alt={user.profiles.real_name}
            width={128}
            height={128}
            className="h-12 w-12 rounded-full object-cover shadow-lg"
          />
          <div>
            <p className="text-lg font-bold">
              {user.profiles.real_name || user.profiles.id}
            </p>
            <p className="text-sm font-light">
              {user.semester} - {user.grade}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
