import React, { useState } from "react";
import { Environment } from "../RoomType";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/app/room/RoomContext";
import { Input } from "@/components/ui/input";
import CreateEnvironment from "./CreateEnvironment";
import {
  IoBuild,
  IoCloud,
  IoEarth,
  IoSunny,
  IoTrain,
  IoWater,
} from "react-icons/io5";

const EnvironmentSettings = () => {
  const { setEnvironment } = useRoomContext();
  const [selected, setSelected] = useState<Environment | null>(null);
  const [mode, setMode] = useState<number>(0);
  const samples: Environment[] = [
    {
      name: "Default",
      type: "color",
      content: "bg-zinc-500",
    },
    {
      name: "Gradient",
      type: "color",
      content: "bg-gradient-to-r from-blue-600 to-blue-800",
    },

    {
      name: "Clouds",
      type: "environment",
      content:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/clouds/backdrop.mp4",
      icon: <IoCloud />,
    },
    {
      name: "Ocean",
      type: "environment",
      content:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/ocean/backdrop.mp4",
      audio:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/ocean/ambient.mp3",
      icon: <IoWater />,
    },
    {
      name: "Sunset Harbor",
      type: "environment",
      content:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/SunsetHarbor/backdrop.mp4",

      icon: <IoSunny />,
    },
    {
      name: "Train",
      type: "environment",
      content:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/Train/backdrop.mp4",
      icon: <IoTrain />,
      audio:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/Train/ambient.mp3",
    },
    {
      name: "Downtown Singapore",
      type: "environment",
      content:
        "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/environments/Singapore/backdrop.mp4",
      icon: <IoEarth />,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-y-scroll">
      <h1 className="text-2xl font-bold">Environment Settings</h1>
      <ol className="flex flex-row gap-2 font-nenue font-bold">
        <button
          className="rounded-md bg-zinc-200/50 p-2 duration-300 hover:bg-zinc-200/30 active:bg-zinc-200/70"
          onClick={() => setMode(0)}
        >
          Select Environment
        </button>
        <button
          className="rounded-md bg-zinc-200/50 p-2 duration-300 hover:bg-zinc-200/30 active:bg-zinc-200/70"
          onClick={() => setMode(1)}
        >
          Custom Environment
        </button>
      </ol>
      {mode === 0 && (
        <div className="flex flex-row gap-2">
          <ol className="flex w-1/3 flex-col gap-2">
            {samples.map((sample) => (
              <button
                onClick={() => {
                  const sfx = new Audio("/ui_button.mp3");
                  sfx.play();
                  sfx.volume = 0.5;
                  setSelected(sample);
                }}
                key={sample.name}
                className="flex h-16 w-full flex-row items-center justify-start gap-3 rounded-md bg-zinc-200/50 p-3 duration-300 hover:bg-zinc-200/30 active:bg-zinc-200/70"
              >
                {sample.type === "color" && (
                  <div className={`h-7 w-7 rounded-md ${sample.content}`} />
                )}
                {sample?.icon}
                {sample.type === "image" && (
                  <img src={sample.content} className="h-7 w-7 rounded-md" />
                )}
                <p>{sample.name}</p>
              </button>
            ))}
          </ol>
          <div className="w-2/3 p-3">
            <h3 className="text-2xl">Preview</h3>
            {selected && (
              <>
                {selected.type === "image" && (
                  <img
                    className={`h-24 w-full rounded-md object-cover`}
                    src={selected.content}
                  />
                )}
                {selected.type === "color" && (
                  <div
                    className={`h-24 w-full rounded-md ${selected?.content}`}
                  />
                )}

                <pre className="mt-3 rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                  {`{\n   name: ${selected.name};\n   type: ${selected.type};\n}`}
                </pre>
                <Button
                  onClick={() => {
                    setEnvironment(selected);
                  }}
                >
                  Upload
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      {mode === 1 && <CreateEnvironment />}
    </div>
  );
};

export default EnvironmentSettings;
