"use client";
import { EventType } from "@/_assets/types";
import { userContext } from "@/app/AuthContext";
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Recommendations from "./EventBuilder/Recommendations";
import { supabase } from "../../../../../../config/mesa-config";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";
import UnsplashSearch from "./UnsplashSearch";
import { Input } from "@/components/ui/input";
import { IoCalendar, IoPerson, IoSchool, IoVideocam } from "react-icons/io5";
import { AiFillTags } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
import {
  formatPostgresInterval,
  parsePostgresInterval,
} from "@/_functions/postgres_helpers";
import Slider from "./EventBuilder/Slider";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const types: {
  type: EventType["type"];
  icon?: React.ReactNode;
  permissions?: string[];
}[] = [
  {
    type: "User Created",
    icon: <IoPerson />,
  },
  {
    type: "Workshop",
    icon: <IoSchool />,
  },
  {
    type: "AEW Workshop",
    icon: <IoSchool />,
    permissions: ["admin", "tutor", "moderator"],
  },
  {
    type: "Official MESA",
    icon: <IoSchool />,
    permissions: ["admin"],
  },
  {
    type: "Class",
    icon: <IoSchool />,
    permissions: ["admin", "tutor", "moderator"],
  },
  {
    type: "Zoom Meeting",
    icon: <IoVideocam />,
    permissions: ["admin", "tutor", "moderator"],
  },
];

const timeTypes = ["In-Person", "Zoom"];

const EventBuilder = () => {
  // @ts-ignore
  const [event, setEvent] = useState<EventType>({
    type: "User Created",
    start: new Date().toISOString(),
    duration: "1 hour",
  });
  const [timeType, setTimeType] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [newImage, setImage] = useState<any>();
  const user = useContext<any>(userContext);
  const toast = useContext<any>(MenuContext);
  const router = useRouter();

  const eventSubmit = async () => {
    setSubmitting(true);

    //@ts-ignore
    const { error } = await supabase.from("events").insert({
      //@ts-ignore
      ...event,
      image: newImage,
      creator: user.user?.id,
    });

    if (error) {
      toast.toast(error.message, "Error");
      setSubmitting(false);
      return;
    }

    toast.toast("Successfully Posted!", "Success");
    router.push("/connect/social/events");
  };

  const updateEvent = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  if (!user.userData) return <h1>Loading...</h1>;

  return (
    <motion.main className="flex flex-col pb-20 font-eudoxus">
      <div className="flex flex-col gap-2">
        <h1 className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
          General Information
        </h1>
        <h3 className="text-2xl font-bold">Event Name</h3>
        <Input
          type="text"
          value={event.name}
          name="name"
          onChange={(e) => updateEvent(e)}
          placeholder="Event Name"
        />
        <h3 className="text-2xl font-bold">Description</h3>
        <Textarea
          value={event.desc}
          name="desc"
          onChange={(e) => updateEvent(e)}
          placeholder="Description"
          className="h-20"
        />

        <h3 className="text-2xl font-bold">Type</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              {types.find((type) => type.type === event.type)?.type ||
                "Select type.."}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {types.map((type) => {
              let userHasPermission = type.permissions?.includes(
                user.userData?.role,
              );

              if (!userHasPermission && type.permissions) return null;

              return (
                <DropdownMenuItem
                  key={type.type}
                  onClick={() => {
                    setEvent({ ...event, type: type.type });
                  }}
                >
                  {type.icon} {type.type}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        {event.type !== "Zoom Meeting" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">Location</h3>
            <Input
              type="text"
              value={event.location}
              name="location"
              onChange={(e) => updateEvent(e)}
            />
          </motion.div>
        )}
        {event.type === "Zoom Meeting" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">Zoom Meeting Link</h3>
            <Input
              type="text"
              value={event.link}
              name="link"
              onChange={(e) => updateEvent(e)}
              placeholder="Zoom Meeting Link"
            />
          </motion.div>
        )}
      </div>
      <h3 className="text-2xl font-bold">Start Time</h3>
      <Input
        type="datetime-local"
        name="start"
        value={event.start}
        onChange={(e) => {
          updateEvent(e);
        }}
      />
      <Separator className="my-4" />
      <h1 className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-2xl font-bold text-transparent">
        <IoCalendar />
        Replay and Time Information
      </h1>
      <div className="flex flex-row justify-between gap-2 text-2xl font-bold">
        <h3>Duration</h3>
        <p className="text-gray-500">{event.duration}</p>
      </div>
      <Slider
        min={15}
        max={420}
        step={15}
        value={parsePostgresInterval(event.duration) || 15}
        onChange={(e: any) => {
          let duration = formatPostgresInterval(parseInt(e.target.value));
          setEvent({
            ...event,
            duration: duration,
          });
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="w-full capitalize">
            {["weekly", "monthly", "daily"].find(
              (type) => type === event.repeat_type,
            ) || "Select time type.."}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["weekly", "monthly", "daily", null].map((type) => (
            <DropdownMenuItem
              key={type}
              className="capitalize"
              onClick={() => {
                setEvent({ ...event, repeat_type: type as any });
              }}
            >
              {type || "Once"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {event.repeat_type && (
        <div className="mt-2 flex flex-row justify-between gap-2 text-xl font-bold">
          <Input
            type="datetime-local"
            value={event.repeat_until || new Date().toISOString()}
            name="repeat_until"
            onChange={(e) => updateEvent(e)}
            placeholder="Repeat until..."
          />
        </div>
      )}
      <Separator className="my-4" />
      <UnsplashSearch updateImage={(e: any) => setImage(e)} />
      <div className="flex flex-row justify-between gap-2 text-2xl font-bold">
        <h3>Tags</h3>
      </div>
      <Input
        type="text"
        value={event.tags?.map((tag) => tag) || ""}
        name="tags"
        onChange={(e) => {
          let tags = e.target.value.split(",");
          setEvent({
            ...event,
            tags: tags,
          });
        }}
        placeholder="Tags"
      />
      <p className="text-gray-500">
        {event.tags?.map((tag: any) => (
          <span
            key={tag}
            className="mx-1 rounded-full bg-zinc-400 p-2 px-3 text-white"
          >
            {tag}
          </span>
        )) || "No tags"}
      </p>
      <Button onClick={eventSubmit}>Submit</Button>
    </motion.main>
  );
};

export default EventBuilder;
