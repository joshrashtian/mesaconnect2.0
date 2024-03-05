'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ModalCreate = {
  createModal?: (component: any) => {}
  disarmModal?: () => {}
}

export const AdminModal = createContext<ModalCreate>({})

import React from 'react'

const AdminModalContainer = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<Element | any>()

  const value: any = {
    createModal: (modal: any, type: any) => {
      switch (type) {
        case 'post':
          setModal(<CreateModalPost post={modal} />)
          break
        case 'user':
          setModal(<CreateModalUsers user={modal} />)
          break
        default:
          return null
      }
    },
    disarmModal: () => {
      setModal(undefined)
    }
  }

  return (
    <AdminModal.Provider value={value}>
      {children}
      <AnimatePresence>{modal && <motion.section>{modal}</motion.section>}</AnimatePresence>
    </AdminModal.Provider>
  )
}

export default AdminModalContainer

import { PostType, UserData } from '@/_assets/types'
import Post from '@/_components/socialhub/Post'
import Wim from '@/_components/socialhub/Wim'

const CreateModalUsers = ({ user }: { user: UserData }) => {
  return <div>AdminModal</div>
}

const CreateModalPost = ({ post }: { post: PostType }) => {
  const modal: any = useContext(AdminModal)
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-10 flex justify-center items-center overflow-y-auto"
    >
      <AnimatePresence>
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          className="bg-white shadow-lg flex flex-col justify-between w-3/4 h-3/4 p-5 px-10 z-50 rounded-3xl"
        >
          <article className="flex flex-col gap-3 h-full">
            <ul className="flex flex-row-reverse justify-between items-center p-3">
              <p
                onClick={() => {
                  modal.disarmModal()
                }}
                className="font-medium cursor-pointer hover:text-red-600 duration-300 p-4 font-mono text-4xl"
              >
                x
              </p>
              <h1 className="font-bold text-2xl">{post.title}</h1>
            </ul>
            <ul className="bg-zinc-800 text-white rounded-xl p-3">
              <pre>{JSON.stringify(post.data)}</pre>
            </ul>
            <ul className="p-5 bg-slate-100 rounded-2xl">
              <h2>Posted by:</h2>
              <h3>
                {post.creator.realname} | @{post.creator.username}
              </h3>
              <h3>{post.creator.id}</h3>
            </ul>
            <pre>{JSON.stringify(post.tags)}</pre>
            <ul className="h-full">
              <h1 className="font-semibold">Preview</h1>
              {post.type === 'post' ? (
                <Post post={post} />
              ) : (
                post.type === 'wim' && <Wim post={post} />
              )}
            </ul>
          </article>
        </motion.section>
      </AnimatePresence>
      <ul className="absolute inset-0 bg-gray-500 opacity-50 " />
    </motion.main>
  )
}

export { CreateModalUsers, CreateModalPost }
