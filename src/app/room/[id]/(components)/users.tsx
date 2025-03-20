"use client";
import React, { useState } from "react";
import { useRoomContext } from "../../RoomContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrownIcon, Trash2 } from "lucide-react";

const RoomUsers = () => {
  const [open, setOpen] = useState(false);
  const { data } = useRoomContext();

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return (
    <div className="flex flex-col gap-2">
      {data.users.map((user: any, index: number) => (
        <div
          className="flex flex-row items-center gap-4 rounded-md bg-zinc-600/30 p-2 font-nenue text-white"
          key={user.presence_ref}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/avatars//${user.user_id}`}
            />
            <AvatarFallback
              className={`text-white ${colors[index % colors.length]}`}
            >
              G
            </AvatarFallback>
          </Avatar>
          {user.user}
          {data.room?.admin?.includes(user.user_id) && (
            <CrownIcon className="text-yellow-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomUsers;
