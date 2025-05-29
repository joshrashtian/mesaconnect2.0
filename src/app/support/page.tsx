"use server";

import React, { Suspense } from "react";
import HomePageHeader from "@/app/news/(homepage)/header";
import ModalProvider from "@/app/(connect)/connect/Modal";
import Buttons from "@/app/support/buttons";
import Tickets from "@/app/support/tickets";

const Page = async () => {
  return (
    <main className="flex flex-col gap-4">
      <Suspense>
        <ModalProvider>
          <Buttons />
          <Tickets />
        </ModalProvider>
      </Suspense>
    </main>
  );
};

export default Page;
