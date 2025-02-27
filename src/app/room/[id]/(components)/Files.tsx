import React, { useEffect, useState } from "react";
import { useRoomContext } from "../../RoomContext";
import { supabase } from "../../../../../config/mesa-config";
import Image from "next/image";
import { Loader } from "lucide-react";
import LoadingObject from "@/(mesaui)/LoadingObject";
const Files = () => {
  const { data } = useRoomContext();
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const fetchFiles = async () => {
      const { data: FileData, error } = await supabase.storage
        .from(`rooms`)
        .list(data.id);
      if (error) {
        console.error(error);
      } else {
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
        <div className="grid grid-cols-4 gap-2 overflow-y-scroll p-12">
          {files.slice(1, 12).map((file: any) => (
            <Image
              key={file.id}
              src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`}
              alt={file.name}
              width={200}
              height={200}
              className="w-fit rounded-md object-contain duration-300 hover:scale-105 hover:opacity-80"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Files;
