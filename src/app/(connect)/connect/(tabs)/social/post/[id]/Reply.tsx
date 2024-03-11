import React from 'react'
import { ReplyType } from './Replies'

const Reply = ({ contents }: { contents: ReplyType }) => {
  const time = new Date(contents.created_at)
  return (
    <main className="flex flex-row shadow-xl">
      <ul className="w-2 p-1 min-h-full bg-orange-500" />
      <ul className="p-3 bg-white w-full h-full">
        <section className="flex flex-row justify-between">
          <h1 className="font-bold">{contents.creator.realname}</h1>
          <h2>
            {time.getMonth()}/{time.getDate()}
          </h2>
        </section>
        <p>{contents.reply}</p>
      </ul>
    </main>
  )
}

export default Reply
