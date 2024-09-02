import React, { Suspense, lazy } from 'react'
import TitleComponent from './TitleComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hub',
  description: 'Home for MESAConnect'
}

const page = () => {
  const Widgets = lazy(() => import('./homescreenwidgets'))

  return (
    <div className="flex gap-y-2 p-5 w-full h-full flex-col  ">
      <TitleComponent />
      <Suspense fallback={<section className="w-full h-full bg-slate-900" />}>
        <Widgets />
      </Suspense>
    </div>
  )
}

export default page
