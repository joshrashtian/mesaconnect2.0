'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

import PostContext from '@/_components/socialhub/PostContext'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Toast from './connect/Toast'
import { IconBaseProps } from 'react-icons'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

type MenuContext = {
  valueAt: string | undefined
  rightClick: (e: any, right: any) => void
  toast: (message: string, type: 'success' | 'error' | 'informative') => void
}

export const MenuContext = createContext({
  valueAt: undefined,
  rightClick: (e: any, right: any) => {},
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

    const att: any = contextRef.current.getBoundingClientRect()

    const isLeft: boolean = e.clientX < window?.innerWidth / 2
    let x
    let y = e.clientY

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - 130
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
    //@ts-ignore
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
    throw new Error('useUser must be used within Provider')
  }

  function toast(message: string, type: 'success' | 'error' | 'informative') {
    context.toast(message, type)
  }

  function CreateInfoToast(message: string) {
    context.toast(message, 'informative')
  }

  function CreateSuccessToast(message: string) {
    context.toast(message, 'success')
  }

  function CreateErrorToast(message: string) {
    context.toast(message, 'error')
  }
  return {
    context,
    CreateErrorToast,
    CreateInfoToast,
    CreateSuccessToast,
    toast
  }
}

export function useContextMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useUser must be used within Provider')
  }

  function createContext(
    e: React.MouseEvent,
    buttons: { name: string; visible: boolean; function: () => void; icon?: React.Component | React.ReactElement  }[]
  ) {
    context.rightClick(e, buttons)
  }

  function getContext() {
    return context
  }

  return { createContext, getContext }
}

export default InfoContextContainer
