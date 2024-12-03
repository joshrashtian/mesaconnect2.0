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
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { IoDocument, IoPeople, IoPerson } from "react-icons/io5";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function ConsoleSidebar() {
  const supabase = createServerComponentClient({ cookies });

  const user = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("events")
    .select("name, id")
    .eq("creator", user.data.session?.user.id);

  return (
    <Sidebar className="fixed z-40 font-eudoxus">
      <SidebarContent>
        <SidebarHeader className="flex flex-row items-center gap-2 pl-3 pt-5">
          <Avatar>
            <AvatarImage
              src={user.data.session?.user.user_metadata.avatar_url}
            />
            <AvatarFallback>
              {user.data.session?.user.user_metadata.real_name?.at(0)}
            </AvatarFallback>
          </Avatar>
          <ul className="text-sm font-bold">
            <p>Console</p>
            <p>{user.data.session?.user.user_metadata.real_name}</p>
          </ul>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            {data?.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton>
                  <Link href={item.id}>
                    <p>{item.name}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
          <IoDocument />
          <Link href="/docs">
            <p>Documentation</p>
          </Link>
        </SidebarMenuButton>
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
