import React from "react";
import Viewposts from "./viewposts";
import ViewUsers from "./ViewUsers";
import CreateNews from "./createnewspost";
import { AdminHome } from "@/app/(connect)/connect/(admindashboard)/admin/AdminHome";
import { HomeIcon, PlusIcon } from "lucide-react";
import CollegeSettings from "./CollegeSettings";
import { IoSchoolOutline } from "react-icons/io5";
export interface AdminPanel {
  name: string;
  displayname: string;
  permissions: string[];
  component: any;
  icon?: React.ReactNode;
}
const AdminIndex: AdminPanel[] = [
  {
    name: "Home",
    displayname: "Dashboard",
    permissions: ["admin"],
    icon: <HomeIcon className="h-5 w-5" />,
    component: () => <AdminHome />,
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
    icon: <PlusIcon className="h-5 w-5" />,
    component: () => <CreateNews />,
  },
  {
    name: "collegesettings",
    displayname: "College Settings",
    permissions: ["admin"],
    icon: <IoSchoolOutline className="h-5 w-5" />,
    component: () => <CollegeSettings />,
  },
];

export default AdminIndex;
