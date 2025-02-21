"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../../config/mesa-config";
import { useUser } from "../AuthContext";

type Room = {
  messages: any;
  users: unknown[];
  id: string;
};

type RoomContextType = {
  data: Room;
  setData: Dispatch<SetStateAction<Room>>;
};

const RoomContext = createContext<RoomContextType>({
  data: {
    users: [],
    id: "",
    messages: [],
  },
  setData: function (value: React.SetStateAction<Room>): void {
    throw new Error("Function not implemented.");
  },
});

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const user = useUser();
  const [data, setData] = useState<Room>({
    users: [],
    id: pathname.split("/").pop()!,
    messages: [],
  });

  useEffect(() => {
    const channel = supabase.channel(pathname.split("/").pop()!);

    channel
      .on("presence", { event: "sync" }, () => {
        let presences = Object.keys(channel.presenceState()).map((key) => [
          key,
          channel.presenceState()[key],
        ]);

        const currentPresences: any[] = [];

        for (const presence of presences) {
          // @ts-ignore
          currentPresences.push(presence[1][0]);
        }

        setData((prev) => ({
          ...prev,
          users: currentPresences,
        }));
      })
      .on("broadcast", { event: "message" }, (payload) => {
        console.log(payload);
        setData((prev) => ({
          ...prev,
          messages: [...prev.messages, payload],
        }));
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const userinfo = (await supabase.auth.getUser()).data;

          await channel.track({
            online_at: new Date().toISOString(),
            user_id: userinfo.user?.id,
            user:
              userinfo.user?.user_metadata.real_name ??
              userinfo.user?.user_metadata.full_name ??
              userinfo.user?.user_metadata.name ??
              "Guest",
            room_id: pathname.split("/").pop()!,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return (
    <RoomContext.Provider value={{ data, setData }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;

export const useRoomContext = () => {
  const { data, setData } = useContext(RoomContext);
  return { data, setData };
};
