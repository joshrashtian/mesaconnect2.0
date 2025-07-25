"use client";
import React, { useEffect, useState } from "react";
import { useInfo } from "../[id]/(infoblockscreator)/InfoContext";
import SubmitButton from "@/_components/SubmitButton";
import { deleteBlock, editBlock } from "./EditBox";
import { off } from "process";
import Input from "@/_components/Input";
import { Reorder } from "framer-motion";
import Switch from "../[id]/(infoblockscreator)/Switch";
import DeleteButton from "@/(mesaui)/DeleteButton";
import { supabase } from "../../../../../../../config/mesa-config";
import { IoCalendar } from "react-icons/io5";
import { TutorsData } from "./types";

const TutorBlock = ({ data }: { data: TutorsData }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {data.dates.map((date: any) => {
        return (
          <div
            className="w-[49%] rounded-xl bg-zinc-100 p-2 px-5 dark:bg-zinc-600"
            key={date.id}
          >
            <p className="capitalize dark:text-slate-200">{date.day}</p>
            <p className="dark:text-slate-400">
              {date.times.map((e: number, i: number) => {
                return `${Math.floor(e / 60) + 1 > 12 ? Math.floor(e / 60) + 1 - 12 : Math.floor(e / 60) + 1}:${e % 60 < 10 ? `0${e % 60}` : e % 60} ${e < 720 ? "AM" : "PM"} ${i === date.times.length - 1 ? "" : " - "}`;
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
  const [times, setTimes] = React.useState<any[]>([
    ...((data?.data as TutorsData).dates || []),
  ]);
  const [submitting, setSubmitting] = React.useState(false);
  const [isVisible, setVisible] = React.useState(
    data?.visible === "public" ? true : false,
  );

  return (
    <ul className="no-scrollbar flex h-full flex-col gap-4 overflow-x-visible overflow-y-scroll p-3 pb-10">
      <p>Public Visiblity</p>
      <Switch toggled={isVisible} setVisible={setVisible} />

      <Reorder.Group onReorder={setTimes} values={times} axis="y">
        {times.map((date: any, i: number) => {
          return (
            <Reorder.Item value={date} key={date.id}>
              <h1 className="my-2 rounded-xl bg-zinc-50 p-2 capitalize dark:bg-zinc-600 dark:text-white">
                {date.day} :
                {` ${Math.floor(date.times[0] / 60) + 1 > 12 ? Math.floor(date.times[0] / 60) + 1 - 12 : Math.floor(date.times[0] / 60) + 1}:${date.times[0] % 60 < 10 ? `0${date.times[0] % 60}` : date.times[0] % 60} ${date.times[0] < 660 ? "AM" : "PM"}`}{" "}
                -
                {` ${Math.floor(date.times[1] / 60) + 1 > 12 ? Math.floor(date.times[1] / 60) + 1 - 12 : Math.floor(date.times[1] / 60) + 1}:${date.times[1] % 60 < 10 ? `0${date.times[1] % 60}` : date.times[1] % 60} ${date.times[1] < 660 ? "AM" : "PM"}`}
              </h1>
              <Input
                type="text"
                value={date.day}
                contentEditable
                onChange={(input) => {
                  setTimes((a) =>
                    a.map((e, j) => {
                      if (j === i) {
                        return { ...e, day: input.target.value };
                      }
                      return e;
                    }),
                  );
                }}
              />
              <ul className="mt-2 flex flex-row gap-3">
                <Input
                  type="number"
                  value={date.times[0]}
                  contentEditable
                  placeholder="Start Time (minutes from 0)"
                  onChange={(input) =>
                    setTimes((a) =>
                      a.map((e, j) => {
                        if (j === i) {
                          return {
                            ...e,
                            times: [parseInt(input.target.value), e.times[1]],
                          };
                        }
                        return e;
                      }),
                    )
                  }
                />
                <Input
                  type="number"
                  value={date.times[1]}
                  placeholder="End Time (minutes from 0)"
                  onChange={(input) =>
                    setTimes((a) =>
                      a.map((e, j) => {
                        if (j === i) {
                          return {
                            ...e,
                            times: [e.times[0], parseInt(input.target.value)],
                          };
                        }
                        return e;
                      }),
                    )
                  }
                />
                <button
                  className="rounded-xl bg-red-500 px-5 text-white"
                  onClick={() => {
                    setTimes((times) =>
                      times.filter(
                        (e) => e.day !== date.day && e.times !== date.times,
                      ),
                    );
                  }}
                >
                  Delete
                </button>
              </ul>
            </Reorder.Item>
          );
        })}
        <ul className="mt-5 flex flex-row gap-3">
          {times.length < 5 && (
            <button
              className="flex h-12 w-1/3 items-center justify-center rounded-2xl bg-blue-400 font-bold text-white shadow-lg duration-500 hover:scale-105"
              onClick={() =>
                setTimes((e) => [
                  ...e,
                  { day: "monday", times: [0, 0], id: Math.random() },
                ])
              }
            >
              Add Time
            </button>
          )}
          <SubmitButton
            submitting={submitting}
            setSubmitting={setSubmitting}
            onClick={async () => {
              let { data: result, error } = await editBlock({
                id: data?.id || "",
                data: { dates: times },
                visible: isVisible ? "public" : "private",
              });
              console.log(error, result);
              window.location.reload();
            }}
          />
          <DeleteButton
            className="h-12 w-1/3"
            function={async () => {
              let { error } = await deleteBlock(data?.id || "");
              if (error) console.error(error);
              else window.location.reload();
            }}
          />
        </ul>
      </Reorder.Group>
    </ul>
  );
};

export function CreateTutorBlock() {
  const [time, setTime] = useState<any[]>([0, 0]);
  const [day, setDay] = useState<string>("monday");
  return (
    <>
      <h1 className="mb-3 font-eudoxus text-3xl font-bold">
        Create Tutor Block
      </h1>
      <h1 className="my-2 rounded-xl bg-zinc-50 p-2 capitalize dark:bg-zinc-600 dark:text-white">
        {day} :
        {` ${Math.floor(time[0] / 60) + 1 > 12 ? Math.floor(time[0] / 60) + 1 - 12 : Math.floor(time[0] / 60) + 1}:${time[0] % 60 < 10 ? `0${time[0] % 60}` : time[0] % 60} ${time[0] < 660 ? "AM" : "PM"}`}{" "}
        -
        {` ${Math.floor(time[1] / 60) + 1 > 12 ? Math.floor(time[1] / 60) + 1 - 12 : Math.floor(time[1] / 60) + 1}:${time[1] % 60 < 10 ? `0${time[1] % 60}` : time[1] % 60} ${time[1] < 660 ? "AM" : "PM"}`}
      </h1>
      <Input
        type="text"
        value={day}
        icon=<IoCalendar />
        contentEditable
        onChange={(input) => setDay(input.target.value)}
      />
      <ul className="mt-2 flex flex-row gap-3">
        <Input
          type="number"
          value={time[0]}
          contentEditable
          placeholder="Start Time (minutes from 0)"
          onChange={(input) => setTime([parseInt(input.target.value), time[1]])}
        />
        <Input
          type="number"
          value={time[1]}
          placeholder="End Time (minutes from 0)"
          onChange={(input) => setTime([time[0], parseInt(input.target.value)])}
        />
      </ul>

      <button
        className={`mt-4 flex h-12 w-1/3 items-center justify-center rounded-2xl bg-blue-400 font-bold text-white shadow-lg duration-500 hover:scale-105`}
        onClick={async () => {
          const { data, error } = await supabase.from("infoblocks").insert({
            data: {
              dates: [
                {
                  day: day,
                  times: time,
                  id: Math.random(),
                },
              ],
            },
            type: "tutors",
          });
          if (error) console.error(error);
          else window.location.reload();
        }}
      >
        Create
      </button>
    </>
  );
}

export { TutorBlock, TutorBlockSettings };
