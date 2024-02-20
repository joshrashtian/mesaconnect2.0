
import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
  return (
    <main className='min-h-screen gap-3 flex justify-center items-center'>
      <h1 className='font-bold text-6xl'>Error</h1>
      <ul className='border-l-2 border-amber-600 p-4'>
      <h2 className='font-light text-2xl'>This page does not exist.</h2>
      <Link href='/'><h1>Return Home</h1></Link>
      </ul>
    </main>
  )
}

export default Custom404