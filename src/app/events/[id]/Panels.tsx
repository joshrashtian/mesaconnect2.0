"use client";
import { EventType } from "@/_assets/types";
import React, { useEffect } from "react";
import { IoLocation, IoPerson, IoVideocam } from "react-icons/io5";
import Tilt from "react-parallax-tilt";
import { supabase } from "../../../../config/mesa-config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Panels = ({ data }: { data: EventType }) => {
  const [creator, setCreator] = React.useState<{
    real_name: string;
    avatar_url: string;
  }>();
  useEffect(() => {
    async function getCreator() {
      const { data: creat, error } = await supabase
        .from("profiles")
        .select("real_name, avatar_url")
        .eq("id", data.creator)
        .single();

      //@ts-ignore
      setCreator(creat);
    }
    getCreator();
  }, []);
  return (
    <ol className="grid h-fit grid-cols-2 gap-3 rounded-3xl bg-zinc-100/60 p-4 dark:bg-zinc-700 lg:m-4 lg:flex lg:h-64 lg:flex-row">
      {data.location && (
        <Tilt
          perspective={1250}
          glareEnable={true}
          className="h-42 w-42 flex flex-col items-center justify-center rounded-2xl bg-white p-4 lg:h-56 lg:w-64"
        >
          {data.location === "zoom" ? (
            <IoVideocam className="text-5xl" />
          ) : (
            <IoLocation className="text-5xl" />
          )}
          <p className="text-center text-xl font-light">{data?.location}</p>
        </Tilt>
      )}
      {creator && (
        <Tilt
          perspective={1250}
          glareEnable={true}
          className="h-42 w-42 flex flex-col items-center justify-center rounded-2xl bg-white p-4 lg:h-56 lg:w-64"
        >
          <Avatar className="h-16 w-16">
            <AvatarImage src={creator.avatar_url} />
            <AvatarFallback>{creator.real_name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-center text-xl font-light">{creator.real_name}</p>
        </Tilt>
      )}
    </ol>
  );
};

export default Panels;
