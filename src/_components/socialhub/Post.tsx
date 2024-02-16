
import { PostItem, PostType } from '@/_assets/types'
import Link from 'next/link'
import React from 'react'

const Post = ({ post }: { post: PostType }) => {
  const data = (JSON.parse(JSON.stringify(post.data))).data
  
  return (
    <Link href={`/connect/social/post/${post.id}`} className="h-1/5 p-5 shadow-sm hover:scale-[1.01] duration-500 rounded-3xl w-full bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7]">
      <h1 className='font-bold text-slate-700'>{post.title}</h1>
      {
        data.map((item: PostItem, index: number) => {
          switch (item.type) {
            case 'text':
              return <h2 className='text-slate-500' key={index}>{item.text}</h2>
            default:
              return null
          }
        })
      }
    </Link>
  )
}

export default Post
