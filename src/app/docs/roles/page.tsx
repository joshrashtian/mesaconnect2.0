"use client";
import React from "react";
import { IoAdd } from "react-icons/io5";
import Border from "../_components/border";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-3 font-eudoxus">
      <h1 className="text-5xl font-bold">Verification</h1>
      <p>
        <b>Verification</b> is a system introduced inside of Beta Version 3.
        Verification in MESA Connect is a system that allows users who are
        currently MESA students/previously MESA students. This will allow others
        to verify your MESA status as well as gain certain features limited to
        MESA Students, as well as possible new integrations within psychical
        MESA locations in the future.
      </p>
      <b className="text-xl">
        There are various reasons we have implimented such a feature:
      </b>
      <ul className="rounded-3xl bg-zinc-200 p-3 dark:bg-zinc-900/40">
        <li className="flex flex-row items-center justify-end gap-3 font-light">
          <IoAdd className="text-black" /> Allow People Outside Of MESA To Join
        </li>
        <li className="flex flex-row items-center justify-end gap-3 font-light">
          <IoAdd className="text-black" /> Security: Certain Higher Profile
          Features (i.e. Community HTML Coding) Limited Due To Security
        </li>
        <li className="flex flex-row items-center justify-end gap-3 font-light">
          <IoAdd className="text-black" /> Verification Of MESA Status{" "}
        </li>
        <li className="flex flex-row items-center justify-end gap-3 font-light">
          <IoAdd className="text-black" /> Better Way To Keep Track of MESA
          Students (for security)
        </li>
      </ul>
      <Border />
      <b className="text-xl">There are 2 ways to seek verification:</b>
      <h3 className="text-lg font-semibold">Option 1: Talk To MESA Admin</h3>
      <p>
        The first option is to talk to a MESA Admin. This is the most common
        method of verification. You can ask them to verify you in the system. As
        long as you are a part of MESA with a valid card, you will be granted
        verification.
      </p>
      <h3 className="text-lg font-semibold">Option 2: MESA Event / Workshop</h3>
      <p>
        If you join as a result of a MESA event using the service, talk to who
        is running the event and you will be granted verification.
      </p>
      <h3 className="text-lg font-semibold">Option 3: Verification Form</h3>
      <Link href="/verify">
        <Button>Verification Form</Button>
      </Link>

      <Border />
      <p>
        Please Note: Verification will <i>not</i> offer restrictions when it
        comes to basic / constant use of the site. It will only be for certain
        specific advanced functionally, such as HTML Code Blocking, Advanced CSS
        / Profile Editing (i.e. Custom CSS, will come in later CSS version), and
        other features that may be added in the future.
      </p>
    </div>
  );
};

export default Page;
