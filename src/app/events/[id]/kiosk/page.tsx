"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { EventType } from "@/_assets/types";
import {
  IoCloudUpload,
  IoPeople,
  IoPerson,
  IoPersonAdd,
  IoPersonRemove,
  IoTabletPortrait,
} from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";
import { useMultiStep } from "@/app/(connect)/connect/MutliStepContext";
import Input from "@/_components/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import KioskSubmit from "./KioskSubmit";
export type EventUserRecord = {
  event_id: string;
  id: string;
  data: {
    student_id?: string;
    name: string;
    temporary?: boolean;
    email?: string;
    major?: string;
    college?: string;
  };
  joined: Date;
};

const KioskPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [attendees, setAttendees] = useState<EventUserRecord[]>();
  const mutliStep = useMultiStep();
  async function getEvent() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", params.id)
      .single();

    const { data: UsersSignedUp, error: UserError } = await supabase
      .from("eventinterest")
      .select()
      .eq("event_id", params.id);

    if (error) {
      console.error(error);
      return;
    }

    //@ts-ignore
    setAttendees(UsersSignedUp);
    //@ts-ignore
    setEvent(data);
  }

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    let channel = supabase
      .channel(params.id)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "eventinterest" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            //@ts-ignore
            setAttendees((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "DELETE") {
            //@ts-ignore
            setAttendees((prev) => prev.filter((x) => x.id !== payload.old.id));
          }
        },
      )
      .on("broadcast", { event: "testing" }, (payload) => {
        console.log("Cursor position received!", payload);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return (
    <div className="font-eudoxus">
      <header className="flex flex-row justify-between p-12">
        <article>
          <h1 className="text-5xl font-black drop-shadow-xl">{event?.name}</h1>
          <p className="text-2xl">{event?.desc}</p>
          <p className="text-2xl font-light">Located at {event?.location}</p>
        </article>
        <QRCodeSVG value={`https://mesaconnect.io/events/${event?.id}`} />
      </header>
      <nav className="flex h-36 w-full flex-row items-center gap-3 overflow-x-scroll bg-zinc-200 p-5">
        <button
          className="flex h-full w-64 flex-col justify-end rounded-md bg-zinc-100/50 p-4 shadow-lg duration-300 hover:scale-105 hover:bg-zinc-50/80 hover:shadow-xl"
          onClick={() => {
            mutliStep.create({
              title: "Sign In via Kiosk",
              components: [<KioskSignIn key="a" event={event?.id} />],
            });
          }}
        >
          <IoPersonAdd className="text-4xl" />
          <h5 className="text-wrap text-2xl">Sign In via Kiosk </h5>
        </button>
        <button
          className="flex h-full w-64 flex-col justify-end rounded-md bg-zinc-100/50 p-4 shadow-lg duration-300 hover:scale-105 hover:bg-zinc-50/80 hover:shadow-xl"
          onClick={() => {
            mutliStep.create({
              title: "Submit Event",
              components: [
                <KioskSubmit key="a" attendees={attendees} event={event} />,
              ],
            });
          }}
        >
          <IoCloudUpload className="text-4xl" />
          <h5 className="text-wrap text-2xl">Submit Event </h5>
        </button>
        <Link
          href={`/events/${event?.id}`}
          className="flex h-full w-64 flex-col justify-end rounded-md bg-zinc-100/50 p-4 shadow-lg duration-300 hover:scale-105 hover:bg-zinc-50/80 hover:shadow-xl"
        >
          <IoPeople className="text-4xl" />
          <h5 className="text-wrap text-2xl">Event Page </h5>
        </Link>
      </nav>

      <section className="grid grid-cols-2">
        <ol className="mt-10 flex h-96 w-full flex-col gap-3 overflow-y-scroll px-12">
          <h4 className="text-xl font-semibold">Attendees</h4>
          {attendees?.map((attendee: EventUserRecord) => (
            <li
              className="text-md relative flex flex-row gap-3 bg-zinc-200/60 p-7"
              key={attendee.id}
            >
              {attendee.data.temporary ? (
                <IoTabletPortrait className="text-2xl" />
              ) : (
                <IoPerson className="text-2xl" />
              )}
              <h4 className="font-bold">{attendee.data.name}</h4>
              <button>
                <IoPersonRemove
                  onClick={async () => {
                    const { error } = await supabase
                      .from("eventinterest")
                      .delete()
                      .match({ id: attendee.id });

                    if (error) {
                      alert(error.message);
                    }
                  }}
                  className="absolute right-4"
                />
              </button>
            </li>
          ))}
        </ol>
        <ol className="mt-10 flex h-96 w-full flex-col gap-3 overflow-y-scroll px-12">
          <h4 className="text-xl font-semibold">Event Details</h4>
        </ol>
      </section>
    </div>
  );
};

function KioskSignIn({ event }: { event: string | undefined }) {
  const [data, setData] = useState<EventUserRecord | unknown>({
    temporary: true,
  });
  const mutliStep = useMultiStep();

  async function submitThruKiosk() {
    //@ts-ignore
    if (!data?.name || !data?.student_id) return;
    const { error } = await supabase
      .from("eventinterest")
      //@ts-ignore
      .insert({ event_id: event, data: data, student_id: data.student_id });

    console.log(error);
    if (error) {
      alert(error.message);
    } else {
      mutliStep.incrementStep();
    }
  }

  if (!event) return <p>Event not found</p>;
  return (
    <>
      <form className="flex flex-col gap-3">
        <h5>Required Field</h5>
        <Input
          placeholder="name... (required)"
          onChange={(e) => {
            setData({ ...(data as object), name: e.target.value });
          }}
          required
        />
        <Input
          placeholder="student_id... (required)"
          onChange={(e) => {
            setData({ ...(data as object), student_id: e.target.value });
          }}
          required
        />
        <h5>Optional</h5>
        <Input
          placeholder="email address... (optional)"
          onChange={(e) =>
            setData({ ...(data as object), email: e.target.value })
          }
        />
        <Input
          placeholder="major... (optional)"
          onChange={(e) =>
            setData({ ...(data as object), major: e.target.value })
          }
        />
        <Button type="submit" onClick={submitThruKiosk}>
          Submit
        </Button>
      </form>
    </>
  );
}
export default KioskPage;
