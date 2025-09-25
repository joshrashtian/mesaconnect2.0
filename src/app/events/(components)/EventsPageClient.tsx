"use client";
import React, { useState, useEffect } from "react";
import { EventOccurrence } from "../page";
import EventComponentFront from "./EventComponentFront";
import CalendarView from "./CalendarView";
import { motion, AnimatePresence } from "framer-motion";
import { IoGrid, IoCalendar, IoAdd, IoPerson } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../../AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EventType } from "@/_assets/types";

interface EventsPageClientProps {
  events: EventOccurrence[];
}

type ViewMode = "grid" | "calendar";

const EventsPageClient: React.FC<EventsPageClientProps> = ({ events }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filteredEvents, setFilteredEvents] =
    useState<EventOccurrence[]>(events);
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 font-eudoxus">
      <header className="relative flex h-32 w-full items-center justify-between border-b border-white/20 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-purple-600/10 p-6 backdrop-blur-sm lg:p-8">
        <div className="flex items-center">
          <Image
            src={require("../../../_assets/MESAEvents.png")}
            alt="MESA Events Logo"
            width={200}
            height={80}
            className="h-auto max-h-16 w-auto object-contain transition-all duration-300 hover:scale-105 lg:max-h-20"
            priority
          />
        </div>
        {isMounted && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata?.real_name?.at(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IoPerson />
                {user?.user_metadata?.real_name || "User"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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

          {/* View Toggle Buttons / View Event Types */}
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/80 p-2 shadow-lg backdrop-blur-sm">
            {isMounted && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">Filter Events</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilteredEvents(events)}>
                    All Events
                  </DropdownMenuItem>
                  {Array.from(
                    new Set(
                      events.map((event: EventOccurrence) => event.event.type),
                    ),
                  )
                    .filter(Boolean)
                    .map((type: string) => (
                      <DropdownMenuItem
                        onClick={() =>
                          setFilteredEvents(
                            events.filter(
                              (event: EventOccurrence) =>
                                event.event.type === type,
                            ),
                          )
                        }
                        key={type}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

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
              {filteredEvents?.map((event: EventOccurrence, index: number) => (
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
              <CalendarView events={filteredEvents || []} />
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
