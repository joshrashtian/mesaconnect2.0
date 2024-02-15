import { PostType } from '@/_assets/types'
import React from 'react'

const Post = ({ information }: { information: PostType }) => {
  return (
    <div className="h-1/5 w-full bg-gradient-to-br from-[#FFFBF6] to-[#F7F7F7]">
      <h1>{information.title}</h1>
    </div>
  )
}

export default Post
