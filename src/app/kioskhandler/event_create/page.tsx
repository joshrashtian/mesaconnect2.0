"use client";
import { EventType } from "@/_assets/types";
import KioskInput from "../(kioskui)/input";
import { Golos_Text } from "next/font/google";
import React, { useState } from "react";
import { IoCalendar, IoHammer, IoPencil, IoPin } from "react-icons/io5";
import { Tag } from "lucide-react";
import { useDeviceContext } from "../DeviceContext";
import { supabase } from "../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { useRouter } from "next/navigation";

const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const EventCreatorKiosk = () => {
  const [event, setEvent] = useState<EventType>();
  const { device } = useDeviceContext();
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const updateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEvent = async () => {
    const { data, error } = await supabase.from("events").insert({
      //@ts-ignore
      name: event?.name,
      desc: event?.desc,
      location: event?.location,
      start: event?.start,
      endtime: event?.endtime,
      type: "User Created",
      tags: ["kiosk"],
      creator: user?.id,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/kioskhandler");
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-start justify-start p-12 pt-20 font-nenue`}
    >
      <h1 className="text-7xl font-bold text-white">
        <IoHammer />
        New Event
      </h1>
      <p>{device.name}</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-5 flex w-4/5 flex-col items-center justify-center gap-4">
        <KioskInput
          icon={<Tag className="text-white" />}
          name="name"
          placeholder="Event Name"
          onChange={updateEvent}
        />

        <ol className="grid w-full grid-cols-2 gap-4">
          <KioskInput
            icon={<IoPencil className="text-white" />}
            name="desc"
            placeholder="Description Of This Event..."
            onChange={updateEvent}
          />
          <KioskInput
            icon={<IoPin className="text-white" />}
            name="location"
            placeholder="Location"
            contentEditable
            onChange={updateEvent}
          />

          <KioskInput
            icon={<IoCalendar className="text-white" />}
            name="start"
            type="datetime-local"
            placeholder="Start Date"
            onChange={updateEvent}
          />
          <KioskInput
            icon={<IoCalendar className="text-white" />}
            name="endtime"
            type="datetime-local"
            placeholder="End Date"
            onChange={updateEvent}
          />
        </ol>
        <button
          onClick={handleCreateEvent}
          className="rounded-md bg-zinc-700 px-4 py-2 text-white"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EventCreatorKiosk;
