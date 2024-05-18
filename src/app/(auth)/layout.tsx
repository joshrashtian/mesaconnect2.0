"use server"
import React, { useContext } from "react";
import { userContext } from "../AuthContext";
import Dashboard from "./Dashboard";
import {serverside} from "../../../config/serverside";
import {redirect} from "next/navigation";
import {Metadata} from "next";

//TODO: Fix Auth SignOut

export async function generateMetadata() {

  return {
    title: "Sign In"
  }
}


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await serverside.auth.getSession()

  if(user.data.session?.user) {
    redirect('/connect')
  }

  return <main className="bg-orange-600 h-screen">{children}</main>;

};

export default Layout;
