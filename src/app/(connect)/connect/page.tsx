import React from 'react'
import TitleComponent from './TitleComponent'
import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'

const page = () => {
  const time = new Date(Date.now())

  return (
    <div className="flex flex-col items-center gap-y-5">
      <TitleComponent date={time} />
      <h1 className="text-2xl text-slate-600 font-semibold duration-500">
        Today is{' '}
        <code className="bg-clip-text text-transparent bg-gradient-to-br from-slate-600 to-teal-800">
          {time.getMonth() + 1}/{time.getDate()}/{time.getFullYear()}
        </code>
      </h1>
      <section className="w-1/3 h-[50%] gap-x-4 flex flex-row justify-between">
        <CurrentEventSegment />
      </section>
    </div>
  )
}

export default page
