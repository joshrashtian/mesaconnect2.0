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
import { EventType } from "@/_assets/types";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoCloseOutline,
  IoDownloadOutline,
  IoLinkOutline,
} from "react-icons/io5";
import LoadingObject from "@/(mesaui)/LoadingObject";
import Link from "next/link";

export type RoomData = {
  name: string;
  location: string;
  active: boolean;
  admin: string[];
  created_at: string;
  id: string;
  event_connection?: string;
};

export type Room = {
  messages: any;
  users: unknown[];
  id: string;
  room: RoomData | null;
  error: any;
  isAdmin: boolean;
  event?: EventType;
};

type RoomContextType = {
  data: Room;
  setData: Dispatch<SetStateAction<Room>>;
  color: string[];
  setColor: Dispatch<SetStateAction<string[]>>;
  focused: { name: string; type: string } | null;
  setFocused: Dispatch<SetStateAction<{ name: string; type: string } | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
  focused: null,
  setFocused: function (value: React.SetStateAction<Object | null>): void {
    throw new Error("Function not implemented.");
  },
  open: false,
  setOpen: function (value: React.SetStateAction<boolean>): void {
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
  const [focused, setFocused] = useState<{ name: string; type: string } | null>(
    null,
  );
  const [open, setOpen] = useState(false);

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

    if (room?.event_connection) {
      getEvent(room?.event_connection);
    }
  };

  const getEvent = async (eventId: string) => {
    const { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) {
      console.error(error);
    } else {
      //@ts-ignore
      setData((prev) => ({
        ...prev,
        event: event,
      }));
    }
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
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "room" },
        (payload) => {
          console.log(payload);
          //@ts-ignore
          setData((prev) => ({
            ...prev,
            room: payload.new,
          }));

          if (payload.new.event_connection) {
            getEvent(payload.new.event_connection);
          }
        },
      )
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
    <RoomContext.Provider
      value={{
        data,
        setData,
        color,
        setColor,
        focused,
        setFocused,
        open,
        setOpen,
      }}
    >
      {children}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-0 h-screen w-screen bg-black/50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className="relative flex h-full w-full flex-col items-center justify-center p-10"
            >
              {focused.name.includes(".png") ||
              focused.name.includes(".jpeg") ||
              focused.name.includes(".jpg") ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${focused.name}`}
                    alt={"focused"}
                    fill
                    placeholder="blur"
                    blurDataURL={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${focused.name}`}
                    className="z-20 object-contain"
                  />
                  <LoadingObject size={100} className="z-10" color="orange" />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <iframe
                    src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${focused.name}`}
                    className="h-full w-full rounded-md"
                  />
                </div>
              )}
            </motion.div>
            <ul className="absolute right-3 top-3 flex flex-row gap-2">
              {focused.name.includes(".pdf") && (
                <Link
                  href={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${focused.name}`}
                  className="rounded-full bg-zinc-200 p-2 duration-300 hover:bg-zinc-200/50"
                >
                  <IoLinkOutline />
                </Link>
              )}
              <button
                onClick={() => setFocused(null)}
                className="rounded-full bg-zinc-200 p-2 duration-300 hover:bg-zinc-200/50"
              >
                <IoCloseOutline />
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;

export const useRoomContext = () => {
  const { data, setData, color, setColor, focused, setFocused, open, setOpen } =
    useContext(RoomContext);
  return { data, setData, color, setColor, focused, setFocused, open, setOpen };
};
