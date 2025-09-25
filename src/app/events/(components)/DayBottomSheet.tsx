"use client";
import React from "react";
import { EventOccurrence } from "../page";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoTime, IoLocation, IoCalendar } from "react-icons/io5";
import Link from "next/link";
import EventComponentFront from "./EventComponentFront";

interface DayBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  events: EventOccurrence[];
}

const DayBottomSheet: React.FC<DayBottomSheetProps> = ({
  isOpen,
  onClose,
  selectedDate,
  events,
}) => {
  if (!selectedDate) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-12 rounded-full bg-slate-300"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {formatDate(selectedDate)}
                </h2>
                <p className="text-sm text-slate-500">
                  {events.length} {events.length === 1 ? "event" : "events"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-800"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-slate-100 p-6">
                    <IoCalendar size={32} className="text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-700">
                    No events scheduled
                  </h3>
                  <p className="text-sm text-slate-500">
                    There are no events on this day.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event, index) => (
                    <Link key={event.id} href={`/events/${event.event.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group h-52 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold text-slate-800 group-hover:text-violet-700">
                              {event.event.name}
                            </h3>
                            {event.event.desc && (
                              <p className="mb-3 line-clamp-2 text-sm text-slate-600">
                                {event.event.desc}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center gap-1 text-slate-500">
                                <IoTime
                                  size={14}
                                  className="text-emerald-600"
                                />
                                <span>
                                  {(() => {
                                    const timestamp = event.occurrence_time
                                      .replace("T", " ")
                                      .replace("Z", "");
                                    const [datePart, timePart] =
                                      timestamp.split(" ");
                                    const [year, month, day] = datePart
                                      .split("-")
                                      .map(Number);
                                    const [hour, minute, second] = timePart
                                      .split(":")
                                      .map(Number);
                                    const localDate = new Date(
                                      year,
                                      month - 1,
                                      day,
                                      hour || 0,
                                      minute || 0,
                                      second || 0,
                                    );
                                    localDate.setHours(
                                      localDate.getHours() + 7,
                                    );
                                    return localDate.toLocaleTimeString(
                                      "en-US",
                                      {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      },
                                    );
                                  })()}
                                </span>
                              </div>
                              {event.event.location && (
                                <div className="flex items-center gap-1 text-slate-500">
                                  <IoLocation
                                    size={14}
                                    className="text-purple-600"
                                  />
                                  <span className="truncate">
                                    {event.event.location}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-800">
                              {event.event.type || "Event"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DayBottomSheet;
