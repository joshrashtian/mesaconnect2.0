"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { ConsoleSidebar } from "./(components)/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SelectedProvider } from "./SelectedEventContext";

async function EventDashboard({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const user = supabase.auth.getSession();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-2">
      <SelectedProvider>
        <SidebarProvider>
          <ConsoleSidebar />

          <article className="flex flex-row">
            <SidebarTrigger />
            {children}
          </article>
        </SidebarProvider>
      </SelectedProvider>
    </div>
  );
}

export default EventDashboard;
