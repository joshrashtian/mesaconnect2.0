'use client'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../../../../../config/mesa-config'
import { PostType } from '@/_assets/types'
import { AdminModal, CreateModalPost } from '../AdminModal'

const Viewposts = () => {
  const [data, setData] = useState<PostType[]>()

  const Modal: any = useContext(AdminModal)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select()

      if (error) {
        console.error(error)
        return
      }

      setData(data)
    }

    fetchData()
  }, [])

  if (!data) return

  return (
    <main className=" w-full flex flex-col gap-2  overflow-y-scroll ">
      {data.map((post: PostType) => (
        <div
          onClick={() => Modal.createModal(post, 'post')}
          key={post.id}
          className="bg-white cursor-pointer rounded-md w-[1200px] h-16 overflow-x-scroll p-4 gap-5 flex  items-center"
        >
          <h1>Title: {post.type === 'post' ? post.title : post.data.data.text}</h1>
          <h1>Post ID: {post.id}</h1>
          <h1>Creator: {post.creator.name ? post.creator.name : post.creator.realname}</h1>
          <h1 className="capitalize">Type: {post.type}</h1>
          <h1>Created At: {post.created_at.toString()}</h1>
          <h1>{post.tags && `Tags: ${post.tags} `}</h1>
        </div>
      ))}
    </main>
  )
}

export default Viewposts
