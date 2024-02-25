"use client";

import { EventType } from "@/_assets/types";
import { createContext, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { MenuContext } from "./(connect)/InfoContext";
import { supabase } from "../../config/mesa-config";
import { userContext } from "./AuthContext";

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
  const [state, setState] = useState(3);

  const user = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("eventinterest")
        .select()
        .eq("user_id", user.user?.id)
        .eq("event_id", event.id);

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      if (data.length !== 0) setState(2);
      else setState(0);
    };

    if (state !== 1) fetchData();
  }, [state]);

  const InterestedContext = [
    {
      text: "I'm Interested",
      precursor: "+",
      context: 0,
    },
    {
      text: "Added!",
      precursor: "✔",
      context: 1,
    },
    {
      text: "I've Lost Interest",
      precursor: "x",
      context: 2,
    },
  ];

  const disarm = useContext<any>(EventModalContext);
  const toast = useContext<any>(MenuContext);
  const [dateMessage, setDateMessage] = useState<string>();

  const dates = {
    startDate: new Date(event.start),
    endDate: event.end ? new Date(event.end) : undefined,
  };

  const onInterest = async () => {
    setState(1);
    toast.toast("Added to your List!", "success");
    setTimeout(() => {
      setState(2);
    }, 4000);

    const { error } = await supabase.from("eventinterest").insert({
      event_id: event.id,
      user_id: user.user?.id,
      data: {
        name: user.userData?.real_name,
        username: user.userData?.username,
        major: user.userData?.major ? user.userData.major : "Undecided",
      },
    });
    if (error) {
      console.error(error);
      return;
    }

    setState(1);
    toast.toast("Added to your List!", "success");
    setTimeout(() => {
      setState(2);
    }, 4000);
  };

  const onInterestLost = async () => {
    setState(1);

    const { data, error } = await supabase
      .from("eventinterest")
      .delete()
      .match({ event_id: event.id, user_id: user.user?.id });

    if (error) {
      console.error(error);
      return;
    }

    toast.toast("Removed from your List!", "success");
    setState(0);
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

  if (state === 3) return;
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-0 z-10 flex justify-center items-center overflow-y-auto"
    >
      <section className="bg-white flex flex-col justify-between w-1/2 h-1/2 p-5 px-10 z-50 rounded-3xl">
        <header>
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
            {event.desc
              ? event.desc
              : "This event does not have a description."}
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
        </header>
        <motion.footer className="pb-6 gap-3">
          <button
            onClick={() => {
              state === 0 ? onInterest() : onInterestLost();
            }}
            className={`p-3 ${
              state === 0
                ? "from-blue-600 to-indigo-700 animate-none"
                : state === 1
                ? "from-green-600 to-emerald-800  scale-110 animate-bounce"
                : "from-red-600 animate-none to-amber-700 "
            } bg-gradient-to-br w-1/4  rounded-full transition-all duration-500`}
          >
            <p className=" font-semibold text-xl text-white">
              <span>{InterestedContext[state].precursor}</span>{" "}
              {InterestedContext[state].text.toUpperCase()}
            </p>
          </button>
        </motion.footer>
      </section>

      <ul className="absolute inset-0 bg-gray-500 opacity-50 " />
    </motion.main>
  );
};

export default EventModal;
