"use client";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../config/mesa-config";
import { userContext, useUser } from "@/app/AuthContext";
import { IoHome, IoLockClosed } from "react-icons/io5";
import { useContextMenu } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";

const Dock = () => {
  const [selected, setSelected] = useState("");
  const [profURL, setProfURL] = useState<string | undefined>();
  const [isHovered, setIsHovered] = useState(false);
  const [profID, setProfID] = useState<string | undefined>();
  const context = useContextMenu();
  const router = useRouter();
  const [isLocked, setLocked] = useState(false);

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
      const user = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", userData?.id)
        .single();

      if (error) {
        console.log(error);
        setProfURL(undefined);
        return;
      }

      setProfID(data.id);
      setProfURL(data.avatar_url);
    };

    fetchURL();
  }, []);

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
      name: "Studio",
      link: "/builder",
    },
    {
      name: "Settings",
      link: "/settings",
    },
    {
      name: "Admin",
      link: "/admin",
      permissions: ["admin"],
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
        className="group peer bg-white  origin-bottom drop-shadow-md rounded-3xl hover:-translate-y-3 h-full w-16 hover:2xl:w-[60%] hover:w-[70%] max-w-3xl justify-center items-center duration-500 2xl:duration-700 hover:scale-[1.15] ease-in-out  "
      >
        <AnimatePresence>
          {profURL && !isHovered && (
            <motion.ul
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex justify-center items-center w-full h-full"
            >
              <img
                src={profURL ? profURL : SamplePhoto}
                alt="profile"
                className="w-12 h-12 cursor-pointer duration-500 rounded-full"
              />
            </motion.ul>
          )}
        </AnimatePresence>
        {isHovered && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.2 }}
              className="w-full h-full flex-row delay-500 flex justify-center gap-2  items-center duration-200"
            >
              {tabs.map((tab, index) => {
                if (tab.permissions) {
                  if (
                    !tab.permissions.includes(userData.userData?.role) ||
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
                    className=" opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 rounded-lg duration-300 ease-in-out"
                  >
                    <Link
                      href={`/connect${tab.link}`}
                      className="flex hover:text-orange-700 flex-row p-3 justify-center items-center"
                    >
                      <h1 className="2xl:text-sm text-[12px] font-semibold group-hover:text-lg duration-200">
                        {tab.name}
                      </h1>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        )}
      </section>

      <section className=" absolute w-[10%] h-10 flex flex-row delay-150 shadow-xl justify-center items-center peer scale-0 peer-hover:scale-100 rounded-full peer-hover:-translate-y-16 -translate-y-4 transition-all duration-500  bg-white ">
        <h1 className="font-bold">{selected}</h1>
      </section>
      <section
        className={`absolute w-6 h-6 flex flex-row delay-150 shadow-xl justify-center items-center peer scale-0 peer-hover:scale-100 rounded-full peer-hover:translate-y-10 -translate-y-4 transition-all duration-500  bg-white`}
      >
        <IoLockClosed />
      </section>
    </div>
  );
};

export default Dock;
