import React, { useEffect, useState } from "react";
import { useRoomContext } from "../../RoomContext";
import { supabase } from "../../../../../config/mesa-config";
import Image from "next/image";
import { Loader } from "lucide-react";
import LoadingObject from "@/(mesaui)/LoadingObject";
import Link from "next/link";
const Files = () => {
  const { data, setFocused, setOpen } = useRoomContext();
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const fetchFiles = async () => {
      const { data: FileData, error } = await supabase.storage
        .from(`rooms`)
        .list(data.id);
      if (error) {
        console.error(error);
      } else {
        //@ts-ignore

        setFiles(FileData);
      }
    };
    fetchFiles();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold">Files</h1>

      {!files ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingObject size={100} className="animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-scroll">
          <div className="grid grid-cols-4 gap-2 p-12">
            {(files as any[]).slice(1, 12).map((file: any) => {
              if (
                file.name.includes(".png") ||
                file.name.includes(".jpg") ||
                file.name.includes(".jpeg")
              )
                return (
                  <button
                    onClick={() => {
                      setFocused(file);
                      setOpen(false);
                    }}
                    key={file.id}
                    className="h-[270px] w-[270px] rounded-md bg-zinc-100"
                  >
                    <Image
                      src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`}
                      alt={file.name}
                      width={200}
                      height={200}
                      className="w-fit rounded-md object-contain duration-300 hover:scale-105 hover:opacity-80"
                    />
                  </button>
                );
            })}
          </div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="grid grid-cols-4 gap-2">
            {(files as any[]).slice(0, 12).map((file: any) => {
              if (file.name.includes(".pdf"))
                return (
                  <button
                    key={file.id}
                    onClick={() => {
                      setFocused(file);
                      setOpen(false);
                    }}
                    // href={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`}
                    className="h-56 rounded-md bg-zinc-100 p-2"
                  >
                    <iframe
                      src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`}
                      className="rounded-md"
                    />
                    {file.name}
                  </button>
                );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Files;
