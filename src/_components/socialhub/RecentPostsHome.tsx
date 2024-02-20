'use client'
import { PostType } from '@/_assets/types'
import Post from '@/_components/socialhub/Post'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../config/mesa-config'

const RecentPostsHome = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select()

      if (error) {
        console.log(error)
        return
      }

      setPosts(data)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-full">
      <h1 className="text-lg font-bold">Recent Posts</h1>
      {posts?.map((post, index) => {
        console.log(post)
        return <h1>post</h1>
      })}
    </div>
  )
}

export default RecentPostsHome
