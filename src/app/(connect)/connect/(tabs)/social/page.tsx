import React from 'react'
import RecentPostsHome from '../../../../../_components/socialhub/RecentPostsHome'

const Social = () => {
  return (
    <main className="min-h-full flex flex-col items-center ">
      <h1 className="text-transparent bg-clip-text font-bold text-4xl bg-gradient-to-tr from-slate-600 to-orange-900 ">
        Social
      </h1>
      <section className="w-full justify-between">
        <RecentPostsHome />
      </section>
    </main>
  )
}

export default Social
