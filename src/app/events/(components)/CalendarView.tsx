"use client";
import React, { useState, useMemo } from "react";
import { EventOccurrence } from "../page";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronBack,
  IoChevronForward,
  IoToday,
  IoTime,
  IoLocation,
} from "react-icons/io5";
import Link from "next/link";
import DayBottomSheet from "./DayBottomSheet";

const backdropColors = [
  "bg-gradient-to-tr from-violet-600 via-purple-600 to-blue-600",
  "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600",
  "bg-gradient-to-bl from-rose-500 via-pink-600 to-fuchsia-600",
  "bg-gradient-to-tl from-amber-500 via-orange-600 to-red-600",
  "bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-600",
  "bg-gradient-to-br from-lime-500 via-green-600 to-emerald-600",
  "bg-gradient-to-bl from-sky-500 via-blue-600 to-indigo-600",
  "bg-gradient-to-tl from-yellow-500 via-amber-600 to-orange-600",
  "bg-gradient-to-tr from-pink-500 via-rose-600 to-red-600",
  "bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600",
  "bg-gradient-to-bl from-purple-500 via-violet-600 to-indigo-600",
  "bg-gradient-to-tl from-green-500 via-emerald-600 to-teal-600",
];

interface CalendarViewProps {
  events: EventOccurrence[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = useMemo(() => {
    return (date: Date) => {
      return events.filter((event) => {
        // Parse as local time by creating Date from components
        const timestamp = event.occurrence_time
          .replace("T", " ")
          .replace("Z", "");
        const [datePart, timePart] = timestamp.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute, second] = timePart.split(":").map(Number);
        const eventDate = new Date(
          year,
          month - 1,
          day,
          hour,
          minute,
          second || 0,
        );
        eventDate.setHours(eventDate.getHours() + 7); // Add 7 hours for LA timezone
        return eventDate.toDateString() === date.toDateString();
      });
    };
  }, [events]);

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0,
    );
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        prevMonthDays - i,
      );
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day,
      );
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      });
    }

    return days;
  }, [currentDate, getEventsForDate]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDayClick = (date: Date, dayEvents: EventOccurrence[]) => {
    setSelectedDate(date);
    setIsBottomSheetOpen(true);
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.h2
            key={currentDate.getMonth()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent"
          >
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </motion.h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg"
          >
            <IoToday />
            Today
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-slate-200 hover:text-slate-800"
            >
              <IoChevronBack />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-slate-200 hover:text-slate-800"
            >
              <IoChevronForward />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-200/50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 text-center"
            >
              <span className="text-sm font-semibold text-slate-600">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          <AnimatePresence mode="wait">
            {calendarDays.map((day, index) => (
              <motion.div
                key={`${day.date.getTime()}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                onClick={() => handleDayClick(day.date, day.events)}
                className={`min-h-[120px] cursor-pointer border-b border-r border-slate-200/50 p-2 transition-all duration-300 hover:bg-slate-50/80 hover:shadow-md ${
                  !day.isCurrentMonth ? "bg-slate-50/30" : "bg-white/50"
                } ${isToday(day.date) ? "bg-gradient-to-br from-blue-50/80 to-purple-50/80" : ""}`}
              >
                <div className="flex h-full flex-col">
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isToday(day.date)
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                        : day.isCurrentMonth
                          ? "text-slate-800"
                          : "text-slate-400"
                    }`}
                  >
                    {day.date.getDate()}
                  </div>

                  <div className="flex-1 space-y-1">
                    {day.events.slice(0, 3).map((event, eventIndex) => (
                      <Link key={event.id} href={`/events/${event.event.id}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: eventIndex * 0.1 }}
                          className={`group cursor-pointer rounded-md p-2 text-xs transition-all duration-300 hover:scale-105 hover:shadow-md ${
                            backdropColors[eventIndex % backdropColors.length]
                          } text-white shadow-sm`}
                        >
                          <div className="truncate font-semibold">
                            {event.event.name}
                          </div>
                          <div className="mt-1 flex items-center gap-1 opacity-90">
                            <IoTime size={10} />
                            <span className="text-xs">
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
                                  hour,
                                  minute,
                                  second || 0,
                                );
                                localDate.setHours(localDate.getHours() + 7); // Add 7 hours for LA timezone
                                return localDate.toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                });
                              })()}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}

                    {day.events.length > 3 && (
                      <div className="px-2 text-xs font-medium text-slate-500">
                        +{day.events.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Sheet */}
      <DayBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedDate={selectedDate}
        events={getSelectedDateEvents()}
      />
    </div>
  );
};

export default CalendarView;
