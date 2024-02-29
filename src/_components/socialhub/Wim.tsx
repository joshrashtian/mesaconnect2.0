'use client'
import { PostItem, PostType } from '@/_assets/types'
import Link from 'next/link'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../../config/mesa-config'
import { useRouter } from 'next/navigation'
import { userContext } from '@/app/AuthContext'
import { MenuContext } from '@/app/(connect)/InfoContext'

const Wim = ({ post }: { post: PostType }) => {
  const router = useRouter()
  const user: any = useContext(userContext)
  const contextMenu = useContext<any>(MenuContext)
  const contextButtons = [
    {
      name: 'Delete Post',
      visible: user?.userData?.id === post.userid || user?.userData?.role === 'admin',
      function: async () => {
        const { error } = await supabase.from('posts').delete().eq('id', post.id)

        if (error) {
          console.error(error)
        }

        console.log('Post deleted successfully')
      }
    }
  ]

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'backInOut', duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-1/5 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-full bg-gradient-to-tr from-slate-100 to-zinc-200"
      onContextMenu={(e) => {
        contextMenu.rightClick(e, contextButtons)
      }}
    >
      <h1>{post.creator.name}</h1>
      <h1 className="font-light">{post.data.data.text}</h1>
    </motion.ul>
  )
}

export default Wim
