"use client";

import React, { Provider, useContext } from "react";
import { userContext } from "../AuthContext";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext);

  {
    /*)
  if (user?.user) {
    return (
      <div className="">
        <h1>You are successfully signed in as {user?.user.email}</h1>
        <Link href="/connect">
          <h1>Dashboard</h1>
        </Link>
        <div
          onClick={() => {
            user.signOut();
          }}
        >
          <h1>Sign Out</h1>
        </div>
      </div>
    );
  )
*/
  }
  return <div className="bg-orange-600 h-screen">{children}</div>;
};

export default Layout;
