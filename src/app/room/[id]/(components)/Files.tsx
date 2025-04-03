import React, { useEffect, useState } from "react";
import { useRoomContext } from "../../RoomContext";
import { supabase } from "../../../../../config/mesa-config";
import Image from "next/image";
import { Loader } from "lucide-react";
import LoadingObject from "@/(mesaui)/LoadingObject";
import Link from "next/link";
import { IoDocument, IoDocumentOutline, IoImageOutline } from "react-icons/io5";
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
                    className="flex h-24 flex-col items-center justify-center rounded-md bg-zinc-100 p-2"
                  >
                    <IoDocumentOutline className="h-12 w-12" />
                    {file.name}
                  </button>
                );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">All Files</h1>
            <ul className="flex flex-col gap-2">
              {(files as any[]).map((file: any) => {
                return (
                  <button
                    onClick={() => {
                      setFocused(file);
                      setOpen(false);
                    }}
                    key={file.id}
                    className="flex flex-row items-center gap-2 rounded-md bg-zinc-100 p-2 hover:bg-zinc-200"
                  >
                    {file.name.includes(".png") ||
                    file.name.includes(".jpg") ||
                    file.name.includes(".jpeg") ? (
                      <IoImageOutline />
                    ) : (
                      <IoDocument />
                    )}
                    {file.name}
                  </button>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Files;
