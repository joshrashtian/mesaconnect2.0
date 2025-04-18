import React, { useContext } from "react";
import { EventType } from "@/_assets/types";
import { EventModalContext } from "@/app/EventModal";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import { supabase } from "../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import {
  IoBookmark,
  IoCopyOutline,
  IoExpandOutline,
  IoMap,
  IoTrashBinOutline,
} from "react-icons/io5";
import { IoMdClock } from "react-icons/io";

export const Event = ({ event }: { event: EventType }) => {
  const date = new Date(event.start);
  const modal = useContext<any>(EventModalContext);
  const { createContext } = useContextMenu();
  const { userData } = useUser();
  const { CreateInfoToast, toast } = useToast();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <main
      onClick={() => {
        modal.createModal(event);
      }}
      onContextMenu={(e) =>
        createContext(e, [
          {
            name: "Enlarge Event",
            visible: true,
            function: () => {
              modal.createModal(event);
            },
            //@ts-ignore
            icon: <IoExpandOutline />,
          },
          {
            name: "Copy Event Link",
            visible: true,
            function: () => {
              navigator.clipboard.writeText(
                `localhost:3000/connect/social?event=${event.id}`
              );
              CreateInfoToast("Copied Event Link To Clipboard");
            },
            icon: <IoCopyOutline />,
          },
          {
            name: "Delete Event",
            visible:
              userData?.id === event.creator || userData?.role === "admin",
            function: async () => {
              const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", event.id);

              if (error) {
                console.error(error);
                return;
              }

              toast("Deleted Post!", "success");
            },
            icon: <IoTrashBinOutline />,
          },
        ])
      }
      className={`flex flex-col cursor-pointer font-eudoxus w-full p-5 px-7 ${
        new Date(Date.now()).getTime() > new Date(event.start).getTime()
          ? "bg-gray-100 dark:bg-red-300/30"
          : "bg-white dark:bg-zinc-600"
      }  rounded-md hover:scale-[1.01] drop-shadow-xl active:scale-[0.99] duration-300 hover:shadow-lg justify-between`}
    >
      <section className="flex flex-row justify-between">
        <h1 className="text-xl text-slate-600 dark:text-slate-100 font-black">
          {event.name}
        </h1>

        <ul className="px-4 p-1 bg-slate-100 dark:bg-slate-700 items-center gap-0.5 rounded-full flex flex-row">
          <IoBookmark className="text-md text-slate-600 dark:text-white font-normal" />
          <h1 className="text-md text-slate-600 dark:text-white font-normal">
            {event.type}
          </h1>
        </ul>
      </section>

      <h2 className="text-lg text-slate-400 dark:text-white">
        {event.desc?.length > 65
          ? `${event.desc?.substring(0, 65)}  .. `
          : event.desc}
        <span className="text-slate-600 dark:text-slate-200">
          {event.desc?.length > 65 && "read more"}
        </span>
      </h2>

      <h2 className="text-lg flex flex-row gap-1 items-center text-slate-400 dark:text-slate-100/60 font-thin">
        <IoMap className="p-1 text-2xl bg-slate-200/50 rounded-full" />{" "}
        {event.location}
      </h2>
      <ul className="w-full flex-row flex gap-1 items-center">
        <IoMdClock className="p-1 text-2xl text-slate-400 bg-slate-200/50 rounded-full" />
        <h2 className="text-md text-slate-500 font-thin dark:text-slate-50/40">{`${
          months[date.getMonth()]
        } ${date.getDate()} / ${
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        }:${
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        } ${date.getHours() >= 12 ? "PM" : "AM"}`}</h2>
      </ul>
      <ul className="flex flex-row gap-x-0.5 mt-1">
        {event.tags &&
          event.tags.map((tag: any) => (
            <p
              className="px-2 p-0.5 bg-zinc-100/60 font-thin dark:bg-slate-700 dark:text-white "
              key={tag}
            >
              {tag}
            </p>
          ))}
      </ul>
    </main>
  );
};
