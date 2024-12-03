"use client";
import LoadingObject from "@/(mesaui)/LoadingObject";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../config/mesa-config";
import { EventType, UserData } from "@/_assets/types";
import { useToast } from "@/app/(connect)/InfoContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const EventUsers = ({ event }: { event: EventType }) => {
  const [users, setUsers] = useState<UserData[]>();
  const toast = useToast();
  useEffect(() => {
    async function getUsers() {
      const { data, error } = await supabase
        //@ts-ignore
        .rpc("get_users_by_event", { event: event.id });

      if (error) alert(error.message);
      //@ts-ignore
      setUsers(data);
    }
    getUsers();
  }, []);

  if (!users) return <LoadingObject size={40} />;

  return (
    <div className="w-full">
      {users?.map((user: UserData) => {
        return (
          <div
            key={user.id}
            className="flex w-full flex-row items-center gap-3 rounded-2xl bg-zinc-200/30 p-3"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.real_name[0]}</AvatarFallback>
            </Avatar>
            <ul>
              <p>{user.real_name}</p>
              <p>{user.major}</p>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default EventUsers;
