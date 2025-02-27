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
  room: any;
  error: any;
  isAdmin: boolean;
};

type RoomContextType = {
  data: Room;
  setData: Dispatch<SetStateAction<Room>>;
  color: string[];
  setColor: Dispatch<SetStateAction<string[]>>;
};

const RoomContext = createContext<RoomContextType>({
  data: {
    users: [],
    id: "",
    messages: [],
    room: null,
    error: null,
    isAdmin: false,
  },

  setData: function (value: React.SetStateAction<Room>): void {
    throw new Error("Function not implemented.");
  },
  color: ["text-blue-600", "bg-blue-600/10 text-blue-600"],
  setColor: function (value: React.SetStateAction<string[]>): void {
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
    room: null,
    error: null,
    isAdmin: false,
  });
  const [color, setColor] = useState<string[]>([
    "text-blue-600",
    "bg-blue-600/10 text-blue-600",
  ]);

  const getData = async () => {
    const { data: room, error } = await supabase
      .from("room")
      .select("*")
      .eq("id", pathname.split("/").pop()!)
      .single();

    setData({
      ...data,
      room: room,
      error: error,
      isAdmin: room?.admin.includes(
        (await supabase.auth.getUser()).data.user?.id,
      ),
    });
  };

  useEffect(() => {
    getData();
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
    <RoomContext.Provider value={{ data, setData, color, setColor }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;

export const useRoomContext = () => {
  const { data, setData, color, setColor } = useContext(RoomContext);
  return { data, setData, color, setColor };
};
