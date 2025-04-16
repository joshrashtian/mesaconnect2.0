"use server";
import React, { useContext } from "react";
import { userContext } from "../AuthContext";
import Dashboard from "./Dashboard";
import { serverside } from "../../../config/serverside";
import { redirect } from "next/navigation";
import { Metadata } from "next";

//TODO: Fix Auth SignOut

export async function generateMetadata() {
  return {
    title: "Sign In",
  };
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await serverside.auth.getUser();

  if (!!data.user) {
    redirect("/connect");
  }

  return <main className="h-screen bg-orange-600">{children}</main>;
};

export default Layout;
