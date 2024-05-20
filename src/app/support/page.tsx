"use server"

import React, {Suspense} from 'react';
import HomePageHeader from "@/app/news/(homepage)/header";
import ModalProvider from "@/app/(connect)/connect/Modal";
import Buttons from "@/app/support/buttons";

const Page = async () => {
    return (
        <main>
          <HomePageHeader title="Support" />
          <Suspense>
            <ModalProvider>
              <Buttons />
            </ModalProvider>
          </Suspense>
        </main>
    );
};

export default Page;
