"use client";
import { EventType } from "@/_assets/types";
import React from "react";
import { EventUserRecord } from "./page";
import { IoPerson, IoTabletPortrait } from "react-icons/io5";
import StandardButton from "@/(mesaui)/StandardButton";
import { supabase } from "../../../../../config/mesa-config";
import { BsFileExcel, BsFileExcelFill } from "react-icons/bs";
import { AiFillFileExcel } from "react-icons/ai";

const KioskSubmit = ({
  event,
  attendees,
}: {
  event: EventType | null;
  attendees: EventUserRecord[] | undefined;
}) => {
  if (!event || !attendees) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-3 p-3">
      <header className="rounded-3xl bg-zinc-200/30 p-5">
        <h1 className="text-2xl font-bold"> {event.name}</h1>
        <h1 className="text-xl"> {event.desc}</h1>
      </header>
      <section className="grid grid-cols-2 gap-3 rounded-3xl bg-zinc-200/30 p-5">
        {attendees?.map((attendee: EventUserRecord) => (
          <li
            className="text-md relative flex flex-row items-center gap-3 bg-zinc-200/60 p-7 duration-300 hover:bg-zinc-200/80"
            key={attendee.id}
          >
            {attendee.data.temporary ? (
              <IoTabletPortrait className="text-2xl" />
            ) : (
              <IoPerson className="text-2xl" />
            )}
            <ul>
              <h4 className="font-bold">{attendee.data.name}</h4>
              <p>
                {attendee.data.temporary ? "Temporary" : "Connect User"}{" "}
                {attendee.data.student_id && " - "}
                {Array.from(attendee.data.student_id ?? []).map((_, i) => "*")}
              </p>
            </ul>
          </li>
        ))}
      </section>
      <StandardButton
        buttonType="button"
        onClick={async () => {
          const { data: CSV, error } = await supabase
            .from("eventinterest")
            .select()
            .eq("event_id", event.id)
            .csv();

          if (error) alert(error.message);
          if (!CSV) return;

          const blob = new Blob([CSV], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${event.name}${new Date(Date.now()).getTime()}.csv`;
          a.click();
        }}
        icon={<AiFillFileExcel />}
      >
        Submit
      </StandardButton>
    </div>
  );
};

export default KioskSubmit;
