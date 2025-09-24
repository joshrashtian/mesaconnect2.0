"use client";
import React, { useState } from "react";
import { EventOccurrence } from "../page";
import EventComponentFront from "./EventComponentFront";
import CalendarView from "./CalendarView";
import { motion, AnimatePresence } from "framer-motion";
import { IoGrid, IoCalendar, IoAdd } from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface EventsPageClientProps {
  events: EventOccurrence[];
}

type ViewMode = "grid" | "calendar";

const EventsPageClient: React.FC<EventsPageClientProps> = ({ events }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 font-eudoxus">
      <header className="relative flex h-32 w-full items-center justify-between border-b border-white/20 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-purple-600/10 p-6 backdrop-blur-sm lg:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent">
            MESA
          </h1>
          <span className="-mt-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent">
            Events
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-8 p-6 pt-8 lg:p-12">
        {/* View Toggle and Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-3xl font-bold text-transparent">
              {viewMode === "grid" ? "Upcoming Events" : "Event Calendar"}
            </h3>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-purple-600/20"></div>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/80 p-2 shadow-lg backdrop-blur-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <IoGrid />
              Grid
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                viewMode === "calendar"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <IoCalendar />
              Calendar
            </button>
          </div>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {events?.map((event: EventOccurrence, index: number) => (
                <EventComponentFront
                  event={event}
                  key={event.id}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarView events={events || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-12 right-12 h-16 w-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl">
        <IoAdd />
      </Button>
    </main>
  );
};

export default EventsPageClient;
