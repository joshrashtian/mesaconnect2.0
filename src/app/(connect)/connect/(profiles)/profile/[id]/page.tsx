"use client";

import { UserData } from "@/_assets/types";
import { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import { Index } from "../boxTypes";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      console.log(data.boxlist);
      setUser(data);
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-3 gap-5 flex flex-col ">
      <ul className="flex flex-row items-center gap-5 ">
        <Image
          src={user?.avatar_url}
          alt="profile picture"
          width={64}
          height={64}
          style={{ borderRadius: "100%" }}
        />
        <h1 className="font-bold text-6xl">{user?.real_name}</h1>
        <h2 className="font-light text-xl text-slate-400">@{user?.username}</h2>
      </ul>

      <section className="flex flex-row gap-3">
        <ul className="p-1 rounded-lg w-16 bg-white shadow-sm flex justify-center items-center">
          <h2 className="text-orange-700 font-semibold capitalize">
            {user?.role}
          </h2>
        </ul>
        <ul className="p-1 rounded-lg w-28 bg-white shadow-sm flex justify-center items-center">
          <h2 className="text-indigo-700 font-semibold capitalize">
            {user?.major ? user.major : "Undecided"}
          </h2>
        </ul>
      </section>

      <h2>{user?.bio ? user.bio : "This user has no bio set."}</h2>

      <section className="border-b-2" />
        {user.boxlist && (
          <section className="flex-col flex gap-3">
            <h2 className="font-bold text-3xl ">Inside {user.real_name}</h2>
            <ul className="flex flex-row w-full h-full flex-wrap justify-center gap-2">
              {user.boxlist.map((e: any) => {
                return (
                  <section
                    key={e.title}
                    className="w-[49%] min-h-full p-5 rounded-3xl shadow-sm bg-white"
                  >
                    {Index.map((d: any, i: number) => {
                      if (d.title === e.type) {
                        return <d.component key={i} data={e} />;
                      }
                    })}
                  </section>
                );
              })}
            </ul>
          </section>
        )}

      <section>
        <h2 className="font-bold text-3xl ">Posts</h2>
      </section>
    </main>
  );
};

export default ProfilePage;
