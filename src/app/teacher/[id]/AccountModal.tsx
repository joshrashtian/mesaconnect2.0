"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "@/app/AuthContext";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoLogoApple, IoLogoGoogle } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { supabase } from "../../../../config/mesa-config";
import { useParams, usePathname } from "next/navigation";

export const AccountContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const AccountModal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { userData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const id = pathname.split("/")[2];

  const signInUser = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) setErrorMsg(error.message);
    else window.location.reload();
    setIsLoading(false);
  };

  const loginUser = async (service: any) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: service,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
      },
    });

    if (error) setErrorMsg(error.message);
    setIsLoading(false);
  };
  return (
    <AccountContext.Provider value={{ isOpen, setIsOpen }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="font-eudoxus">
          {userData?.id ? (
            <>
              <DialogHeader>
                <DialogTitle>Account</DialogTitle>
                <Button onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </Button>
              </DialogHeader>
            </>
          ) : (
            <>
              <div className="relative h-[200px] w-full rounded-t-lg border-0">
                <Image
                  src={require("./DSC00780.JPG")}
                  alt="account"
                  fill
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle>Sign In to Your Account.</DialogTitle>

                <Input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={() => signInUser(email, password)}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </Button>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => loginUser("google")}>
                    <IoLogoGoogle />
                  </Button>
                  <Button variant="outline" onClick={() => loginUser("apple")}>
                    <IoLogoApple />
                  </Button>
                </div>
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up">Sign Up</Link>
                </p>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </AccountContext.Provider>
  );
};

const AccountModalTrigger = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useAccountModal();
  return (
    <button
      className="cursor-pointer"
      onClick={() => setIsOpen(true)}
      type="button"
    >
      {children}
    </button>
  );
};

function useAccountModal() {
  const { isOpen, setIsOpen } = useContext(AccountContext);
  return { isOpen, setIsOpen };
}

export { AccountModalTrigger, useAccountModal };

export default AccountModal;
