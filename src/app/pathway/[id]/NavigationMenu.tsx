"use client";

import React from "react";
import { IoList, IoArrowUp } from "react-icons/io5";

const NavigationMenu: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTranscript = () => {
    const transcriptSection = document.getElementById("transcript-match");
    if (transcriptSection) {
      transcriptSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 z-50 -translate-y-1/2 transform">
      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm">
        <button
          onClick={scrollToTop}
          className="group flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 transition-colors duration-200 hover:bg-blue-200"
          title="Go to top"
        >
          <IoArrowUp className="text-blue-600 group-hover:text-blue-700" />
        </button>
        <button
          onClick={scrollToTranscript}
          className="group flex h-10 w-10 items-center justify-center rounded-md bg-green-100 transition-colors duration-200 hover:bg-green-200"
          title="Go to transcript match"
        >
          <IoList className="text-green-600 group-hover:text-green-700" />
        </button>
      </div>
    </nav>
  );
};

export default NavigationMenu;
