"use client";
import { ContextProps, userContext } from "@/app/AuthContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

const HomePageHeader = ({ title } : { title: string }) => {
  const user: ContextProps = useContext(userContext);
  const [menu, setMenu] = useState(false);
  return (
    <motion.main className="flex flex-row h-16 items-center justify-between">
      <h1 className="dark:text-white text-slate-800 font-eudoxus font-semibold text-4xl">
        <span className="text-orange-600">MESA</span>{title}
      </h1>
      {user?.userData?.avatar_url ? (
        <motion.ul
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-16 h-16 z-30 relative"
          onClick={() => {
            menu ? setMenu(false) : setMenu(true);
          }}
        >
          <Image
            fill={true}
            alt="profile picture"
            className="shadow-xl hover:scale-105 cursor-pointer active:scale-[0.85] duration-500 "
            style={{ borderRadius: "100%" }}
            src={user?.userData?.avatar_url}
          />
        </motion.ul>
      ) : (
        <Link
          href="/sign-in"
          className="w-16 h-16 z-30 flex justify-center cursor-pointer items-center group bg-white hover:bg-transparent duration-500 rounded-full relative"
        >
          <IoPerson
            size={"50%"}
            className=" text-black group-hover:text-orange-500 group-hover:scale-[1.35] group-hover:-translate-x-16 cursor-pointer group-active:scale-[0.85] duration-500 "
          />
          <h1 className="group-hover:scale-100 absolute scale-0 font-bold font-eudoxus text-xl text-slate-600 cursor-pointer group-active:scale-[0.85] duration-500">
            Sign In
          </h1>
        </Link>
      )}
      <AnimatePresence>
        <UserMenu
          user={user}
          isActive={menu}
          disengage={() => {
            setMenu(false);
          }}
        />
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
        className="absolute rounded-xl px-5 p-3.5 bg-white shadow-lg origin-top-right top-20 right-24 z-20"
      >
        <h1 className="font-bold">{user.user?.user_metadata.real_name}</h1>
        <section className="flex flex-col mt-2 font-eudoxus">
          {options.map((option) => (
            <motion.ul
              key={option.label}
              className="p-2 text-center hover:bg-gray-100 duration-300 rounded-xl cursor-pointer"
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
        className="bg-black w-full h-full z-10 left-0 top-0 fixed"
        onClick={(e) => {
          e.preventDefault();
          disengage();
        }}
      />
    </>
  );
};

export default HomePageHeader;
