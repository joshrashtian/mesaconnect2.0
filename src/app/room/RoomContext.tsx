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
  users: unknown[];
};

type RoomContextType = {
  data: Room;
  setData: Dispatch<SetStateAction<Room>>;
};

const RoomContext = createContext<RoomContextType>({
  data: {
    users: [],
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
  });

  useEffect(() => {
    const channel = supabase.channel(pathname.split("/").pop()!);

    channel
      .on("presence", { event: "join" }, ({ newPresences }) => {
        console.log("Newly joined presences: ", newPresences);
        setData((prev) => ({
          ...prev,
          users: [...prev.users, newPresences],
        }));
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log("Left presences: ", leftPresences);
        setData((prev) => ({
          ...prev,
          //@ts-ignore
          users: prev.users.filter((user) => !leftPresences.includes(user)),
        }));
      })

      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.user?.id,
            room_id: pathname.split("/").pop()!,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
