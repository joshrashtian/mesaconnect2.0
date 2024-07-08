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
              `Succesfully unfollowed ${user.real_name}.`
            );
        },
      },
    ],
    []
  );
  return (
    <Link
      href={`/connect/profile/${user.id}`}
      className="bg-white p-3 flex flex-row hover:scale-[1.01] duration-500 items-center font-eudoxus gap-5 rounded-lg"
      onContextMenu={(e) => createContext(e, buttons)}
    >
      <picture className="relative w-10 h-10 rounded-full">
        <Image
          src={user.avatar_url}
          alt={user.real_name}
          fill
          className="rounded-full"
        />
      </picture>
      <ul>
        <h4 className="font-bold">{user.real_name}</h4>
        <h5 className="font-light">@{user.username}</h5>
      </ul>
    </Link>
  );
};

export default PersonComponent;
