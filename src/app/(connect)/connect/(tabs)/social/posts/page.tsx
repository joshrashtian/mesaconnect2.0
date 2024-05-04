'use client'
import React, { useEffect, useState } from 'react'
import { PostType } from '@/_assets/types'
import { supabase } from '../../../../../../../config/mesa-config'
import Wim from '@/_components/socialhub/Wim'
import CondensedPost from '@/_components/socialhub/CondensedPost'
import Post from '@/_components/socialhub/Post'

const PostsPageHome = () => {
  const [range, setRange] = useState(0)
  const [limit, setLimit] = useState()
  const [posts, setPosts] = useState<PostType[]>()

  useEffect(() => {
    async function intfetch() {
      const { data, error } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .range(0, 10)
      if (error) {
        console.error(error)
        return
      }
      //@ts-ignore
      setPosts(data)
      setRange((r) => r + 10)
    }
    intfetch()
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
            setPosts((posts) => posts?.filter((e) => e.id !== payload.old.id))
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
    <section>
      <section>
        <h1 className="text-transparent bg-clip-text font-bold font-eudoxus text-5xl bg-gradient-to-br from-orange-600 to-indigo-900 ">
          Community Posts
        </h1>
      </section>
      <article className="flex flex-col gap-2">
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
      </article>
    </section>
  )
}

export default PostsPageHome
