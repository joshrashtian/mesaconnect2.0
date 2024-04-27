import React, { Component } from "react";
import Viewposts from "./viewposts";
import ViewUsers from "./ViewUsers";
import CreateNews from "./createnewspost";

export interface AdminPanel {
  name: string;
  displayname: string;
  permissions: string[];
  component: any;
}
const AdminIndex: AdminPanel[] = [
  {
    name: "Home",
    displayname: "Dashboard",
    permissions: ["admin"],
    component: () => (
      <main>
        <h1>Dashboard Home </h1>
      </main>
    ),
  },
  {
    name: "posts",
    displayname: "View Posts",
    permissions: ["admin"],
    component: () => <Viewposts />,
  },
  {
    name: "users",
    displayname: "View Users",
    permissions: ["admin"],
    component: () => <ViewUsers />,
  },
  {
    name: "newnews",
    displayname: "Create News Post",
    permissions: ["admin"],
    component: () => <CreateNews />,
  },
];

export default AdminIndex;
