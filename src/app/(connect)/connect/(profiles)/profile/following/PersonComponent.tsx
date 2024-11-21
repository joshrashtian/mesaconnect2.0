import { UserData } from "@/_assets/types";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import {
  IoPersonAdd,
  IoPersonOutline,
  IoPersonRemoveOutline,
} from "react-icons/io5";
import { supabase } from "../../../../../../../config/mesa-config";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PersonComponent = ({ user }: { user: UserData }) => {
  const { createContext } = useContextMenu();
  const { push } = useRouter();
  const toast = useToast();
  const buttons = useMemo(
    () => [
      {
        icon: <IoPersonOutline />,
        name: "View Profile",
        visible: true,
        function: () => push(`/connect/profile/${user.id}`),
      },
      {
        icon: <IoPersonRemoveOutline />,
        name: "Unfollow",
        visible: true,
        function: async () => {
          let { data, error } = await supabase.rpc("toggle_follow_status", {
            other_id: user.id,
          });
          if (error) console.error(error);
          else
            toast.CreateSuccessToast(
              `Succesfully unfollowed ${user.real_name}.`,
            );
        },
      },
    ],
    [],
  );
  return (
    <Link
      href={`/connect/profile/${user.id}`}
      className="flex flex-row items-center gap-5 rounded-lg bg-white p-3 font-eudoxus duration-500 hover:scale-[1.01] dark:bg-zinc-700"
      onContextMenu={(e) => createContext(e, buttons)}
    >
      <picture className="relative h-10 w-10 rounded-full">
        <Avatar>
          <AvatarImage src={user?.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </picture>
      <ul>
        <h4 className="font-bold">{user?.real_name}</h4>
        <h5 className="font-light">@{user?.username}</h5>
      </ul>
    </Link>
  );
};

export default PersonComponent;
