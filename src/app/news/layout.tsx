"use server"
import React from "react";

export async function generateMetadata() {
  return {
    title: "News"
  }
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>

      {children}
    </main>
  );
};

export default layout;
