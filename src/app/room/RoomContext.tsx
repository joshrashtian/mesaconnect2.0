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
import { Environment, RoomAdditionalData } from "./[id]/RoomType";
import EnvironmentComponent from "./[id]/EnvironmentComponent";

export type RoomData = {
  name: string;
  location: string;
  active: boolean;
  admin: string[];
  created_at: string;
  id: string;
  event_connection?: string;
  expiration_date?: string;
  additional_data?: RoomAdditionalData;
};

export type Room = {
  messages: any;
  users: unknown[];
  id: string;
  room: RoomData | null;
  error: any;
  isAdmin: boolean;
  event?: EventType;
  pomodoro: {
    active: boolean;
    time: number;
    break: boolean;
  };
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
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  environment: Environment | null;
  setEnvironment: Dispatch<SetStateAction<Environment | null>>;
};

const RoomContext = createContext<RoomContextType>({
  data: {
    users: [],
    id: "",
    messages: [],
    room: null,
    error: null,
    isAdmin: false,
    pomodoro: {
      active: false,
      time: 0,
      break: false,
    },
  },

  setData: function (value: React.SetStateAction<Room>): void {
    throw new Error("Function not implemented.");
  },
  color: [
    "text-blue-600",
    "bg-blue-600/10 text-blue-600",
    "bg-gradient-to-r from-blue-600 to-blue-400",
  ],
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
  expanded: false,
  setExpanded: function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
  environment: null,
  setEnvironment: function (
    value: React.SetStateAction<Environment | null>,
  ): void {
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
    pomodoro: {
      active: false,
      time: 0,
      break: false,
    },
  });
  const [color, setColor] = useState<string[]>([
    "text-blue-600",
    "bg-blue-600/10 text-blue-600",
    "bg-gradient-to-r from-blue-600 to-blue-400",
  ]);
  const [focused, setFocused] = useState<{ name: string; type: string } | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [environment, setEnvironment] = useState<Environment | null>(null);

  const getData = async () => {
    const { data: room, error } = await supabase
      .from("room")
      .select("*")
      .eq("id", pathname.split("/").pop()!)
      .single();

    if (
      room?.expiration_date &&
      new Date(room?.expiration_date) < new Date(Date.now())
    ) {
      console.log("Room has expired");
      setData({
        ...data,
        room: room,
        error: "Room has expired. Please check in with MESA.",
        isAdmin: room?.admin.includes(
          (await supabase.auth.getUser()).data.user?.id,
        ),
        pomodoro: {
          active: false,
          time: 0,
          break: false,
        },
      });
    } else {
      setData({
        ...data,
        room: room,
        error: error,
        isAdmin: room?.admin.includes(
          (await supabase.auth.getUser()).data.user?.id,
        ),
        pomodoro: {
          active: false,
          time: 0,
          break: false,
        },
      });
    }

    if (room?.event_connection) {
      getEvent(room?.event_connection);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.pomodoro.active) {
        if (data.pomodoro.time <= 0) {
          setData({
            ...data,
            pomodoro: {
              ...data.pomodoro,
              active: false,
              break: !data.pomodoro.break,
              time: !data.pomodoro.break ? 5 * 60 : 25 * 60,
            },
          });
          const sound = new Audio("/timerdone.mp3");
          sound.volume = 1;
          sound.play();
        } else {
          setData((prev) => ({
            ...prev,
            pomodoro: { ...prev.pomodoro, time: prev.pomodoro.time - 1 },
          }));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data.pomodoro.active, data.pomodoro.time, data.pomodoro.break]);

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
          } else {
            setData((prev) => ({
              ...prev,
              event: undefined,
            }));
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
        expanded,
        setExpanded,
        environment,
        setEnvironment,
      }}
    >
      <AnimatePresence mode="wait">
        {environment && <EnvironmentComponent />}
      </AnimatePresence>
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
  const {
    data,
    setData,
    color,
    setColor,
    focused,
    setFocused,
    open,
    setOpen,
    expanded,
    setExpanded,
    environment,
    setEnvironment,
  } = useContext(RoomContext);
  return {
    data,
    setData,
    color,
    setColor,
    focused,
    setFocused,
    open,
    setOpen,
    expanded,
    setExpanded,
    environment,
    setEnvironment,
  };
};
