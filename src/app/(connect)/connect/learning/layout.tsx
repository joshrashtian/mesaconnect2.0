import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-zinc-100 p-12 h-screen  min-w-full absolute top-0 left-0 ">
      {children}
    </main>
  );
};

export default layout;
