"use client";
import { ContextProps, userContext } from "@/app/AuthContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import { HeaderContext } from "@/_components/home/HeaderContext";

const HomePageHeader = ({ title }: { title: string }) => {
  const user: ContextProps = useContext(userContext);
  const [menu, setMenu] = useState(false);
  return (
    <motion.main className="flex h-16 w-full flex-row items-center justify-between">
      <h1 className="font-eudoxus text-4xl font-semibold text-slate-800 dark:text-white">
        <span className="text-orange-600">MESA</span>
        {title}
      </h1>
      {user?.userData?.avatar_url ? (
        <motion.ul
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-30 h-16 w-16"
          onClick={() => {
            menu ? setMenu(false) : setMenu(true);
          }}
        >
          <Image
            fill={true}
            alt="profile picture"
            className="cursor-pointer shadow-xl duration-500 hover:scale-105 active:scale-[0.85]"
            style={{ borderRadius: "100%" }}
            src={user?.userData?.avatar_url}
          />
        </motion.ul>
      ) : (
        <Link
          href="/sign-in"
          className="group relative z-30 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white duration-500 hover:bg-transparent"
        >
          <IoPerson
            size={"50%"}
            className="cursor-pointer text-black duration-500 group-hover:-translate-x-16 group-hover:scale-[1.35] group-hover:text-orange-500 group-active:scale-[0.85]"
          />
          <h1 className="absolute scale-0 cursor-pointer font-eudoxus text-xl font-bold text-slate-600 duration-500 group-hover:scale-100 group-active:scale-[0.85]">
            Sign In
          </h1>
        </Link>
      )}
      <AnimatePresence>
        <HeaderContext user={user} isActive={menu} />
      </AnimatePresence>
    </motion.main>
  );
};

const UserMenu = ({
  user,
  isActive = false,
  disengage,
}: {
  user: ContextProps;
  isActive: boolean;
  disengage: () => void;
}) => {
  if (!isActive) return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const options = [
    {
      label: "Enter Connect",
      function: () => {
        router.push("/connect");
      },
    },
    {
      label: "User Information",
      function: () => {
        router.push("/sign-in");
      },
    },
    {
      label: "My Profile",
      function: () => {
        router.push(`/connect/profile/${user.user?.id}`);
      },
    },
  ];

  return (
    <>
      <motion.main
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="absolute right-24 top-20 z-20 origin-top-right rounded-xl bg-white p-3.5 px-5 shadow-lg"
      >
        <h1 className="font-bold">{user.user?.user_metadata.real_name}</h1>
        <section className="mt-2 flex flex-col font-eudoxus">
          {options.map((option) => (
            <motion.ul
              key={option.label}
              className="cursor-pointer rounded-xl p-2 text-center duration-300 hover:bg-gray-100"
              onClick={option.function}
            >
              {option.label}
            </motion.ul>
          ))}
        </section>
      </motion.main>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-10 h-full w-full bg-black"
        onClick={(e) => {
          e.preventDefault();
          disengage();
        }}
      />
    </>
  );
};

export default HomePageHeader;
