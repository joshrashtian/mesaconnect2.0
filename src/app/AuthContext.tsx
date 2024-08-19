"use client";

import React, {
  useEffect,
  createContext,
  useMemo,
  useState,
  useContext,
} from "react";
import { supabase } from "../../config/mesa-config";
import { User } from "@supabase/supabase-js";

export const userContext = createContext<ContextProps>({
  user: undefined,
  userData: undefined,
  signOut: () => {
    supabase.auth.signOut();
  },
  settings: undefined,
  dark: false,
});
export interface ContextProps {
  settings: any;
  user: User | undefined;
  userData:
    | {
        id: string;
        created_at: Date;
        username: string;
        role: string;
        real_name: string;
        avatar_url: string;
        college: string;
        major?: string;
        boxlist: object[];
        bio?: string;
        widgets?: [
          {
            name: string;
          }
        ];
      }
    | undefined;
  signOut: () => void;
  dark: boolean;
}

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [u, setUser] = useState<User>();
  const [userdata, setData] = useState();
  const [settings, setSettings] = useState();
  const [dark, setDark] = useState(false);
  function isDarkModeEnabled() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  const value = useMemo(() => {
    return {
      user: u,
      userData: userdata,
      signOut: () => {
        supabase.auth.signOut();
      },
      settings,
      dark,
    };
  }, [u, userdata, settings, dark]);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        getUserData();
        getSettings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
      .from("profiles")
      .select()
      // @ts-ignore
      .eq("id", userId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    console.log("successfully grabbed data");

    // @ts-ignore
    setData(data);
  };

  const getSettings = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
      .from("settings")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    console.log(data.data);

    // @ts-ignore
    setSettings(data);
  };

  useEffect(() => {
    getUser();
    setDark(isDarkModeEnabled());
  }, []);

  useEffect(() => {
    const profiles = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          // filter: `id=eq.${(supabase.auth.getUser()).then(e => e.data.user?.id)}`
        },
        (payload) => {
          console.log(payload.new);
          //@ts-ignore
          setData(payload.new);
        }
      )
      .subscribe();

    return () => {
      profiles.unsubscribe();
    };
  }, [supabase]);
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      console.log("signed in as" + session?.user.email);
      setUser(session?.user);
    } else if (event === "SIGNED_OUT") {
      console.warn("signed out");
      setUser(undefined);
      setData(undefined);
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      //user update event here
    }
  });

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export function useUser() {
  const context = React.useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useSettings() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context?.settings?.data ? context.settings.data : undefined;
}

export function useId() {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return {
    isSignedIn: !!context.user?.id,
    id: context.user?.id,
  };
}

export function useDarkMode() {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context.dark;
}

export default AuthContext;
