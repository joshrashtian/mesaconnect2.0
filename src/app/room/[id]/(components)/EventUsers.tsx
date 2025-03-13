"use client";
import LoadingObject from "@/(mesaui)/LoadingObject";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { EventType, UserData } from "@/_assets/types";
import { useToast } from "@/app/(connect)/InfoContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRoomContext } from "../../RoomContext";
import { IoChevronDown } from "react-icons/io5";

const EventUsersKiosk = () => {
  const [users, setUsers] = useState<UserData[]>();
  const { data } = useRoomContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const { data: eventdata, error } = await supabase
        //@ts-ignore
        .from("eventinterest")
        .select("*")
        //@ts-ignore
        .eq("event_id", data?.event?.id);

      if (error) alert(error.message);
      //@ts-ignore
      setUsers(eventdata);
    }
    getUsers();
  }, []);

  if (!users) return <LoadingObject size={40} />;

  return (
    <div className="h-fit w-full duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full flex-row items-center gap-2"
      >
        <IoChevronDown className={`${open ? "rotate-180" : ""}`} />
        <p>View Users</p>
      </button>

      {open && (
        <div className="flex h-fit flex-col gap-2 duration-300">
          {users?.map((user: any) => {
            return (
              <div
                key={user.id}
                className="flex w-full flex-row items-center gap-3 rounded-2xl bg-zinc-200/30 p-3"
              >
                <Avatar className="h-12 w-12">
                  {!user.data.temporary && (
                    <AvatarImage
                      src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars/${user?.user_id}`}
                    />
                  )}
                  <AvatarFallback className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200/30 text-2xl">
                    {user.data?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <ul>
                  <p>{user.data?.name}</p>
                  <p>{user.data?.major}</p>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventUsersKiosk;
