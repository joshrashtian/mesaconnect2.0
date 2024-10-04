"use client";
import StandardButton from "@/(mesaui)/StandardButton";
import { useUser } from "@/app/AuthContext";
import React, { useState } from "react";
import { IoAccessibility, IoClose, IoPeople } from "react-icons/io5";
import { motion } from "framer-motion";
const BottomOnboarding = () => {
  const [open, setOpen] = useState(true);
  const { user, userData: data } = useUser();

  if (!open) return null;
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-96 w-full rounded-3xl bg-white p-12 dark:bg-zinc-900 dark:text-slate-200"
    >
      <p>Hello, {data?.real_name} </p>
      <p className="mb-3">Let&apos;s get started with learning our service.</p>
      {!data?.avatar_url && (
        <>
          <p>Upload a profile picture to get started.</p>
          <StandardButton
            buttonType="link"
            href={`/connect/profile/${data?.id}`}
            icon={<IoAccessibility />}
          >
            Upload Picture
          </StandardButton>
        </>
      )}
      <StandardButton
        buttonType="link"
        icon={<IoPeople />}
        href="/connect/community"
      >
        Join a Community
      </StandardButton>
      <StandardButton
        buttonType="button"
        onClick={() => setOpen(false)}
        icon={<IoClose />}
        className="absolute right-7 top-7 flex w-24"
      >
        Later
      </StandardButton>
    </motion.main>
  );
};

export default BottomOnboarding;
