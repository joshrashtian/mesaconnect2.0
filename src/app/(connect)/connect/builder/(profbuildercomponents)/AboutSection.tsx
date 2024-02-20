'use client'

import { userContext } from '@/app/AuthContext'
import React, { useContext, useMemo, useState } from 'react'
import { ChangeAboutSection } from './ChangeIndex'

const AboutSection = () => {
  const [about, setAbout] = useState<string>()
  const [profileColor, setProfileColor] = useState<string>('#000')

  const [json, setJSON] = useState<any>()

  const user = useContext(userContext)

  useMemo(() => {
    const newJSON = {
      type: 'about',
      contents: about,
      textColor: profileColor
    }
    setJSON(newJSON)
  }, [about, profileColor])

  const changeAbout = async () => {
    if (!json || !json.contents) {
      console.log('Missing something...')
      return
    }
    ChangeAboutSection(user, json)
  }

  return (
    <main className="h-full flex flex-col gap-3">
      <h1 className="font-bold text-3xl">About Section</h1>
      <textarea
        placeholder="Let's write some information..."
        className="p-6 rounded-3xl text-xl resize-none duration-1000 h-2/5 w-full focus:outline-none shadow-md"
        style={{ color: profileColor }}
        onChange={(e) => setAbout(e.target.value)}
      />

      <ul className="rounded-full">
        <li className="p-4 bg-white rounded-xl shadow-lg flex flex-row gap-4 items-center">
          <h1 className="font-bold text-2xl">Styling:</h1>
          <input
            onChange={(e) => {
              setProfileColor(e.target.value)
            }}
            className="w-16 h-16"
            type="color"
          />
        </li>
      </ul>
      <button
        onClick={() => {
          changeAbout()
        }}
        className={`p-3 w-full rounded-full ${
          !json || !json.contents ? 'bg-slate-200' : 'bg-orange-500 text-white'
        } duration-300 `}
      >
        <p>Submit</p>
      </button>
    </main>
  )
}

export default AboutSection
