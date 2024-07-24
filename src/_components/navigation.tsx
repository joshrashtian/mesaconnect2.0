"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../config/mesa-config";
import { useSettings, useUser } from "@/app/AuthContext";
import { IoLockClosed } from "react-icons/io5";
import { useContextMenu } from "@/app/(connect)/InfoContext";
import { usePathname, useRouter } from "next/navigation";
import {
  GrArticle,
  GrSupport,
  GrUserAdmin,
  GrUserSettings,
} from "react-icons/gr";
import Image from "next/image";
import { VscLoading } from "react-icons/vsc";

const Dock = () => {
  const [selected, setSelected] = useState("");
  const [clicked, setClicked] = useState<string>();
  const [profURL, setProfURL] = useState<string | undefined>();
  const [isHovered, setIsHovered] = useState(false);
  const [profID, setProfID] = useState<string | undefined>();
  const context = useContextMenu();
  const router = useRouter();
  const settings = useSettings();
  const [isLocked, setLocked] = useState(settings.taskbar !== "default");

  const { userData } = useUser();

  const SamplePhoto = require("../../src/_assets/photos/UserIcon.png");

  const navContext = [
    {
      name: "Home",
      visible: true,
      function: () => router.push("/connect/"),
    },
    {
      name: "Profile",
      visible: true,
      function: () => router.push(`/connect/profile/${profID}`),
    },
    {
      name: "Social",
      visible: true,
      function: () => router.push("/connect/social"),
    },
    {
      name: "Learning",
      visible: true,
      function: () => router.push("/connect/learning"),
    },
    {
      name: "Studio",
      visible: true,
      function: () => router.push("/connect/builder"),
    },
    {
      name: "Settings",
      visible: true,
      function: () => router.push("/connect/settings"),
    },
  ];

  useEffect(() => {
    const fetchURL = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        //@ts-ignore
        .eq("id", userData?.id)
        .single();

      if (error) {
        console.log(error);
        setProfURL(undefined);
        return;
      }

      setProfID(data.id);
      //@ts-ignore
      setProfURL(data.avatar_url);
    };

    fetchURL();
  }, [userData]);

  const PathnameURL = usePathname();

  const pathname = useMemo(() => {
    if (!PathnameURL.split("/").at(2)) return "home";
    return PathnameURL.split("/").at(2);
  }, [PathnameURL]);

  const tabs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Profile",
      link: `/profile/${profID}`,
    },
    {
      name: "Social",
      link: "/social",
    },
    {
      name: "Learning",
      link: "/learning",
    },
    {
      name: "Builder",
      link: "/builder",
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <GrUserSettings />,
      color:
        "bg-gradient-to-tr from-orange-600 to-yellow-600 hover:text-orange-300",
    },
    {
      name: "Admin",
      link: "/admin",
      icon: <GrUserAdmin />,
      permissions: ["admin"],
      color: "bg-gradient-to-tr from-blue-600 to-teal-600 hover:text-blue-300",
    },
    {
      name: "News",
      sitelink: "/news",
      icon: <GrArticle />,
      color:
        "bg-gradient-to-tr from-green-600 to-emerald-400 hover:text-lime-300",
    },
    {
      name: "Beta Support",
      sitelink: "/support",
      icon: <GrSupport />,
      color:
        "bg-gradient-to-tr from-red-600 to-orange-600 hover:text-amber-300",
    },
  ];

  return (
    <div className="w-full bottom-8 left-0 z-30 font-eudoxus h-16 fixed justify-center items-center flex">
      <section
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onContextMenu={(e) => context.createContext(e, navContext)}
        className={`group peer bg-white dark:bg-zinc-900  origin-bottom drop-shadow-md rounded-3xl hover:-translate-y-3 h-full w-16 ${
          isLocked
            ? "2xl:w-[60%] w-[70%]"
            : " w-16 hover:2xl:w-[60%] hover:w-[70%]"
        }  max-w-3xl justify-center items-center duration-500 2xl:duration-700 hover:scale-[1.15] ease-in-out`}
      >
        <AnimatePresence>
          {profURL && !isHovered && !isLocked && (
            <motion.ul
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex justify-center items-center w-full h-full"
            >
              <Image
                src={profURL ? profURL : SamplePhoto}
                alt="profile"
                width={48}
                height={48}
                className="w-12 h-12 cursor-pointer duration-500 rounded-full"
              />
            </motion.ul>
          )}
        </AnimatePresence>
        {(isHovered || isLocked) && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.2 }}
              className="w-full h-full flex-row delay-500 flex justify-center  gap-2  items-center duration-200"
            >
              {tabs
                .filter((e) => !e.icon)
                .map((tab, index) => {
                  if (tab.permissions) {
                    if (
                      // @ts-ignore
                      !tab.permissions.includes(userData?.role) ||
                      !userData
                    ) {
                      return null;
                    }
                  }

                  return (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onHoverStart={() => setSelected(tab.name)}
                      onClick={() => setClicked(tab.name)}
                      className={`${
                        isLocked
                          ? "opacity-100 group-hover:translate-y-0"
                          : "group-hover:opacity-100"
                      } opacity-0 flex-col flex justify-center translate-y-3 group-hover:translate-y-0 rounded-lg duration-300 ease-in-out`}
                    >
                      <Link
                        href={`/connect${tab.link}`}
                        className="flex  flex-row p-3 justify-center items-center"
                      >
                        <h1
                          className={`${
                            isLocked
                              ? "text-lg"
                              : "text-[12px] 2xl:text-sm group-hover:text-lg"
                          }   font-semibold hover:text-orange-500/60 focus:scale-95 dark:text-white dark:hover:text-orange-400/60 duration-200`}
                        >
                          {tab.name}
                        </h1>
                      </Link>

                      {pathname?.toLowerCase() === tab.name.toLowerCase() ? (
                        <motion.ul
                          initial={{ y: 12, opacity: 0, scale: 0 }}
                          animate={{ y: 16, opacity: 1, scale: 1 }}
                          transition={{ type: "spring" }}
                          className="w-1 h-1 absolute rounded-sm translate-y-4 bg-orange-400 self-center"
                        />
                      ) : (
                        tab.name === clicked && (
                          <motion.ul
                            initial={{ y: 12, opacity: 0, scale: 0 }}
                            animate={{ y: 16, opacity: 1, scale: 1 }}
                            transition={{ type: "spring" }}
                            className="w-1 h-1 absolute rounded-sm translate-y-4 text-orange-400 text-[8px] self-center"
                          >
                            <VscLoading className="animate-spin text-center" />
                          </motion.ul>
                        )
                      )}
                    </motion.li>
                  );
                })}
              <ul className="w-0.5 h-1/2 bg-slate-200 mr-3" />
              {tabs
                .filter((e) => e.icon)
                .map((tab, index) => {
                  if (tab.permissions) {
                    if (
                      // @ts-ignore
                      !tab.permissions.includes(userData?.role) ||
                      !userData
                    ) {
                      return null;
                    }
                  }

                  return (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onHoverStart={() => setSelected(tab.name)}
                      className={`${
                        isLocked
                          ? "opacity-100 group-hover:translate-y-0"
                          : "group-hover:opacity-100"
                      } opacity-0  translate-y-3 group-hover:translate-y-0 rounded-lg duration-300 ease-in-out`}
                    >
                      <Link
                        href={
                          tab.sitelink ? tab.sitelink : `/connect${tab.link}`
                        }
                        className={`flex rounded-2xl ${tab.color} text-white flex-row p-3 justify-center items-center`}
                      >
                        <h1 className="2xl:text-sm text-[12px] font-semibold group-hover:text-lg duration-200">
                          {tab.icon}
                        </h1>
                      </Link>
                    </motion.li>
                  );
                })}
            </motion.ul>
          </AnimatePresence>
        )}
      </section>

      <section className=" absolute w-[10%] h-10 flex flex-row delay-150 shadow-xl justify-center items-center peer scale-0 peer-hover:scale-100 rounded-full peer-hover:-translate-y-16 -translate-y-4 transition-all duration-500  bg-white dark:bg-slate-900/70 ">
        <motion.h1 className="font-bold dark:text-white/70">
          {selected}
        </motion.h1>
      </section>
      {settings.taskbar === "default" && (
        <button
          onClick={() => setLocked(!isLocked)}
          className={`absolute w-6 h-6 flex flex-row delay-150 shadow-xl justify-center items-center peer scale-0 peer-hover:scale-100 rounded-full peer-hover:-translate-y-11 -translate-y-9 transition-all duration-500  bg-white`}
        >
          <IoLockClosed />
        </button>
      )}
    </div>
  );
};

export default Dock;
