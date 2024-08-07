"use client";
import React, { useMemo } from "react";
import { IoDocument, IoGitBranch, IoTicket } from "react-icons/io5";
import { useModal } from "@/app/(connect)/connect/Modal";
import NewTicket from "@/app/support/NewTicket";
import MenuButton from "@/(mesaui)/MenuButton";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const modal = useModal();
  const router = useRouter();
  const categories = useMemo(
    () => [
      {
        title: "Ticket",
        icon: <IoTicket />,
        color: "bg-gradient-to-tr from-orange-500 to-red-500",
        onClick: () => modal.CreateModal(<NewTicket />),
      },
      {
        title: "Terms of Service",
        icon: <IoDocument />,
        color: "bg-gradient-to-tr from-purple-500 to-red-500",
        onClick: () => router.push("/support/terms"),
      },
    ],
    []
  );

  return (
    <ul className="flex gap-2">
      {categories.map((e) => (
        <MenuButton
          title={e.title}
          icon={e.icon}
          color={e.color}
          onClick={e.onClick}
        />
      ))}
    </ul>
  );
};

export default Buttons;
