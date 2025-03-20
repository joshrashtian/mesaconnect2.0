import React, { useState } from "react";
import { Environment } from "../RoomType";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/app/room/RoomContext";
import { Input } from "@/components/ui/input";
import CreateEnvironment from "./CreateEnvironment";
import { IoCloud } from "react-icons/io5";

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
      name: "Image",
      type: "image",
      content:
        "data:image/jpeg;base64,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",
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
