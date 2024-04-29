'use client'
import { PostType } from '@/_assets/types'
import Post from '@/_components/socialhub/Post'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../../config/mesa-config'
import { AnimatePresence, motion } from 'framer-motion'
import QuickWimModal from './QuickWimModal'
import Wim from './Wim'
import Link from 'next/link'
import { userContext } from '@/app/AuthContext'
import { MenuContext } from '@/app/(connect)/InfoContext'
import { BsPostcard } from 'react-icons/bs'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { useModal } from '@/app/(connect)/connect/Modal'

export const RecentPostsHome = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [modal, setModal] = useState(false)
  const user = useContext(userContext)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false })
        .limit(8)

      if (error) {
        console.log(error)
        return
      }
      setPosts(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('posts channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
          //filter: `userid=eq.${user.user?.id}`
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            console.log(payload.old.id)
            setPosts((posts) => posts.filter((e) => e.id !== payload.old.id))
          }
          if (payload.eventType === 'INSERT') {
            setPosts((posts: any) => [payload.new, ...posts])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'backInOut' }}
      className="w-full h-full flex-col flex gap-2"
    >
      <h1 className="text-lg font-bold">Recent In The Community</h1>

      <section className="flex flex-row justify-center items-center gap-2">
        <Link
          href="/connect/builder"
          className="h-12 p-5 gap-2 shadow-md text-white cursor-pointer hover:scale-[1.02] flex flex-row justify-center items-center duration-500 rounded-xl hover:rounded-md w-full bg-gradient-to-br from-red-600 to-amber-600"
        >
          <BsPostcard size={22} />
          <h1>Post Builder</h1>
        </Link>
        <ul
          onClick={() => {
            setModal(true)
          }}
          className="h-12 p-5 shadow-md text-white gap-2 cursor-pointer hover:scale-[1.02] flex flex-row justify-center items-center duration-500 rounded-xl hover:rounded-md w-full bg-gradient-to-br from-indigo-600 to-blue-400"
        >
          <IoChatboxEllipsesOutline size={22} />
          <h1>Create Wim</h1>
        </ul>
      </section>
      <Link
        href={`/connect/social/posts`}
        className="flex flex-col w-full h-12 p-5 bg-gradient-to-r from-red-600 to-indigo-600 rounded-2xl hover:scale-[1.02] duration-500 drop-shadow-xl hover:shadow-lg justify-center items-center"
      >
        <h1 className="text-white">View All Posts</h1>
      </Link>
      <AnimatePresence>
        {posts?.map((post, index) => {
          switch (post.type) {
            case 'wim':
              return <Wim key={index} post={post} />
            case null:
              return <Post key={index} post={post} />
            default:
              return <Post key={index} post={post} />
          }
        })}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <QuickWimModal
            disengageModal={() => {
              setModal(false)
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
