'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../../../../config/mesa-config'
import Reply from './Reply'
import { ContextProps } from '@/app/AuthContext'

export type ReplyType = {
  user_id: string
  post_id: string
  reply: string
  private: boolean
  creator: {
    realname: string
    avatar_url: string
    username: string
  }
  created_at: Date
}
const Replies = ({ id, user, creator }: { id: string; user: ContextProps; creator: string }) => {
  const [data, setData] = useState<ReplyType[]>()
  useEffect(() => {
    const fetchReplies = async () => {
      const { data, error } = await supabase.from('replies').select().eq('post_id', id).limit(10)

      if (error) {
        console.error(error)
        return
      }
      setData(data)
      return
    }

    fetchReplies()
  }, [])
  return (
    <div>
      {data &&
        data.map((e, i) => {
          if (e.private) {
            if (user.user?.id === creator || user.user?.id === e.user_id)
              return <Reply contents={e} key={i} />
            else return
          }
          return <Reply contents={e} key={i} />
        })}
    </div>
  )
}

export default Replies
