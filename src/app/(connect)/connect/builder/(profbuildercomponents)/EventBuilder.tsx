"use client";
import { EventType } from "@/_assets/types";
import { userContext } from "@/app/AuthContext";
import React, { useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Recommendations from "./EventBuilder/Recommendations";

const types = [
  {
    type: "User Created",
  },
  {
    type: "Official MESA",
    permissions: ["admin"],
  },
  {
    type: "Tutoring",
    permissions: ["admin", "tutor", "moderator"],
  },
];

const timeTypes = ["In-Person", "Zoom"];

const EventBuilder = () => {
  const [event, setEvent] = useState<EventType>({
    type: "User Created",
  });
  const [timeType, setTimeType] = useState();
  const user = useContext(userContext);

  if (!user.userData) return <h1>Loading...</h1>;

  return (
    <motion.main className="flex flex-col gap-10">
      <motion.header>
        <ul className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">
            Let's start with some basics of{" "}
            <span className=" text-indigo-800">your</span> event.
          </h1>
          <input
            onChange={(e) => {
              setEvent({ ...event, name: e.target.value });
            }}
            placeholder="Name Your New Event"
            maxLength={65}
            className="w-full text-2xl p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
          />
          <textarea
            onChange={(e) => {
              setEvent({ ...event, desc: e.target.value });
            }}
            placeholder="Give Your Event A Fitting Description"
            maxLength={240}
            className="w-full text-2xl resize-y overflow-hidden min-h-36 max-h-64 p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
          />
          <AnimatePresence>
            {event.desc && (
              <motion.h2
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: -40 }}
                className=" text-slate-400 text-center "
              >
                {event.desc.length} Characters / {event.desc.split(" ").length}{" "}
                Words
              </motion.h2>
            )}
          </AnimatePresence>
          <section className="flex flex-row gap-2 justify-center flex-wrap">
            {user.userData.role === "guest" &&
              types.map((e) => {
                if (
                  e.permissions &&
                  !e.permissions.includes(user.userData?.role)
                )
                  return null;
                return (
                  <button
                    key={e.type}
                    className={` ${
                      event.type === e.type ? "bg-indigo-500" : "bg-slate-600"
                    } hover:scale-105 duration-300 text-white p-2 w-[30%] rounded-full `}
                    onClick={() => {
                      setEvent({ ...event, type: e.type });
                    }}
                  >
                    {e.type}
                  </button>
                );
              })}
          </section>
        </ul>
      </motion.header>
      <AnimatePresence>
        {event.type && event.name && event.name.length > 5 && event.desc && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <h1 className="font-bold text-2xl">
              <span className="text-green-600">Perfect!</span> Let's learn a
              little more about your new event... starting with timing.
            </h1>

            <section className="w-full flex gap-3">
              {timeTypes.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setTimeType(e);
                  }}
                  className={` ${
                    timeType === e ? "bg-green-700" : "bg-slate-400"
                  } w-full ease-in-out font-semibold hover:bg-slate-500 p-3 flex text-white justify-center rounded-full duration-300`}
                >
                  {e}
                </button>
              ))}
            </section>

            {timeType === "In-Person" ? (
              <section className="flex flex-col gap-0">
                <input
                  onChange={(e) => {
                    setEvent({ ...event, location: e.target.value });
                  }}
                  value={event.location ? event.location : ""}
                  contentEditable
                  placeholder="Name Your New Event"
                  maxLength={65}
                  className="w-full z-10 text-2xl p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
                />
                <Recommendations
                  input={event.location}
                  onChange={(e) => {
                    setEvent({ ...event, location: e });
                  }}
                />
              </section>
            ) : null}
          </motion.main>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default EventBuilder;
