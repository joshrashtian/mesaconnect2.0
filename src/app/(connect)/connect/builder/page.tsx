'use client'
import React, { useEffect, useState } from 'react'
import { BuilderIndex } from '.'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Studio from './Studio'

const Page = () => {
  const [selected, setSelected] = useState<any>()
  const searchParams = useSearchParams()!
  const id = searchParams.get('type')

  const router = useRouter()

  const Home = {
    postType: 'Hub',
    onSelect: () => {
      return (
        <Studio
          setSelect={(e: any) => {
            setSelected(e)
          }}
        />
      )
    }
  }

  useEffect(() => {
    const useParams = () => {
      const found = BuilderIndex.find((e) => e.postType.toLowerCase() === id)

      if (!found) {
        setSelected(Home)
        return
      }

      setSelected(found)
    }

    useParams()
  }, [])

  if (!selected) return null
  return (
    <div className="w-full h-full pb-16 flex gap-4 flex-col">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-teal-200 ">
        MESA Studio
      </h1>
      <section className="flex flex-row gap-3 w-full h-full">
        <div className="w-1/6 flex gap-2 flex-col">
          <ul
            onClick={() => {
              setSelected(Home)
            }}
            className={`w-full p-3 flex justify-center ${
              selected === 'Home' ? 'bg-slate-600 text-white' : ''
            } duration-300 hover:bg-slate-500 hover:text-white cursor-pointer rounded-2xl `}
          >
            <h1 className="font-semibold text-xl">Home</h1>
          </ul>
          <h1 className="font-black text-xl">Posts</h1>
          {BuilderIndex.map((e, index) => {
            if (e.class === 0)
              return (
                <ul
                  onClick={() => {
                    setSelected(e)
                  }}
                  key={index}
                  className={`w-full p-3 flex justify-center ${
                    selected.postType === e.postType ? 'bg-slate-600 text-white' : ''
                  } duration-300 hover:bg-slate-500 hover:text-white cursor-pointer rounded-2xl `}
                >
                  <h1 className="font-semibold text-xl">{e.postType}</h1>
                </ul>
              )
          })}
          <h1 className="font-black text-xl">Profile Builder</h1>
          {BuilderIndex.map((e, index) => {
            if (e.class === 1)
              return (
                <ul
                  onClick={() => {
                    setSelected(e)
                  }}
                  key={index}
                  className={`w-full p-3 flex justify-center ${
                    selected.postType === e.postType ? 'bg-slate-600 text-white' : ''
                  } duration-300 hover:bg-slate-500 hover:text-white cursor-pointer rounded-2xl `}
                >
                  <h1 className="font-semibold text-xl">{e.postType}</h1>
                </ul>
              )
          })}
        </div>

        <div className="bg-white rounded-3xl p-10 pb-20  w-full">
          <AnimatePresence>
            <selected.onSelect />
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Page
