"use server";
import { IoCheckmark, IoCheckmarkCircle } from "react-icons/io5";
import React from "react";
import VerifyForm from "./VerifyForm";
import { serverside } from "../../../config/serverside";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Verify = async () => {
  const user = await serverside.auth.getUser();

  let userLoggedIn = false;
  if (user.data.user) {
    userLoggedIn = true;
  }

  return (
    <section className="flex h-screen w-full flex-row justify-center bg-gradient-to-b from-orange-500 to-red-500 pt-4 font-eudoxus md:justify-between md:p-12">
      <div className="flex w-0 scale-0 flex-col items-start justify-center p-12 md:w-1/2 md:scale-100 md:p-12">
        <div className="flex items-center justify-center rounded-full bg-white p-2 text-orange-500">
          <IoCheckmark size={66} />
        </div>
        <h1 className="text-4xl font-bold text-white">
          Let&apos;s Get You Verified and Join!
        </h1>
        <p className="text-white">
          We&apos;re excited to have you join our community! Please verify your
          MESA Status to continue.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-between rounded-b-none rounded-t-xl bg-white p-10 shadow-2xl md:w-1/2 md:rounded-3xl">
        {userLoggedIn ? (
          <>
            <h1 className="text-4xl font-bold text-orange-500">
              Let&apos;s Get Started With Your Status.
            </h1>
            <VerifyForm />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-orange-500">
              Your need to login to your MESA Connect Account.
            </h1>
            <Link
              href="/sign-in"
              className="mt-4 rounded-md bg-orange-500 px-4 py-2 text-white"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Verify;
