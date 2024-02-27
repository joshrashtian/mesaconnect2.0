import React, { useState } from "react";
import InterestedEvents from "./interested";
import CurrentEventSegment from "@/_components/socialhub/CurrentEventSegment";
import ComingUpEvents from "./UpcomingEvents(events)";
import EventCarousel from "./EventCarousel";
import Link from "next/link";

const EventPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-5xl font-bold">Event Page</h1>
        <Link href="/connect/social/search">
          <h1>Search</h1>
        </Link>
      </header>

      <section className="flex flex-row gap-3">
        <EventCarousel />
      </section>
    </main>
  );
};

export default EventPage;
