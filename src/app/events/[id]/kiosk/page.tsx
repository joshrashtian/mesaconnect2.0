"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { EventType } from "@/_assets/types";
import {
  IoPerson,
  IoPersonAdd,
  IoPersonRemove,
  IoTabletPortrait,
} from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";
import { useMultiStep } from "@/app/(connect)/connect/MutliStepContext";
import Input from "@/_components/Input";
import { Button } from "@/components/ui/button";
type EventUserRecord = {
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
      .channel("room1")
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return (
    <div className="font-eudoxus">
      <header className="flex flex-row justify-between p-12">
        <article>
          <h1 className="text-5xl font-extrabold">{event?.name}</h1>
          <p className="text-2xl">{event?.desc}</p>
        </article>
        <QRCodeSVG value={`https://mesaconnect.io/events/${event?.id}`} />
      </header>
      <nav className="flex h-36 w-full flex-row items-center bg-zinc-200 p-5">
        <button
          className="flex h-full w-64 flex-col justify-end rounded-md bg-zinc-100/50 p-4 shadow-lg"
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
      </nav>

      <ul className="mt-10 flex h-96 flex-col gap-3 overflow-y-scroll px-12">
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
      </ul>
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
      .insert({ event_id: event, data: data });

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
