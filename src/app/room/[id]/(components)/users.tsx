import React from "react";
import { useRoomContext } from "../../RoomContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RoomUsers = () => {
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
          className="flex flex-row items-center gap-4 rounded-md bg-zinc-200 p-2 font-geist"
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
        </div>
      ))}
    </div>
  );
};

export default RoomUsers;
