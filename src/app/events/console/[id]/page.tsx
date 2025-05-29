"use client";
import { EventType } from "@/_assets/types";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import {
  IoCalendar,
  IoCloud,
  IoLink,
  IoLocate,
  IoLocation,
  IoText,
  IoTextOutline,
  IoTime,
} from "react-icons/io5";
import LoadingObject from "@/(mesaui)/LoadingObject";
import Input from "@/_components/Input";
import { AnimatePresence, motion } from "framer-motion";
import MenuButton from "@/(mesaui)/MenuButton";
import { useSelectedEvent } from "../SelectedEventContext";

const EventMenu = () => {
  const event = useSelectedEvent();
  //@ts-ignore
  const [edits, setEdits] = useState<EventType>(event);

  useEffect(() => {
    //@ts-ignore
    setEdits(event);
  }, [event]);

  function editEvent(data: { [key: string]: string | number | boolean }) {
    setEdits((previous) => ({ ...previous, ...data }));
  }

  if (!event || !edits) return <LoadingObject />;
  return (
    <motion.section className="py-10 font-eudoxus">
      <motion.h1 className="flex flex-row text-3xl font-bold">
        <AnimatePresence>
          {edits?.name.split("").map((e, i) => (
            <motion.p
              key={i}
              exit={{ opacity: 0, y: 30 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {e === " " ? "\u00A0" : e}
            </motion.p>
          ))}
        </AnimatePresence>
      </motion.h1>
      <p className="text-lg">{edits?.desc}</p>
      <ul className="flex flex-row gap-3">
        <p className="flex w-fit flex-row items-center gap-2 rounded-2xl bg-white p-1 px-3">
          <IoLocation /> {edits?.location}
        </p>

        <p className="flex w-fit flex-row items-center gap-2 rounded-2xl bg-white p-1 px-3">
          <IoTime /> Starts {new Date(edits.start).toLocaleString()}
        </p>
      </ul>
      <form className="mt-5 flex flex-col gap-3">
        <Input
          icon={<IoText />}
          placeholder="Name of Event"
          value={edits.name}
          contentEditable
          required
          onChange={(e) => editEvent({ name: e.target.value })}
        />
        <Input
          icon={<IoTextOutline />}
          placeholder="Event Description..."
          value={edits.desc}
          contentEditable
          required
          onChange={(e) => editEvent({ desc: e.target.value })}
        />

        <Input
          icon={<IoLocate />}
          placeholder="Location"
          value={edits.location}
          contentEditable
          required
          onChange={(e) => editEvent({ location: e.target.value })}
        />
        <Input
          icon={<IoCalendar />}
          placeholder="Start Date"
          type="datetime-local"
          required
          value={new Date(edits.start).toISOString().slice(0, 16)}
          contentEditable
          onChange={(e) => editEvent({ start: e.target.value })}
        />

        <MenuButton
          title="Submit"
          icon={<IoCloud />}
          color="bg-orange-500 mt-3"
          onClick={async () => {
            const { data, error } = await supabase
              .from("events")
              //@ts-ignore
              .update(edits)
              .eq("id", event.id);

            if (error) alert(error.message);
            else
              alert(
                "Event Updated! Be aware you will have to refresh to see changes.",
              );
          }}
        />
      </form>
      <MenuButton
        title="Visit Event Page"
        icon={<IoLink />}
        color="bg-blue-500 mt-3"
        onClick={() => {
          window.open(`/events/${event.id}`);
        }}
      />
    </motion.section>
  );
};

export default EventMenu;
