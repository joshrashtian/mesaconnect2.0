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
import { IoPerson } from "react-icons/io5";

const items = [
  {
    title: "General",
    link: "/docs/roles",
    icon: IoPerson,
  },
];

export async function DocsSidebar() {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="z-40 font-eudoxus"
    >
      <SidebarHeader>
        <SidebarGroupLabel className="text-center text-3xl font-black">
          MESADocs
        </SidebarGroupLabel>
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
      <SidebarFooter />
    </Sidebar>
  );
}
