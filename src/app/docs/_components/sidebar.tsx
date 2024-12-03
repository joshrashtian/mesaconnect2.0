"use server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IoPeople, IoPerson } from "react-icons/io5";

const items = [
  {
    title: "General",
    link: "/docs/roles",
    icon: IoPerson,
  },
];

export async function DocsSidebar() {
  return (
    <Sidebar className="fixed z-40 font-eudoxus">
      <SidebarHeader>
        <h2 className="font-eudoxus text-sm text-slate-800 shadow-black lg:text-xl">
          MESA
          <span className="text text-black drop-shadow-xl">Docs</span>
          <span className="mx-2 rounded-full bg-red-400 px-2 text-xs text-black dark:bg-black dark:text-white">
            beta
          </span>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton>
                  <item.icon />
                  <Link href={item.link}>
                    <p>Verification and Roles</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
          <IoPeople />
          <Link href="/connect">
            <p>Connect Home</p>
          </Link>
        </SidebarMenuButton>
        <SidebarGroupLabel>© 2024 MESA</SidebarGroupLabel>
      </SidebarFooter>
    </Sidebar>
  );
}
