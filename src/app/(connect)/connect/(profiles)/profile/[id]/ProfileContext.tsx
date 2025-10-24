"use client";
import { UserData } from "@/_assets/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";

type Profile = {
  id: string | undefined;
  data: UserData | undefined;
  connections: Connection[] | undefined;
};

export type Connection = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  mutual_since: string;
};

export const ProfileContext = createContext<Profile | null>(null);

const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserData | undefined>();
  const url = usePathname();

  const [connections, setConnections] = useState<Connection[] | undefined>();

  useEffect(() => {
    const profileId = url.split("/").reverse()[0];
    if (!profileId) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", profileId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      const { data: connectionsData, error: connectionsError } =
        //@ts-ignore
        await supabase.rpc("get_my_connected_profiles_from_view");

      if (connectionsError) {
        console.error("Error fetching connections:", connectionsError);
        return;
      }

      setConnections(connectionsData as unknown as Connection[]);
      //@ts-ignore
      setUser(data);
    };

    fetchData();
  }, [url]);

  return (
    <ProfileContext.Provider
      value={{ data: user, id: user?.id, connections: connections ?? [] }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  return useContext(ProfileContext);
}

export default ProfileContextProvider;
