import React from 'react'
import RecentPostsHome from '../../../../../_components/socialhub/RecentPostsHome'

const Social = () => {
  return (
    <main className="min-h-full flex flex-col items-center xl:items-start gap-7 ">
      <h1 className="text-transparent bg-clip-text font-bold text-5xl bg-gradient-to-tr from-slate-600 to-orange-900 ">
        Social
      </h1>
      <section className="w-1/3 flex flex-col gap-10 xl:flex-row justify-normal lg:justify-between">
        <RecentPostsHome />
      </section>
    </main>
  )
}

export default Social
