"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GrArticle,
  GrSupport,
  GrUserAdmin,
  GrUserSettings,
} from "react-icons/gr";
import {
  HomeIcon,
  UserIcon,
  MessageCircleIcon,
  BookIcon,
  Building2Icon,
  SettingsIcon,
  UserCogIcon,
} from "lucide-react";
import { useUser } from "@/app/AuthContext";

const NAV_ITEMS = [
  { name: "Home", icon: HomeIcon, href: "/connect/" },
  { name: "Profile", icon: UserIcon /* href set dynamically */ },
  { name: "Social", icon: MessageCircleIcon, href: "/connect/social" },
  { name: "Learning", icon: BookIcon, href: "/connect/learning" },
  { name: "Builder", icon: Building2Icon, href: "/connect/builder" },
  { name: "Settings", icon: SettingsIcon, href: "/connect/settings" },
  {
    name: "Admin",
    icon: UserCogIcon,
    href: "/connect/admin",
    roles: ["admin"],
  },
];

export default function BottomNav() {
  const { user, userData } = useUser();
  const pathname = usePathname();

  const userRole = userData?.role;
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 rounded-full border border-gray-200/50 bg-white/70 font-eudoxus text-xl shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/70"
    >
      <ul role="menubar" className="flex justify-around px-4 py-2 pt-3">
        {NAV_ITEMS.map(({ name, href, icon: Icon, roles }, i) => {
          // Role guard
          //@ts-expect-error userRole is not defined
          if (roles && !roles.includes(userRole)) return null;

          // Build the actual link:
          const link =
            name === "Profile" ? `/connect/profile/${user?.id}` : href!;

          // Active if exact or (for profile) any /connect/profile/...
          const isActive =
            name === "Profile"
              ? pathname.startsWith("/connect/profile")
              : pathname === link || pathname.startsWith(link + "/");

          return (
            <li key={i} role="none" className="flex-1">
              <Link href={link} passHref>
                <p
                  role="menuitem"
                  aria-label={name}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                >
                  <Icon
                    className={`h-6 w-6 transition-transform duration-150 group-hover:scale-110 ${
                      isActive
                        ? "scale-110 text-orange-500"
                        : "text-gray-600 dark:text-gray-300"
                    } `}
                  />
                  <span
                    className={`mt-1 text-xs font-medium opacity-0 transition-opacity duration-150 sm:opacity-100 ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-600 dark:text-gray-300"
                    } `}
                  >
                    {name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="mt-1 h-0.5 w-6 rounded bg-orange-500"
                    />
                  )}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
