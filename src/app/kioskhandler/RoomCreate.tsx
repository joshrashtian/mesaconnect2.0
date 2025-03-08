import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RoomCreate = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
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
      <Button className="rounded-md p-2">Establish Room</Button>
    </div>
  );
};

export default RoomCreate;
