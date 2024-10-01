import React from "react";
import { useInfo } from "../[id]/(infoblockscreator)/InfoBlockDashboard";

const TutorBlock = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {data.data.dates.map((date: any) => {
        return (
          <div
            className="w-[49%] rounded-xl bg-zinc-100 p-2 px-5 dark:bg-zinc-600"
            key={date.id}
          >
            <p className="capitalize dark:text-slate-200">{date.day}</p>
            <p className="dark:text-slate-400">
              {date.times.map((e: number, i: number) => {
                return `${Math.floor(e / 60)}:${e % 60 < 10 ? `0${e % 60}` : e % 60} ${e < 720 ? "AM" : "PM"} ${i === date.times.length - 1 ? "" : " - "}`;
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const TutorBlockSettings = () => {
  const { data } = useInfo();
  return (
    <>
      {data.dates.map((date: any) => {
        return (
          <div key={date.id}>
            <h1>{date.day}</h1>
            <input type="text" value={date.day} />
            <input type="text" value={date.times.join(",")} />{" "}
          </div>
        );
      })}
    </>
  );
};

export { TutorBlock, TutorBlockSettings };
