'use client'
import React from "react";
import {useToast} from "@/app/(connect)/InfoContext";

export const AdminHome = () => {
  const toast = useToast();
    return (
      <main><h1>Dashboard Home </h1>
        <button onClick={() => toast.toast("Testing Modal", "error")}>Trigger Error</button>
        <button onClick={() => toast.toast("Testing Modal", "success")}>Trigger Success</button>
      </main>
    );
};
