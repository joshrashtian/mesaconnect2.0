"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { userContext, useUser } from "@/app/AuthContext";
import AdminIndex, { AdminPanel } from ".";
import { useToast } from "@/app/(connect)/InfoContext";
import {
  Sidebar,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarMenuItem,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState<AdminPanel>(AdminIndex[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
          <h1 className="text-2xl font-black">Admin Dashboard</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {AdminIndex.map((e, i) => {
              return (
                <SidebarMenuButton
                  onClick={() => {
                    setSelected(e);
                  }}
                  key={i}
                  className={`${selected === e ? "bg-orange-200" : "hover:bg-zinc-100"} flex cursor-pointer flex-row items-center gap-2 p-3 duration-300`}
                >
                  {e.icon}
                  <h3 className="text-md font-semibold">{e.displayname}</h3>
                </SidebarMenuButton>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <p className="text-md font-semibold">{user?.user?.email}</p>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex h-screen w-full flex-col font-eudoxus"
      >
        <ul className="my-4 h-1 w-full bg-orange-500" />
        <ul className="absolute left-0 top-0">
          <SidebarTrigger />
        </ul>

        <selected.component />
      </motion.main>
    </SidebarProvider>
  );
};

export default page;
