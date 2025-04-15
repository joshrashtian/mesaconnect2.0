import React, { useEffect } from "react";
import { useRoomContext } from "../../RoomContext";
import {
  IoPlay,
  IoPause,
  IoStop,
  IoCodeWorking,
  IoSchool,
  IoSunny,
} from "react-icons/io5";
import { IoMdSkipForward } from "react-icons/io";

const PomodoroTimer = () => {
  const { data, setData } = useRoomContext();

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-md p-2 ${data.pomodoro.break ? "bg-green-500/20" : "bg-zinc-200/40"}`}
    >
      <h4
        className={`text-2xl font-bold duration-300 ${data.pomodoro.break ? "text-green-500" : ""}`}
      >
        {data.pomodoro.break ? <IoSunny /> : <IoSchool />}
      </h4>
      <h3
        className={`text-2xl font-bold duration-300 ${data.pomodoro.break ? "text-green-500" : ""}`}
      >
        {Math.floor(data.pomodoro.time / 60)}:
        {data.pomodoro.time % 60 < 10 ? "0" : ""}
        {data.pomodoro.time % 60}
      </h3>
      <ol
        className={`flex flex-row gap-2 duration-300 ${data.pomodoro.break ? "text-green-500" : ""}`}
      >
        <button
          onClick={() => {
            setData({
              ...data,
              pomodoro: {
                ...data.pomodoro,
                time: 25 * 60,
                break: false,
                active: !data.pomodoro.active,
              },
            });
          }}
          className="rounded-full bg-zinc-200 p-2"
        >
          {data.pomodoro.break ? (
            <IoMdSkipForward />
          ) : data.pomodoro.time !== 0 ? (
            <IoStop />
          ) : (
            <IoPlay />
          )}
        </button>

        {data.pomodoro.time !== 0 && (
          <button
            onClick={() => {
              setData({
                ...data,
                pomodoro: {
                  ...data.pomodoro,

                  active: !data.pomodoro.active,
                },
              });
            }}
            className="rounded-full bg-zinc-200 p-2"
          >
            {data.pomodoro.active ? <IoPause /> : <IoPlay />}
          </button>
        )}
      </ol>
    </div>
  );
};

export default PomodoroTimer;
