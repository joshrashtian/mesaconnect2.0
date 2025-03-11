import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoClose, IoWarning } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DeviceContextProvider, { useDeviceContext } from "./DeviceContext";
import { useModal } from "../(connect)/connect/Modal";
import { useRouter } from "next/navigation";
import { useUser } from "../AuthContext";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
const RoomCreate = () => {
  const supabase = createClientComponentClient();
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState<string | undefined>(undefined);
  const { device } = useDeviceContext();
  const modal = useModal();
  const router = useRouter();
  const { user } = useUser();

  const handleCreateRoom = async () => {
    if (roomId === "" || roomName === "") {
      setError("Please fill in all fields");
      return;
    }
    let locationSettings = JSON.parse(localStorage.getItem("settings") ?? "{}");

    const { data, error } = await supabase.from("room").insert({
      id: roomId,
      name: roomName,
      location: location ?? locationSettings.name,
      creator: user?.id,
      admin: [user?.id],
      expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    if (error) {
      setError(error.message);
    } else {
      modal.CreateDialogBox(
        <p>Room Created Successfully!</p>,
        () => {
          router.push(`/room/${roomId}`);
        },
        { confirmText: "Go to Room" },
      );
    }
  };
  return (
    <DeviceContextProvider>
      <div className="flex w-full flex-col gap-2 font-nenue">
        <h1 className="text-2xl font-bold">Create New Room</h1>
        <Input
          placeholder="Room ID"
          className="w-full"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Input
          placeholder="Room Name"
          className="w-full"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Checkbox
          checked={location === undefined}
          onCheckedChange={() => {
            location === undefined
              ? setLocation(
                  JSON.parse(localStorage.getItem("settings") ?? "{}")?.name ??
                    "",
                )
              : setLocation(undefined);
          }}
        />
        <p>Use Device Location</p>
        {location !== undefined && (
          <Input
            placeholder="Location"
            className="w-full"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        )}
        <Button className="rounded-md p-2" onClick={handleCreateRoom}>
          Establish Room
        </Button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-row items-center justify-between gap-2 rounded-2xl border-2 border-red-300 p-1 px-5"
            >
              <p className="flex flex-row items-center gap-2 font-semibold text-red-800">
                <IoWarning />
                Error: {error}
              </p>

              <Button variant="outline" onClick={() => setError("")}>
                <IoClose />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DeviceContextProvider>
  );
};

export default RoomCreate;
