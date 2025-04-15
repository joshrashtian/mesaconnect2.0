import React from "react";
import Viewposts from "./viewposts";
import ViewUsers from "./ViewUsers";
import CreateNews from "./createnewspost";
import { AdminHome } from "@/app/(connect)/connect/(admindashboard)/admin/AdminHome";
import { HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import CollegeSettings from "./CollegeSettings";
import { IoSchoolOutline, IoChatboxOutline, IoMap } from "react-icons/io5";
import ClassesEditor from "./ClassesEditor";
import PathwayBuilder from "./PathwayBuilder";
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
    icon: <IoChatboxOutline className="h-5 w-5" />,
    component: () => <Viewposts />,
  },
  {
    name: "users",
    displayname: "View Users",
    permissions: ["admin"],
    icon: <UserIcon className="h-5 w-5" />,
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
  {
    name: "classeseditor",
    displayname: "Classes",
    permissions: ["admin"],
    icon: <IoSchoolOutline className="h-5 w-5" />,
    component: () => <ClassesEditor />,
  },
  {
    name: "pathwaybuilder",
    displayname: "College Pathways",
    permissions: ["admin"],
    icon: <IoMap className="h-5 w-5" />,
    component: () => <PathwayBuilder />,
  },
];

export default AdminIndex;
