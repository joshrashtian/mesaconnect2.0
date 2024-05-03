'use server'
import Dock from '@/_components/navigation'
import React from 'react'
import InfoContextContainer from './InfoContext'
import { config } from '../../../config/mesa-config'
import EventModal from '../EventModal'
import { useSession } from '../../../config/serverside'
import { redirect } from 'next/navigation'
import ModalProvider from './connect/Modal'
import { UserCheck } from './UserCheck'
import { Metadata } from 'next'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  //TIP: UseSession Hook can only be used in Async Functions, since it returns a promise.

  const { session, error } = await useSession()

  if (!session?.user || error) {
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
