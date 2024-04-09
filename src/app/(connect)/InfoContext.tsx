'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

import PostContext from '@/_components/socialhub/PostContext'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Toast from './connect/Toast'

type MenuContext = {
  valueAt: string | undefined
  rightClick: (e: any, right: any) => void
  toast: (message: string, type: 'success' | 'error' | 'informative') => void
}

export const MenuContext = createContext({
  valueAt: undefined,
  rightClick: () => {},
  toast: () => {}
})

const InfoContextContainer = ({ children }: { children: React.ReactNode }) => {
  const contextRef = useRef<any>(null)
  const [contentPos, setContextPos] = useState({
    x: 0,
    y: 0,
    toggled: false,
    buttons: {}
  })
  const [toastState, setToastState] = useState({
    open: false,
    message: 'woop woop',
    type: 'success'
  })

  useEffect(() => {
    const handler = (e: any) => {
      if (contextRef.current) {
        if (!contextRef.current.contains(e.target)) {
          setContextPos({
            x: 0,
            y: 0,
            toggled: false,
            buttons: {}
          })
        }
      }
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  })

  const onContextMenu = async (e: any, right: any) => {
    e.preventDefault()

    const att: any = contextRef?.current?.getBoundingClientRect()

    const isLeft: boolean = e.clientX < window?.innerWidth / 2
    let x
    let y = e.clientY

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - att?.width
    }

    setContextPos({
      x,
      y,
      toggled: true,
      buttons: right
    })
  }

  const value = {
    valueAt: '10',
    rightClick: (e: any, right: any) => {
      onContextMenu(e, right)
    },
    toast: (msg: string, type: string) => {
      setToastState({
        open: true,
        message: msg,
        type: type ? type : 'Informative'
      })
    }
  }

  return (
    <MenuContext.Provider value={value}>
      {children}

      <motion.section ref={contextRef}>
        <AnimatePresence>
          <PostContext
            contextMenuRef={contextRef}
            positionX={contentPos.x}
            positionY={contentPos.y}
            isToggled={contentPos.toggled}
            rightClick={'ok'}
            buttons={contentPos.buttons}
          />
        </AnimatePresence>
      </motion.section>

      <AnimatePresence>
        <Toast
          trigger={toastState.open}
          type={toastState.type}
          message={toastState.message}
          turnOff={() => {
            setToastState({ open: false, message: '', type: 'success' })
          }}
        />
      </AnimatePresence>
    </MenuContext.Provider>
  )
}

export function useToast() {
  //@ts-ignore
  const context = useContext<MenuContext>(MenuContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default InfoContextContainer
