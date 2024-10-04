"use client";
import StandardButton from "@/(mesaui)/StandardButton";
import { useUser } from "@/app/AuthContext";
import React from "react";
import { IoAccessibility } from "react-icons/io5";

const BottomOnboarding = () => {
  const { user, userData: data } = useUser();
  return (
    <main className="h-96 w-full rounded-3xl bg-white p-12">
      <p>Hello, {data?.real_name} </p>
      <p>Let&apos;s get started with learning our service.</p>
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
        buttonType="button"
        icon={<IoAccessibility />}
        onClick={() => console.log("Hello")}
      >
        Hello!
      </StandardButton>
    </main>
  );
};

export default BottomOnboarding;
