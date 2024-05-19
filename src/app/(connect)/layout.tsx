'use server'
import Dock from '@/_components/navigation'
import React from 'react'
import InfoContextContainer from './InfoContext'
import { config } from '../../../config/mesa-config'
import EventModal from '../EventModal'
import { redirect } from 'next/navigation'
import ModalProvider from './connect/Modal'
import { UserCheck } from './UserCheck'
import {serverside} from "../../../config/serverside";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  //TIP: UseSession Hook can only be used in Async Functions, since it returns a promise.

  const { data, error } = await serverside.auth.getUser()

  if (!data.user) {
    redirect('/sign-in')
  }

  return (
    <InfoContextContainer>
      <UserCheck>
        <ModalProvider>
          <EventModal>
            <main className="p-16 h-screen">
              <Dock />

              {children}
              <h1 className="fixed bottom-2 right-2 font-mono">{config.versionNumber}</h1>
            </main>
          </EventModal>
        </ModalProvider>
      </UserCheck>
    </InfoContextContainer>
  )
}

export default Layout
