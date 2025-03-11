"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
const EventKioskPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Event: {eventId}</h1>
    </div>
  );
};

export default EventKioskPage;
