import React, { useContext } from "react";
import { EventType } from "@/_assets/types";
import { EventModalContext } from "@/app/EventModal";

export const Event = ({ event }: { event: EventType }) => {
  const date = new Date(event.start);
  const modal = useContext<any>(EventModalContext);

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
      className="flex flex-col cursor-pointer w-full p-5 bg-white rounded-2xl hover:scale-[1.02] duration-300 shadow-md hover:shadow-lg justify-between"
    >
      <section className="flex flex-row justify-between">
        <h1 className="text-xl text-slate-600 font-semibold">{event.name}</h1>

        <ul className="px-2 p-1 bg-slate-100 rounded-full">
          <h1 className="text-md text-slate-600 font-normal">{event.type}</h1>
        </ul>
      </section>

      <h2 className="text-lg text-slate-400">
        {event.desc?.length > 65
          ? `${event.desc?.substring(0, 65)}  .. `
          : event.desc}
        <span className="text-slate-600">
          {event.desc?.length > 65 && "read more"}
        </span>
      </h2>

      <h2 className="text-lg text-slate-400">{event.location}</h2>
      <ul className="w-full flex-row flex justify-between">
        <h2 className="text-md text-slate-500">{`${
          months[date.getMonth()]
        } ${date.getDate()} / ${
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        }:${
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        } ${date.getHours() >= 12 ? "PM" : "AM"}`}</h2>
        <ul className="flex flex-row gap-x-0.5">
          {event.tags &&
            event.tags.map((tag: any) => (
              <code className="px-2 p-0.5 bg-slate-100 " key={tag}>
                {tag}
              </code>
            ))}
        </ul>
      </ul>
    </main>
  );
};
