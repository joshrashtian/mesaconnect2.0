import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useRoomContext } from "../../RoomContext";
import { useModal } from "@/app/(connect)/connect/Modal";
import SelectEvent from "./SelectEvent";
import { useUser } from "@/app/AuthContext";
const RoomMenu = () => {
  const { data } = useRoomContext();
  const { user } = useUser();
  const modal = useModal();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Room Menu</h1>
      <div className="grid grid-cols-2 gap-2">
        <ul className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2">
          <h3 className="text-lg font-bold">{data?.room?.name}</h3>
          <p className="text-sm text-zinc-500">{data?.room?.location}</p>
        </ul>
        <ul className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2">
          <h3 className="text-lg font-bold">Event</h3>
          <p className="text-sm text-zinc-500">{data?.event?.name}</p>
        </ul>
      </div>
      {data?.isAdmin && (
        <button
          onClick={() =>
            modal.CreateModal(<SelectEvent />, {
              canUnmount: true,
            })
          }
        >
          <IoMenuOutline />
        </button>
      )}
    </div>
  );
};

export default RoomMenu;
