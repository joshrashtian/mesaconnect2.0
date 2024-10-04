"use client";
import StandardButton from "@/(mesaui)/StandardButton";
import { useUser } from "@/app/AuthContext";
import React from "react";
import { IoAccessibility, IoPeople } from "react-icons/io5";

const BottomOnboarding = () => {
  const { user, userData: data } = useUser();
  return (
    <main className="h-96 w-full rounded-3xl bg-white p-12 dark:bg-zinc-900 dark:text-slate-200">
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
    </main>
  );
};

export default BottomOnboarding;
