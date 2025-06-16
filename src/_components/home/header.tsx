"use client";
import { useDarkMode, useUser } from "@/app/AuthContext";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { HeaderContext } from "@/_components/home/HeaderContext";
import {
  IoPerson,
  IoCalendar,
  IoDocument,
  IoHelpCircle,
  IoNewspaper,
  IoPhonePortrait,
  IoEllipsisVertical,
  IoEllipsisHorizontal,
  IoCalculator,
  IoPeople,
} from "react-icons/io5";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = () => {
  const user = useUser();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const isDark = useDarkMode();

  const headerComponents = [
    {
      name: "Connect",
      href: "/connect",
      icon: <IoPhonePortrait />,
    },
    {
      name: "News",
      href: "/news",
      icon: <IoNewspaper />,
    },

    {
      name: "Events",
      href: "/events",
      icon: <IoCalendar />,
    },
  ];
  const controls = useAnimation();

  const handleDragEnd = () => {
    // Animate back to origin (x: 0, y: 0)
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateY = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const rotateX = useTransform(y, [-200, 0, 200], [15, 0, -15]);

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="fixed top-0 z-50 flex h-28 w-full flex-row items-center justify-between px-[5%] lg:px-10"
    >
      {/*
      <motion.ul
        style={{ opacity: opacity }}
        className="fixed left-0 top-0 -z-10 h-28 w-full rounded-b-3xl bg-gradient-to-br from-purple-500/50 to-orange-500/50 drop-shadow-lg backdrop-blur-sm dark:from-orange-900 dark:to-zinc-800"
      />
      */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, type: "spring" }}
        className="flex flex-row items-center gap-3 rounded-3xl bg-white/70 px-4 py-2 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-lg xl:opacity-100"
        style={{
          perspective: 1000,
        }}
      >
        <motion.div
          drag
          draggable
          whileHover={{
            borderColor: "#777",
            cursor: "grab",
            scale: 1.05,
          }}
          className={`relative h-12 w-12 min-w-12 overflow-hidden rounded-xl border ${
            pathname === "/"
              ? "bg-white"
              : "bg-gradient-to-r from-white to-orange-100"
          } shadow-lg`}
          style={{
            rotateY,
            rotateX,
            x,
            y,
          }}
          whileTap={{ scale: 0.95, cursor: "grabbing" }}
          onDragEnd={handleDragEnd}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={require("../../../public/mesalogo.png")}
            alt="logo"
            fill
            className="pointer-events-none object-contain"
          />
        </motion.div>

        <ul className="mx-4 hidden h-12 w-0.5 bg-black lg:block" />
        {headerComponents.map((e, index) => (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + 0.5 * index, duration: 2 }}
            className="mx-3 hidden h-full w-full items-center font-eudoxus text-lg lg:flex"
            key={index}
          >
            <Link
              href={e.href}
              className="flex flex-row items-center gap-2 text-lg duration-300 hover:scale-105 hover:cursor-pointer hover:font-medium"
            >
              {e.name}
            </Link>
            {/*headerComponents.length - 1 > index && (
              <ul className="bg-zinc-200 dark:bg-white w-0.5 ml-4 h-12" />
            )*/}
          </motion.ul>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full px-4 duration-300 hover:cursor-pointer hover:bg-zinc-100/60 lg:hover:bg-zinc-100/40">
            <IoEllipsisVertical className="h-12 w-4 text-2xl text-black duration-300 hover:rotate-90 lg:rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 rounded-xl bg-white/70 font-eudoxus text-lg shadow-2xl shadow-black/50 backdrop-blur-lg">
            <DropdownMenuGroup title="Connect" className="flex flex-col gap-2">
              <DropdownMenuLabel>Connect</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/connect");
                }}
                className="hover:bg-zinc-30s0/60 cursor-pointer justify-between rounded-xl font-eudoxus"
              >
                <IoPeople className="h-4 w-4" />
                <p>Connect</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/news");
                }}
                className="hover:bg-zinc-30s0/60 cursor-pointer justify-between rounded-xl font-eudoxus"
              >
                <IoNewspaper className="h-4 w-4" />
                <p>News</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup title="Tools" className="flex flex-col gap-2">
              <DropdownMenuLabel>Tools</DropdownMenuLabel>
              <DropdownMenuItem className="hover:bg-zinc-30s0/60 cursor-pointer justify-between rounded-xl font-eudoxus">
                <IoCalculator className="h-4 w-4" />
                <p>GPA Calculator</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-900/10" />
            <DropdownMenuGroup className="flex flex-col gap-2">
              <DropdownMenuLabel>Community</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/teacher");
                }}
                className="cursor-pointer justify-between rounded-xl hover:bg-zinc-300/60"
              >
                <IoPeople className="h-4 w-4" />
                <p>MESATeachers</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/mobile");
                }}
                className="cursor-pointer justify-between rounded-xl hover:bg-zinc-300/60"
              >
                <IoPhonePortrait className="h-4 w-4" />
                <p>Mobile App</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
      <motion.section className="absolute right-[5%] flex flex-row items-center gap-5 text-nowrap text-white">
        <button
          onClick={() => setMenu(!menu)}
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full drop-shadow-2xl duration-300 hover:scale-105"
        >
          <motion.h1 className="text-sm drop-shadow-xl lg:text-xl">
            {user.userData?.real_name ??
              user.user?.user_metadata.full_name ??
              user.user?.user_metadata.username ??
              user.user?.email ??
              "Sign In"}
          </motion.h1>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
            {user.userData?.avatar_url ? (
              <Image
                src={user.userData?.avatar_url}
                className="h-8 w-8 rounded-full"
                fill
                alt={
                  user.userData?.real_name ??
                  user.user?.user_metadata.full_name ??
                  user.userData?.username ??
                  user.user?.user_metadata.username ??
                  user.user?.email
                }
              />
            ) : (
              <IoPerson className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </button>
      </motion.section>
      <AnimatePresence>
        <HeaderContext user={user} isActive={menu} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
