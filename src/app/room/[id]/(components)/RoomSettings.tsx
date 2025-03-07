"use client";
import React from "react";
import { useRoomContext } from "../../RoomContext";

const colorOptions = [
  { color: ["text-blue-500", "bg-blue-500/10 text-blue-500"], name: "Blue" },
  { color: ["text-red-500", "bg-red-500/10 text-red-500"], name: "Red" },
  {
    color: ["text-green-500", "bg-green-500/10 text-green-500"],
    name: "Green",
  },
  {
    color: ["text-yellow-500", "bg-yellow-500/10 text-yellow-500"],
    name: "Yellow",
  },
  {
    color: ["text-purple-500", "bg-purple-500/10 text-purple-500"],
    name: "Purple",
  },
  { color: ["text-pink-500", "bg-pink-500/10 text-pink-500"], name: "Pink" },
  { color: ["text-zinc-500", "bg-zinc-500/10 text-zinc-500"], name: "Gray" },
  { color: ["text-cyan-500", "bg-cyan-500/10 text-cyan-500"], name: "Cyan" },
];

const RoomSettings = () => {
  const { color, setColor } = useRoomContext();
  const audio = new Audio("/ui_button.mp3");

  return (
    <section className="flex flex-col gap-2 overflow-y-scroll">
      <h1 className="text-2xl font-bold">Color</h1>
      <div className="grid grid-cols-5 gap-2">
        {colorOptions.map((c, i) => (
          <button
            key={i}
            onClick={() => {
              setColor(c.color);
              audio.play();
              audio.volume = 0.5;
            }}
            className={`${color === c.color ? "bg-zinc-300" : ""} ${c.color[1]} flex h-36 items-end justify-end rounded-md p-2 text-3xl font-bold`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default RoomSettings;
