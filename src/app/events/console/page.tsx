"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function EventDashboard() {
  const supabase = createServerComponentClient({ cookies });

  const user = supabase.auth.getSession();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Event Builder</h1>
    </div>
  );
}

export default EventDashboard;
