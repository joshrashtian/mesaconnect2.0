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
    <div className="fixed bottom-0 left-0 z-30 flex h-16 min-w-full items-center justify-center font-eudoxus lg:bottom-8">
      <section
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onContextMenu={(e) => context.createContext(e, navContext)}
        className={`no-scrollbar group peer h-full w-16 origin-bottom overflow-x-scroll bg-white/80 shadow-lg ring-2 hover:ring-orange-300/30 lg:overflow-hidden lg:rounded-[100px] lg:hover:-translate-y-3 dark:bg-zinc-900 ${
          isLocked
            ? "[760px]:w-[70%] lg:min-w-3xl w-[1000px] 2xl:w-[60%]"
            : "w-16 hover:w-[70%] hover:2xl:w-[60%]"
        } max-w-3xl items-center justify-center backdrop-blur-xl duration-500 lg:hover:scale-[1.15] 2xl:duration-700`}
      >
        <AnimatePresence>
          {profURL && !isHovered && !isLocked && (
            <motion.ul
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={profURL ? profURL : SamplePhoto}
                alt="profile"
                width={48}
                height={48}
                className="h-12 w-12 cursor-pointer rounded-full duration-500"
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
              className="flex h-full w-full flex-row items-center justify-center gap-0.5 delay-500 duration-200 lg:gap-2"
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
                      } flex translate-y-3 flex-col justify-center rounded-lg opacity-0 duration-300 ease-in-out group-hover:translate-y-0`}
                    >
                      <Link
                        href={`/connect${tab.link}`}
                        className="flex flex-row items-center justify-center p-3"
                      >
                        <h1
                          className={`${
                            isLocked
                              ? "text-[12px] sm:text-base lg:text-lg"
                              : "text-[12px] group-hover:text-lg sm:text-base 2xl:text-lg"
                          } font-black duration-200 hover:text-orange-500/60 focus:scale-95 dark:text-white dark:hover:text-orange-400/60`}
                        >
                          {tab.name}
                        </h1>
                      </Link>

                      {pathname?.toLowerCase() === tab.name.toLowerCase() ? (
                        <motion.ul
                          initial={{ y: 12, opacity: 0, scale: 0 }}
                          animate={{ y: 16, opacity: 1, scale: 1 }}
                          transition={{ type: "spring" }}
                          className="absolute h-1 w-1 translate-y-4 self-center rounded-sm bg-orange-400"
                        />
                      ) : (
                        tab.name === clicked && (
                          <motion.ul
                            initial={{ y: 12, opacity: 0, scale: 0 }}
                            animate={{ y: 16, opacity: 1, scale: 1 }}
                            transition={{ type: "spring" }}
                            className="absolute h-1 w-1 translate-y-4 self-center rounded-sm text-[8px] text-orange-400"
                          >
                            <VscLoading className="animate-spin text-center" />
                          </motion.ul>
                        )
                      )}
                    </motion.li>
                  );
                })}
              <ul className="mr-3 h-1/2 w-0.5 bg-slate-200" />
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
                      } translate-y-3 rounded-lg opacity-0 duration-300 ease-in-out group-hover:translate-y-0`}
                    >
                      <Link
                        href={
                          tab.sitelink ? tab.sitelink : `/connect${tab.link}`
                        }
                        className={`flex rounded-2xl ${tab.color} flex-row items-center justify-center p-3 text-white`}
                      >
                        <h1 className="text-[12px] font-semibold duration-200 group-hover:text-lg 2xl:text-sm">
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

      <section
        className={`peer absolute flex h-10 w-[10%] -translate-y-4 scale-0 flex-row items-center justify-center rounded-full bg-white shadow-xl transition-all delay-150 duration-500 peer-hover:-translate-y-16 lg:peer-hover:scale-100 dark:bg-slate-900/70`}
      >
        <motion.h1 className="font-bold dark:text-white/70">
          {selected}
        </motion.h1>
      </section>
      {settings.taskbar === "default" && (
        <button
          onClick={() => setLocked(!isLocked)}
          className={`peer absolute flex h-6 w-6 -translate-y-9 scale-0 flex-row items-center justify-center rounded-full bg-white shadow-xl transition-all delay-150 duration-500 peer-hover:-translate-y-11 peer-hover:scale-100`}
        >
          <IoLockClosed />
        </button>
      )}
    </div>
  );
};

export default Dock;
