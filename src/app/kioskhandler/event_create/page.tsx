"use client";
import { EventType } from "@/_assets/types";
import KioskInput from "../(kioskui)/input";
import { Golos_Text } from "next/font/google";
import React, { useState } from "react";
import { IoCalendar, IoHammer, IoPencil } from "react-icons/io5";
import { Tag } from "lucide-react";
import { useDeviceContext } from "../DeviceContext";

const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const EventCreatorKiosk = () => {
  const [event, setEvent] = useState<EventType>();
  const { device } = useDeviceContext();
  const updateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`font-nenue flex h-full w-full flex-col items-start justify-start p-12 pt-20`}
    >
      <h1 className="text-7xl font-bold text-white">
        <IoHammer />
        New Event
      </h1>
      <p>{device}</p>
      <div className="mt-5 flex w-4/5 flex-col items-center justify-center gap-4">
        <KioskInput
          icon={<Tag className="text-white" />}
          name="name"
          placeholder="Event Name"
          onChange={updateEvent}
        />
        <KioskInput
          icon={<IoPencil className="text-white" />}
          name="desc"
          placeholder="Description Of This Event..."
          onChange={updateEvent}
        />
        <ol className="grid w-full grid-cols-2 gap-4">
          <KioskInput
            icon={<IoPencil className="text-white" />}
            name="location"
            placeholder="Location"
            onChange={updateEvent}
          />
          <KioskInput
            icon={<IoCalendar className="text-white" />}
            name="type"
            placeholder="Type"
            onChange={updateEvent}
          />
          <KioskInput
            icon={<IoCalendar className="text-white" />}
            name="date"
            type="datetime-local"
            placeholder="Date"
            onChange={updateEvent}
          />
        </ol>
      </div>
    </div>
  );
};

export default EventCreatorKiosk;
