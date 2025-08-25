"use client";
import { motion } from "framer-motion";
import {
  IoChevronDown,
  IoArrowUp,
  IoChatbubblesOutline,
  IoMusicalNoteOutline,
  IoMusicalNotesOutline,
  IoEarthOutline,
  IoSettingsOutline,
  IoCloudUploadOutline,
  IoFileTrayStackedOutline,
  IoImageOutline,
  IoInformation,
  IoInformationOutline,
  IoMenuOutline,
  IoCardOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { useRoomContext } from "../../RoomContext";
import { useRef, useState } from "react";
import { useUser } from "@/app/AuthContext";
import { supabase } from "../../../../../config/mesa-config";
import { DM_Serif_Text, Golos_Text, Koh_Santepheap } from "next/font/google";
import RoomSettings from "./RoomSettings";
import Files from "./Files";
import RoomMenu from "./RoomMenu";
import { FileUp } from "lucide-react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import EnvironmentSettings from "./EnvironmentSettings";
import { BiLogoSpotify } from "react-icons/bi";
import Spotify from "./Spotify";

const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400"],
});

const Menu = () => {
  const { data, color, setColor } = useRoomContext();
  const [message, setMessage] = useState("");
  const user = useUser();
  const [category, setCategory] = useState("message");
  const [currentPage, setCurrentPage] = useState(0);

  // Define menu items with pagination
  const menuItems = [
    {
      id: "room",
      icon: IoCardOutline,
      label: "ROOM",
    },
    {
      id: "message",
      icon: IoCloudUploadOutline,
      label: "BROADCAST",
    },
    {
      id: "environment",
      icon: IoEarthOutline,
      label: "ENVIRONMENTS",
    },
    {
      id: "files",
      icon: IoInformationOutline,
      label: "FILES",
    },
    {
      id: "settings",
      icon: IoSettingsOutline,
      label: "SETTINGS",
    },
    {
      id: "spotify",
      icon: BiLogoSpotify,
      label: "SPOTIFY",
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = menuItems.slice(startIndex, endIndex);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const PDFUploadRef = useRef<HTMLInputElement>(null);
  function handleCategory(category: string) {
    const audio = new Audio("/ui_button.mp3");
    audio.play();
    audio.volume = 0.5;
    setCategory(category);
  }

  function handlePageChange(direction: "prev" | "next") {
    const audio = new Audio("/ui_button.mp3");
    audio.play();
    audio.volume = 0.5;

    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <div className="flex w-4/5 flex-col items-center gap-2 self-center">
        <ol className={`${font.className} grid h-24 w-full grid-cols-5 gap-2`}>
          {currentItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleCategory(item.id)}
                className={`flex flex-col items-center justify-center rounded-md p-2 duration-500 ${
                  category === item.id ? color[1] : "text-zinc-500"
                }`}
              >
                <IconComponent
                  className={`${category === item.id ? color[0] : "text-zinc-500"} text-4xl duration-500`}
                />
                {item.label}
              </button>
            );
          })}
        </ol>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 0}
              className={`flex items-center justify-center rounded-md p-2 duration-300 ${
                currentPage === 0
                  ? "cursor-not-allowed text-zinc-400"
                  : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              <IoChevronDown className="rotate-90 text-2xl" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const audio = new Audio("/ui_button.mp3");
                    audio.play();
                    audio.volume = 0.5;
                    setCurrentPage(index);
                  }}
                  className={`h-2 w-2 rounded-full duration-300 ${
                    index === currentPage
                      ? "bg-zinc-600"
                      : "bg-zinc-400 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center justify-center rounded-md p-2 duration-300 ${
                currentPage === totalPages - 1
                  ? "cursor-not-allowed text-zinc-400"
                  : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              <IoChevronDown className="-rotate-90 text-2xl" />
            </button>
          </div>
        )}
      </div>
      {category === "message" && (
        <>
          <form className="group flex w-full flex-row gap-2 rounded-md bg-zinc-300 p-2">
            <input
              type="text"
              value={message}
              required
              minLength={5}
              maxLength={100}
              placeholder="Message..."
              className="z-30 w-full rounded-md bg-transparent p-2"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                if (message.length < 5) return;
                await supabase.channel(data.id).send({
                  type: "broadcast",
                  event: "message",
                  payload: {
                    type: "text",
                    message,
                    user_id: user?.user?.id,
                    user:
                      user?.user?.user_metadata.real_name ??
                      user?.user?.user_metadata.full_name ??
                      user?.user?.user_metadata.name ??
                      "Guest",
                    room_id: data.id,
                    created_at: new Date().toISOString(),
                  },
                });
                setMessage("");
              }}
              className={`z-20 flex h-10 w-10 items-center justify-center rounded-full border-none bg-blue-500 text-lg duration-500 hover:cursor-pointer hover:bg-blue-600 focus:outline-none ${
                message.length < 5 ? "opacity-50" : "opacity-100"
              }`}
            >
              <IoArrowUp className="text-zinc-100 duration-300 group-hover:text-zinc-300" />
            </button>
          </form>

          {user.user ? (
            <div className="grid h-32 grid-cols-2 gap-2 text-xl">
              <button
                onClick={() => imageUploadRef.current?.click()}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-tr from-red-600 to-orange-600 p-2 text-white duration-300 hover:opacity-80"
              >
                <IoImageOutline className="text-4xl" />
                Image Upload
              </button>
              <button
                onClick={() => PDFUploadRef.current?.click()}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-tr from-blue-500 to-blue-800 p-2 text-white duration-300 hover:opacity-80"
              >
                <FileUp className="text-4xl" />
                PDF Upload
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={imageUploadRef}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !user.user) return;
                  const { data: FileData, error } = await supabase.storage
                    .from(`rooms/${data.id}`)
                    .upload(file.name, file);
                  if (error) {
                    alert("Error uploading image: " + error.message);
                  } else {
                    console.log(FileData);
                    let url = FileData.path;
                    await supabase.channel(data.id).send({
                      type: "broadcast",
                      event: "message",
                      payload: {
                        type: "image",
                        image: `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`,
                        user_id: user?.user?.id,
                        user:
                          user?.user?.user_metadata.real_name ??
                          user?.user?.user_metadata.full_name ??
                          user?.user?.user_metadata.name ??
                          "Guest",
                        room_id: data.id,
                        created_at: new Date().toISOString(),
                      },
                    });
                  }
                }}
              />
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={PDFUploadRef}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !user.user) return;
                  const { data: FileData, error } = await supabase.storage
                    .from(`rooms/${data.id}`)
                    .upload(file.name, file);
                  if (error) {
                    alert("Error uploading image: " + error.message);
                  } else {
                    console.log(FileData);
                    let url = FileData.path;
                    await supabase.channel(data.id).send({
                      type: "broadcast",
                      event: "message",
                      payload: {
                        type: "PDF",
                        pdf: `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/rooms/${data.id}/${file.name}`,
                        user_id: user?.user?.id,
                        user:
                          user?.user?.user_metadata.real_name ??
                          user?.user?.user_metadata.full_name ??
                          user?.user?.user_metadata.name ??
                          "Guest",
                        room_id: data.id,
                        created_at: new Date().toISOString(),
                      },
                    });
                  }
                }}
              />
            </div>
          ) : (
            <ol className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md p-2 text-center text-2xl">
              <IoLockClosedOutline className="text-4xl" />
              Uploading documents and images is only available for signed-in
              users.
            </ol>
          )}
        </>
      )}
      {category === "environment" && <EnvironmentSettings />}
      {category === "settings" && <RoomSettings />}
      {category === "files" && <Files />}
      {category === "room" && <RoomMenu />}
      {category === "spotify" && <Spotify />}
    </>
  );
};

export default Menu;
