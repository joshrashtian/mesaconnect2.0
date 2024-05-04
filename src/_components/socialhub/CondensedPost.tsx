import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PostType } from '@/_assets/types'
import { useContextMenu, useToast } from '@/app/(connect)/InfoContext'
import { useUser } from '@/app/AuthContext'
import { IoChatboxEllipsesOutline, IoPersonOutline, IoTrashBinOutline } from 'react-icons/io5'
import { supabase } from '../../../config/mesa-config'
const CondensedPost = ({ post }: { post: PostType }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data
  const router = useRouter()
  const { createContext } = useContextMenu()

  const contextMenu = useContextMenu()
  const user: any = useUser()
  const toast = useToast()

  const contextButtons = [
    {
      name: 'View Post',
      visible: true,
      function: () => {
        router.push(`/connect/social/post/${post.id}`)
      },
      icon: <IoChatboxEllipsesOutline />
    },
    {
      name: 'User Profile',
      visible: true,
      function: () => {
        router.push(`/connect/profile/${post.userid}`)
      },
      icon: <IoPersonOutline />
    },
    {
      name: 'Delete Post',
      visible: user?.userData?.id === post.userid || user?.userData?.role === 'admin',
      function: async () => {
        const { error } = await supabase.from('posts').delete().eq('id', post.id)

        if (error) {
          console.error(error)
        }

        toast.CreateSuccessToast('Deleted Post!')
      },
      icon: <IoTrashBinOutline />
    }
  ]

  return (
    <motion.ul
      initial={{ y: 20, opacity: 0 }}
      exit={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'backInOut', duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-22 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-48 bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7]"
      onContextMenu={(e) => {
        createContext(e, contextButtons)
      }}
    >
      <Link href={`/connect/social/post/${post.id}`}>
        <section className="flex flex-row justify-between">
          <h1 className="font-bold text-slate-700">{post.title}</h1>
          <h1 className="font-geist text-slate-700">{post.creator.realname}</h1>
        </section>
        <h2 className="text-slate-500">{data[0].text}</h2>
      </Link>
    </motion.ul>
  )
}

export default CondensedPost
