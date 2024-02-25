"use client";

import { EventType } from "@/_assets/types";
import { createContext, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

export const EventModalContext: any = createContext({});

const EventModal = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState<EventType>();

  const value = {
    createModal: (event: EventType) => {
      setEvent(event);
    },
    disarmModal: () => {
      setEvent(undefined);
    },
  };

  return (
    <EventModalContext.Provider value={value}>
      {event && <Modal event={event} />}
      {children}
    </EventModalContext.Provider>
  );
};

const Modal = ({ event }: { event: EventType }) => {
  const disarm = useContext<any>(EventModalContext);

  const [dateMessage, setDateMessage] = useState<string>();

  const dates = {
    startDate: new Date(event.start),
    endDate: event.end ? new Date(event.end) : undefined,
  };

  useEffect(() => {
    const now = Date.now();

    if (dates.endDate && now > dates.endDate.getTime()) {
      setDateMessage("Event has ended");
    } else if (now < dates.startDate.getTime()) {
      setDateMessage("Upcoming Event");
    } else {
      setDateMessage("Currently Ongoing");
    }
  }, []);

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-0 z-10 flex justify-center items-center overflow-y-auto"
    >
      <section className="bg-white w-1/2 h-1/2 p-5 px-10 z-50 rounded-3xl">
        <ul className=" justify-between flex flex-row items-center ">
          <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-blue-400">
            {event.name}
          </h1>
          <p
            onClick={() => {
              disarm.disarmModal();
            }}
            className="font-medium cursor-pointer hover:text-red-600 duration-300 p-4 font-mono text-4xl"
          >
            x
          </p>
        </ul>
        <h2 className="text-xl font-light text-slate-600">
          {event.desc ? event.desc : "This event does not have a description."}
        </h2>
        <ul className=" justify-between flex flex-row items-center ">
          <h2>{dates.startDate.toDateString()}</h2>

          <ul className="p-2 px-4 bg-zinc-100 rounded-full">
            <h2 className="text-teal-700 font-medium">
              {dateMessage?.toUpperCase()}
            </h2>
          </ul>
        </ul>
        <h2>{`${
          dates.startDate.getHours() > 12
            ? dates.startDate.getHours() - 12
            : dates.startDate.getHours()
        }:${
          dates.startDate.getMinutes() < 10
            ? `0${dates.startDate.getMinutes()}`
            : dates.startDate.getMinutes()
        } ${
          dates.endDate
            ? ` - ${
                dates.endDate.getHours() > 12
                  ? dates.endDate.getHours() - 12
                  : dates.endDate.getHours()
              }:${
                dates.endDate.getMinutes() < 10
                  ? `0${dates.endDate.getMinutes()}`
                  : dates.endDate.getMinutes()
              }`
            : ""
        }`}</h2>
      </section>

      <ul className="absolute inset-0 bg-gray-500 opacity-50 " />
    </motion.main>
  );
};

export default EventModal;
