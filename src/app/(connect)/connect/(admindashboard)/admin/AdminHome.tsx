"use client";
import React from "react";
import { useToast } from "@/app/(connect)/InfoContext";
import { useModal } from "../../Modal";
import ModalScrollView from "@/_components/ModalComponent";
import TitleComponent from "@/(mesaui)/title";
import { IoChatbox, IoCheckmark } from "react-icons/io5";
import StandardButton from "@/(mesaui)/StandardButton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import MenuButton from "@/(mesaui)/MenuButton";
import { useRouter } from "next/router";

export const AdminHome = () => {
  const toast = useToast();
  const modal = useModal();
  return (
    <main className="rounded-3xl bg-zinc-50 p-10">
      <h1>Dashboard Home </h1>
      <StandardButton
        title="Error Modal"
        buttonType="button"
        className="mb-2"
        onClick={() => toast.toast("Testing Toast", "error")}
      >
        Trigger Error Toast
      </StandardButton>

      <StandardButton
        title="Success Modal"
        buttonType="button"
        icon={<IoCheckmark />}
        onClick={() => toast.toast("Testing Toast", "success")}
      >
        Trigger Success Toast
      </StandardButton>

      <Separator />

      <ul className="flex flex-row">
        <MenuButton
          title="View Posts"
          icon={<IoChatbox />}
          color="bg-blue-500"
        />
      </ul>
    </main>
  );
};
