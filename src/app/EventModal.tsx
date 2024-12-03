"use client";

import { EventType } from "@/_assets/types";
import { createContext, useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuContext } from "./(connect)/InfoContext";
import { supabase } from "../../config/mesa-config";
import { userContext } from "./AuthContext";
import { calendar, months } from "../../config/calendar";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdClock } from "react-icons/io";
import { IoCalendarNumber, IoPricetags } from "react-icons/io5";
import Link from "next/link";

export const EventModalContext: any = createContext({});

const EventModal = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<EventType>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        // @ts-ignore
        .eq("id", searchParams.get("event"))
        .single();
      if (error) {
        console.log(error);
      } else {
        // @ts-ignore
        setEvent(data);
      }
    };

    if (searchParams.get("event")) {
      fetchEvent();
    }
  }, []);

  function handleParams(term?: string) {
    //@ts-ignore
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("event", term);
    } else {
      params.delete("event");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const value = {
    createModal: (event: EventType) => {
      setEvent(event);
      handleParams(event.id);
    },
    disarmModal: () => {
      setEvent(undefined);
      handleParams();
    },
  };

  return (
    <EventModalContext.Provider value={value}>
      <AnimatePresence>{event && <Modal event={event} />}</AnimatePresence>
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
        //@ts-ignore
        .eq("user_id", user.user?.id)
        .eq("event_id", event.id);

      if (error) {
        console.error(error);
        return;
      }

      if (data.length !== 0) setState(2);
      else setState(0);
    };

    if (state !== 1) fetchData();
  }, []);

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
    endDate: event.endtime ? new Date(event.endtime) : undefined,
  };
  dates.endDate && new calendar(dates.startDate, dates.endDate);
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
    }, 3400);
  };

  const onInterestLost = async () => {
    setState(1);

    const { error } = await supabase
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
  }, [dates.endDate, dates.startDate]);

  const [creator, setCreator] = useState();

  if (state === 3) return;
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto font-eudoxus"
    >
      <AnimatePresence>
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="min-h-1/2 z-50 flex min-w-[50%] flex-col rounded-3xl bg-white shadow-lg dark:bg-slate-700"
          drag
          onClick={(e) => e.preventDefault()}
          dragMomentum={false}
          whileDrag={{ scale: 0.95 }}
        >
          <ul
            className={`right-0 z-10 flex h-6 min-w-full ${
              event.image
                ? "-mb-6 bg-white opacity-0 hover:opacity-75"
                : "bg-gray-50"
            } relative flex-row-reverse items-center rounded-t-full rounded-bl-2xl px-5 duration-300`}
          >
            <p
              onClick={() => {
                disarm.disarmModal();
              }}
              className="cursor-pointer font-mono text-lg font-medium duration-300 hover:text-red-600"
            >
              x
            </p>
          </ul>
          {event.image && (
            <motion.section className="relative h-48 w-full">
              <Image
                fill={true}
                objectFit="cover"
                className="rounded-t-3xl"
                src={event.image.url}
                alt="event image"
              />
            </motion.section>
          )}
          <main className="flex h-full flex-col justify-between gap-10 p-5 px-10">
            <header>
              <ul className="flex flex-row items-center justify-between">
                <h1 className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-4xl font-bold text-transparent">
                  {event.name}
                </h1>
              </ul>
              <h2 className="text-xl font-light text-slate-600">
                {event.desc
                  ? event.desc
                  : "This event does not have a description."}
              </h2>
              <ul className="flex flex-row items-center justify-between">
                <ul className="flex flex-row">
                  <span className="mr-2 rounded-md bg-gradient-to-tr from-slate-500 to-zinc-700 p-1 px-2 text-white">
                    <IoCalendarNumber />
                  </span>
                  <h2>
                    {` ${
                      months[dates.startDate.getMonth()]
                    } ${dates.startDate.getDate()}, ${dates.startDate.getFullYear()}`}
                  </h2>
                </ul>
                <div className="flex flex-row gap-2">
                  <ul className="rounded-full bg-zinc-100 p-2 px-4">
                    <h2 className="font-medium text-teal-700">
                      {dateMessage?.toUpperCase()}
                    </h2>
                  </ul>
                  <ul className="rounded-full bg-zinc-100 p-2 px-4">
                    <h2 className="font-medium text-orange-700">
                      {event.type.toUpperCase()}
                    </h2>
                  </ul>
                </div>
              </ul>
              <h2 className="flex flex-row items-center gap-1 font-semibold">
                <span className="mr-2 rounded-md bg-gradient-to-tr from-slate-500 to-zinc-700 p-1 px-2 text-white">
                  <IoMdClock />
                </span>
                <span className="font-normal">
                  {` ${
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
                  } ${dates.startDate.getHours() > 12 ? "PM" : "AM"}`}
                </span>
              </h2>
              <ul className="mt-2 flex w-full flex-row items-center gap-1">
                <h1 className="rounded-md bg-gradient-to-tr from-slate-500 to-zinc-700 p-1 px-2 text-white">
                  <IoPricetags />
                </h1>
                {event.tags &&
                  event.tags.map((e, i) => (
                    <div key={e} className="">
                      <h1>
                        {e}
                        {i !== event.tags.length - 1 && ", "}
                      </h1>
                    </div>
                  ))}
              </ul>
            </header>
            <motion.footer className="flex flex-row gap-3 pb-6">
              <button
                onClick={() => {
                  state === 0 ? onInterest() : onInterestLost();
                }}
                className={`p-3 ${
                  state === 0
                    ? "animate-none from-blue-600 to-indigo-700"
                    : state === 1
                      ? "scale-110 animate-bounce from-green-600 to-emerald-800"
                      : "animate-none from-red-600 to-amber-700"
                } 3xl:w-1/4 w-full rounded-full bg-gradient-to-br shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg focus:scale-95 xl:w-1/2`}
              >
                <p className="flex flex-row items-center justify-center gap-3 text-xl font-semibold text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] text-2xl font-medium">
                    {InterestedContext[state].precursor}
                  </span>

                  {InterestedContext[state].text.toUpperCase()}
                </p>
              </button>
              <Link
                href={`/events/${event.id}`}
                className={`3xl:w-1/4 w-full rounded-full bg-zinc-600 bg-gradient-to-br p-3 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg focus:scale-95 xl:w-1/2`}
              >
                <p className="flex flex-row items-center justify-center gap-3 text-xl font-semibold text-white">
                  EVENT PAGE
                </p>
              </Link>
            </motion.footer>
          </main>
        </motion.section>
      </AnimatePresence>

      <ul
        className="absolute inset-0 bg-gray-500 opacity-50"
        onClick={() => {
          disarm.disarmModal();
        }}
      />
    </motion.main>
  );
};

export default EventModal;
