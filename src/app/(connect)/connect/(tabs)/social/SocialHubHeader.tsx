"use client";

import React, { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 48;

export function SocialHubHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-4 z-40 flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 transition-all duration-200 ${
        scrolled
          ? "rounded-2xl border-2 border-zinc-300 bg-white/95 py-2 dark:border-zinc-800 dark:bg-zinc-950/95 [&_.social-nav]:gap-1.5 [&_.social-nav_a]:px-3 [&_.social-nav_a]:py-2 [&_.social-nav_a]:text-xs [&_.social-title]:text-2xl sm:[&_.social-title]:text-3xl"
          : "border-transparent bg-transparent [&_.social-title]:drop-shadow-none"
      }`}
    >
      {children}
    </header>
  );
}
