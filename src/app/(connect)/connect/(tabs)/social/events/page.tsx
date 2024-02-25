import React, { useState } from "react";
import InterestedEvents from "./interested";
import CurrentEventSegment from "@/_components/socialhub/CurrentEventSegment";
import ComingUpEvents from "./UpcomingEvents(events)";

const EventPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <header>
        <h1 className="text-5xl font-bold">Event Page</h1>
      </header>

      <section className="flex flex-row gap-3">
        <ComingUpEvents />
        <InterestedEvents />
      </section>
    </main>
  );
};

export default EventPage;
