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
import { IoPeople, IoPerson } from "react-icons/io5";
import { cookies } from "next/headers";

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
