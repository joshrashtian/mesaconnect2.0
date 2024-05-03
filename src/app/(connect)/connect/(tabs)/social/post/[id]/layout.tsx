import React from 'react'
import { serverside } from '../../../../../../../../config/serverside'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data, error } = await serverside.from('posts').select('title').eq('id', params.id)

  return {
    title: data ? `${data[0].title}` : error ? 'Error Fetching User' : 'Fetching Name'
  }
}

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default PostLayout
