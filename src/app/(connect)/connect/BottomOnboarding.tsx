"use client";
import StandardButton from "@/(mesaui)/StandardButton";
import { useUser } from "@/app/AuthContext";
import React, { useState } from "react";
import {
  IoAccessibility,
  IoBook,
  IoClose,
  IoPencil,
  IoPeople,
  IoSchool,
} from "react-icons/io5";
import { motion } from "framer-motion";
import { useModal } from "./Modal";
import BioModal from "./(profiles)/profile/[id]/BioModal";
import MajorModal from "./(profiles)/profile/[id]/MajorModal";
import CollegeModal from "./(profiles)/profile/[id]/CollegeModal";
const BottomOnboarding = () => {
  const [open, setOpen] = useState(true);
  const { user, userData: data } = useUser();
  const modal = useModal();
  if (!open) return null;
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-fit w-full flex-col gap-1 rounded-3xl bg-white p-12 dark:bg-zinc-900 dark:text-slate-200"
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
      {!data?.bio && (
        <StandardButton
          buttonType="button"
          onClick={() =>
            modal.CreateModal(<BioModal bio={data?.bio} user={data?.id} />)
          }
          icon={<IoPencil />}
        >
          Set Your Bio
        </StandardButton>
      )}
      {!data?.college && (
        <StandardButton
          buttonType="button"
          onClick={() =>
            modal.CreateModal(
              <CollegeModal bio={data?.college} user={data?.id} />,
            )
          }
          icon={<IoSchool />}
        >
          Set Your College
        </StandardButton>
      )}
      {!data?.major && (
        <StandardButton
          buttonType="button"
          onClick={() =>
            modal.CreateModal(
              <MajorModal major={data?.major} user={data?.id} />,
            )
          }
          icon={<IoBook />}
        >
          Add Your Major
        </StandardButton>
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
