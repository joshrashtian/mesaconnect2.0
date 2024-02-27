import React, { Suspense, lazy } from 'react'
import TitleComponent from './TitleComponent'
import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'

const page = () => {
  const Widgets = lazy(() => import('./homescreenwidgets'))

  return (
    <div className="flex flex-col gap-y-2 p-5 w-full h-full ">
      <TitleComponent />
      <Suspense fallback={<section className="w-full h-full bg-slate-900" />}>
        <Widgets />
      </Suspense>
    </div>
  )
}

export default page
