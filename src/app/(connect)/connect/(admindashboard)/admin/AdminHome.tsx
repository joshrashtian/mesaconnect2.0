"use client";
import React from "react";
import { useToast } from "@/app/(connect)/InfoContext";
import { useModal } from "../../Modal";
import ModalScrollView from "@/_components/ModalComponent";
import TitleComponent from "@/(mesaui)/title";

export const AdminHome = () => {
  const toast = useToast();
  const modal = useModal();
  return (
    <main>
      <h1>Dashboard Home </h1>
      <button onClick={() => toast.toast("Testing Modal", "error")}>
        Trigger Error
      </button>
      <button onClick={() => toast.toast("Testing Modal", "success")}>
        Trigger Success
      </button>
      <button
        onClick={() =>
          modal.CreateModal(
            <ModalScrollView>
              <TitleComponent size="small">Table of Contents</TitleComponent>
            </ModalScrollView>
          )
        }
      >
        Trigger Modal
      </button>
    </main>
  );
};
