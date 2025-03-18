import React from "react";
import { IoAddCircle, IoMenuOutline } from "react-icons/io5";
import { useRoomContext } from "../../RoomContext";
import { useModal } from "@/app/(connect)/connect/Modal";
import SelectEvent from "./SelectEvent";
import { useUser } from "@/app/AuthContext";
import SignInViaKiosk from "./SignInViaKiosk";
import EventUsersKiosk from "./EventUsers";
import PomodoroTimer from "./PomodoroTimer";
const RoomMenu = () => {
  const { data, color } = useRoomContext();
  const modal = useModal();
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll pb-12">
      <h1 className="text-2xl font-bold">Room Menu</h1>
      {data?.event && (
        <ul
          className={`flex flex-col gap-2 rounded-md ${color[2]} p-2 text-white`}
        >
          <h3 className="text-2xl font-bold">Event</h3>
          <p className="text-md font-bold text-zinc-100">{data?.event?.name}</p>
          <p className="text-sm text-zinc-100">{data?.event?.desc}</p>

          <EventUsersKiosk />
        </ul>
      )}
      <div className="grid grid-cols-2 gap-2">
        <ul className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2">
          <h3 className="text-lg font-bold">{data?.room?.name}</h3>
          <p className="text-sm text-zinc-500">{data?.room?.location}</p>
        </ul>

        <ul className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2">
          <h3 className="text-lg font-bold">Users</h3>
          <pre>
            {data?.users.map((user: any) => <p key={user.id}>{user.user}</p>)}
          </pre>
        </ul>
        {data?.isAdmin && (
          <ul className="flex flex-col gap-2 rounded-md bg-zinc-200/40 p-2">
            <button
              onClick={() =>
                modal.CreateModal(<SelectEvent />, {
                  canUnmount: true,
                })
              }
              className="text-md flex items-center gap-2 rounded-md p-2 duration-300 hover:bg-zinc-50"
            >
              Select Event
              <IoMenuOutline />
            </button>
          </ul>
        )}
      </div>
      <h1 className="text-2xl font-bold">Toolbox</h1>

      <div className="grid grid-cols-2 gap-2 rounded-md p-2">
        <PomodoroTimer />
        <button
          onClick={() => {
            modal.CreateModal(
              <div className="flex flex-col gap-2 text-white">
                <h1 className="text-2xl font-bold">Add Tool</h1>
                <p className="text-sm">
                  We are slowly working on adding more tools to the room.
                </p>
                <button className="rounded-md bg-zinc-500 p-2 text-white">
                  Add
                </button>
              </div>,
              { backgroundClass: "bg-zinc-900", canUnmount: true },
            );
          }}
          className="flex flex-col items-start justify-end gap-2 rounded-md bg-zinc-200/40 p-4 text-3xl"
        >
          <IoAddCircle className="text-2xl" />
          <p>Add Tool</p>
        </button>
      </div>
    </div>
  );
};

export default RoomMenu;
