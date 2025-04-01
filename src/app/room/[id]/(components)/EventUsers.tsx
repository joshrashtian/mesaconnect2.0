"use client";
import LoadingObject from "@/(mesaui)/LoadingObject";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRoomContext } from "../../RoomContext";
import { IoChevronDown } from "react-icons/io5";
import SignInViaKiosk from "./SignInViaKiosk";
import { useModal } from "@/app/(connect)/connect/Modal";
import { EventUserRecord } from "@/app/events/[id]/kiosk/page";
import { sendEventResults } from "@/_functions/sendEventKioskResults";

const EventUsersKiosk = () => {
  const [users, setUsers] = useState<EventUserRecord[]>();
  const { data } = useRoomContext();
  const [open, setOpen] = useState(false);
  const modal = useModal();

  async function getUsers() {
    const { data: eventdata, error } = await supabase
      //@ts-ignore
      .from("eventinterest")
      .select("*")
      //@ts-ignore
      .eq("event_id", data?.event?.id);

    console.log(eventdata);
    if (error) alert(error.message);
    //@ts-ignore
    setUsers(eventdata);
  }

  useEffect(() => {
    const channel = supabase.channel("room-users").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "eventinterest",
        filter: `event_id=eq.${data?.event?.id}`,
      },
      (payload) => {
        console.log(payload);
        getUsers();
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUsers();
  }, [data?.event?.id]);

  if (!users) return <LoadingObject size={40} />;

  if (!data?.event) return <LoadingObject size={40} />;
  return (
    <div className="h-fit w-full duration-300">
      <ol className="grid grid-cols-2 gap-2">
        <button
          onClick={async () => {
            modal.CreateModal(
              <>
                <div className="flex flex-col gap-2">
                  <LoadingObject color="black" size={40} />
                  <p>Sending...</p>
                </div>
              </>,
              {
                canUnmount: false,
              },
            );
            const info = await sendEventResults({
              //@ts-ignore
              event: data.event,
              //@ts-ignore
              attendees: users,
            });
            if (info.error) {
              alert(info.error.message);
              modal.CreateDialogBox(
                <p>Error: {info.error.message}</p>,
                () => {
                  modal.DisarmModal();
                },
                {
                  canUnmount: true,
                },
              );
            } else modal.DisarmModal();
          }}
          className="rounded-md bg-zinc-100/20 p-2 text-zinc-100"
        >
          <p>Record User Data</p>
        </button>
        <button
          onClick={() =>
            modal.CreateModal(<SignInViaKiosk />, {
              canUnmount: true,
            })
          }
          className="rounded-md bg-zinc-100/20 p-2 text-zinc-100"
        >
          <p>Add User From Kiosk</p>
        </button>
      </ol>
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
